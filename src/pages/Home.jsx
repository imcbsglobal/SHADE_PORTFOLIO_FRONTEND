import React, { useState, useEffect } from "react";
import taskLogo from "../assets/TASK11.png";
import heroImage from "../assets/hospitality-D73Uc8Dz.jpeg";
import healthcareImg from "../assets/healthcareimg-BDFJgVgk.jpg";

// Logos
import shadeLogo from "../assets/shade.png";
import magnetLogo from "../assets/magnet.png";
import vtaskLogo from "../assets/vtask.png";
import dineLogo from "../assets/dine.png";
import starstayLogo from "../assets/starstay.png";
import auricLogo from "../assets/auric.png";
import flamesLogo from "../assets/flames.png";
import rentalLogo from "../assets/rental.png";
import lavillaLogo from "../assets/lavilla.png";
import biltonLogo from "../assets/bilton.png";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const alreadyLogged = localStorage.getItem("userLoggedIn");
    if (!alreadyLogged) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Clients
  const clients = [
    { name: "Neuvive", url: "https://neuvive.in/" },
    { name: "K B Steels", url: "https://kbsteels.com/" },
    { name: "Lakkidi Mist Resort", url: "https://lakkidimist.com/" },
    { name: "ABSY IT Solutions", url: "https://absyitsolutions.com/" },
    { name: "HyperCity Hypermarket", url: "https://hypercityhypermarket.com/" },
    { name: "IMC Portfolio", url: "https://portfolio.imcbs.com/websites" },
    { name: "Ayy Radiamonds", url: "https://ayyradiamonds.com/" },
    { name: "Abhaya Ayur", url: "https://abhayaayur.com/" },
    { name: "Alo Physio", url: "https://www.alophysio.com/" },
    { name: "Panuk Online", url: "https://panukonline.com/" },
    { name: "Bilton Hotel", url: "https://biltonhotel.com/" },
  ];

  // Apps / Digital Solutions
  const apps = [
    { name: "TASK", logo: taskLogo, desc: "Powerful inventory management.", size: "w-32 h-28" },
    { name: "SHADE", logo: shadeLogo, desc: "Advanced hospital management.", size: "w-32 h-28" },
    { name: "MAGNET", logo: magnetLogo, desc: "Smart institution management.", size: "w-20 h-10" },
    { name: "VTASK", logo: vtaskLogo, desc: "Simplify pharmacy operations.", size: "w-32 h-28" },
    { name: "FLAMES", logo: flamesLogo, desc: "Gas cylinder tracking made simple.", size: "w-32 h-28" },
    { name: "RENTAL", logo: rentalLogo, desc: "Wedding dress & jewelry rental.", size: "w-32 h-28" },
    { name: "AURIC", logo: auricLogo, desc: "Jewelry management system.", size: "w-32 h-24" },
    { name: "DINE", logo: dineLogo, desc: "Restaurant billing system.", size: "w-24 h-12" },
    { name: "STARSTAY", logo: starstayLogo, desc: "Hotel management software.", size: "w-28 h-14" },
  ];

  return (
    <div className="font-[Outfit] text-gray-800 bg-white">

      {/* ================= HERO SECTION - HEALTHCARE MANAGEMENT ================= */}
      <section className="relative w-full bg-white py-12 md:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
            
            {/* LEFT SIDE - IMAGE */}
            <div className="flex items-start justify-center lg:justify-start pt-0 lg:pt-4">
              <div className="w-full max-w-[550px] lg:max-w-[600px]">
                <img
                  src={healthcareImg}
                  alt="Healthcare Professional"
                  className="w-full h-auto min-h-[700px] lg:min-h-[450px] rounded-[24px] shadow-lg object-cover"
                />
              </div>
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className="flex flex-col justify-start">
              
              {/* ========== TITLE + LOGO SIDE-BY-SIDE ========== */}
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-[40px] md:text-[50px] lg:text-[58px] font-bold text-[#1a1a1a] leading-[1]">
                  Healthcare Management
                </h1>

                <img
                  src={shadeLogo}
                  alt="SHADE Logo"
                  className="h-[90px] md:h-[100px] lg:h-[210px] object-contain"
                />
              </div>

              {/* FIRST PARAGRAPH */}
              <p className="text-gray-800 text-[15px] md:text-[16px] leading-[1.75] mb-5 text-justify">
                We empower healthcare institutions with our advanced Hospital Information Management System 'SHADE'—a comprehensive solution designed to optimize hospital workflows, enhance patient care, and improve operational efficiency.
                Our HIMS software integrates patient management, billing, electronic medical records (EMR), appointment scheduling, pharmacy, lab management, and more—all in one seamless platform. Whether you run a single hospital, a multi-specialty clinic, or a healthcare network, our system ensures smooth and automated operations, reducing paperwork and enhancing productivity.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES SECTION ================= */}
      <section className="relative w-full bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 mb-3">
              Key Features of <span className="text-gray-800">SHADE</span>
            </h2>
            <p className="text-gray-600 text-base max-w-3xl mx-auto">
              Transform your healthcare operations with intelligent automation and streamlined workflows
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Feature Card 1 */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Patient Management</h3>
              <p className="text-gray-600 text-xs">Complete patient records, admission, discharge, and transfer management with digital health records.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Appointment Scheduling</h3>
              <p className="text-gray-600 text-xs">Easy online booking, automated reminders, and efficient doctor schedule management.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Electronic Medical Records</h3>
              <p className="text-gray-600 text-xs">Secure, centralized EMR system for instant access to patient history and medical data.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Billing & Insurance</h3>
              <p className="text-gray-600 text-xs">Automated billing, insurance claims processing, and payment tracking with detailed reports.</p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Lab & Pharmacy</h3>
              <p className="text-gray-600 text-xs">Integrated lab test management, results tracking, and pharmacy inventory control.</p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white rounded-xl p-4 shadow-md border-2 border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Analytics & Reports</h3>
              <p className="text-gray-600 text-xs">Comprehensive dashboards with real-time insights, financial reports, and performance metrics.</p>
            </div>

          </div>

        

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gradient-to-r from-teal-50 to-white text-gray-800 text-center py-12 border-t border-teal-200">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 bg-gradient-to-r from-teal-600 to-cyan-600 text-transparent bg-clip-text drop-shadow-sm">
          Innovative Software by IMC Business Solutions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10 px-6">
          {apps.map((app, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 border border-teal-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[200px]"
            >
              <div className="flex justify-center items-center h-20 w-full mb-3">
                <img src={app.logo} alt={app.name} className={`${app.size} object-contain`} />
              </div>
              <h3 className="font-bold text-sm md:text-base text-teal-700 uppercase tracking-wide text-center mb-1">
                {app.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 text-center max-w-[160px]">{app.desc}</p>
            </div>
          ))}
        </div>

        {/* ================= DIGITAL SOLUTIONS ================= */}
        <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-cyan-100 text-center relative overflow-hidden">
          <h2 className="text-4xl font-bold text-teal-700 mb-4 drop-shadow-sm">Our Digital Solutions</h2>
          <p className="text-base text-gray-700 max-w-3xl mx-auto mb-10 px-6">
            We deliver end-to-end digital solutions — from custom web apps to brand marketing — helping businesses grow faster and smarter.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
            {[
              { icon: "💻", title: "Website & Web Application", desc: "Custom websites and scalable web apps for every business need." },
              { icon: "📱", title: "Mobile App Development", desc: "User-friendly, high-performance apps for Android and iOS." },
              { icon: "🚀", title: "Digital Marketing", desc: "Boost your online presence and grow your brand visibility." },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-teal-200 shadow-md hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1 flex flex-col items-center text-center min-h-[160px]"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-teal-700 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-teal-50/30 to-white text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 text-transparent bg-clip-text mb-4 drop-shadow-sm">
            Our Developed Websites
          </h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto mb-10 px-6">
            Explore some of the premium websites designed and developed by{" "}
            <b className="text-teal-600">IMC Business Solutions</b> — combining creativity,
            performance, and business growth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {clients.map((site, index) => (
              <a
                key={index}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 backdrop-blur-md border border-teal-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col justify-center items-center text-center"
              >
                <h3 className="text-lg font-semibold text-teal-600 mb-2">
                  {site.name}
                </h3>
                <p className="text-gray-500 text-sm">Visit Website ↗</p>
              </a>
            ))}
          </div>
        </section>

        <a
          href="https://imcbs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md text-sm"
        >
          Visit → www.imcbs.com
        </a>

        <p className="text-sm font-medium text-gray-600 mt-4">
          © 2025 SHADE Healthcare Management | Developed by{" "}
          <span className="text-teal-600">IMC Business Solutions LLP</span>
        </p>
      </footer>
    </div>
  );
};

export default Home;