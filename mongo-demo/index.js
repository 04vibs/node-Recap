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

async function getCourses(){

    const pageNumber = 2;
    const pageSize = 10; 
    

// comparison operators in mongodb
    // eq(equal)
    // ne(not equal)
    // gt(greater than)
    // gte(greater than or equal to)
    // lt(less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)


    // logical operators 
    // or 
    // and

    const courses = await Course
    
    // .find({ author:'Mosh',isPublished: true})
    
    // logical operators
    //     .find()
    //     .or([{author:'Puri'},{isPublished: true}])

    // comparison operators
    //.find({price: {$gte: 10, $lte: 20} })
   // .find({price:{$in:[10,15,20] } })
    
   // Regular expressions
   // starts with Mosh
   .find({author: /^Mosh/})

   //Ends with Hamedani 
   // i for case senstivity
   .find({author: /Hamedani$/i})
   
   // contains Mosh
    .find({author: /.*Mosh.*/i})
   
        .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .count()
   // .select({name:1 , tags: 1});

    console.log(courses);
}
// createCourse();
getCourses();
