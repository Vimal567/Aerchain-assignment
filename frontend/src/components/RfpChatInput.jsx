import React, { useState } from "react";

function RfpChatInput({ onSubmit, loading }) {
  const [text, setText] = useState(
    "I need to procure laptops and monitors for our new office. Budget is $50,000 total. Need delivery within 30 days. We need 20 laptops with 16GB RAM and 15 monitors 27-inch. Payment terms should be net 30, and we need at least 1 year warranty."
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <label className="form-label fw-semibold">Describe your RFP in natural language</label>
      <textarea
        className="form-control mb-3"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe what you need to buy, budget, delivery timeline, warranty, etc."
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Generating RFP..." : "Generate RFP"}
      </button>
    </form>
  );
}

export default RfpChatInput;
