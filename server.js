const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');



app.use((req , res , next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} and ${req.url}`
  console.log(log);
  fs.appendFile('sample.txt' , log + '\n' , (err) => {
    if(err) {
      console.log('Unable to append');
    }
  });

  next();
});

app.use((req , res , next) => {
  res.render('maintenance.hbs');
});


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('hari' , () => {
  return new Date().getFullYear()
}) ;

hbs.registerHelper('callIt' , (text) => {
  return text.toUpperCase();
});

app.get('/' , (req , res) => {
  // res.send('<h1>Hello HR</h1>');
  res.render('welcome.hbs' , {
    name : 'Mahendra' ,
    //year : new Date().getFullYear() ,
    welcomeStr : 'Welcome to my website1'
  });
});


app.get('/about' , (req , res) => {
  // res.send('This shows up info about page');
  res.render('abt.hbs' , {
    name : 'Mahendra Singh Dhoni' ,
    //year : new Date().getFullYear()
  });
});


app.get('/bad' , (req , res) => {
  res.send({
    errorMessage : 'Unable to process request'
  });
});

app.listen(3000 , () => {
  console.log('App is listening on port : 3000');
});
