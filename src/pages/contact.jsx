import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-teal-700 py-12 text-center overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
        <h1 className="text-4xl font-bold text-white mb-2 relative z-10 drop-shadow-md">
          Contact Us
        </h1>
        <p className="text-white/90 text-base max-w-2xl mx-auto relative z-10">
          Have questions or collaboration ideas? We'd love to hear from you — our team will respond shortly.
        </p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col lg:flex-row justify-center gap-10 px-6 py-16 max-w-6xl mx-auto w-full">
        {/* Left Side - Info Card */}
        <div className="flex-1 bg-gradient-to-br from-teal-100 via-teal-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-semibold text-teal-600 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have a project in mind or need assistance? Let's start a
            conversation.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-teal-400 text-white p-3 rounded-full text-lg">
                📧
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <a
                  href="mailto:info@imcbs.com"
                  className="text-gray-700 hover:text-teal-600"
                >
                  info@imcbs.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-teal-400 text-white p-3 rounded-full text-lg">
                📞
              </div>
              <div>
                <p className="font-semibold text-gray-800">Phone</p>
                <a
                  href="tel:+919447049940"
                  className="text-gray-700 hover:text-teal-600"
                >
                  +91 94470 49940
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-teal-400 text-white p-3 rounded-full text-lg">
                📍
              </div>
              <div>
                <p className="font-semibold text-gray-800">Office Address</p>
                <p className="text-gray-700">
                  IMC Business Solutions LLP <br />
                  Palakkunnummal Building, Near Govt Ayurveda Hospital, Emily,
                  <br />
                  Kalpetta, Wayanad, Kerala – 673121
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Message Form */}
        <div className="flex-1 bg-teal-50 border border-teal-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300">
          <h2 className="text-3xl font-semibold text-teal-600 mb-6 text-center">
            Send a Message
          </h2>

          <form className="space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name *"
                className="w-full border border-teal-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
              <input
                type="text"
                placeholder="Last Name *"
                className="w-full border border-teal-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              />
            </div>

            <input
              type="email"
              placeholder="Email *"
              className="w-full border border-teal-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            <input
              type="tel"
              placeholder="Phone *"
              className="w-full border border-teal-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
            <textarea
              placeholder="Your Message *"
              rows="4"
              className="w-full border border-teal-200 bg-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer Gradient Accent */}
      <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-700 rounded-t-full mt-10"></div>
    </div>
  );
};

export default Contact;