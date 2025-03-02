import Image from 'next/image';
import styles from "../../styles/admin-dashboard.module.css";
import { useRouter } from 'next/router';

const AdminDashboard = () => {
  const router = useRouter();

  // Placeholder function for logout
  const handleLogout = () => {
    alert("Logging out...");
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
        <Image src="/images/vjti_logo.svg" alt="VJTI Logo" width={50} height={50}/>
          <div className={styles.collegeInfo}>
            <h1 className={styles.collegeName}>Veermata Jijabai Technological Institute</h1>
            <p className={styles.address}>Matunga East, Mumbai, Maharashtra 400019</p>
          </div>
        </div>
        <div className={styles.adminInfo}>
          <span>Welcome, Admin</span>
          <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Hostel Management Section */}
      <section className={styles.section}>
        <h2>Hostel Management</h2>
        <div className={styles.buttonGrid}>
          {[
            "Review Applications", "Generate Merit List", "Check Vacant Rooms",
            "Edit Seat Matrix", "Start Room Allotment", "Hostel Fees Paid",
            "Generate Hostel ID Card"
          ].map((text, index) => (
            <button key={index} className={styles.button}>{text}</button>
          ))}
        </div>
      </section>

      {/* Grievances Section */}
      <section className={styles.section}>
        <h2>Grievances</h2>
        <div className={styles.buttonGrid}>
          {[
            "Hostel Complaints", "Mess Complaints", "General Complaints",
            "Track Complaint Status", "Room Change Requests", "Feedbacks"
          ].map((text, index) => (
            <button key={index} className={styles.button}>{text}</button>
          ))}
        </div>
      </section>

      {/* Mess Management Section */}
      <section className={styles.section}>
        <h2>Mess Management</h2>
        <div className={styles.buttonGrid}>
          {[
            "Update Mess Menu", "Manage Payments", "Track Inventory", "Feedbacks"
          ].map((text, index) => (
            <button key={index} className={styles.button}>{text}</button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Veermata Jijabai Technological Institute. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
