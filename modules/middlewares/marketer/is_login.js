const { marketer_jwt } = require("./../../../global_config");
const jwt = require('jsonwebtoken');
const marketer_model = require("./../../database/models/marketers.js")

module.exports = (req, res, next) => {


    let marketer_token = req.headers.cookies ? req.headers.cookies : "";

    jwt.verify(marketer_token, marketer_jwt, async function (err, decoded) {
        if (!err && decoded.marketer_id && decoded.marketer_first_name && decoded.marketer_last_name) {


            marketer_model.findOne({
                _id: decoded.marketer_id,
                first_name: decoded.marketer_first_name,
                last_name: decoded.marketer_last_name,
            }).then(data => {
                if (data != null && data._id) {
                    req.marketer_id = decoded.marketer_id;
                    next();
                } else {
                    res.json({
                        status: false,
                        message: "دسترسی به این قسمت فقط برای بازاریاب های  سایت امکان پذیر است"
                    })
                }
            }).catch(error => {
                res.json({
                    status: false,
                    message: "دسترسی به این قسمت فقط برای بازاریاب های سایت امکان پذیر است"
                })
            });



        } else {
            res.json({
                status: false,
                message: "دسترسی به این قسمت فقط برای بازاریاب های سایت امکان پذیر است"
            })
        }
    });

}