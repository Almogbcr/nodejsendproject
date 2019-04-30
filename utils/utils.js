var axios = require('axios');
var utils = {}

utils.getUsers = () => {
    var promise = new Promise((res) => {
        axios.get('https://jsonplaceholder.typicode.com/Users')
        .then(usersData => res(usersData.data));
    })
    return promise;
}

utils.getPosts = () => {
var promise = new Promise((res) => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then(resp => {
        res(resp.data);
    })
})
return promise;
}

utils.getTasks = () => {
var promise = new Promise((res) => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(resp => {
        res(resp.data);
    })
})
return promise;
}

module.exports = utils;