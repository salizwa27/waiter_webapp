let express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const waitersApp = require('./waiters');
const flash = require('express-flash');
const session = require('express-session');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://salizwa:salizwa123@localhost:5432/waiters';

const pool = new Pool({
    connectionString
  });

let app = express();
var waiter = waitersApp(pool)


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(session({
    secret : "<add a secret string here>",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());

app.get('/', async function (req, res) {

   

    res.render('home');
});

app.get('/waiters/:username', async function (req, res){

    var name = req.body.username

    var display = await waiter.getWaiter(name)
    var getDays = await waiter.getDay()

    res.render('waiters', {
       name: display,
       weekdays: getDays,
       username: name
    })
})

app.post('/waiters/:username', async function (req, res){

    var name = req.body.username
    var workdays = req.body.days

    await waiter.getDay(username)
    await waiter.insertShift(waiterId, dayId)

    // if(name === ""){
    //     req.flash("info", "please enter your name")
    // }


    res.render('/waiters/' + username)
})

app.get('/days', function (req, res){
    res.render('admin')
})


let PORT = process.env.PORT || 3027;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});