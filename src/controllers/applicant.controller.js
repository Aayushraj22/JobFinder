import { sendMail } from "../../server.js"
import { addApplicant } from "../models/applicants.js"
import { getJobById } from "../models/jobs.js"



const applyingApplicantHandler = (req,res) => {
    const detail = req.body
    const applicant = {
        ...detail,
        resumePath: req.file.path, 
    }
    // console.log('applicant detail : ',applicant)
    const {id} = req.params
    addApplicant(applicant, id)

    sendMail(detail.email).then(() => {
        res.status(200).render('jobApply', {msg: 'Successfully Applied ✔️', job: getJobById(id)})
    }).catch((error) => {
        res.status(200).render('jobApply', {msg: 'Failed ❌, Try Again', job: getJobById(id)})
    })

}

const renderJobApplicantsPage = (req,res) => {
    res.status(200).render('jobApplicants')
}



export {applyingApplicantHandler, renderJobApplicantsPage}
