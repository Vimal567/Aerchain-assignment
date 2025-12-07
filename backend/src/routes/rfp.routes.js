import { Router } from "express";
import { generateRfp, getRfps, getRfp, compareRfpProposals } from "../controllers/rfp.controller.js";
import { sendRfpToVendors } from "../controllers/email.controller.js";

const router = Router();

router.post("/generate", generateRfp);
router.get("/", getRfps);
router.get("/:id", getRfp);
router.post("/:id/send", sendRfpToVendors);
router.post("/:id/compare", compareRfpProposals);

export default router;
