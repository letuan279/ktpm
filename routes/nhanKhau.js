const express = require('express');
const router = express.Router();
const db = require("../connect_db");

router.get("/", (req, res, next) => {
    const q = "SELECT * FROM `NhanKhau`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Thong tin toan bo NhanKhau",
                data: data
            });
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
    const q = 'INSERT INTO NhanKhau (hoTen, soCMND, bietDanh, gioiTinh, thuongTru, ngaySinh, tonGiao, idHoKhau, ngheNghiep, trangThai) VALUES (?)';
    const values = [
        req.body.hoTen,
        req.body.soCMND,
        req.body.bietDanh,
        req.body.gioiTinh,
        req.body.thuongTru,
        req.body.ngaySinh,
        req.body.tonGiao,
        req.body.idHoKhau,
        req.body.ngheNghiep,
        req.body.trangThai
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

router.post("/thaydoi/:id", (req, res, next) => {
    const id = req.params.id;
    const {ngayChuyen, noiChuyen, ghiChu} = req.body;
    const q = `INSERT INTO ThayDoiNhanKhau (ngayChuyen, noiChuyen, ghiChu, idNhanKhau) VALUES ('${ngayChuyen}', '${noiChuyen}', '${ghiChu}', ${id}); UPDATE NhanKhau SET trangThai = '${ghiChu}' WHERE id = ${id}`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thay doi Nhan Khau thanh cong",
                data: ""
            });
        }
    })
});

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const q = 'DELETE FROM `NhanKhau` WHERE `id` = ?';
    db.query(q, id, (err, data) => {
        if(err) {
            return res.json(err);
        } else {
            return res.json({
                success: true,
                message: "Xoa NhanKhau thanh cong",
                data: "",
            });
        }
    })
});

router.post("/tamtru", (req, res, next) => {
    const {soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh} = req.body;
    const q = `INSERT INTO TamTru (soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh) VALUES ('${soGiayTamTru}', '${lyDo}', '${thoiGianTamTru}', '${HoTen}', '${soCMND}', '${ngaySinh}', ${gioiTinh})`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thay doi TamTru thanh cong",
                data: req.body
            });
        }
    })
});

router.get("/thongke/tamtru", (req, res, next) => {
    const q = "SELECT * FROM `TamTru`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin TamTru",
                data: data,
            });
        }
    })
});

router.post("/tamvang/:id", (req, res, next) => {
    const idNhanKhau = req.params.id;
    const {soGiayTamVang, noiTamTru, tuNgay, denNgay} = req.body;
    const q = `INSERT INTO TamVang (soGiayTamVang, noiTamTru, tuNgay, denNgay, idNhanKhau) VALUES ('${soGiayTamVang}', '${noiTamTru}', '${tuNgay}', '${denNgay}', ${idNhanKhau}); UPDATE NhanKhau SET trangThai = 'Tạm vắng'`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thay doi TamVang thanh cong",
                data: req.body,
            });
        }
    })
});

router.get("/thongke/tamvang", (req, res, next) => {
    const q = "SELECT * FROM `TamVang`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin TamVang",
                data: data,
            });
        }
    })
});

router.get("/lichsuthaydoi/:id", (req, res, next) => {
    const idNhanKhau = req.params.id;
    const q = `SELECT * FROM ThayDoiNhanKhau WHERE idNhanKhau = ${idNhanKhau}`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin ThayDoiNhanKhau",
                data: data
            });
        }
    })
});

router.get("/thongke/gioitinhnam", (req, res, next) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const q = `SELECT nk.* FROM NhanKhau nk LEFT JOIN TamVang tv ON nk.id = tv.idNhanKhau WHERE (tv.idNhanKhau IS NULL OR tv.denNgay < '${currentDate}') AND nk.gioiTinh = 1 AND nk.trangThai != 'Đã qua đời'`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin NhanKhau gioi tinh Nam",
                data: data
            });
        }
    })
});

router.get("/thongke/gioitinhnu", (req, res, next) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const q = `SELECT nk.* FROM NhanKhau nk LEFT JOIN TamVang tv ON nk.id = tv.idNhanKhau WHERE (tv.idNhanKhau IS NULL OR tv.denNgay < '${currentDate}') AND nk.gioiTinh = 0 AND nk.trangThai != 'Đã qua đời'`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin NhanKhau gioi tinh Nu",
                data: data
            });
        }
    })
});

router.get("/thongke/dotuoi", (req, res, next) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const {tuoiMin, tuoiMax} = req.body;
    const q = `SELECT nk.* FROM NhanKhau nk LEFT JOIN TamVang tv ON nk.id = tv.idNhanKhau WHERE (tv.idNhanKhau IS NULL OR tv.denNgay < '${currentDate}') AND ngaySinh >= DATE_SUB(CURRENT_DATE, INTERVAL ${tuoiMax} YEAR)
             AND ngaySinh <= DATE_SUB(CURRENT_DATE, INTERVAL ${tuoiMin} YEAR) AND nk.trangThai != 'Đã qua đời'`;
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: `Thong tin NhanKhau trong do tuoi ${tuoiMin} - ${tuoiMax}`,
                data: data,
            });
        }
    })
});

module.exports = router;