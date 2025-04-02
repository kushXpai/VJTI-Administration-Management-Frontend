import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';
import Link from 'next/link';
import { FiSearch, FiHome, FiCoffee, FiAlertCircle, FiUser, FiLogOut } from 'react-icons/fi';
import { FaBuilding } from "react-icons/fa";
import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4444';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Activity {
  id: number;
  title: string;
  time: string;
  type: 'success' | 'secondary' | 'warning' | 'error';
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  type: 'primary' | 'secondary' | 'neutral';
}

interface StudentData {
  id: string;
  email: string;
  name: string;
  date_of_birth: string;
  gender: string;
  mobile_number: string;
  father_name: string | null;
  father_mobile: string | null;
  mother_name: string | null;
  mother_mobile: string | null;
  guardian_name: string | null;
  guardian_mobile: string | null;
  present_address_line1: string;
  present_address_line2: string | null;
  present_state: string;
  present_city: string;
  present_pin_code: string;
  permanent_address_line1: string;
  permanent_address_line2: string | null;
  permanent_state: string;
  permanent_city: string;
  permanent_pin_code: string;
  cet_application_id: string;
  cet_rank: string;
  course: string;
  category: string;
  is_pwd: boolean;
  pwd_details: string | null;
  is_ews: boolean;
  is_religious_minority: boolean;
  religious_minority_details: string | null;
  created_at: string;
  updated_at: string;
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  // Current date
  const [currentDate] = useState(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  );

  // Handle logout
  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("studentData");
      localStorage.removeItem("authToken");

      // Clear session storage too
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("studentData");
      sessionStorage.removeItem("authToken");

      // Redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // If router.push fails, do a hard redirect
      window.location.href = "/";
    }
  };

  useEffect(() => {
    // Check if we have an active session
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        console.log("No active session found");
        const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

        if (!userId) {
          console.error("No userId found. Redirecting to login...");
          router.push("/Login");
          return;
        }
      }
    };

    checkSession();

    // First check local storage
    const storedStudentData = localStorage.getItem("studentData") || sessionStorage.getItem("studentData");
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    console.log("Loading user details", userId);

    if (!userId) {
      console.error("No userId found. Redirecting to login...");
      router.push("/Login");
      return;
    }

    // If we already have the student data in storage, use it
    if (storedStudentData) {
      try {
        const parsedData = JSON.parse(storedStudentData);
        setStudentData(parsedData);
        setLoading(false);
        return;
      } catch (error) {
        console.error("Error parsing stored student data:", error);
        // Continue to fetch from API if parsing fails
      }
    }

    // Try to fetch student data from Supabase
    const fetchStudentDataFromSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setStudentData(data);
          // Store in both localStorage and sessionStorage for backup
          localStorage.setItem("studentData", JSON.stringify(data));
          sessionStorage.setItem("studentData", JSON.stringify(data));
          setLoading(false);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error fetching from Supabase:", error);
        return false;
      }
    };

    // Fallback to API if Supabase fetch fails
    const fetchStudentDataFromAPI = async () => {
      try {
        const response = await fetch(`${API_URL}/api/students/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setStudentData(data);
          // Also store in storage for future use
          localStorage.setItem("studentData", JSON.stringify(data));
          sessionStorage.setItem("studentData", JSON.stringify(data));
        } else {
          console.error("Failed to fetch student data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching student data from API:", error);
      } finally {
        setLoading(false);
      }
    };

    // Try Supabase first, then fall back to API
    const fetchData = async () => {
      const supabaseSuccess = await fetchStudentDataFromSupabase();
      if (!supabaseSuccess) {
        await fetchStudentDataFromAPI();
      }
    };

    fetchData();
  }, [router]);

  // Function to get the appropriate Tailwind classes for activity dots
  const getActivityDotClass = (type: Activity['type']): string => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-amber-500';
      case 'secondary': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  // Function to get the appropriate Tailwind classes for announcement backgrounds
  const getAnnouncementClass = (type: Announcement['type']): string => {
    switch (type) {
      case 'primary': return 'bg-red-50';
      case 'secondary': return 'bg-purple-50';
      case 'neutral': return 'bg-gray-100';
      default: return 'bg-white';
    }
  };

  // Function to get the appropriate Tailwind classes for announcement title colors
  const getAnnouncementTitleClass = (type: Announcement['type']): string => {
    switch (type) {
      case 'primary': return 'text-red-800';
      case 'secondary': return 'text-purple-700';
      case 'neutral': return 'text-gray-900';
      default: return 'text-gray-900';
    }
  };

  // Function to get initials from student name
  const getInitials = (name: string): string => {
    if (!name) return "ST";
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );

  const activities: Activity[] = [
    {
      id: 1,
      title: "Mess fee paid successfully",
      time: "Today, 9:30 AM",
      type: "success"
    },
    {
      id: 2,
      title: "Room cleaning request submitted",
      time: "Yesterday, 4:15 PM",
      type: "secondary"
    },
    {
      id: 3,
      title: "Grievance #1024 status updated",
      time: "Feb 24, 2025, 10:45 AM",
      type: "warning"
    },
    {
      id: 4,
      title: "Hostel fee deadline reminder",
      time: "Feb 22, 2025, 8:00 AM",
      type: "error"
    }
  ];

  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Maintenance Notice",
      description: "Water supply will be disrupted on Feb 28 from 10 AM - 2 PM",
      type: "primary"
    },
    {
      id: 2,
      title: "Mess Menu Update",
      description: "Special dinner planned for College Day on March 5th",
      type: "secondary"
    },
    {
      id: 3,
      title: "Hostel Committee",
      description: "Elections nominations open until March 10th",
      type: "neutral"
    }
  ];

  const courseMapping: Record<string, string> = {
    // Diploma Courses
    diplomaCivilEngineering: "Diploma in Civil Engineering",
    diplomaElectricalEngineering: "Diploma in Electrical Engineering",
    diplomaElectronicsEngineering: "Diploma in Electronics Engineering",
    diplomaMechanicalEngineering: "Diploma in Mechanical Engineering",
    diplomaTextileManufacturers: "Diploma in Textile Manufacturers",
    diplomaChemicalEngineering: "Diploma in Chemical Engineering",

    // Undergraduate Courses (B.Tech)
    btechCivilEngineering: "B.Tech Degree in Civil Engineering",
    btechComputerEngineering: "B.Tech Degree in Computer Engineering",
    btechElectricalEngineering: "B.Tech Degree in Electrical Engineering",
    btechElectronicsEngineering: "B.Tech Degree in Electronics Engineering",
    btechElectronicsTelecommunicationEngineering: "B.Tech Degree in Electronics & Telecommunication Engineering",
    btechInformationTechnology: "B.Tech Degree in Information Technology",
    btechMechanicalEngineering: "B.Tech Degree in Mechanical Engineering",
    btechProductionEngineering: "B.Tech Degree in Production Engineering",
    btechTextileTechnology: "B.Tech Degree in Textile Technology",

    // Postgraduate Courses (M.Tech & MCA)
    mca: "Master of Computer Application",
    mtechCivilEngineering: "M.Tech Degree in Civil Engineering",
    mtechComputerEngineering: "M.Tech Degree in Computer Engineering",
    mtechElectricalEngineering: "M.Tech Degree in Electrical Engineering",
    mtechIOT: "M.Tech Degree in Internet of Things (IOT)",
    mtechElectronicsTelecommunicationEngineering: "M.Tech Degree in Electronics & Telecommunication Engineering",
    mtechMechanicalEngineering: "M.Tech Degree in Mechanical Engineering",
    mtechProductionEngineering: "M.Tech Degree in Production Engineering",
    mtechProjectManagement: "M.Tech Degree in Project Management",
    mtechTechnicalTextile: "M.Tech Degree in Technical Textile",
    mtechDefenceTechnology: "M.Tech Degree in Defence Technology",
  };

  // Ensure studentData is loaded before mapping the course name
  const fullCourseName = studentData ? courseMapping[studentData.course] || "Unknown Course" : "Unknown Course";

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based (0 = Jan, 11 = Dec)

  const academicYearStart = currentMonth >= 6 ? currentYear : currentYear - 1;
  const academicYearEnd = academicYearStart + 1;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <title>VJTI Hostel Portal - Dashboard</title>
        <meta name="description" content="Student dashboard for VJTI Hostel Portal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <aside className="w-60 bg-white h-screen fixed shadow-md">
        {/* Sidebar Header */}
        <div className="bg-red-900 h-20 flex items-center justify-center">
          <h1 className="text-white text-lg font-bold">VJTI Hostel Portal</h1>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="#" className="flex items-center px-4 py-3 rounded-lg bg-red-50 text-red-800 font-medium">
                <FiHome className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="/Student/Hostel/StudentHostelAllocation" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FaBuilding className="mr-3" /> Hostel Allocation
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FiCoffee className="mr-3" /> Mess Management
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FiAlertCircle className="mr-3" /> Grievances
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FiUser className="mr-3" /> Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-red-700"
              >
                <FiLogOut className="mr-3" />
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-60 w-full">
        {/* Top Navbar */}
        <nav className="h-20 bg-white flex justify-between items-center px-6 shadow-sm">
          {/* Search Bar */}
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 focus:bg-white"
            />
          </div>

          {/* Date Display */}
          <div className="text-gray-600">{currentDate}</div>

          {/* User Profile */}
          <div className="h-10 w-10 bg-red-800 rounded-full flex items-center justify-center text-white font-medium cursor-pointer">
            {studentData ? getInitials(studentData.name) : "ST"}
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Banner */}
          <div className="bg-red-800 rounded-lg p-6 mb-6">
            <h2 className="text-white text-2xl font-semibold mb-1">
              Welcome back, {studentData?.name || "Student"}!
            </h2>
            <p className="text-white opacity-90">
              Academic Year {academicYearStart}-{academicYearEnd.toString().slice(-2)} | {fullCourseName}
            </p>
          </div>

          {/* Student Info Banner */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
            <h3 className="text-gray-900 text-lg font-semibold mb-3">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">CET Application ID</p>
                <p className="text-gray-900 font-medium">{studentData?.cet_application_id || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">CET Rank</p>
                <p className="text-gray-900 font-medium">{studentData?.cet_rank || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Category</p>
                <p className="text-gray-900 font-medium">{studentData?.category || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Mobile Number</p>
                <p className="text-gray-900 font-medium">{studentData?.mobile_number || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-900 font-medium">{studentData?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Home City</p>
                <p className="text-gray-900 font-medium">{studentData?.permanent_city || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Room Assignment */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-gray-900 text-base font-semibold mb-2">Room Assignment</h3>
              <p className="text-red-800 text-2xl font-bold mb-1">A-204</p>
              <p className="text-gray-600 text-sm">Block A, Second Floor</p>
            </div>

            {/* Mess Plan */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-gray-900 text-base font-semibold mb-2">Mess Plan</h3>
              <p className="text-red-800 text-2xl font-bold mb-1">Veg Plan</p>
              <p className="text-gray-600 text-sm">Balance: ₹3,500</p>
            </div>

            {/* Grievances */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-gray-900 text-base font-semibold mb-2">Grievances</h3>
              <p className="text-red-800 text-2xl font-bold mb-1">1 Open</p>
              <p className="text-gray-600 text-sm">2 Resolved this month</p>
            </div>
          </div>

          {/* Activity and Announcements Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <h3 className="text-gray-900 text-xl font-semibold mb-4">Recent Activities</h3>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="relative pl-8 pb-6 last:pb-0">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1.5 h-4 w-4 rounded-full ${getActivityDotClass(activity.type)}`} />

                    {/* Timeline line */}
                    {index < activities.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200" />
                    )}

                    {/* Activity content */}
                    <h4 className="text-gray-900 font-medium mb-1">{activity.title}</h4>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <h3 className="text-gray-900 text-xl font-semibold mb-4">Announcements</h3>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className={`p-4 rounded-lg ${getAnnouncementClass(announcement.type)}`}
                    >
                      <h4 className={`font-medium mb-1 ${getAnnouncementTitleClass(announcement.type)}`}>
                        {announcement.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{announcement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}