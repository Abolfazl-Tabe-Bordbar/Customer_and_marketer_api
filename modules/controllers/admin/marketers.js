const bcrypt = require('bcrypt');
let marketers_model = require("./../../database/models/marketers.js");
let customers_model = require("./../../database/models/customers.js");

class marketers {
    async show(req, res) {
        try {

            marketers_model.find({}, { _id: 1, first_name: 1, last_name: 1, username: 1, phone_number: 1 }).sort({ _id: -1 }).then(data => {
                if (data != null) {
                    res.json({
                        status: true,
                        body: data
                    });
                } else {
                    res.json({
                        status: true,
                        body: []
                    });
                }
            }).catch(error => {
                res.json({
                    status: false,
                    message: "خطا در دریافت اطلاعات"
                });
            });


        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در دریافت اطلاعات"
            });
        }
    }
    async show_customers(req, res) {
        try {
            marketers_model.findById({ _id: req.params.id }).then(data => {
                if (data != null) {
                    customers_model.find({ marketer_id: req.params.id }).then(data => {
                        if (data != null) {
                            res.json({
                                status: true,
                                body: data
                            })
                        } else {
                            res.json({
                                status: true,
                                body: []
                            })
                        }
                    }).catch(error => {
                        res.json({
                            status: false,
                            message: "خطا در دریافت اطلاعات"
                        })
                    })
                } else {
                    res.json({
                        status: false,
                        message: "چنین بازاریابی وجود ندارد"
                    })
                }
            }).catch(error => {
                res.json({
                    status: false,
                    message: "چنین بازاریابی وجود ندارد"
                })
            })

        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: 'خطای غیرمنتظره'
            });
        }
    }
    async add(req, res) {
        try {

            if (
                !req.body.first_name || (req.body.first_name.length < 2) ||
                !req.body.last_name || (req.body.last_name.length < 2) ||
                !req.body.username || (req.body.username.length < 2) ||
                !req.body.password || (req.body.password.length < 2) ||
                !req.body.phone_number || (req.body.phone_number.length < 2)
            ) {
                res.json({
                    status: false,
                    message: "اطلاعات ارسال شده دارای اعتبار لازم نیستند"
                });
            } else {
                marketers_model.findOne({
                    username: req.body.username,
                    phone_number: req.body.phone_number
                }).then((data) => {
                    if (data == null) {
                        marketers_model.create({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username: req.body.username,
                            phone_number: req.body.phone_number,
                            password: bcrypt.hashSync(req.body.password, 10)
                        }).then(data => {
                            res.json({
                                status: true,
                                message: "بازاریاب با موفقیت ساخته شد"
                            });
                        }).catch(error => {
                            res.json({
                                status: false,
                                message: "خطا در ایجاد بازاریاب جدید"
                            });
                        })
                    } else {
                        res.json({
                            status: false,
                            message: "چنین بازاریابی در سایت موجود است"
                        });
                    }
                }).catch((error) => {
                    res.json({
                        status: false,
                        message: "خطا در ایجاد بازاریاب جدید"
                    });
                })
            }



        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                body: [],
                message: 'خطای غیرمنتظره'
            });
        }
    }
    async update(req, res) {
        try {
            if (
                !req.body.first_name || (req.body.first_name.length < 2) ||
                !req.body.last_name || (req.body.last_name.length < 2) ||
                !req.body.username || (req.body.username.length < 2) ||
                !req.body.password || (req.body.password.length < 2) ||
                !req.body.change_password ||
                !req.body.phone_number || (req.body.phone_number.length < 2)
            ) {
                res.json({
                    status: false,
                    message: "اطلاعات ارسال شده دارای اعتبار لازم نیستند"
                });
            } else {
                if (req.body.change_password == 1) {
                    console.log(1);
                    marketers_model.findOneAndUpdate({ _id: req.params.id }, {
                        $set: {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username: req.body.username,
                            phone_number: req.body.phone_number,
                            password: bcrypt.hashSync(req.body.password, 10)
                        }
                    }).then(data => {
                        res.json({
                            status: true,
                            message: "اطلاعات با موفقیت ویرایش شد"
                        })
                    }).catch(error => {
                        res.json({
                            status: false,
                            message: "خطا در ویرایش اطلاعات"
                        });
                    });
                } else {
                    console.log(2);
                    marketers_model.findOneAndUpdate({ _id: req.params.id }, {
                        $set: {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            username: req.body.username,
                            phone_number: req.body.phone_number,
                        }
                    }).then(data => {
                        res.json({
                            status: true,
                            message: "اطلاعات با موفقیت ویرایش شد"
                        })
                    }).catch(error => {
                        res.json({
                            status: false,
                            message: "خطا در ویرایش اطلاعات"
                        });
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در ویرایش اطلاعات"
            });
        }
    }
    async delete(req, res) {
        try {
            marketers_model.findByIdAndDelete({ _id: req.params.id }).then(data => {

                if (data != null) {
                    res.json({
                        status: true,
                        message: "حذف بازاریاب با موفقیت انجام شد"
                    });
                } else {
                    res.json({
                        status: false,
                        message: "چنین بازاریابی در سایت موجود نیست"
                    })
                }
            }).catch(error => {
                console.log(error);
                res.json({
                    status: false,
                    message: "خطا در حذف بازاریاب"
                })
            })
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در حذف بازاریاب"
            })
        }
    }
}

module.exports = new marketers();