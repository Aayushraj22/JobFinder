import { generateId } from "../../global.utility.js";


// array data structure to store user
const users = [
    {
        userId: 'ddd0c784',
        username: 'developer404',
        email: 'developer@gmail.com',
        password: 'developer',
    },
]

// adding new user
function addUser (user) {
    let userId = undefined
    const size = users.length - 1;

    do {
        userId = generateId(4)
        for(let i=0; i<size; i++){
            const {id} = users[i];
            
            if(id === userId) {
                userId = undefined;
                break;
            }
        }
    } while (userId === undefined)    

    users.push({
        ...user,
        userId: userId,
    })
}

const findUser = (user) => {
    const {username, password} = user;
    return users.find((user) => user.username === username && user.password === password)
}

const getUserIdByEmail = (email) => {
    const user = users.find(user => user.email === email)
    return user.userId;
}

export {users, addUser, findUser, getUserIdByEmail}