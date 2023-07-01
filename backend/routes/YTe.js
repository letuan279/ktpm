const express = require('express');
const router = express.Router();
const db = require("../connect_db");

router.get("/khaibao", (req, res, next) => {
    const q = `SELECT * FROM KhaiBaoYTe`;
    db.query(q, (err, data) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thông tin về Khai Báo Y Te",
                data: data
            });
        }
    })
});

router.post("/khaibao", (req, res, next) => {
    const {idNhanKhau, hanhTrinh, trieuChung, ngayKhaiBao, doiTuongTiepXuc} = req.body;
    const q = `INSERT INTO KhaiBaoYTe (idNhanKhau, hanhTrinh, trieuChung, ngayKhaiBao, doiTuongTiepXuc) VALUES (${idNhanKhau}, '${hanhTrinh}', '${trieuChung}', '${ngayKhaiBao}', '${doiTuongTiepXuc}')`;
    db.query(q, (err, data) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                success: true,
                message: "Them thong tin Khai Bao Y Te thanh cong",
                data: req.body
            });
        }        
    })
});

router.get("/cachly", (req, res, next) => {
    const q = `SELECT * FROM CachLy`;
    db.query(q, (err, data) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thông tin về Cach Ly",
                data: data
            });
        }
    })
});

router.post("/cachly", (req, res, next) => {
    const {idNhanKhau, hinhThucTest, thoiDiem, mucDoCovid, trangThaiTest} = req.body;
    const q = `INSERT INTO CachLy (idNhanKhau, hinhThucTest, thoiDiem, mucDoCovid, trangThaiTest) VALUES (${idNhanKhau}, '${hinhThucTest}', '${thoiDiem}', '${mucDoCovid}', '${trangThaiTest}')`;
    db.query(q, (err, data) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                success: true,
                message: "Them thong tin Cach Ly thanh cong",
                data: req.body
            });
        }        
    })
});

router.get("/thongkecachly", (req, res, next) => {

    const q = `SELECT CachLy.*, nk.hoTen, nk.gioiTinh, TIMESTAMPDIFF(YEAR, nk.ngaySinh, CURDATE()) as DoTuoi FROM CachLy JOIN NhanKhau nk ON CachLy.idNhanKhau = nk.id`;
    db.query(q, (err, data) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thông tin chi tiet về Cach Ly",
                data: data
            });
        }
    })
});

module.exports = router;