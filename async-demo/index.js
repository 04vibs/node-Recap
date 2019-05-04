console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

// callbacks
// Promises
// Async/await

function getUser(id){
    setTimeout(()=>{
        console.log('Reading a user from db');
    return{ id:id, gitHubUsername: 'mosh'};
    },2000);
    return 1;
}