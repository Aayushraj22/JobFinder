import { generateId } from "../../global.utility.js";
import { getJobById } from "./jobs.js";

const applicants = [
    {
        applicantId: '',
        name: '',
        email: '',
        contact: '',
        resumePath: '',
    }
]

function getApplicantById(id) {
    return applicants.find((applicant) => applicant.applicantId === id);
}

function addApplicant(applicantDetail, jobId){
    let applicantId = undefined;
    do {
        applicantId = generateId(8);
        if(applicants.find((applicant) => applicant.applicantId === applicantId)){
            applicantId = undefined;
        }
    } while (applicantId === undefined);

    applicants.push({
        ...applicantDetail,
        applicantId,
    })

    const job = getJobById(jobId);
    job.applicantList.push(jobId);  // add applicant in the applicantList property of applied job.
}

/**
 * method accept array of id and return an array of applicant for each id
 * @param {Array} applicantList 
 * @returns {Array} result
 */
function getApplicantByList(applicantList) {
    const result = []
    applicantList.forEach(applicantId => {
        result.push(getApplicantById(applicantId));
    });
    return result;
}

export {getApplicantById, addApplicant, getApplicantByList}