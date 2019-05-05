//asynchronous
getUser(1,getRepositories);


function getRepositories(user){
    getRepositories(user.gitHubUsername,getCommits)     
}
function getCommits(repos){
    getCommits(repo,displayCommits);
}
function displayCommits(commits){
    console.log(commits);
}

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