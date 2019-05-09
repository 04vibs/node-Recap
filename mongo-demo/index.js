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
    
    //logical operators
        .find()
        .or([{author:'Puri'},{isPublished: true}])

    // comparison operators
    //.find({price: {$gte: 10, $lte: 20} })
   // .find({price:{$in:[10,15,20] } })
    .limit(10)
    .sort({name: 1})
    .select({name:1 , tags: 1});

    console.log(courses);
}
// createCourse();
getCourses();
