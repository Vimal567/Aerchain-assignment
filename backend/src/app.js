import express from "express";
import cors from "cors";
import morgan from "morgan";
import rfpRoutes from "./routes/rfp.routes.js";
import vendorRoutes from "./routes/vendor.routes.js";
import proposalRoutes from "./routes/proposal.routes.js";
import { errorHandler, notFoundHandler } from "./utils/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "AI RFP backend up" });
});

app.use("/api/rfp", rfpRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/proposals", proposalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
