const { admin_jwt } = require("./../../../global_config");
const jwt = require('jsonwebtoken');
const admin_model = require("./../../database/models/admins.js");


module.exports = (req,res,next) => {


    let admin_token = req.headers.cookies ? req.headers.cookies : "";

    jwt.verify(admin_token, admin_jwt , async function(err, decoded) {
        if (!err && decoded.admin_id && decoded.admin_first_name && decoded.admin_last_name && decoded.admin_username) {
            
            admin_model.findOne({
                _id : decoded.admin_id,
                first_name : decoded.admin_first_name,
                last_name : decoded.admin_last_name,
                username : decoded.admin_username,
            }).then(data => {
                
                if (data != null) {
                    req.admin_id = decoded.admin_id;
                    next();
                }else{
                    res.json({
                        status : false,
                        message : "دسترسی به این قسمت فقط برای مدیران سایت امکان پذیر است"
                    })
                }
            }).catch(error => {
                console.log(error);
                res.json({
                    status : false,
                    message : "دسترسی به این قسمت فقط برای مدیران سایت امکان پذیر است"
                })
            })


        } else {
            res.json({
                status : false,
                message : "دسترسی به این قسمت فقط برای مدیران سایت امکان پذیر است"
            })
        }
    });

}