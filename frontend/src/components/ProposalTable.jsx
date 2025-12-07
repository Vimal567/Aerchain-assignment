import React from "react";

function ProposalTable({ proposals }) {
  if (!proposals.length) {
    return <p className="text-muted">No proposals found for this RFP yet.</p>;
  }

  return (
    <div className="card">
      <div className="card-body p-0 table-responsive">
        <table className="table mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Vendor</th>
              <th>Price</th>
              <th>Delivery Days</th>
              <th>Warranty</th>
              <th>Payment Terms</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p._id}>
                <td>{p.vendorId?.name}</td>
                <td>
                  {p.parsedData?.price
                    ? `${p.parsedData.price} ${p.parsedData.currency || ""}`
                    : "-"}
                </td>
                <td>{p.parsedData?.delivery_days || "-"}</td>
                <td>{p.parsedData?.warranty || "-"}</td>
                <td>{p.parsedData?.payment_terms || "-"}</td>
                <td style={{ maxWidth: 240 }}>{p.parsedData?.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalTable;
