const jwt = require('jsonwebtoken');
const { marketer_jwt } = require("../../../global_config");
const bcrypt = require('bcrypt');
const marketer_model = require("./../../database/models/marketers.js");

class marketer {


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

                marketer_model.findOne({ username: req.body.username }).then(data => {

                    if (data != null && bcrypt.compareSync(req.body.password, data.password)) {

                        let token = jwt.sign({ marketer_id: data.id, marketer_first_name: data.first_name, marketer_last_name: data.last_name }, marketer_jwt);

                        res.json({
                            status: true,
                            message: "عملیت ورود با موفقیت انجام شد",
                            token,
                        });

                    } else {
                        res.json({
                            status: false,
                            message: "چنین بازاریابی در سایت موجود نیست",
                        });
                    }


                }).catch(error => {
                    console.log(error);
                    res.json({
                        status: false,
                        message: "خطا در عملیات ورود لطفا دوباره امتحا کنید",
                    });
                })


            }




        } catch (error) {
            console.log(error);
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



}

module.exports = new marketer();