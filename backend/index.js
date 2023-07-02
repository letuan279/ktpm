const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const hoKhauRouter = require("./routes/hoKhau");
const nhanKhauRouter = require("./routes/nhanKhau");
const cors = require('cors')
const compression = require('compression')
const bp = require('body-parser')
const YTeRouter = require("./routes/YTe");
const loginRouter = require("./routes/dangNhap");

dotenv.config();

const app = express();

// app.use(bp.json())
// app.use(bp.urlencoded({ extended: true }))
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(compression());

app.use("/api/hokhau", hoKhauRouter);

app.use("/api/nhankhau", nhanKhauRouter);

app.use("/api/yte", YTeRouter);

app.use("/api/dangnhap", loginRouter);

app.get("/", (req, res, next) => {
    return res.json("hello from backend server");
});

app.listen(PORT, (req, res) => {
    console.log(`Connect to backend at port ${PORT}`);
});