import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client.js";

function SendRfpPage() {
  const { id } = useParams();
  const [rfp, setRfp] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [rfpRes, vendorsRes] = await Promise.all([
          api.get(`/api/rfp/${id}`),
          api.get("/api/vendors"),
        ]);
        setRfp(rfpRes.data.rfp);
        setVendors(vendorsRes.data.vendors || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const toggleVendor = (vendorId) => {
    setSelected((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleSend = async () => {
    if (!selected.length) return;
    setSending(true);
    setMessage("");
    try {
      await api.post(`/api/rfp/${id}/send`, { vendorIds: selected });
      setMessage("RFP sent to selected vendors.");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to send RFP");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!rfp) return <p>RFP not found.</p>;

  return (
    <div>
      <h2 className="mb-3">Send RFP to Vendors</h2>
      <p>
        <strong>RFP ID:</strong> {rfp._id}
      </p>
      <p className="text-muted">{rfp.originalText}</p>

      <h5 className="mt-4">Select Vendors</h5>
      {vendors.length === 0 ? (
        <p className="text-muted">
          No vendors available. Please add vendors first.
        </p>
      ) : (
        <div className="card mb-3">
          <div className="card-body p-0">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v) => (
                  <tr key={v._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(v._id)}
                        onChange={() => toggleVendor(v._id)}
                      />
                    </td>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <button
        className="btn btn-primary"
        disabled={sending || !selected.length}
        onClick={handleSend}
      >
        {sending ? "Sending..." : "Send RFP"}
      </button>

      {message && <div className="alert alert-info mt-3 mb-0">{message}</div>}
    </div>
  );
}

export default SendRfpPage;
