import React, { useState } from "react";

function VendorForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");

      if (cleaned.length > 10) {
        return;
      }

      setForm((f) => ({ ...f, phone: cleaned }));

      if (cleaned.length !== 10) {
        setErrors((err) => ({
          ...err,
          phone: "Phone number must be exactly 10 digits",
        }));
      } else {
        setErrors((err) => ({ ...err, phone: "" }));
      }

      return;
    }

    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.phone.length !== 10) {
      setErrors((err) => ({
        ...err,
        phone: "Phone number must be exactly 10 digits",
      }));
      return;
    }

    onSubmit(form, () => {
      setForm({ name: "", email: "", phone: "", category: "" });
      setErrors({ phone: "" });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <h5 className="mb-3">Add Vendor</h5>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            name="phone"
            type="tel"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={form.phone}
            onChange={handleChange}
            placeholder="10 digit number"
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <input
            name="category"
            className="form-control"
            value={form.category}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="btn btn-primary mt-3" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Vendor"}
      </button>
    </form>
  );
}

export default VendorForm;
