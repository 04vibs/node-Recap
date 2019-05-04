const express = require('express');
const Joi = require('joi');
const router = express.Router();

const courses = [
    {id:1,name: 'course1'},
    {id:2,name: 'course2'},
    {id:3,name: 'course3'},
 ];

 

router.get('/',(req,res)=>{
    res.send(courses);
});

router.post('/',(req,res)=>{
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

router.get('/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id is not found')
    res.send(course)
});

router.get('/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});


router.put('/:id',(req,res)=>{
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

router.delete('/:id',(req,res)=>{
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


module.exports = router;