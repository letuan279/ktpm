const express = require('express');
const router = express.Router();
const db = require("../connect_db");

router.get("/", (req, res, next) => {
    const q = "SELECT * FROM `NhanKhau`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    })
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const q = `SELECT * FROM NhanKhau WHERE id = ${id}`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Thong tin NhanKhau",
                data: data,
            });
        }
    })
});

router.post("/", (req, res, next) => {
    const q = 'INSERT INTO NhanKhau (hoTen, soCMND, bietDanh, gioiTinh, thuongTru, ngaySinh, tonGiao, idHoKhau, ngheNghiep) VALUES (?)';
    const values = [
        req.body.hoTen,
        req.body.soCMND,
        req.body.bietDanh,
        req.body.gioiTinh,
        req.body.thuongTru,
        req.body.ngaySinh,
        req.body.tonGiao,
        req.body.idHoKhau,
        req.body.ngheNghiep
    ];
    db.query(q, [values], (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Them NhanKhau thanh cong",
                data: req.body,
            });
        }
    }) 
});

module.exports = router;