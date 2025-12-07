import { Router } from "express";
import { createVendorHandler, listVendorsHandler } from "../controllers/vendor.controller.js";

const router = Router();

router.post("/", createVendorHandler);
router.get("/", listVendorsHandler);

export default router;
