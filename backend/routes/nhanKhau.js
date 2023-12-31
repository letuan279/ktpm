const express = require('express');
const router = express.Router();
const db = require("../connect_db");
const { route } = require('./hoKhau');

router.get("/", (req, res, next) => {
    const q = "SELECT * FROM `NhanKhau`";
    db.query(q, (err, data) => {
        if (err) {
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
        if (err) {
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
        if (err) {
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
    const { ngayChuyen, noiChuyen, ghiChu } = req.body;
    const q = `INSERT INTO ThayDoiNhanKhau (ngayChuyen, noiChuyen, ghiChu, idNhanKhau) VALUES ('${ngayChuyen}', '${noiChuyen}', '${ghiChu}', ${id}); UPDATE NhanKhau SET trangThai = '${ghiChu}' WHERE id = ${id}`;
    db.query(q, (err, data) => {
        if (err) {
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

router.get("/khaitu/:id", (req, res) => {
    const soCMND = req.params.id;
    const q = `UPDATE NhanKhau SET trangThai = "Đã qua đời" WHERE soCMND = ${soCMND}`
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Khai tu thanh cong",
                data: ""
            });
        }
    })
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    const q = 'DELETE FROM `NhanKhau` WHERE `id` = ?';
    db.query(q, id, (err, data) => {
        if (err) {
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
    const { soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh, ngheNghiep } = req.body;
    const q = `INSERT INTO TamTru (soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh, ngheNghiep) VALUES ('${soGiayTamTru}', '${lyDo}', '${thoiGianTamTru}', '${HoTen}', '${soCMND}', '${ngaySinh}', ${gioiTinh}, '${ngheNghiep}')`;
    db.query(q, (err, data) => {
        if (err) {
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
    const q = `SELECT * FROM TamTru`;
    db.query(q, (err, data) => {
        if (err) {
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
    const { soGiayTamVang, noiTamTru, tuNgay, denNgay } = req.body;
    const q = `INSERT INTO TamVang (soGiayTamVang, noiTamTru, tuNgay, denNgay, idNhanKhau) VALUES ('${soGiayTamVang}', '${noiTamTru}', '${tuNgay}', '${denNgay}', ${idNhanKhau}); UPDATE NhanKhau SET trangThai = 'Tạm vắng' WHERE id = ${idNhanKhau}`;
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
    const q = `SELECT TamVang.*, NhanKhau.* FROM TamVang JOIN NhanKhau ON TamVang.idNhanKhau = NhanKhau.id`;
    db.query(q, (err, data) => {
        if (err) {
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
        if (err) {
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

router.get("/thaydoi/nhankhau", (req, res, next) => {
    const q = "SELECT * FROM `ThayDoiNhanKhau`";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin bang ThayDoiNhanKhau",
                data: data
            })
        }
    })
});

router.get("/thongke/gioitinhnam", (req, res, next) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const q = `SELECT nk.* FROM NhanKhau nk LEFT JOIN TamVang tv ON nk.id = tv.idNhanKhau WHERE (tv.idNhanKhau IS NULL OR tv.denNgay < '${currentDate}') AND nk.gioiTinh = 1 AND nk.trangThai != 'Đã qua đời'`;
    db.query(q, (err, data) => {
        if (err) {
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
        if (err) {
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
    const { tuoiMin, tuoiMax } = req.query;
    console.log(tuoiMin);
    const q = `SELECT nk.* FROM NhanKhau nk LEFT JOIN TamVang tv ON nk.id = tv.idNhanKhau WHERE (tv.idNhanKhau IS NULL OR tv.denNgay < '${currentDate}') AND ngaySinh >= DATE_SUB(CURRENT_DATE, INTERVAL ${tuoiMax} YEAR)
             AND ngaySinh <= DATE_SUB(CURRENT_DATE, INTERVAL ${tuoiMin} YEAR) AND nk.trangThai != 'Đã qua đời'`;
    db.query(q, (err, data) => {
        if (err) {
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

router.get("/thongke/tamvang/:date", (req, res, next) => {
    const date = req.params.date;
    const q = `SELECT COUNT(*) AS count FROM TamVang WHERE '${date}' BETWEEN tuNgay AND denNgay`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: `So nguoi TamVang tai thoi diem ${date}`,
                data: data
            })
        }
    })
});

router.get("/thongke/tamtru/:date", (req, res, next) => {
    const date = req.params.date;
    const q = `SELECT COUNT(*) AS count FROM TamTru WHERE '${date}' <= thoiGianTamTru`;
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: `So nguoi TamTru tai thoi diem ${date}`,
                data: data
            })
        }
    })
});

module.exports = router;