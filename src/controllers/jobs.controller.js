import { addNewJob, getAllJobs, getJobById } from "../models/jobs.js"

const renderAllJobs = (req,res) => {
    res.render('jobs', {jobs: getAllJobs()})
}

const newJobPage = (req,res) => {
    
    res.render('newJob')
}

const createNewJob = (req,res) => {
    const job = req.body;
    addNewJob(job)
    res.status(200).redirect('/jobs')
}

const renderJobPage = (req,res) => {
    const {id} = req.params;
    res.render('job', {job: getJobById(id)});
}

const renderJobApplyPage = (req,res) => {
    const {id} = req.params;
    res.render('jobApply', {job: getJobById(id), msg: undefined})
}



export {renderAllJobs, newJobPage, createNewJob, renderJobPage, renderJobApplyPage}