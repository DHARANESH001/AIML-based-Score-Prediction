import { LogOut, GraduationCap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <GraduationCap />
            </div>
            <h1 className="navbar-title">AI Student Result Predictor</h1>
          </div>

          <div className="navbar-actions">
            <button className="logout-button">
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}