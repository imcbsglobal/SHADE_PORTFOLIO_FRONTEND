import React from "react";
import {
  ClipboardList,
  FileSearch,
  TestTube,
  FileText,
  Pill,
  Users,
  ShieldCheck,
  Scale,
  Hospital,
  Home,
  ClipboardType,
  Building,
  Eye,
  Ambulance,
} from "lucide-react";

const featureCards = [
  {
    icon: <ClipboardList size={35} className="text-orange-500" />,
    title: "OPD & Front Office System",
    description:
      "Hassle-free booking, scheduling, and queue management.",
  },
  {
    icon: <FileSearch size={35} className="text-orange-500" />,
    title: "Electronic Medical Records (EMR)",
    description:
      "Secure and centralized patient records for better diagnosis.",
  },
  {
    icon: <TestTube size={35} className="text-orange-500" />,
    title: "Laboratory & Diagnostic Management",
    description:
      "Integrated lab module for efficient processing and reporting.",
  },
  {
    icon: <FileText size={35} className="text-orange-500" />,
    title: "Scan & Procedures Billing",
    description:
      "Automated billing, claims processing & compliance.",
  },
  {
    icon: <Pill size={35} className="text-orange-500" />,
    title: "Pharmacy & Inventory Control",
    description:
      "Real-time tracking, expiry alerts & prescription management.",
  },
  {
    icon: <Users size={35} className="text-orange-500" />,
    title: "Doctor & Staff Management",
    description:
      "Scheduling, shift tracking & performance monitoring.",
  },
  {
    icon: <ShieldCheck size={35} className="text-orange-500" />,
    title: "Data Security & Compliance",
    description:
      "Advanced security ensuring privacy & regulatory adherence.",
  },
  {
    icon: <Scale size={35} className="text-orange-500" />,
    title: "Financial Transparency",
    description:
      "Clear financial insights for better decision-making.",
  },
];

const businessSectors = [
  { icon: <Hospital size={35} />, label: "Hospitals" },
  { icon: <Home size={35} />, label: "Clinics" },
  { icon: <ClipboardType size={35} />, label: "Medical Practices" },
  { icon: <Building size={35} />, label: "Dental Clinics" },
  { icon: <Eye size={35} />, label: "Eye Care Centers" },
  { icon: <Ambulance size={35} />, label: "Emergency Services" },
];

const Options = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="py-16 bg-[#cfe0db]">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          The Distinctive Edge of Our Shade
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10 max-w-7xl mx-auto mt-10">
          {featureCards.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h2 className="font-bold text-lg mb-2">{item.title}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Sectors Section */}
      <div className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
          Business Sectors We Support
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 max-w-6xl mx-auto">
          {businessSectors.map((sector, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 flex items-center justify-center border-2 border-gray-300 rounded-full hover:shadow-lg transition-all">
                {sector.icon}
              </div>
              <p className="mt-3 font-semibold text-gray-800">
                {sector.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Options;
