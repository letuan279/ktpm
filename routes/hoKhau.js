const express = require('express');
const router = express.Router();
const db = require("../connect_db");

router.get("/", (req, res, next) => {
    const q = "SELECT * FROM `HoKhau`";
    db.query(q, (err, data) => {
        if (err) {
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
    const idHoKhau = req.params.id;
    // const q = `SELECT nk.* FROM NhanKhau nk JOIN ThayDoiNhanKhau tdnk ON nk.id = tdnk.idNhanKhau WHERE nk.idHoKhau = ${idHoKhau} AND tdnk.ghiChu != 'Đã qua đời'`;
    const q = `SELECT nk.* FROM NhanKhau nk WHERE nk.idHoKhau = ${idHoKhau} AND nk.trangThai != 'Đã qua đời'`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Thong tin cac NhanKhau trong HoKhau nay",
                data: data,
            });
        }
    })
});

router.post("/", (req, res, next) => {
    const { soHoKhau, khuVuc, diaChi, ngayLap, idChuHo } = req.body;
    const q = `INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES ('${soHoKhau}', '${khuVuc}', '${diaChi}', '${ngayLap}', '${idChuHo}')`;
    db.query(q, (err, data) => {
        if (err) {
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

router.post("/thaydoi/:id", (req, res, next) => {
    const id = req.params.id;
    const q = 'UPDATE `HoKhau` SET `soHoKhau` = ?, `khuVuc` = ?, `diaChi` = ?, `ngayLap` = ?, `idChuHo` = ? WHERE `id` = ?';
    const values = [
        req.body.soHoKhau,
        req.body.khuVuc,
        req.body.diaChi,
        req.body.ngayLap,
        req.body.idChuHo
    ];
    console.log(req.body);
    db.query(q, [...values, id], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            const selectQ = 'SELECT * FROM `HoKhau` WHERE `id` = ?';
            db.query(selectQ, [id], (err, rows) => {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json({
                        success: true,
                        message: "Thay doi thong tin HoKhau thanh cong",
                        data: rows[0],
                    });
                }
            });
        }
    })
});

router.post("/thaydoi/tach", (req, res, next) => {

    const { soHoKhau, khuVuc, diaChi, ngayLap, idNhanKhau } = req.body;
    const idChuHoMoi = idNhanKhau[0];
    const idNhanKhauValues = idNhanKhau.join(',');
    const q = `INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES ('${soHoKhau}', '${khuVuc}', '${diaChi}', '${ngayLap}', '${idChuHoMoi}'); UPDATE NhanKhau SET idHoKhau = LAST_INSERT_ID() WHERE id IN (${idNhanKhauValues})`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Tach HoKhau thanh cong",
                data: {
                    "soHoKhau": soHoKhau,
                    "khuVuc": khuVuc,
                    "diaChi": diaChi,
                    "ngayLap": ngayLap,
                    "idChuHo": idChuHoMoi
                },
            });
        }
    })
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const q = 'DELETE FROM `HoKhau` WHERE `id` = ?';
    db.query(q, id, (err, data) => {
        if (err) {
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

router.get("/thongke/timkiem", (req, res, next) => {
    const soHoKhau = req.query.soHoKhau;
    console.log(soHoKhau);
    const q = `SELECT * FROM HoKhau WHERE soHoKhau LIKE '${soHoKhau}%'`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "thong tin HoKhau",
                data: data
            });
        }
    })
});

module.exports = router;