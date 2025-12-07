import React from "react";

function VendorTable({ vendors }) {
  if (!vendors.length) {
    return <p className="text-muted">No vendors yet.</p>;
  }

  return (
    <div className="card">
      <div className="card-body p-0 table-responsive">
        <table className="table mb-0">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id}>
                <td>{v.name}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td>{v.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendorTable;
