const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const { check, validationResult } = require('express-validator');

const app = express();

app.engine('hbs', expressHbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', 
    check('email', 'Please use a correct email address.').isEmail(),
    check('password', 'Please pick a password with a minimum of 6 characters.').isLength({min: 6}),

    (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            console.log(errors);
            return res.status(422).render('index', { 
                pageTitle: 'Validation - Assignment 6',
                error: errors.array()[0].msg
            });
        }

        res.send('Correct data!');
    });

app.get('/', (req, res, next) => {
    res.render('index', { pageTitle: 'Validation - Assignment 6' });
});

app.listen(3000);
