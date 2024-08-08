import path from "path"
import { sendMail } from "../../server.js"
import { addApplicant, deleteApplicantById, getApplicantById, updateApplicantDetailById } from "../models/applicants.js"
import { deleteApplicantOfJob, getJobById } from "../models/jobs.js"
import { isAutherised } from "../utility.js"

const applyingApplicantHandler = (req,res) => {
    const detail = req.body

    const applicant = {
        ...detail,
        resumePath: path.join('/',req.file.filename), 
    }

    // console.log('applicant detail : ',applicant)
    const {id} = req.params
    addApplicant(applicant, id)

    sendMail(detail.email).then(() => {
        res.status(200).render('jobApply', {layout: 'layouts/job', job: getJobById(id), msg: 'Successfully Applied ✔️', isAutherised: isAutherised(req)})
    }).catch((error) => {
        res.status(200).render('jobApply', {layout: 'layouts/job', job: getJobById(id), msg: 'Failed ❌, Try Again', isAutherised: isAutherised(req)})
    })

    // res.status(200).render('jobApply', {layout: 'layouts/job', job: getJobById(id), msg: 'Successfully Applied.', isAutherised: isAutherised(req)})
}

const renderJobApplicantsPage = (req,res) => {
    const jobId = req.originalUrl.split('/')[2]
    const {applicantList} = getJobById(jobId)
    const applicants = [];
    applicantList.forEach(id => {
        applicants.push(getApplicantById(id));
    });
    console.log('applicantsList', isAutherised(req))

    res.status(200).render('jobApplicants', {layout: 'layouts/layout', page:'Applicant Page', applicants: applicants, isAutherised: isAutherised(req)})
}


const renderApplicantPage = (req,res) => {
    const jobId = req.originalUrl.split('/')[2]
    const {id} = req.params;
    res.status(200).render('applicant', {layout: 'layouts/layout', page:'Applicant', applicant: getApplicantById(id),  isAutherised: isAutherised(req)});
}


const updateApplicantHandler = (req,res) => {
    const jobId = req.originalUrl.split('/')[2]
    const endpoints = req.originalUrl.split('/')
    const applicantId = endpoints[4]
    const data = req.body;
    
    // console.log('data: ',data);
    updateApplicantDetailById(applicantId, data)
    
    res.status(200).render('applicant', {layout: 'layouts/layout', page:'Applicant', applicant: getApplicantById(applicantId),  isAutherised: isAutherised(req)})
}

const deleteApplicantHandler = (req,res) => {
    const endpoints = req.originalUrl.split('/')
    const jobId = endpoints[2];
    const applicantId = endpoints[4]

    deleteApplicantById(applicantId)
    deleteApplicantOfJob(jobId, applicantId);

    res.status(200).render('applicant', {layout: 'layouts/layout', page:'Applicant', applicant: getApplicantById(applicantId),isAutherised: isAutherised(req) })
}


export {applyingApplicantHandler, renderJobApplicantsPage, renderApplicantPage, updateApplicantHandler, deleteApplicantHandler, }
