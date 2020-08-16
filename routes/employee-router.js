const router = require("express").Router()

const empModule = require("../controllers/employee-controller")
const middleWare = require("../functions/middlewares")
const  tableCulomns = ["name", "salary","department_id","email"]

const  tableDeleteCulomns = ["is_deleted", "is_active"]

// router.get("/emp/list", middleWare.checkAuth(),empModule.selectAllEmployees)
router.get("/emp/list",empModule.selectAllEmployees)
router.get("/emp/:id",middleWare.checkInt(),empModule.selectOneEmployee)
router.post("/emp/create", middleWare.checkMissingData(tableCulomns) , empModule.addEmployee)
router.post(
    "/emp/update/:id",
    middleWare.checkInt() ,
    middleWare.checkMissingData(tableCulomns) ,
    empModule.updateEmployee)

router.post("/emp/delete/:id", middleWare.checkInt() , empModule.deleteEmployee)


module.exports = router;

