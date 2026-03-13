const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./conference.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS participants (
      id TEXT PRIMARY KEY,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      country TEXT,
      organization TEXT,
      registrationType TEXT,
      excursion INTEGER,
      galaDinner INTEGER,
      amount INTEGER,
      paymentReference TEXT,
      paymentStatus TEXT,
      createdAt TEXT
    )
  `);

});

module.exports = db;