const express = require('express');
const router = express.Router();
const db = require("../connect_db");

router.get("/", (req, res, next) => {
    const q = "SELECT * FROM `HoKhau`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Thong tin cac HoKhau",
                data: data,
            });
        }
    })
});

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    const q = `SELECT * FROM HoKhau WHERE id = ${id}`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Thong tin HoKhau",
                data: data,
            });
        }
    })
});

router.post("/", (req, res, next) => {
    const {soHoKhau, khuVuc, diaChi, ngayLap, idChuHo} = req.body;
    const q = `INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES ('${soHoKhau}', '${khuVuc}', '${diaChi}', '${ngayLap}', '${idChuHo}')`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Them HoKhau thanh cong",
                data: req.body,
            });
        }
    })    
});

router.put("/thaydoi/:id", (req, res, next) => {
    const id = req.params.id;
    const q = 'UPDATE `HoKhau` SET `soHoKhau` = ?, `khuVuc` = ?, `diaChi` = ?, `ngayLap` = ?, `idChuHo` = ? WHERE `id` = ?';
    const values = [
        req.body.soHoKhau,
        req.body.khuVuc,
        req.body.diaChi,
        req.body.ngayLap,
        req.body.idChuHo
    ];
    db.query(q, [...values, id], (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Thay doi thong tin HoKhau thanh cong",
                data: req.body,
            });
        }
    })
});

router.post("/thaydoi/tach", (req, res, next) => {
    const {soHoKhau, khuVuc, diaChi, ngayLap, idNhanKhau} = req.body;
    const q = `INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES ('${soHoKhau}', '${khuVuc}', '${diaChi}', '${ngayLap}', '${idNhanKhau[0]}')`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Tach HoKhau thanh cong",
                data: req.body,
            });
        }
    }) 
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const q = 'DELETE FROM `HoKhau` WHERE `id` = ?';
    db.query(q, id, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Xoa HoKhau thanh cong",
                data: "",
            });
        }
    })
});

module.exports = router;