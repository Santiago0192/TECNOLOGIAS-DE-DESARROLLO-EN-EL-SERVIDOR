const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

let mockUsers = [];

class User {
    find(){
        return new Promise ((resolve, reject) => {
            axios.get(url)
            .then(response => {
                mockUsers = response.data;
            })
            .catch(error => {
                reject(console.error('Error al obtener usuarios:', error.message));
            });
            setTimeout(() => {
                resolve([...mockUsers]);
            }, 1000);
        });
    };

    findUserById(userId) {
        return new Promise((resolve, reject) => {
            const user = mockUsers.find(user => user.id == userId);
            if (user) {
                resolve(user);
            } else {
                reject();
            }
        });
    }

    insert(newUser){
        axios.post(url, newUser)
        .then(response => {
            mockUsers.push(response.data);
        })
        .catch(error => {
            console.error('Error creating user:', error.message);
        });
    };

    delete(){
        axios.delete(url,newUser)
        .then(response => {
            mockUsers.pop(response.data);
        })
        .catch(error => {
            console.error('Error al eliminar usuario:', error.message);
        });
    }
};

module.exports = User;