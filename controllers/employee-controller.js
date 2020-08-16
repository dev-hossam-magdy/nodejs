const tableName ="employees"

exports.selectAllEmployees = (request, response) => {
    const knex = request.app.locals.knex

    // console.log(request.decoded)
    knex.select("*")
        .from(`${tableName}`)
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            console.log(`selectAllEmployees: error: ${error}`)
            response.status(500).json(error)

        })

}


exports.selectOneEmployee = (request, response) => {
    const knex = request.app.locals.knex
    const id = request.params.id

    knex.select("*")
        .from("employees")
        .where({id: `${id}` , name:"Hossam Magdy"})
        .then(data => {
            response.status(200).json(data[0])
        })
        .catch(error => {
            console.log(`selectAllEmployees: error: ${error}`)
            response.status(500).json(error)

        })

}


exports.addEmployee = (request, response) => {
    const knex = request.app.locals.knex
    const payload = request.body
    knex("employees")
        .insert(payload)
        .then(queryResponse => {
            response.status(200).json({message: "emp created"})
        })
        .catch(error => {
            response.status(500).json(error)
        })

}


exports.updateEmployee = (request, response) => {
    const knex = request.app.locals.knex
    const id = request.params.id
    const payload = request.body
    knex("employees")
        .where({id: `${id}`})
        .update(payload)
        .then(result => {
            if (result) {
                response.status(200).json("emp is updated")
            } else {
                response.status(400).json("invalid data")
            }

        })
        .catch(err => {
            response.status(200).json(err)
        })

}


exports.deleteEmployee = (request, response) => {
    const knex = request.app.locals.knex
    const id = request.params.id
    const payload = {is_deleted: 1, is_active: 0}
    var arr = []
    knex("employees")
        .where({id: `${id}`})
        .update(payload)
        .then(result => {
            if (result) {
                response.status(200).json("emp is deleted")
            } else {
                response.status(400).json("invalid data")
            }
        })
        .catch(err => {
            response.status(200).json(err)
        })
}

