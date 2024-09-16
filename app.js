const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const Activity = require('./models/activities')
const User = require('./models/users')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/UnboreMe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static("./public"))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

app.use(passport.session())
app.use(passport.initialize())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/activities', async (req, res) => {
    const activity = await Activity.find({})
    res.render('activities', { activity })
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err)
            res.redirect('/')
        })
    } catch (e) {
        res.redirect('register')
    }

})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    res.redirect('/')
})

app.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    })
})

app.get('/view', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})