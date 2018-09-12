const express = require('express')
const router = express.Router()
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "stalk"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database");
});

router.get('/', (req,res) => {
    res.send('Hello from API')
})

router.post('/add/infos', (req,res) => {
    let data = req.body

    let sql = "INSERT INTO infos(countryCode, country, regionCode, region, zip, city, lat, lon , ip) VALUES(?,?,?,?,?,?,?,?,?)";
    let inserts = [data.countryCode, data.country, data.regionCode, data.region, data.zip, data.city, data.lat, data.lon , data.ip];
    sql = mysql.format(sql, inserts);

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
      });

    res.status(200).send(data)
})

router.get('/search/typePresta/:search', (req,res) => {
    var dataDb

    let sql = "SELECT * FROM type_presta WHERE type LIKE '%" + req.params.search + "%'";

    con.query(sql, function (err, result) {
        if (err) throw err;
        dataDb = JSON.stringify(result);
        res.status(200).contentType('Application/json').send(dataDb);
      });
})

module.exports = router