console.log('Before');

//asynchronous
getUser(1,(user)=>{
    console.log('User',user)
    // get the repositories
    getRepositories(user.gitHubUsername,(repos)=>{
        console.log('Repos',repos);
        getCommits(repo,(commits)=>{
            //callback hell
        })
    })
});
console.log('After');


//synchronous
console.log('before');
const user = getUser(1);
const repos = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log('After');

// callbacks
// Promises
// Async/await

function getUser(id,callback){
    setTimeout(()=>{
        console.log('Reading a user from db');
    callback({ id:id, gitHubUsername: 'vibs'});
    },2000);
}

function getRepositories(username,callback){
   setTimeout(() => {
       console.log('getting repos');
       callback( ['repo1','repo2','repo3']);
   }, 4000);
}