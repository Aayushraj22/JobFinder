import { app, startServer, upload } from "./server.js";
import { applyingApplicantHandler } from "./src/controllers/applicant.controller.js";
import { renderJobApplyPage } from "./src/controllers/jobs.controller.js";
import { getLoginPage, getRegisterPage, loginUser, logoutUser, registerUser } from "./src/controllers/user.controllers.js";
import { validateApplicantDetail } from "./src/middlewares/applicants.middleware.js";
import { validateRegisteringUser, validateUserData } from "./src/middlewares/user.middleware.js";
import jobRouter from "./src/router/job.router.js";


// starting a server
startServer();


// root or user routes
app.get('/',getLoginPage)
app.post('/login', validateUserData, loginUser)

//  register user routes
app.route('/register')
.get(getRegisterPage)
.post(validateRegisteringUser, registerUser)

// logout
app.route('/logout')
.get(logoutUser)


// jobs routes
app.use('/jobs', jobRouter)

// apply route
app.route('/apply/:id')
.get(renderJobApplyPage)
.post(upload.single('resumeFile'), validateApplicantDetail, applyingApplicantHandler )

// error route
app.use((req,res) => {
    res.render('error', {page: 'Error'})
})




