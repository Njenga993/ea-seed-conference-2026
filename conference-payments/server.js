const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const db = require("./database");
const { v4: uuidv4 } = require("uuid");
const { Parser } = require("json2csv");
const generateTicket = require("./tickets/generateTicket");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL.replace(/\/$/, ""); // remove trailing slash

/*
========================================
TEST ROUTE
========================================
*/
app.get("/", (req, res) => {
  res.send("Conference Payment Server Running");
});

/*
========================================
INITIALIZE PAYMENT
========================================
*/
app.post("/initialize-payment", async (req, res) => {
  const { email, amount, name, metadata } = req.body;
  const participantId = uuidv4();

  try {
    // Save participant as pending
    db.run(
      `INSERT INTO participants 
      (id, fullName, email, phone, country, organization, registrationType, excursion, galaDinner, amount, paymentStatus, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        participantId,
        name,
        email,
        metadata?.phone || "",
        metadata?.country || "",
        metadata?.organization || "",
        metadata?.registrationType || "",
        metadata?.excursion ? 1 : 0,
        metadata?.galaDinner ? 1 : 0,
        amount,
        "pending",
        new Date().toISOString(),
      ]
    );

    // Initialize Paystack payment
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        metadata: { participantId },
        callback_url: `${FRONTEND_URL}/payment-success`, // clean URL
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

/*
========================================
SERVER-SIDE PAYMENT VERIFICATION
========================================
*/

app.post("/verify-payment", async (req, res) => {

  const { reference } = req.body;

  try {

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`
        }
      }
    );

    const data = response.data;

    if (data.status && data.data.status === "success") {

      const participantId = data.data.metadata.participantId;

      /*
      UPDATE PAYMENT STATUS
      */

      db.run(
        `UPDATE participants 
         SET paymentStatus = ?, paymentReference = ?
         WHERE id = ?`,
        ["paid", reference, participantId]
      );

      /*
      GENERATE TICKET IF NOT GENERATED
      */

      db.get(
        `SELECT * FROM participants WHERE id = ?`,
        [participantId],
        async (err, participant) => {

          if (participant) {

            try {

              await generateTicket(participant);

            } catch (ticketError) {

              console.error("Ticket generation failed", ticketError);

            }

          }

        }
      );

      res.json({
        status: "success",
        participantId: participantId
      });

    } else {

      res.json({
        status: "failed"
      });

    }

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Payment verification failed"
    });

  }

});

/*
========================================
PAYSTACK WEBHOOK
========================================
*/
app.post("/paystack-webhook", express.json(), async (req, res) => {
  const event = req.body;

  if (event.event === "charge.success") {
    const reference = event.data.reference;
    const participantId = event.data.metadata.participantId;

    // Update participant status
    db.run(`UPDATE participants SET paymentStatus = ?, paymentReference = ? WHERE id = ?`, ["paid", reference, participantId]);

    // Generate ticket
    db.get(`SELECT * FROM participants WHERE id = ?`, [participantId], async (err, participant) => {
      if (participant) {
        try {
          await generateTicket(participant);
        } catch (ticketError) {
          console.error("Ticket generation failed", ticketError);
        }
      }
    });
  }

  res.sendStatus(200);
});

/*
========================================
DOWNLOAD TICKET
========================================
*/

const path = require("path");

app.get("/ticket/:participantId", (req, res) => {

  const participantId = req.params.participantId;

  const ticketPath = path.join(__dirname, "tickets", `${participantId}.pdf`);

  res.download(ticketPath, `conference-ticket-${participantId}.pdf`, (err) => {

    if (err) {

      console.error("Ticket download error:", err);

      res.status(404).json({
        error: "Ticket not found"
      });

    }

  });

});

/*
========================================
ADMIN: LIST PARTICIPANTS
========================================
*/
app.get("/admin/participants", (req, res) => {
  db.all(`SELECT * FROM participants ORDER BY createdAt DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

/*
========================================
ADMIN: EXPORT CSV
========================================
*/
app.get("/admin/export", (req, res) => {
  db.all(`SELECT * FROM participants`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const parser = new Parser();
    const csv = parser.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("participants.csv");
    res.send(csv);
  });
});

/*
========================================
START SERVER
========================================
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});