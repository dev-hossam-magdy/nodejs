const express = require("express")

const app = express()

const morgan = require('morgan');
const bodyparser = require('body-parser');
const envVar= require("./env-var")

const knex = require("knex")({
    client:"mysql",
    connection:envVar.database
})

const apolloServer = require('apollo-server-express').ApolloServer

const schema = require("./schema")
const resolvers = require("./resolvers")

const graphQLServer = new apolloServer({
    typeDefs:schema,
    resolvers:resolvers
})
graphQLServer.applyMiddleware({app})


const empRouter = require("./routes/employee-router")

const deptRouter = require("./routes/department-router")
const userRouter = require("./routes/user-router")




app.use(morgan('dev')); // to developer middel ware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Content-Type,authorization,Accept-Language');



    if(req.method === 'OPTIONS')
    {
        res.header("Access-Control-Allow-Methods",'Put,Post,Patch,Delete,Get,put');
        return res.status(200).json({});
    }

    next();

});


app.locals.knex = knex


app.use("/api",empRouter)
app.use("/api",deptRouter)
app.use("/api",userRouter)



//





app.use((req , res , next)=>{

    const error = new Error('not found');
    error.status = 404;
    next(error);

})






app.use((error ,req, res , next)=>{

    res.status(error.status || 500);
    //if(error)	throw error;
    console.log(error)
    if (error.status == 404 )
        res.json({
            error:{
                message: `not found 404`
            }


        });
    // console.log(error);


    else
        res.json({
            error: {
                massage: "other error ayhaga ",
                err:error.massage

            }

        });

})




module.exports = app ;
