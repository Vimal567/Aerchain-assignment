import React, { useState } from "react";
import api from "../api/client.js";
import RfpChatInput from "../components/RfpChatInput.jsx";

function RfpCreatePage() {
  const [rfp, setRfp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (text) => {
    setLoading(true);
    setError("");
    setRfp(null);
    try {
      const res = await api.post("/api/rfp/generate", { text });
      setRfp(res.data.rfp);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to generate RFP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-lg-8 mx-auto">
        <h2 className="mb-3">Create RFP</h2>
        <RfpChatInput onSubmit={handleGenerate} loading={loading} />
        {error && <div className="alert alert-danger">{error}</div>}
        {rfp && (
          <div className="card">
            <div className="card-header">Structured RFP</div>
            <div className="card-body">
              <pre className="mb-0">
                {JSON.stringify(rfp.structuredData, null, 2)}
              </pre>
              <p className="mt-3 mb-0 text-muted">
                Saved as RFP ID: <strong>{rfp._id}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RfpCreatePage;
