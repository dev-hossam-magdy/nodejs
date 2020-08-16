
exports.getDepartmentEmployees =(request, response)=>{

    const knex = request.app.locals.knex
    let id = request.params.id
    id = +id
    knex.select("department.name ", "employees.name" , "employees.salary" )
        .from("employees")
        .join("department",function () {
            this.on("employees.department_id", "=" ,"department.id")
                .andOn("department.id" ,"=",id)

        })
        .then(data =>{
            response.status(200).json(data)
        })
        .catch(err=>{
            response.status(500).json(err)
        })

}