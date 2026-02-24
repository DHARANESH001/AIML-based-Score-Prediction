import { User, Mail, Shield, Edit3, LogOut, Camera } from 'lucide-react';

export default function Profile() {
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-header">
          <h1 className="profile-title">Profile</h1>
          <p className="profile-subtitle">Manage your account settings and information</p>
        </div>

        <div className="profile-card">
          <div className="profile-banner"></div>
          
          <div className="profile-content">
            <div className="profile-info">
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  <User />
                </div>
                <button className="avatar-upload">
                  <Camera />
                </button>
              </div>
              
              <div className="profile-details">
                <h2 className="profile-name">John Doe</h2>
                <p className="profile-role">Administrator</p>
              </div>

              <div className="profile-actions">
                <button
                  onClick={handleEditProfile}
                  className="btn-primary"
                >
                  <Edit3 />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-danger"
                >
                  <LogOut />
                  Logout
                </button>
              </div>
            </div>

            <div className="profile-info-grid">
              <div className="info-section">
                <h3 className="section-title">Personal Information</h3>
                
                <div className="info-item">
                  <label className="info-label">Full Name</label>
                  <div className="info-value">
                    <User />
                    John Doe
                  </div>
                </div>

                <div className="info-item">
                  <label className="info-label">Email Address</label>
                  <div className="info-value">
                    <Mail />
                    john.doe@school.edu
                  </div>
                </div>

                <div className="info-item">
                  <label className="info-label">Phone Number</label>
                  <div className="info-value">
                    <User />
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3 className="section-title">Account Details</h3>
                
                <div className="info-item">
                  <label className="info-label">Role</label>
                  <div className="info-value">
                    <Shield />
                    Administrator
                  </div>
                </div>

                <div className="info-item">
                  <label className="info-label">Department</label>
                  <div className="info-value">
                    <User />
                    Computer Science
                  </div>
                </div>

                <div className="info-item">
                  <label className="info-label">Member Since</label>
                  <div className="info-value">
                    <User />
                    January 15, 2024
                  </div>
                </div>
              </div>
            </div>

            <div className="activity-section">
              <h3 className="activity-title">Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-info">
                    <p className="activity-title-text">Uploaded student data file</p>
                    <p className="activity-time">2 hours ago</p>
                  </div>
                  <span className="activity-status completed">Completed</span>
                </div>
                
                <div className="activity-item">
                  <div className="activity-info">
                    <p className="activity-title-text">Generated prediction report</p>
                    <p className="activity-time">1 day ago</p>
                  </div>
                  <span className="activity-status completed">Completed</span>
                </div>
                
                <div className="activity-item">
                  <div className="activity-info">
                    <p className="activity-title-text">Updated profile information</p>
                    <p className="activity-time">3 days ago</p>
                  </div>
                  <span className="activity-status updated">Updated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}