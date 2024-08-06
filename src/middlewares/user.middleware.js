function validateUserData (req, res, next) {
    const {username, password} = req.body;

    if(!username || !password) {
       res.status(404).send('Invalid credentials')
    } else {
        next();
    }

}

function authenticateRecruter(req,res,next) {
    if(req.session.user) {
        next()
    } else {
        res.status(401).redirect('/login');
    }
}

function validateRegisteringUser (req, res, next) {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(404).send('Invalid credentials')
    } else {
        next();
    }
}

export {validateUserData, authenticateRecruter, validateRegisteringUser}