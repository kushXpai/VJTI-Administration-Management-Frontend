import styles from "../../styles/admin-dashboard.module.css";

const AdminDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>🏢 Admin Dashboard - Hostel Management</h1>

      <div className={styles.grid}>
        {/* Hostel Management */}
        <div className={styles.card}>
          <h2>🏠 Hostel Management</h2>
          <ul>
            <li> Review Application</li> {/* Review and send back the application to the student if any information is missing or incorrect */}
            <li> Generate Merit List </li>
            <li> Generate empty rooms list</li> {/* Generate a list of empty rooms in the hostel so warden can confirm if they are available for occupancy or not */}
            {/* Has provision to make changes for false positive rooms (rooms that are occupied but marked empty) */}
            {/* Use the updated list to start the room Allotment */}
            <li> Start Room Allotment</li>
            <li>💰 Track Hostel Fee Payments</li>
            <li>📜 Generate Reports</li>
          </ul>
        </div>

        {/* Grievance Handling */}
        <div className={styles.card}>
          <h2>📢 Grievance Management</h2>
          <ul>
            <li>🔍 View Student Complaints</li>
            <li>✅ Resolve Grievances</li>
            <li>📊 Track Complaint Status</li>
            <li>📋 Review Room Change Requests</li>
          </ul>
        </div>

        {/* Mess Management */}
        <div className={styles.card}>
          <h2>🍽 Mess Management</h2>
          <ul>
            <li>📅 Update Mess Menu</li>
            <li>💳 Manage Payments</li>
            <li>🛒 Track Inventory</li>
            <li>📝 View Student Feedback</li>
          </ul>
        </div>

        {/* Reports & Analytics */}
        <div className={styles.card}>
          <h2>📊 Reports & Analytics</h2>
          <ul>
            <li>📈 View Hostel Occupancy</li>
            <li>💰 Hostel & Mess Revenue</li>
            <li>📉 Track Complaint Trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
