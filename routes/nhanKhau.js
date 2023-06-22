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

module.exports = router;