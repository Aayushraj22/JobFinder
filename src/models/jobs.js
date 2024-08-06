import { generateId } from "../../global.utility.js";
import { getCurrentDateTime, getTodayDate } from "../utility.js";
import { getUserIdByEmail } from "./user.js";

const jobs = [
    {
        jobId: 'fda234',
        companyName: 'Digital AI',
        jobType: 'full time',
        jobDesignation: 'developer',
        salary: '50K',
        skills: ['javascript', 'mongoDB', 'reactjs', 'expressjs', 'git'],
        postedAt: getCurrentDateTime(),
        applyBy: getTodayDate(),
        opening: 20,
        recruiterId: 'user123',
        applicantList: [],
    }
]

function getAllJobs() {
    return jobs;
}

function addNewJob (newJob) {
    let jobId = undefined;
    do {
        jobId = generateId(6);
        if(jobs.find((job) => job.jobId === jobId)){
            jobId = undefined;
        }
    } while (jobId === undefined);

    jobs.push({
        ...newJob,
        jobId,
        postedAt: getCurrentDateTime(),
        recruiterId: getUserIdByEmail(newJob.email),
        skills: newJob.skills.split(','),
        applicantList: [],
    })
}

function getJobById(id) {
    return jobs.find((job) => job.jobId === id);
}



export {getAllJobs, addNewJob, getJobById}