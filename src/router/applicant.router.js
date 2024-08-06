import { Router } from "express";
import { renderJobApplicantsPage } from "../controllers/applicant.controller.js";
const router = Router();

router.route('/')
.get(renderJobApplicantsPage)


export default router;