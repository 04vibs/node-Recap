const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('connected to mongodb...'))
.catch(()=>console.log('could not connect to MongoDb...',err));

// Schema
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});


// Classes, objects
// Course, nodeCourse
//classes Pascal case
const Course = mongoose.model('Course',courseSchema);
// objects camelCase Notation

async function createCourse(){
   
    const course = new Course({
        name:'Angular Course',
        author: 'Puri',
        tags: ['angular','frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();

