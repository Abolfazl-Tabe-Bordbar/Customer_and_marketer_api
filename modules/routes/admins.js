const express = require("express");
const router =  express.Router();
const admin_controller = require("./../controllers/admin/admin.js");
const customers_controller = require("./../controllers/admin/customers.js");
const marketers_controller = require("./../controllers/admin/marketers.js");
const check_login = require("./../middlewares/admin/is_login.js");

router.get("/create_admin",admin_controller.a.bind(admin_controller));

// routes for admin -----------------------------------
router.post("/login",admin_controller.login.bind(admin_controller));
router.get("/is_login",check_login,admin_controller.is_login.bind(admin_controller));
// -----------------------------------------------------


// routes for customers ---------------------------------
router.get("/customers",check_login,customers_controller.show.bind(customers_controller));
router.post("/customers",check_login,customers_controller.add.bind(customers_controller));
router.put("/customers/:id",check_login,customers_controller.update.bind(customers_controller));
router.delete("/customers/:id",check_login,customers_controller.delete.bind(customers_controller));
// -----------------------------------------------------

// routes for marketer ---------------------------------
router.get("/marketers",check_login,marketers_controller.show.bind(marketers_controller));
router.get("/marketer_customer/:id",check_login,marketers_controller.show_customers.bind(marketers_controller));
router.post("/marketers",check_login,marketers_controller.add.bind(marketers_controller));
router.put("/marketers/:id",check_login,marketers_controller.update.bind(marketers_controller));
router.delete("/marketers/:id",check_login,marketers_controller.delete.bind(marketers_controller));
// -----------------------------------------------------



module.exports = router;
