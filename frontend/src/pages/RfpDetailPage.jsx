import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/client.js";

function RfpDetailPage() {
  const { id } = useParams();
  const [rfp, setRfp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRfp = async () => {
      try {
        const res = await api.get(`/api/rfp/${id}`);
        setRfp(res.data.rfp);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRfp();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!rfp) return <p>RFP not found.</p>;

  return (
    <div>
      <h2 className="mb-3">RFP Detail</h2>
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <Link to={`/rfp/${id}/send`} className="btn btn-primary btn-sm">
          Send to Vendors
        </Link>
        <Link to={`/rfp/${id}/proposals`} className="btn btn-outline-secondary btn-sm">
          View Proposals
        </Link>
        <Link to={`/rfp/${id}/compare`} className="btn btn-outline-secondary btn-sm">
          Compare & Recommend
        </Link>
      </div>
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">Original Text</div>
            <div className="card-body">
              <p>{rfp.originalText}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">Structured Data</div>
            <div className="card-body">
              <pre className="mb-0">
                {JSON.stringify(rfp.structuredData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RfpDetailPage;
