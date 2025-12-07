import { Router } from "express";
import { listProposalsForRfpHandler } from "../controllers/proposal.controller.js";

const router = Router();

router.get("/:rfpId", listProposalsForRfpHandler);

export default router;
