var express = require('express')
var router = express.Router()
const { HomePage,Login, Signup, loginAction, Logout } = require("../controller/AccountController");
const { body, validationResult, check } = require('express-validator');
const isAuth = require("../middleware/auth");
const {Inbox, OutBox}  = require("../controller/MainController");
require('express-group-routes');

router.get('/', HomePage)

router.post("/",[
    check("email").isEmail(),
    check("fname").isAlpha(),
    check("contact").isLength({max:10})
],Signup);

router.get("/login",Login);
router.post("/login",loginAction);

router.group((route)=>{
    route.use(isAuth);
    route.get('/inbox', Inbox)
    route.get('/outbox', OutBox)
    route.get("/logout",Logout);
})

module.exports = router