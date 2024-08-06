import { addUser, findUser } from "../models/user.js";


const getLoginPage = (req,res) => {
    res.render('login', {message: 'undefined'})
}

const loginUser = (req, res) => {
    const user = req.body;
    if(findUser(user)) {
        res.status(301).redirect('/jobs')
    } else {
        res.status(404).render('register')
    }
}

const getRegisterPage = (req,res) => {
    res.render('register')
}

const registerUser = (req,res) => {
    const user = req.body;
    addUser(user)
    res.status(200).render('login', {message: 'Successfully Signed Up'});
}


export {getLoginPage, loginUser, getRegisterPage, registerUser}