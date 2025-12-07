import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";

function RfpListPage() {
  const [rfps, setRfps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRfps = async () => {
      try {
        const res = await api.get("/api/rfp");
        setRfps(res.data.rfps || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRfps();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>RFPs</h2>
        <Link to="/rfp/create" className="btn btn-primary">
          + New RFP
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : rfps.length === 0 ? (
        <p className="text-muted">No RFPs yet. Create one to get started.</p>
      ) : (
        <div className="card">
          <div className="card-body p-0 table-responsive">
            <table className="table mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Summary</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfps.map((r) => (
                  <tr key={r._id}>
                    <td style={{ maxWidth: 160 }}>
                      <code>{r._id}</code>
                    </td>
                    <td style={{ maxWidth: 280 }}>
                      {r.originalText?.slice(0, 80)}...
                    </td>
                    <td>{new Date(r.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <Link
                          className="btn btn-outline-secondary"
                          to={`/rfp/${r._id}`}
                        >
                          View
                        </Link>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`/rfp/${r._id}/send`}
                        >
                          Send
                        </Link>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`/rfp/${r._id}/proposals`}
                        >
                          Proposals
                        </Link>
                        <Link
                          className="btn btn-outline-secondary"
                          to={`/rfp/${r._id}/compare`}
                        >
                          Compare
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default RfpListPage;
