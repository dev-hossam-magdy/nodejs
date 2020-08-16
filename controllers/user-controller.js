const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.addUser = (request, response) => {

    const knex = request.app.locals.knex
    const payload = request.body

    bcrypt.genSalt(10, (error, salt) => {

        bcrypt.hash(payload.password, salt, (error, hash) => {
// cc
            payload.password = hash
            knex("users")
                .insert(payload)
                .then(data => {
                    response.status(200).json("user is created")

                })
                .catch(error => {
                    response.status(500).json(error)
                })
        })
    })

}


exports.login = (request, response) => {
    const knex = request.app.locals.knex
    const payload = request.body

    knex("users")
        .select("password")
        .where({username: payload.username})
        .then(result => {
            if (result != null) {
                bcrypt.compare(payload.password, result[0].password, (error, hashResult) => {
                    if (hashResult) {
                        console.log("user auth")

                        const tokenPayload = {
                            username: payload.username,
                            isAdmin: true
                        };

                        // process.env.secret
                        const secret = "s3cr3t"
                        const expiresIn = 3600
                        const token = jwt.sign(tokenPayload, secret, {expiresIn})

                        response.status(200).json(token)
                    } else {
                        response.status(200).json({msg: "not auth user"})
                    }
                })
            } else {
                response.status(200).json("invalid user name")
            }
        })
        .catch(error => {
            response.status(500).json(`invalid user name ${error}`)
        })

}

exports.async = (request ,response)=>{

    const tes = async (str)=>{
        arr = ["0","1","2"]
        await arr.forEach((data, index) => {
            str = str +  "user : " +data

        })

        return str
    }
    const f1 =async ()=>{
      return  await tes("test").then(data =>  tes(data +":ayhaga") )

    }
    f1().then( data => response.status(200).json(data))


}

exports.promissis =(request ,response)=>{
    const  p = new Promise((resolve , reject)=>{
        arr = ["0","1","2"]
        let str = ""
        arr.forEach((data, index) => {
            str = str +  "user : " +data

        })

        a = 1+1
        if (a === 2)
            resolve(`good job ${str}` )
        else
            reject("bad")
    })

    let myMsg = ""
    p.then((message)=>{
        myMsg = message +" in first then block "

    }).then(msg =>{
        response.status(200).json(myMsg)

    }).catch(msg =>{
        response.status(200).json(msg)
    })

}