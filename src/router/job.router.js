import { Router } from "express";
import { createNewJob, deleteJobHandler, jobUpdateHandler, newJobPage, renderAllJobs, renderJobPage, renderJobUpdatePage } from "../controllers/jobs.controller.js";
import { validateJobsDetails } from "../middlewares/jobs.middleware.js";
import applicantRouter from './applicant.router.js'
import { authenticateRecruter } from "../middlewares/user.middleware.js";
const router = Router();

router.use('/:id/applicants', applicantRouter)

router
.route('/')
.get(renderAllJobs)
.post(validateJobsDetails, createNewJob)   // create a new job 

router
.route('/new-job')
.get(authenticateRecruter ,newJobPage)   // render page having form to create new job

router
.route('/:id')
.get(renderJobPage)

router
.route('/:id/update')
.get(authenticateRecruter, renderJobUpdatePage)  
.post(jobUpdateHandler)

router
.route('/:id/delete')
.delete(deleteJobHandler)






export default router