import { useState } from "react";
import styles from "../../styles/admin-dashboard.module.css";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    hostel: false,
    grievance: false,
    mess: false,
    reports: false,
  });

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${isSidebarExpanded ? styles.expanded : ""}`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <nav>
          <ul className={styles.sidebarList}>
            {/* Hostel Management */}
            <li onClick={() => toggleMenu("hostel")}>
              Hostel Management {expandedMenus.hostel ? "▲" : "▼"}
            </li>
            {expandedMenus.hostel && (
              <ul className={styles.submenu}>
                {["review", "merit", "vacant", "seat"].map((section, index) => (
                  <li key={index} onClick={() => setActiveSection(section)}>
                    {section === "review" && "🔍 Review Application"}
                    {section === "merit" && "📜 Generate Merit List"}
                    {section === "vacant" && "📜 Generate Vacant Rooms List"}
                    {section === "seat" && "📋 Edit Seat Matrix"}
                  </li>
                ))}
              </ul>
            )}

            {/* Grievance Management */}
            <li onClick={() => toggleMenu("grievance")}>
              Grievance Management {expandedMenus.grievance ? "▲" : "▼"}
            </li>
            {expandedMenus.grievance && (
              <ul className={styles.submenu}>
                {["hostelComplaints", "messComplaints", "generalComplaints"].map((section, index) => (
                  <li key={index} onClick={() => setActiveSection(section)}>
                    {section === "hostelComplaints" && "🔍 View Hostel Complaints"}
                    {section === "messComplaints" && "🔍 View Mess Complaints"}
                    {section === "generalComplaints" && "🔍 View General Complaints"}
                  </li>
                ))}
              </ul>
            )}

            {/* Mess Management */}
            <li onClick={() => toggleMenu("mess")}>
              Mess Management {expandedMenus.mess ? "▲" : "▼"}
            </li>
            {expandedMenus.mess && (
              <ul className={styles.submenu}>
                {["updateMenu", "payments", "inventory"].map((section, index) => (
                  <li key={index} onClick={() => setActiveSection(section)}>
                    {section === "updateMenu" && "📅 Update Mess Menu"}
                    {section === "payments" && "💳 Manage Payments"}
                    {section === "inventory" && "🛒 Track Inventory"}
                  </li>
                ))}
              </ul>
            )}

            {/* Reports */}
            <li onClick={() => toggleMenu("reports")}>
              Reports {expandedMenus.reports ? "▲" : "▼"}
            </li>
            {expandedMenus.reports && (
              <ul className={styles.submenu}>
                {["hostelReport", "grievanceReport"].map((section, index) => (
                  <li key={index} onClick={() => setActiveSection(section)}>
                    {section === "hostelReport" && "📜 Hostel Management Report"}
                    {section === "grievanceReport" && "📜 Grievance Management Report"}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={styles.dashboard}>
        {/* Header */}
        <header className={styles.header}>
          <img src="/images/vjti_logo.svg" alt="College Logo" className={styles.logo} />
          <h1 className={styles.collegeName}>Veermata Jijabai Technological Institute</h1>
        </header>

        {/* Dynamic Content */}
        <main className={styles.main}>
          <h1 className={styles.heading}>
            {activeSection === "dashboard" && "🏢 Admin Dashboard - Hostel Management"}
            {activeSection === "review" && "🔍 Review Applications"}
            {activeSection === "merit" && "📜 Generate Merit List"}
            {activeSection === "vacant" && "📜 Generate Vacant Rooms List"}
            {activeSection === "seat" && "📋 Edit Seat Matrix"}
            {activeSection === "hostelComplaints" && "🔍 View Hostel Complaints"}
            {activeSection === "messComplaints" && "🔍 View Mess Complaints"}
            {activeSection === "generalComplaints" && "🔍 View General Complaints"}
            {activeSection === "updateMenu" && "📅 Update Mess Menu"}
            {activeSection === "payments" && "💳 Manage Payments"}
            {activeSection === "inventory" && "🛒 Track Inventory"}
            {activeSection === "hostelReport" && "📜 Hostel Management Report"}
            {activeSection === "grievanceReport" && "📜 Grievance Management Report"}
          </h1>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2025 Veermata Jijabai Technological Institute. All Rights Reserved.</p>
          <p>Powered by FYMCA-2024-2025</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
