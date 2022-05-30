const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const db_name = path.join(__dirname, "data", "apptest.db");

const { listen } = require("express/lib/application");

// gör en variabel så man kan använda express
const app = express();


// Kod för för vilken motorn man använder för att få saker att visas
app.set("view engine", "ejs");

// Allt som ska synnas på sidan ska vara i views mappen
app.set("views", path.join(__dirname, "views"));

// 
app.use(express.static(path.join(__dirname, "public")));

// Connectar till databasen
const db = new sqlite3.Database(db_name, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database 'texter.db'");
  });


  app.get("/", (req, res) => {
    const sql = "SELECT * FROM Countries ORDER BY country_ID"
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.render("index", { model: rows });
    });
  });

// Response att visa det som finns innuti index.ejs i views mappen
  app.listen(3000, () => { 
    console.log("Server started");
})
