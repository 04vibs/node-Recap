const p=Promise.resolve({id:1});
p.then(result=>console.log(result));

const p1= Promise.reject(new Error('reason for rejection'));
p.catch(error=>console.log(error));

// const p2 = new Promise((resolve,reject)=>{
// setTimeout(()=>{
// resolve(1);
//     },2000)
// })

// p2.then(result => console.log('Resolve works',result))
// .catch(err=>new Error('error',err));