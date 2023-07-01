const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const hoKhauRouter = require("./routes/hoKhau");
const nhanKhauRouter = require("./routes/nhanKhau");
const YTeRouter = require("./routes/YTe");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/hokhau", hoKhauRouter);

app.use("/api/nhankhau", nhanKhauRouter);

app.use("/api/yte", YTeRouter);

app.get("/", (req, res, next) => {
    return res.json("hello from backend server");
});

app.listen(PORT, (req, res) => {
    console.log(`Connect to backend at port ${PORT}`);
});