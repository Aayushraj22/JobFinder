import { Router } from "express";
import { renderApplicantPage, renderJobApplicantsPage, updateApplicantHandler, deleteApplicantHandler } from "../controllers/applicant.controller.js";
import { authenticateRecruter } from "../middlewares/user.middleware.js";
const router = Router();

router.route('/')
.get(authenticateRecruter,renderJobApplicantsPage)


router.route('/:id')
.get(authenticateRecruter,renderApplicantPage)
.put(authenticateRecruter,updateApplicantHandler)
.delete(authenticateRecruter,deleteApplicantHandler)


export default router;