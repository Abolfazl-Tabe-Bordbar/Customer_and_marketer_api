const jwt = require('jsonwebtoken');
const { admin_jwt } = require("../../../global_config");
const bcrypt = require('bcrypt');

const admin_model = require("./../../database/models/admins.js");

class admins {

    async login(req, res) {
        try {

            if (
                !req.body.username || (req.body.username.length < 2) ||
                !req.body.password || (req.body.password.length < 2)) {
                res.json({
                    status: false,
                    message: "اطلاعات ارسال شده دارای اعتبار لازم نیستند"
                });
            } else {

                admin_model.findOne({ username: req.body.username }).then(data => {
                    if (data == null) {
                        res.json({
                            status: false,
                            message: 'چنین مدیری در سایت وجود ندارد'
                        });
                    } else {
                        if (bcrypt.compareSync(req.body.password, data.password)) {
                            let token = jwt.sign({ admin_id: data._id, admin_first_name: data.first_name, admin_last_name: data.last_name, admin_username: data.username }, admin_jwt);
                            res.json({
                                status: true,
                                message: "ورود مدیر با موفقیت انجام شد",
                                token
                            });
                        } else {
                            res.json({
                                status: false,
                                message: "چنین مدیری در سایت وجود ندارد"
                            });
                        }
                    }
                }).catch(error => {
                    console.log(error);
                    res.json({
                        status: false,
                        message: 'خطای در عملیات ورود'
                    });
                })

            }




        } catch (error) {
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }

    async is_login(req, res) {
        try {

            res.json({
                status: true
            });


        } catch (error) {
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }

    async a(req, res) {

        try {

            let new_admin = {
                first_name: "abolfazl",
                last_name: "tabe bordbar",
                username: "abolfazlweb",
                password: "abolfazlweb",
            }

            let new_record = {
                first_name: "abolfazl",
                last_name: "tabe bordbar",
                username: "abolfazlweb",
                password: bcrypt.hashSync("abolfazlweb", 10),
            }

            admin_model.findOne({
                username: new_admin.username,
            }).then(data => {
                if (data == null) {
                    admin_model.create(new_record).then((data) => {
                        res.json({
                            status: true,
                            message: "مدیر با موفقیت ساخته شد"
                        });
                    }).catch((error) => {
                        res.json({
                            status: false,
                            message: "خطا در عملیات ساخت مدیر"
                        });
                    });
                } else {
                    if (bcrypt.compareSync(new_admin.password, data.password)) {
                        res.json({
                            status: true,
                            message: "چنین مدیری در سایت وجود دارد"
                        });
                    } else {
                        admin_model.create(new_record).then((data) => {
                            res.json({
                                status: true,
                                message: "مدیر با موفقیت ساخته شد"
                            });
                        }).catch((error) => {
                            res.json({
                                status: false,
                                message: "خطا در عملیات ساخت مدیر"
                            });
                        });
                    }
                }
            }).catch(error => {
                res.json({
                    status: false,
                    message: "خطا در عملیات ساخت مدیر"
                });
            })




        } catch (error) {
            res.json({
                status: false,
                message: "خطا در عملیات ساخت مدیر"
            });
        }

    }

}

module.exports = new admins();