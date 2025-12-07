import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client.js";
import CompareSummary from "../components/CompareSummary.jsx";

function ComparePage() {
  const { id } = useParams();
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");

  const loadComparison = async () => {
    setRunning(true);
    setMessage("");
    try {
      const res = await api.post(`/api/rfp/${id}/compare`);
      setComparison(res.data.comparison);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to compare proposals");
    } finally {
      setLoading(false);
      setRunning(false);
    }
  };

  useEffect(() => {
    loadComparison();
  }, [id]);

  if (loading && !comparison) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="mb-3">Comparation and Recommendation</h2>
      <button
        className="btn btn-outline-primary btn-sm mb-3"
        disabled={running}
        onClick={loadComparison}
      >
        {running ? "Running comparison..." : "Re-run AI Comparison"}
      </button>
      {message && <div className="alert alert-danger">{message}</div>}
      <CompareSummary comparison={comparison} />
    </div>
  );
}

export default ComparePage;
