console.log('Before');

//asynchronous
// How to consume Promises
getUser(1,(user)=>{
    getRepositories(user.gitHubUsername,(repos)=>{
        getCommits(repos[0],(commits)=>{
            console.log(commits);
        })
    })
});



const p = getUser(1);
p.then(user=>getRepositories(user.gitHubUsername))
 .then(repos=>getCommits(repos[0]))
 .then(commits=>console.log('commits',commits))
 .catch(err => console.log('Error',err.message));
console.log('After');


//async await
async function displayCommits(){
    try{
        const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
    
    }
    catch(err){
        console.log(err);
    }    
}
displayCommits()
// Promises

// how to write promises
function getUser(id){
    return new Promise((resolve,reject)=>{
        // kick off some async work
        setTimeout(()=>{
            console.log('Reading a user from db');
        resolve({ id:id, gitHubUsername: 'vibs'});
        },2000);
    });
}

function getRepositories(username){
   return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('getting repos');
            resolve( ['repo1','repo2','repo3']);
        }, 2000);
   });
}

function getCommits(repo) {
   return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('calling GITHUB API..');
        resolve(['commit']);;
    },2000)
   })
}