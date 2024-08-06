import { Router } from "express";
import { createNewJob, newJobPage, renderAllJobs, renderJobPage } from "../controllers/jobs.controller.js";
import { validateJobsDetails } from "../middlewares/jobs.middleware.js";
import applicantRouter from './applicant.router.js'
const router = Router();

router.use('/:id/applicants', applicantRouter)

router
.route('/')
.get(renderAllJobs)
.post(validateJobsDetails, createNewJob)   // create a new job 

router
.route('/new-job')
.get(newJobPage)   // render page having form to create new job

router
.route('/:id')
.get(renderJobPage)





export default router