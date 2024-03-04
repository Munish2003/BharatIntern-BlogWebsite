const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
mongoose.connect('mongodb://127.0.0.1:27017/Blog')
.then(()=>{
    console.log("Connected to the database");
})
.catch((e)=>{
    console.log("Error in database connection!!");
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', {  articles })
})

app.use('/articles', articleRouter)

app.listen(3000)