//Trade off between query performance vs consistency

// using Refernces(Normalization) -> consistency
let author = {
    name: 'Mosh'
}

let course = {
    author:'id',
    
}

// using Embedded Documents(Denormalization) -> Performance

let course={
    author:{
        name:'Mosh'
    }
}

// Hybrid
 let author = {
     name: 'Mosh'
     // 50 other properties
 }

 let course = {
     author:{
         id:'ref',
         name:'Mosh'
     }
 }