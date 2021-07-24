const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

url = "mongodb+srv://admin:admin@cluster0.bibps.mongodb.net/wikiDB";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.route("/articles")
    .get(function (req, res) {

        Article.find(function (err, articles_found) {
            if (!err) {
                res.send(articles_found);
            } else {
                res.send(err);
            }
        })
    })
    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);

        const title_recieved = req.body.title;
        const content_recieved = req.body.content;

        const article = Article({
            title: title_recieved,
            content: content_recieved
        });

        article.save(function (err) {
            if (err) {
                rer.send(err);
            } else {
                res.send("successfully added articles");
            }
        });

    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        })
    });



app.route("/articles/:atricleTitle")
    .get(function (req, res) {
        Article.findOne({
            title: req.params.atricleTitle
        }, function (err, itemFound) {
            if (!err) {
                res.send(itemFound);
            } else {
                res.send(err);
            }
        })
    })
    .put(function (req, res) {
        Article.update({
                title: req.params.atricleTitle
            }, {
                title: req.body.title
            }, {
                overwrite: true
            },
            function (err) {
                if (!err) {
                    console.log("success");
                    res.send("success!")
                } else {
                    console.log(err);
                    res.send(err);
                }
            })
    })

    .patch(function(req, res){

        Article.update({
            title : req.params.atricleTitle
        },
        {
            $set: req.body
        },
        function(err){
            if(!err){
                res.send("Success");
            }
            else{
                res.send(err);
            }
        })
    })
    
    .delete(function(req, res){
        Article.deleteOne({title :req.params.atricleTitle}, function(err){
            if(!err){
                res.send("Delete Successful");
            }
            else{
                res.send(err);
            }
        })
    });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});