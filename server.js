// load modules
const express = require('express')
const path = require('path')
const session = require('express-session')
const routes = require('./controller/index')
const exphbs = require('express-handlebars')
require('dotenv').config()

// load passport
const passport = require('./config/passport')




// import sequelize connection
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)


// set up express PORT
const app = express()
const PORT = process.env.PORT || 3001

// create sessions
const sess = {
    // key to sign the cookie
    secret: 'SECRET',
    cookie: { maxAge: 36000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

// session middleware
app.use(session(sess))

// set up passport
app.use(passport.initialize())
app.use(passport.session())

// set handlebars engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening http://localhost:" + PORT))
})