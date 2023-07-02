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

router.post("/tach", (req, res, next) => {
    const { soHoKhau, khuVuc, diaChi, ngayLap, idNhanKhau } = req.body;
    const idChuHoMoi = idNhanKhau[0];
    const idNhanKhauValues = idNhanKhau.join(',');
    const q = `INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES ('${soHoKhau}', '${khuVuc}', '${diaChi}', '${ngayLap}', '${idChuHoMoi}'); SELECT * FROM HoKhau WHERE id = LAST_INSERT_ID(); UPDATE NhanKhau SET idHoKhau = LAST_INSERT_ID() WHERE id IN (${idNhanKhauValues})`;
    db.query(q, (err, results) => {
        if (err) {
            return res.json(err);
        } else {
            const hoKhau = results[1][0]; // Lấy thông tin hộ khẩu từ kết quả truy vấn SELECT
            return res.json({
                success: true,
                message: "Tach HoKhau thanh cong",
                data: hoKhau, // Trả về thông tin hộ khẩu vừa được truy vấn
            });
        }
    });
});

router.post("/thaydoi/:id", (req, res, next) => {
    const id = req.params.id;
    var thongTinThayDoi = "";
    var thayDoiTu = "";
    var thayDoiThanh = "";
    var ngayThayDoi = "";

    const {soHoKhau, khuVuc, diaChi, ngayLap, idChuHo} = req.body;
    const oldQuery = `SELECT * FROM HoKhau WHERE id = ${id}`;
    db.query(oldQuery, (error, result) => {
        if(error) {
            return res.json(error);
        }
        else {
            const oldData = JSON.parse(JSON.stringify(result[0]));
            ngayThayDoi = ngayLap;
            if (khuVuc !== oldData.khuVuc) {
                thongTinThayDoi = `Chuyển đến khu vực ${khuVuc}`;
                thayDoiTu = oldData.khuVuc;
                thayDoiThanh = khuVuc;
            }

            if(diaChi !== oldData.diaChi) {
                thongTinThayDoi = `Chuyển đến địa chỉ ${diaChi}`;
                thayDoiTu = oldData.diaChi;
                thayDoiThanh = diaChi;
            }

            if (idChuHo !== oldData.idChuHo) {
                thongTinThayDoi = `Thay đổi chủ hộ`;
                thayDoiTu = oldData.idChuHo;
                thayDoiThanh = idChuHo;
            }

            if (soHoKhau !== oldData.soHoKhau) {
                thongTinThayDoi = `Thay đổi số hộ khẩu`;
                thayDoiTu = oldData.soHoKhau;
                thayDoiThanh = soHoKhau;
            }

            const q = `UPDATE HoKhau SET soHoKhau = '${soHoKhau}', khuVuc = '${khuVuc}', diaChi = '${diaChi}', ngayLap = '${ngayLap}', idChuHo = ${idChuHo} WHERE id = ${id}; INSERT INTO ThayDoiHoKhau (nguoiThayDoi, thongTinThayDoi, thayDoiTu, thayDoiThanh, ngayThayDoi, idHoKhau) VALUES ('shy', '${thongTinThayDoi}', '${thayDoiTu}', '${thayDoiThanh}', '${ngayThayDoi}', '${idChuHo}')`;
            db.query(q, (err, data) => {
                if(err) {
                    return res.json(err);
                }
                else {
                    data["id"] = id;
                    return res.json({
                        success: true,
                        message: "Thay doi thong tin HoKhau thanh cong",
                        data: {
                            "id": id,
                            "soHoKhau": soHoKhau,
                            "khuVuc": khuVuc,
                            "diaChi": diaChi,
                            "ngayLap": ngayLap,
                            "idChuHo": idChuHo,
                        }
                    })
                }
            })
        }
    });
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

router.get("/thaydoi/hokhau", (req, res, next) => {
    const q = "SELECT * FROM `ThayDoiHoKhau`";
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            return res.json({
                success: true,
                message: "Thong tin bang ThayDoiHoKhau",
                data: data
            })
        }
    })
});

module.exports = router;