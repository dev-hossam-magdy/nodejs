
function checkInt() {

    return (request, response, next) => {
        const id = +request.params.id

        console.log(`the id is ${id}`)
        if (Number.isInteger(id)) {
            next();
        } else {
            response.status(400).json("id must be integer")
        }
    }
}


function checkMissingData(mandatoryColumns) {

    return (request, response, next) => {
        const payload = request.body

        // const mandatoryColumns = ["name", "salary","department_id","email"]
        const payloadKeys = Object.keys(payload)

        const mandatoryColumnsExists = mandatoryColumns.every(mc => payloadKeys.includes(mc))
        console.log(`mandatoryColumnsExists : ${mandatoryColumnsExists}`)
        if (mandatoryColumnsExists) {
            next()
        } else {
            response.status(400).json("missing Data")
        }

    }

}


function checkAuth() {

    return (request, response, next) => {
        const jwt = require("jsonwebtoken")
        const authorization = request.headers.authorization
        console.log(authorization)
        if (authorization) {
            const token = authorization.split(" ")[1]
            const secret = "s3cr3t"
            jwt.verify(token, secret,{} ,(error, decodedToken) => {

                if (error) {
                    response.status(401).json(`authentication error ${error}`)

                } else {
                    request.decoded = decodedToken
                    next()

                }

            })

        } else {

            response.status(403).json("no token provided")
        }

    }
}


module.exports = {
    checkMissingData,
    checkInt,
    checkAuth

}