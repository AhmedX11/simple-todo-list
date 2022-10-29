const bodyParser = require("body-parser");
const express = require('express');
const date = require('./helpers/date');

// Create express ap
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

// Specifying public to be static folder so all our css or images will be put there 
// and we can use, for example css/StyleSheet.css to include them 
app.use(express.static("public"));

let todos = [];
let workTodos = [];

//Listen on port
app.listen(3000, () => {
    console.log('server is running on port 3000');
});

app.get('/', (req, res) => {
    let day = date.getDay();
    res.render('list', { day: day, newListItem: todos})
 
});

app.get('/work', (req, res) => {
    res.render('list', { day: "Work", newListItem: workTodos })
});

app.post('/', (req, res, body) =>{
    if(req.body.list.toLowerCase() === "work"){
        workTodos.push(req.body.newTodo)
        res.redirect('/work');
    }
    else{
        todos.push(req.body.newTodo);
        res.redirect('/');
    }

})

