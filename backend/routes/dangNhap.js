const express = require('express');
const router = express.Router();
const db = require("../connect_db");

router.post("/", (req, res, next) => {
    const {userName, passWord} = req.body;
    const q = `SELECT * FROM NguoiDung WHERE username = '${userName}' AND password = '${passWord}'`;    
    db.query(q, (err, data) => {
        if(err) {
            return res.json(err);
        }
        if(data.length > 0) {
            return res.json({
                success: true,
                message: "Thong tin nguoi dung",
                data: {
                    "username": userName,
                    "role": data[0].role
                }
            });
        }
        else {
            return res.json({
                success: false,
                message: "Khong tim thay nguoi dung",
                data: []
            });
        }
    })
});

module.exports = router;