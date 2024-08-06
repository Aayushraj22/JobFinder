import fs from 'fs';

function deleteFile(path){

    const filePath = path; // Specify the path to the file you want to delete
    
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });
}




function validateApplicantDetail(req,res,next) {
    const {fullName, email, contact} = req.body
    // const {resumeFile} = req.file;
    // console.log('reqBody: ', req.body)



    if(!fullName || !email || !contact ){
        const path = req.file.path;
        // console.log('filePath: ',path);
        deleteFile(path)
        return res.status(400).send('fill form completely')
    }

    next()

}




export {validateApplicantDetail,  }