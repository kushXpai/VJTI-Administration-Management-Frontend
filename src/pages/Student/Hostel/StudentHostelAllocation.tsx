import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiHome, FiCoffee, FiAlertCircle, FiUser, FiSearch, FiCheck, FiInfo, FiX, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi';
import { FaBuilding, FaUserPlus } from "react-icons/fa";

// Types
interface Room {
  id: string;
  block: string;
  roomNumber: string;
  type: string;
  capacity: number;
  occupancy: number;
  floor: number;
  amenities: string[];
  status: 'available' | 'full' | 'maintenance' | 'reserved';
}

interface AllocationPeriod {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'closed';
}

export default function StudentHostelAllocation() {
  // State for selected filters
  const [blockFilter, setBlockFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isNewStudent, setIsNewStudent] = useState<boolean>(false);
  const [showNewStudentForm, setShowNewStudentForm] = useState<boolean>(false);
  
  // Sample data
  const rooms: Room[] = [
    {
      id: "A204",
      block: "A",
      roomNumber: "204",
      type: "Standard Double",
      capacity: 2,
      occupancy: 1,
      floor: 2,
      amenities: ["Study table", "Wardrobe", "Ceiling fan", "Wi-Fi"],
      status: "available"
    },
    {
      id: "A205",
      block: "A",
      roomNumber: "205",
      type: "Standard Double",
      capacity: 2,
      occupancy: 2,
      floor: 2,
      amenities: ["Study table", "Wardrobe", "Ceiling fan", "Wi-Fi"],
      status: "full"
    },
    {
      id: "B101",
      block: "B",
      roomNumber: "101",
      type: "Standard Single",
      capacity: 1,
      occupancy: 0,
      floor: 1,
      amenities: ["Study table", "Wardrobe", "Ceiling fan", "Wi-Fi"],
      status: "available"
    },
    {
      id: "B102",
      block: "B",
      roomNumber: "102",
      type: "Premium Single",
      capacity: 1,
      occupancy: 0,
      floor: 1,
      amenities: ["Study table", "Wardrobe", "Ceiling fan", "Wi-Fi", "Attached bathroom"],
      status: "reserved"
    },
    {
      id: "C304",
      block: "C",
      roomNumber: "304",
      type: "Standard Triple",
      capacity: 3,
      occupancy: 2,
      floor: 3,
      amenities: ["Study table", "Wardrobe", "Ceiling fan", "Wi-Fi"],
      status: "available"
    },
    {
      id: "C305",
      block: "C",
      roomNumber: "305",
      type: "Standard Triple",
      capacity: 3,
      occupancy: 0,
      floor: 3,
      amenities: ["Study table", "Wardrobe", "Ceiling fan", "Wi-Fi"],
      status: "maintenance"
    }
  ];

  const allocationPeriods: AllocationPeriod[] = [
    {
      id: 1,
      name: "2024-25 Academic Year Allocation",
      startDate: "March 1, 2025",
      endDate: "March 15, 2025",
      status: "upcoming"
    },
    {
      id: 2,
      name: "Summer Internship Allocation",
      startDate: "April 10, 2025",
      endDate: "April 20, 2025",
      status: "upcoming"
    },
    {
      id: 3,
      name: "2023-24 Academic Year Allocation",
      startDate: "March 1, 2024",
      endDate: "March 15, 2024",
      status: "closed"
    }
  ];

  // Filter rooms based on current filters
  const filteredRooms = rooms.filter(room => {
    // Apply block filter
    if (blockFilter !== 'all' && room.block !== blockFilter) return false;
    
    // Apply type filter
    if (typeFilter !== 'all' && room.type !== typeFilter) return false;
    
    // Apply search query
    if (searchQuery && !`${room.block}${room.roomNumber}`.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Get unique room types for filter
  const roomTypes = Array.from(new Set(rooms.map(room => room.type)));
  
  // Get room status badge style
  const getRoomStatusBadge = (status: Room['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-gray-100 text-gray-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Toggle new student form
  const toggleNewStudentForm = () => {
    setShowNewStudentForm(!showNewStudentForm);
  };

  // Handle new student application
  const handleNewStudentApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the form data
    alert("Your application has been submitted successfully! We will review and notify you soon.");
    setShowNewStudentForm(false);
    setIsNewStudent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Head>
        <title>VJTI Hostel Portal - Hostel Allocation</title>
        <meta name="description" content="Hostel room allocation for VJTI students" />
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
              <Link href="/Student/StudentDashboard" className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <FiHome className="mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center px-4 py-3 rounded-lg bg-red-50 text-red-800 font-medium">
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
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-gray-800">Hostel Allocation</h1>
          
          {/* User Profile */}
          <div className="h-10 w-10 bg-red-800 rounded-full flex items-center justify-center text-white font-medium cursor-pointer">
            JS
          </div>
        </nav>

        {/* Content */}
        <div className="p-6">
          {/* Current Allocation Status - Only show for returning students*/}
          {!isNewStudent ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Current Allocation</h2>
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <div className="flex items-center mb-2">
                    <FaBuilding className="text-red-800 mr-2" />
                    <h3 className="text-gray-700 font-medium">Room A-204</h3>
                    <span className="ml-3 px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Confirmed</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Block A, Standard Double, Second Floor</p>
                  <p className="text-gray-600 text-sm mb-3">Roommate: Not assigned yet</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="mr-1" /> Valid until: May 30, 2025
                  </div>
                </div>
                
                <div className="mt-6 md:mt-0">
                  <button className="px-4 py-2 bg-red-100 text-red-800 rounded font-medium hover:bg-red-200 transition">
                    Request Room Change
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Application Status</h2>
              <div className="flex items-center mb-2">
                <FiInfo className="text-blue-500 mr-2" />
                <h3 className="text-gray-700 font-medium">Your application is under review</h3>
                <span className="ml-3 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Pending</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">We will notify you once your application is processed and a room is assigned.</p>
              <div className="flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-1" /> Submitted on: February 27, 2025
              </div>
            </div>
          )}
          
          {/* New Student Application */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">New Student Application</h2>
              {!isNewStudent && (
                <button 
                  onClick={toggleNewStudentForm}
                  className="px-4 py-2 bg-red-800 text-white rounded font-medium hover:bg-red-900 transition flex items-center"
                >
                  <FaUserPlus className="mr-2" /> Apply for Hostel
                </button>
              )}
            </div>
            
            {showNewStudentForm && (
              <div className="mt-4">
                <form onSubmit={handleNewStudentApplication}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                      <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800">
                        <option>Computer Engineering</option>
                        <option>Information Technology</option>
                        <option>Electronics Engineering</option>
                        <option>Mechanical Engineering</option>
                        <option>Civil Engineering</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800">
                        <option>First Year</option>
                        <option>Second Year</option>
                        <option>Third Year</option>
                        <option>Final Year</option>
                        <option>M.Tech</option>
                        <option>PhD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <input type="tel" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                      <textarea rows={3} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Room Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800">
                        {roomTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Block</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800">
                        <option value="any">Any Block</option>
                        <option value="A">Block A</option>
                        <option value="B">Block B</option>
                        <option value="C">Block C</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center space-x-4">
                    <div className="flex items-center">
                      <input id="declaration" type="checkbox" required className="h-4 w-4 text-red-800 focus:ring-red-800 border-gray-300 rounded" />
                      <label htmlFor="declaration" className="ml-2 block text-sm text-gray-700">
                        I declare that the information provided is true to the best of my knowledge
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    <button type="submit" className="px-6 py-2 bg-red-800 text-white rounded font-medium hover:bg-red-900 transition">
                      Submit Application
                    </button>
                    <button type="button" onClick={toggleNewStudentForm} className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {!showNewStudentForm && !isNewStudent && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <FiInfo className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      New to VJTI? Apply for hostel accommodation by clicking the "Apply for Hostel" button.
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      The academic year 2024-25 hostel allocation is now open until March 15, 2025.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Room Search & Availability */}
          {/* <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Room Availability</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
                />
              </div>
              
              <div className="w-full md:w-auto">
                <select 
                  value={blockFilter}
                  onChange={(e) => setBlockFilter(e.target.value)}
                  className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
                >
                  <option value="all">All Blocks</option>
                  <option value="A">Block A</option>
                  <option value="B">Block B</option>
                  <option value="C">Block C</option>
                </select>
              </div>
              
              <div className="w-full md:w-auto">
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
                >
                  <option value="all">All Room Types</option>
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredRooms.map(room => (
                <div 
                  key={room.id}
                  onClick={() => setSelectedRoom(room)} 
                  className={`p-4 border border-gray-200 rounded-lg cursor-pointer transition hover:border-red-800 hover:shadow-md ${selectedRoom?.id === room.id ? 'border-red-800 ring-1 ring-red-800' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-gray-800 font-medium">
                      {room.block}-{room.roomNumber}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoomStatusBadge(room.status)}`}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{room.type}</p>
                  <p className="text-gray-600 text-sm mb-2">Floor {room.floor}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiUser className="mr-1" /> {room.occupancy}/{room.capacity} Occupied
                  </div>
                </div>
              ))}
            </div>
            
            {selectedRoom && (
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Room Details: {selectedRoom.block}-{selectedRoom.roomNumber}</h3>
                  <button onClick={() => setSelectedRoom(null)} className="text-gray-400 hover:text-gray-600">
                    <FiX />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Room Type</p>
                      <p className="font-medium">{selectedRoom.type}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="font-medium">Block {selectedRoom.block}, Floor {selectedRoom.floor}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Occupancy</p>
                      <p className="font-medium">{selectedRoom.occupancy}/{selectedRoom.capacity} Occupied</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <p className="font-medium capitalize">{selectedRoom.status}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Amenities</p>
                      <ul className="mt-2 space-y-1">
                        {selectedRoom.amenities.map((amenity, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <FiCheck className="text-green-500 mr-2" /> {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Fee Structure</p>
                      <div className="flex items-center mt-2">
                        <FiDollarSign className="text-gray-500 mr-2" />
                        <p className="text-sm">₹50,000 per year</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <div className="bg-blue-50 p-4 rounded-lg flex items-start">
                    <FiInfo className="text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800">Room preferences can be submitted during allocation periods only.</p>
                      <p className="text-sm text-blue-800 mt-1">The next allocation period starts on March 1, 2025.</p>
                    </div>
                  </div>
                </div>
                
                {selectedRoom.status === 'available' && (
                  <div className="mt-6">
                    <button disabled className="px-4 py-2 bg-gray-200 text-gray-500 rounded font-medium cursor-not-allowed">
                      Request Room (Available during allocation period)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>  */}
        </div>
      </main>
    </div>
  );
}