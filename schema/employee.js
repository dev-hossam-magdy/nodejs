const gql = require("apollo-server-express").gql

module.exports = gql`

    extend type Query {
        employee:[Emplpyee]
    }
    type Emplpyee {
        id:Int,
        name:String,
        email:String
        
    }
`