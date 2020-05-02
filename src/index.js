const express=require('express')

const app=express()

const mainRouter=require('./main')

app.use('/api',mainRouter)


module.exports=app