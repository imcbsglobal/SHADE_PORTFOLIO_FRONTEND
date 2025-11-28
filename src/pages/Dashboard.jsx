import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, Calendar, Filter, X, Image, Video } from "lucide-react";

const Dashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [stats, setStats] = useState({
    smiles: 0,
    clients: 0,
    ceremonials: 0,
    demonstrations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://shade.imcbs.com/api/dashboard/", {
        withCredentials: true,
      });
      
      setVisitors(res.data.visitors);
      setFilteredVisitors(res.data.visitors);
      setTotalVisitors(res.data.total_visitors);
      setStats({
        smiles: res.data.smiles || 0,
        clients: res.data.clients || 0,
        ceremonials: res.data.ceremonials || 0,
        demonstrations: res.data.demonstrations || 0
      });
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setSelectedDate(dateValue);

    if (!dateValue) {
      setFilteredVisitors(visitors);
      return;
    }

    const filtered = visitors.filter((v) => {
      const visitorDate = new Date(v.created_at);
      const localDate = new Date(
        visitorDate.getTime() - visitorDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      return localDate === dateValue;
    });

    setFilteredVisitors(filtered);
  };

  const handleShowToday = () => {
    const todayStr = new Date().toISOString().split("T")[0];
    setSelectedDate(todayStr);

    const filtered = visitors.filter((v) => {
      const visitorDate = new Date(v.created_at);
      const localDate = new Date(
        visitorDate.getTime() - visitorDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      return localDate === todayStr;
    });

    setFilteredVisitors(filtered);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-700 mb-8">Admin Dashboard</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-teal-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Visitors</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{totalVisitors}</p>
                  </div>
                  <div className="bg-teal-100 p-4 rounded-full">
                    <Users className="w-8 h-8 text-teal-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Smiles</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.smiles}</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-full">
                    <Image className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Our Clients</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.clients}</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Video className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Ceremonials</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.ceremonials}</p>
                  </div>
                  <div className="bg-pink-100 p-4 rounded-full">
                    <Calendar className="w-8 h-8 text-pink-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter Visitors</h2>
              
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <label className="font-semibold text-gray-700">Filter by Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="border-2 border-teal-200 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
                />
                {selectedDate && (
                  <button
                    onClick={() => {
                      setSelectedDate("");
                      setFilteredVisitors(visitors);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </button>
                )}
                <button
                  onClick={handleShowToday}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Show Today
                </button>
              </div>

              {selectedDate && (
                <p className="text-gray-600 mb-4">
                  Visitors on <span className="font-semibold text-teal-700">{selectedDate}</span>: {filteredVisitors.length}
                </p>
              )}
            </div>

            {/* Visitor Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Visitor List</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-teal-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-teal-700">Sl.No</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-teal-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-teal-700">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-teal-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-teal-700">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredVisitors.length > 0 ? (
                      filteredVisitors.map((visitor, index) => (
                        <tr key={visitor.id} className="hover:bg-teal-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{visitor.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{visitor.phone}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{visitor.email || "—"}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(visitor.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 italic">
                          No visitors found for this date.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;