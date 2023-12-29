const express = require("express");
const router =  express.Router();
const marketer_controller = require("./../controllers/marketer/marketer.js");
const customers_controller = require("./../controllers/marketer/customers.js");
const check_login = require("./../middlewares/marketer/is_login.js")

// routes for marketers ---------------------------------
router.post("/login",marketer_controller.login.bind(marketer_controller));
router.get("/is_login",check_login,marketer_controller.is_login.bind(marketer_controller));
// -----------------------------------------------------

// routes for customers ---------------------------------
router.get("/customers",check_login,customers_controller.show.bind(customers_controller));
router.post("/customers",check_login,customers_controller.add.bind(customers_controller));
router.put("/customers/:id",check_login,customers_controller.update.bind(customers_controller));
router.delete("/customers/:id",check_login,customers_controller.delete.bind(customers_controller));
// -----------------------------------------------------


module.exports = router;