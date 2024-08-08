import { addNewJob, deleteJobById, getAllJobs, getJobById, updateJob } from "../models/jobs.js"
import { hasCookie, isAutherised } from "../utility.js"

const renderAllJobs = (req,res) => {
    res.render('jobs', {layout: 'layouts/job' ,jobs: getAllJobs(), isAutherised: isAutherised(req), lastVisit: hasCookie(req)})
}

const newJobPage = (req,res) => {
    res.render('newJob', {layout: 'layouts/job', isAutherised: isAutherised(req)})
}

const createNewJob = (req,res) => {
    const job = req.body;
    addNewJob(job)
    res.status(200).redirect('/jobs')
}

const renderJobPage = (req,res) => {
    const {id} = req.params;
    res.render('job', {layout: 'layouts/job', status: undefined  , job: getJobById(id), isAutherised: isAutherised(req)});
}

const renderJobApplyPage = (req,res) => {
    const {id} = req.params;
    res.render('jobApply', {layout: 'layouts/job', job: getJobById(id), msg: undefined, isAutherised: isAutherised(req)})
}

const renderJobUpdatePage = (req,res) => {
    const id = req.originalUrl.split('/')[2];
    res.render('jobUpdate', {layout: 'layouts/job', job: getJobById(id), status: undefined, isAutherised: isAutherised(req)})
}

const jobUpdateHandler = (req,res) => {
    const id = req.originalUrl.split('/')[2];
    const modifiedJodDetail = req.body;
    
    updateJob(modifiedJodDetail, id)

    res.status(200).render('jobUpdate', {layout: 'layouts/job', status: 'Updated Successfully', job: getJobById(id), isAutherised: isAutherised(req)});
}


const deleteJobHandler = (req, res) => {
    const id = req.originalUrl.split('/')[2];

    deleteJobById(id);

    res.status(200).send('successfully deleted');
}

export {renderAllJobs, newJobPage, createNewJob, renderJobPage, renderJobApplyPage, renderJobUpdatePage, jobUpdateHandler, deleteJobHandler}