const baseUrl = "http://localhost:3000/api"
const fetch = require("node-fetch")

module.exports ={
    Query:{
        employee:async ()=>{
            // call the api here

            return await fetch(`${baseUrl}/emp/list`).then(response => response.json())
        }
    }
}