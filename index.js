const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quanlydancu',
});

app.get("/api/hokhau", (req, res, next) => {
    const q = "SELECT * FROM `HoKhau`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
});

app.get("/api/nhankhau", (req, res, next) => {
        const q = "SELECT * FROM `NhanKhau`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
});

app.get("/", (req, res, next) => {
    return res.json("hello from backend server");
});


app.listen(PORT, (req, res) => {
    console.log(`Connect to backend at port ${PORT}`);
});