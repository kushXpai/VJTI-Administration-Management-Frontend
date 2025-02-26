import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiSearch, FiHome, FiCoffee, FiAlertCircle, FiUser } from 'react-icons/fi';
import { FaBuilding } from "react-icons/fa";


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

export default function StudentDashboard() {
  const [currentDate] = useState(
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
              <Link href="#" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
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
            JD
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Welcome Banner */}
          <div className="bg-red-800 rounded-lg p-6 mb-6">
            <h2 className="text-white text-2xl font-semibold mb-1">Welcome back, John Doe!</h2>
            <p className="text-white opacity-90">Academic Year 2024-25 | Master of Computer Application</p>
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