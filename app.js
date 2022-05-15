//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "This is Kayen's personal blog site!! Feel free to take a look, I made this as part of a web development bootcamp I am doing. I am currently working at Scotiabank as an automation developer and am super happy! Can't wait to see where I go, I'm truly so excited. Check out the about page for instructions on how to make a post.";
const aboutContent = "This is a personal blog website that I (Kayen) made to learn about EJS, Express and other modules within node.js. To use this site, enter the domain (ex. localhost:3000) to go to the home and see the posts, to make a post add the path /posts/compose to the url. To see any post you can click read more! Hope you enjoy!!!!";
const contactContent = "You can contact me at my linkedIn: https://www.linkedin.com/in/kayen-mehta/ or shoot me an email at k47mehta@uwaterloo.ca";

let posts = []; //array to store the user's posts

const app = express();

app.set('view engine', 'ejs'); //lets you use ejs templates

app.use(bodyParser.urlencoded({extended: true})); //lets you get data from forms using the body parser module
app.use(express.static("public")); //lets us reference any static files that we want server to include (ex images, css, pages, audio clips)

app.get("/", function(req, res){

  res.render("home", {
    startingContent: homeStartingContent, //"startingContent" is variable name in ejs file which will be given value of homeStartingContent
    postsArray: posts                     //send the posts (array of objects) data to the ejs page we are loading
  });

});

app.get("/about", function(req, res){ //this will be rendered when "locolhost:3000/about" is called
  res.render("about", {content: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {content: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){ //grabs the users input from compose.ejs page

  const post = { //save the text input responses in the JS object
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post); //add new post to the posts array of all the posts
  res.redirect("/"); //go back to home page's get call

});

//below we use Express module's routing feature to dynamically respond to webpage url path requests
//lets you tap into whatever the user inputs in search route after /posts/ and capture it, making it a dynamic url

app.get("/posts/:postName", (req, res) => { //note the : before the paramater we want to capture

  let requestedPostTitle = req.params.postName; //capture the url route input

  requestedPostTitle = _.lowerCase(requestedPostTitle); //makes the string lowercase and turns dahes to spaces (using lodash module)

  posts.forEach((post) => {     //loops through all posts in array, note: "post" is just a placeholder element representing the singular of the array
    const storedTitle = _.lowerCase(post.title) //this post title item of the current iteration we are looping through in array of all posts

    if (requestedPostTitle === storedTitle){
      res.render("post", {
        postTitle: post.title,
        postBody: post.content
      });
    };

  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
