let marketers_model = require("./../../database/models/marketers.js");
let customers_model = require("./../../database/models/customers.js");

class customers {
    async show(req, res) {
        try {

            marketers_model.aggregate([
                {
                    $project: { first_name: 1, last_name: 1, phone_number: 1, }
                },
                {
                    $lookup: {
                        from: "customers",
                        localField: "_id",
                        foreignField: "marketer_id",
                        as: "marketer"
                    }
                }
            ]).then(data => {
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
            })


        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در دریافت اطلاعات"
            });
        }
    }

    async add(req, res) {
        try {

            if (
                !req.body.marketer_id || (req.body.marketer_id.length < 2) ||
                !req.body.phone_number || (req.body.phone_number.length < 2) ||
                !req.body.customer_brand || (req.body.customer_brand.length < 2) ||
                !req.body.address || (req.body.address.length < 2) ||
                !req.body.first_name || (req.body.first_name.length < 2) ||
                !req.body.last_name || (req.body.last_name.length < 2)
            ) {
                res.json({
                    status: false,
                    message: "اطلاعات ارسال شده دارای اعتبار لازم نیستند"
                });
            } else {
                marketers_model.findById({ _id: req.body.marketer_id }).then(data => {

                    customers_model.findOne({
                        phone_number: req.body.phone_number
                    }).then((data) => {
                        if (data == null) {
                            customers_model.create({
                                first_name: req.body.first_name,
                                last_name: req.body.last_name,
                                phone_number: req.body.phone_number,
                                marketer_id: req.body.marketer_id,
                                customer_brand: req.body.customer_brand,
                                address: req.body.address
                            }).then(data => {
                                res.json({
                                    status: true,
                                    message: "مشتری با موفقیت ساخته شد"
                                });
                            }).catch(error => {
                                res.json({
                                    status: false,
                                    message: "خطا در ایجاد مشتری جدید"
                                });
                            })
                        } else {
                            res.json({
                                status: false,
                                message: "چنین مشتری در سایت موجود است"
                            });
                        }
                    }).catch((error) => {
                        res.json({
                            status: false,
                            message: "خطا در ایجاد مشتری جدید"
                        });
                    })

                }).catch(error => {
                    res.json({
                        status: false,
                        message: "خطا در ایجاد مشتری جدید"
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
                !req.body.marketer_id || (req.body.marketer_id.length < 2) ||
                !req.body.phone_number || (req.body.phone_number.length < 2) ||
                !req.body.customer_brand || (req.body.customer_brand.length < 2) ||
                !req.body.address || (req.body.address.length < 2) ||
                !req.body.first_name || (req.body.first_name.length < 2) ||
                !req.body.last_name || (req.body.last_name.length < 2)
            ) {
                res.json({
                    status: false,
                    message: "اطلاعات ارسال شده دارای اعتبار لازم نیستند"
                });
            } else {

                customers_model.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    $set: {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone_number: req.body.phone_number,
                        marketer_id: req.body.marketer_id,
                        customer_brand: req.body.customer_brand,
                        address: req.body.address
                    }
                }).then(data => {
                    res.json({
                        status: true,
                        message: "اطلاعات با موفقیت ویرایش شد"
                    })
                }).catch(error => {
                    res.json({
                        status: false,
                        message: "خطا در ویرایش مشتری"
                    })
                })

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
            customers_model.findByIdAndDelete({ _id: req.params.id }).then(data => {

                if (data != null) {
                    res.json({
                        status: true,
                        message: "حذف مشتری با موفقیت انجام شد"
                    });
                } else {
                    res.json({
                        status: false,
                        message: "چنین مشتری در سایت موجود نیست"
                    })
                }
            }).catch(error => {
                console.log(error);
                res.json({
                    status: false,
                    message: "خطا در حذف مشتری"
                })
            })
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در حذف مشتری"
            })
        }
    }
}

module.exports = new customers();