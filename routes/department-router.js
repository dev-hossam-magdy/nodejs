const router = require("express").Router()

const deptModule = require("../controllers/department-controller")
const middleWare = require("../functions/middlewares")
const  tableCulomns = ["name"]


router.get("/department/:id/emp",middleWare.checkInt() ,deptModule.getDepartmentEmployees)
router.get("/dept",(reqest,response)=>{
    response.send("eloow dept")
})



module.exports = router;

