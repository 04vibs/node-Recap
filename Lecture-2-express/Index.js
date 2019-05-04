const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authentication = require('./Authentication');
const express = require('express');
const app = express();
const courses = require('./ROUTES/courses');
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.urlencoded({extended: true})); // key = value & key=value
app.use(express.static('public'));
app.use(express.json());
app.use(logger)
app.use(authentication);
app.use(helmet());
app.use('/api/courses',courses);
//configuration
// console.log('Applicaton Name:'+ config.get('name'));
// console.log('Mail Server: '+config.get('mail.host'))
// console.log('Mail password: '+config.get('mail.password'));

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}

//Port
const port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
});