import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import axios from "axios";
import VendorForm from "../components/VendorForm.jsx";
import VendorTable from "../components/VendorTable.jsx";

function VendorListPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:5000"+"/api/vendors");
      setVendors(res.data.vendors || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleAddVendor = async (data, reset) => {
    setSaving(true);
    setError("");
    try {
      await api.post("/api/vendors", data);
      reset();
      fetchVendors();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save vendor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2 className="mb-3">Vendors</h2>
      <VendorForm onSubmit={handleAddVendor} loading={saving} />
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Loading...</p> : <VendorTable vendors={vendors} />}
    </div>
  );
}

export default VendorListPage;
