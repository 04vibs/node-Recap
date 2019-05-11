const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('connected to mongodb...'))
.catch(()=>console.log('could not connect to MongoDb...',err));

// Schema
const courseSchema = new mongoose.Schema({
    name:{type: String, required: true},
    author:String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});


const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
   
    const course = new Course({
      //  name:'Angular Course',
        author: 'Puri',
        tags: ['angular','frontend'],
        isPublished: true
    });
    
    try{
        
    const result = await course.save();
    console.log(result);
    }
    catch(ex){
        console.log(ex.message);
    }
}

async function getCourses(){

    const pageNumber = 2;
    const pageSize = 10; 
    const courses = await Course

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

    console.log(courses);
}


async function updateCourse(id){
    
    const course = await Course.findByIdAndUpdate({id},{
        $set:{
            author:'Jack',
            isPublished:true
        }
    });
    console.log(course);
}

async function removeCourse(id) {
   const result = await  Course.deleteOne({_id: id});
   console.log(result);
}

createCourse();