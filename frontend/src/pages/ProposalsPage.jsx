import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client.js";
import ProposalTable from "../components/ProposalTable.jsx";

function ProposalsPage() {
  const { id } = useParams();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");

  const loadProposals = async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    try {
      const res = await api.get(`/api/proposals/${id}`);
      setProposals(res.data.proposals || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load proposals");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRefresh = () => {
    setRefreshing(true);
    setMessage("");
    loadProposals(false);
  };

  return (
    <div>
      <h2 className="mb-3">Proposals for RFP {id}</h2>

      <button
        className="btn btn-outline-primary btn-sm mb-3"
        onClick={handleRefresh}
        disabled={refreshing}
      >
        {refreshing ? "Refreshing..." : "Refresh Proposals"}
      </button>

      {message && <div className="alert alert-info">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : proposals.length > 0 ? (
        <ProposalTable proposals={proposals} />
      ) : (
        <p className="text-muted">
          No proposals found for this RFP yet. Once vendors respond to your
          email, their parsed proposals will appear here.
        </p>
      )}
    </div>
  );
}

export default ProposalsPage;
