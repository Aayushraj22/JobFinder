import { addUser, findUser } from "../models/user.js";
import { getCurrentDateTime, isAutherised } from "../utility.js";


const getLoginPage = (req,res) => {
    res.render('login', {message: 'undefined', page: 'Login Page', isAutherised: isAutherised(req)})
}

const loginUser = (req, res) => {
    const user = req.body;
    if(findUser(user)) {
        req.session.user = {username: user.username}
        
        // if cookie is not present the set it
        if(!res.cookie) {    
            res.cookie('lastVisit', getCurrentDateTime(), { maxAge: 86400000 });  // 1 day
        }

        res.status(301).redirect('/jobs')
    } else {
        res.status(404).render('register')
    }
}

const getRegisterPage = (req,res) => {
    res.render('register', {page: 'SignUp Page', isAutherised: isAutherised(req)})
}

const registerUser = (req,res) => {
    const user = req.body;
    addUser(user)
    res.status(200).render('login', {message: 'Successfully Signed Up', isAutherised: isAutherised(req)});
}

const logoutUser = (req,res) => {
    if(req.session.user) {
        
        res.cookie('lastVisit', getCurrentDateTime(),  { maxAge: 86400000 }) 
        
        req.session.destroy(() => {
            res.redirect('/jobs');
        })

    } else {
        res.redirect('/');
    }
}


export {getLoginPage, loginUser, getRegisterPage, registerUser, logoutUser}