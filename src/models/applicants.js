import { generateId } from "../../global.utility.js";
import { getJobById } from "./jobs.js";

let applicants = [
    {
        applicantId: 'abcdefgh',
        fullName: 'hello world',
        email: 'helloworld@gmail.com',
        contact: '0123456789',
        resumePath: '/1722956737614-Screenshot 2024-07-18 130126.png',
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
    job.applicantList.push(applicantId);  // add applicant in the applicantList property of applied job.
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

function deleteApplicantById(id) {
    applicants = applicants.filter((applicant) => applicant.applicantId !== id);
}

function updateApplicantDetailById(id, data){
    applicants = applicants.map(applicant => {
        if(applicant.applicantId === id){
            return {
                ...applicant,
                ...data,
            }
        }
        return applicant
    })
    

    // console.log('modified applicant list: ',applicants)
}

export {getApplicantById, addApplicant, getApplicantByList, deleteApplicantById, updateApplicantDetailById}