const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

url = "mongodb://localhost:27017/wikiDB";
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articleSchema = mongoose.Schema({
    title : String,
    content : String
});

const Article = mongoose.model("Article", articleSchema);

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/articles", function(req, res){

    Article.find(function(err, articles_found){
        if(!err){
            res.send(articles_found);
        }
        else{
            res.send(err);
        }
    })
})


app.post("/articles", function(req,res){
    console.log(req.body.title);
    console.log(req.body.content); 

    const title_recieved = req.body.title;
    const content_recieved = req.body.content;

    const article = Article({
        title : title_recieved,
        content : content_recieved
    });

    article.save(function(err){
        if(err){
            rer.send(err);
        }
        else{
            res.send("successfully added articles");
        }
    });

})

app.delete("/articles", function(req, res){

    Article.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all articles");
        }
        else{
            res.send(err);
        }
    })
})







app.listen(3000, function() {
  console.log("Server started on port 3000");
});