const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const authentication = require('./Authentication');
const express = require('express');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.use(express.urlencoded({extended: true})); // key = value & key=value
app.use(express.static('public'));
app.use(express.json());
app.use(logger)
app.use(authentication);
app.use(helmet());

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
}
const courses = [
   {id:1,name: 'course1'},
   {id:2,name: 'course2'},
   {id:3,name: 'course3'},
];

app.get('/',(req,res)=>{
    res.send('Hello world');
});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.post('/api/courses',(req,res)=>{
   

    const {error} = validateCourse(req.body); //destructuring
    //validate
    // Id invalid,return 400 - bad request
    if(error){
        // 400 bad request
       return res.status(400).send(error.details[0].message);
        
    }
   
    const course = {
        id:courses.length +1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id is not found')
    res.send(course)
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});


app.put('/api/courses/:id',(req,res)=>{
    // Look up the course
    //If not existing, return 404
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course)return res.status(404).send('The course with the given id is not found')
    
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); //destructuring
    //validate
    // Id invalid,return 400 - bad request
    if(error){
        // 400 bad request
        return res.status(400).send(error.details[0].message);
        
    }
    //update course
    course.name = req.body.name;

    //Return the updated course
    res.send(course);
})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
   
}

app.delete('/api/courses/:id',(req,res)=>{
   // Look up the course 
   // Not existing, return 404
   const course = courses.find(c=>c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given id is not found')
   
   //Delete
   const index = courses.indexOf(course);
   courses.splice(index,1);

   //Return the same course
   res.send(course);
})


//Port
const port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}...`)
});