import React from "react";

function CompareSummary({ comparison }) {
  if (!comparison) {
    return null;
  }

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="card">
          <div className="card-header">AI Summary</div>
          <div className="card-body">
            <p className="mb-0">{comparison.summary}</p>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card">
          <div className="card-header">Scores</div>
          <div className="card-body p-0 table-responsive">
            {comparison.scores && comparison.scores.length ? (
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Vendor</th>
                    <th>Score</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.scores.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.vendor}</td>
                      <td>{s.score}</td>
                      <td style={{ maxWidth: 260 }}>{s.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-3 text-muted mb-0">No scores available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-6">
        <div className="card h-100">
          <div className="card-header">Recommendation</div>
          <div className="card-body">
            {comparison.recommendation ? (
              <>
                <h5 className="card-title">
                  Recommended Vendor: {comparison.recommendation.vendor}
                </h5>
                <p className="card-text mb-0">
                  {comparison.recommendation.reason}
                </p>
              </>
            ) : (
              <p className="text-muted mb-0">No recommendation yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareSummary;
