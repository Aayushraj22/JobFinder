function validateJobsDetails(req,res,next){

    const jobDetails = req.body;
    let indicator = false;   // assuming all fields are filled
    for(let key in jobDetails){
        if(jobDetails[key] === undefined || jobDetails[key] === null){
            indicator = true;
            break;
        }
    }

    if(indicator) {
        return res.status(404).render('newJob');
    } else {
        next();
    }
}


export {validateJobsDetails}