import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import RfpCreatePage from "./pages/RfpCreatePage.jsx";
import RfpListPage from "./pages/RfpListPage.jsx";
import RfpDetailPage from "./pages/RfpDetailPage.jsx";
import VendorListPage from "./pages/VendorListPage.jsx";
import SendRfpPage from "./pages/SendRfpPage.jsx";
import ProposalsPage from "./pages/ProposalsPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            AI RFP Management System
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarNav" className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/rfp/create">
                  Create RFP
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rfp">
                  RFPs
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/vendors">
                  Vendors
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container pb-5">
        <Routes>
          <Route path="/" element={<RfpListPage />} />
          <Route path="/rfp/create" element={<RfpCreatePage />} />
          <Route path="/rfp" element={<RfpListPage />} />
          <Route path="/rfp/:id" element={<RfpDetailPage />} />
          <Route path="/rfp/:id/send" element={<SendRfpPage />} />
          <Route path="/rfp/:id/proposals" element={<ProposalsPage />} />
          <Route path="/rfp/:id/compare" element={<ComparePage />} />
          <Route path="/vendors" element={<VendorListPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
