
const gql = require("apollo-server-express").gql

const employeeSchema = require("./employee")

const linkSchema = gql `

    type Query {
        _:Boolean
    }
`;


module.exports = [linkSchema , employeeSchema]