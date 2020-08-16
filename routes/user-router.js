const router = require("express").Router()

const userModule = require("../controllers/user-controller")
const middleWare = require("../functions/middlewares")
const  tableCulomns = ["username","password"]

router.post("/user/add",middleWare.checkMissingData(tableCulomns),userModule.addUser)
router.post("/user/login",middleWare.checkMissingData(tableCulomns),userModule.login)
router.get("/user/async",userModule.async)
router.get("/user/promissis",userModule.promissis)




module.exports = router;

