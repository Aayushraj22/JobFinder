import { generateId } from "../../global.utility.js";
import { getCurrentDateTime, getTodayDate } from "../utility.js";
import { getUserIdByEmail } from "./user.js";

let jobs = [
    {
        jobId: 'fda234',
        company: 'Digital AI',
        companyDesc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque ea odio, ipsum tempore commodi recusandae quia sit quam architecto maxime eius explicabo libero error unde delectus voluptatibus harum eos quod.',
        jobType: 'full-time',
        jobDesignation: 'developer',
        salary: '50K',
        skills: ['javascript', 'mongoDB', 'reactjs', 'expressjs', 'git', 'html', 'css', 'tailwind',],
        postedAt: getCurrentDateTime(),
        applyBy: getTodayDate(),
        opening: 20,
        recruiterId: 'user123',
        applicantList: ['abcdefgh'],
        jobDescription: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque ea odio, ipsum tempore commodi recusandae quia sit quam architecto maxime eius explicabo libero error unde delectus voluptatibus harum eos quod.'
    },
    
]


function getAllJobs() {
    // console.log('all jobs : ',jobs)
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


function deleteApplicantOfJob(jobId, applicantId) {
    const job = jobs.find(job => job.jobId === jobId)
    job.applicantList = job.applicantList.filter(id => applicantId !== id);
}

function updateJob(updatedJob, id){
    jobs = jobs.map((job) => {
        if(job.jobId === id){
            let obj = {
                ...job,
                ...updatedJob,
            }

            if(!(obj.skills instanceof Object)){
                const skills = obj.skills.split(',')
                obj.skills = [...skills];
            }

            return obj;
        }

        return job
    })

}

function deleteJobById(id) {
    jobs = jobs.filter(job => job.jobId !== id)
}


export {getAllJobs, addNewJob, getJobById, deleteApplicantOfJob, updateJob, deleteJobById}