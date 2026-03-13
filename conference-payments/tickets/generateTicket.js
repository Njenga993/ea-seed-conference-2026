const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

async function generateTicket(participant) {

  const ticketsDir = path.join(__dirname, "..", "tickets");

  if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir, { recursive: true });
  }

  const filePath = path.join(ticketsDir, `${participant.id}.pdf`);

  const doc = new PDFDocument({
    size: "A6",
    layout: "portrait",
    margin: 20
  });

  doc.pipe(fs.createWriteStream(filePath));

  /*
  =============================
  CATEGORY COLORS
  =============================
  */

  let color = "#2F855A";

  if (participant.registrationType === "delegate") color = "#3182CE";
  if (participant.registrationType === "farmer") color = "#38A169";
  if (participant.registrationType === "virtual participant") color = "#805AD5";
  if (participant.registrationType === "vip") color = "#D69E2E";

  /*
  =============================
  HEADER
  =============================
  */

  doc.rect(0, 0, doc.page.width, 60).fill(color);

  doc
    .fillColor("white")
    .fontSize(14)
    .text("EA Indigenous Seed", 20, 20, { align: "center" });

  doc
    .fontSize(12)
    .text("Conference 2026", { align: "center" });

  doc.moveDown(3);

  /*
  =============================
  PARTICIPANT NAME
  =============================
  */

  doc
    .fillColor("black")
    .fontSize(18)
    .text(participant.fullName, {
      align: "center"
    });

  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .fillColor("gray")
    .text(participant.organization || "Participant", {
      align: "center"
    });

  doc
    .fontSize(11)
    .text(participant.country || "", {
      align: "center"
    });

  doc.moveDown();

  /*
  =============================
  TICKET TYPE
  =============================
  */

  doc
    .fillColor(color)
    .fontSize(13)
    .text(participant.registrationType.toUpperCase(), {
      align: "center"
    });

  doc.moveDown(1.5);

  /*
  =============================
  QR CODE
  =============================
  */

  const qr = await QRCode.toDataURL(participant.id);

  doc.image(qr, {
    fit: [120, 120],
    align: "center, center"
  });

  doc.moveDown();

  /*
  =============================
  REGISTRATION ID
  =============================
  */

  doc
    .fillColor("black")
    .fontSize(6)
    .text(`ID: ${participant.id}`, {
      align: "center"
    });

  doc.moveDown(1);

  /*
  =============================
  EVENT DETAILS
  =============================
  */

  doc
    .fontSize(6)
    .fillColor("gray")
    .text("17th–20th November 2026", { align: "center" });

  doc.text("To be Confirmed", { align: "center" });

  doc.text("Nairobi, Kenya", { align: "center" });

  doc.moveDown();

  /*
  =============================
  FOOTER
  =============================
  */

  doc
    .fontSize(8)
    .text(
      "www.eaindigenousseedconference.org",
      { align: "center" }
    );

  doc.end();

  return filePath;
}

module.exports = generateTicket;