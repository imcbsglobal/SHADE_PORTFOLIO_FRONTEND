import { Smile, Users, Award, PlaySquare } from "lucide-react";

const Gallery = () => {
  const galleryCategories = [
    {
      title: "Smiles",
      description: "Capturing moments of joy and happiness",
      icon: <Smile className="w-12 h-12" />,
      path: "/gallery/smiles",
      gradient: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      count: 8
    },
    {
      title: "Our Clients",
      description: "Our valued partners and collaborators",
      icon: <Users className="w-12 h-12" />,
      path: "/gallery/clients",
      gradient: "from-blue-400 to-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      count: 4
    },
    {
      title: "Ceremonial",
      description: "Special events and celebrations",
      icon: <Award className="w-12 h-12" />,
      path: "/gallery/ceremonial",
      gradient: "from-pink-400 to-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      count: 20
    },
    {
      title: "Demonstrations",
      description: "Product demos and tutorials",
      icon: <PlaySquare className="w-12 h-12" />,
      path: "/gallery/demonstrations",
      gradient: "from-teal-400 to-teal-500",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      count: 0
    },
  ];

  const handleNavigate = (path) => {
    // Replace with your actual navigation
    window.location.href = path;
    // Or if using React Router: navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Gallery Management
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your collection of memorable moments and celebrations
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(category.path)}
              className={`group relative overflow-hidden rounded-2xl ${category.bgColor} border-2 ${category.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer`}
            >
              <div className="p-8 h-72 flex flex-col items-center justify-center">
                
                {/* Icon Circle */}
                <div className={`${category.iconBg} ${category.iconColor} p-6 rounded-full mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md`}>
                  {category.icon}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:scale-105 transition-transform duration-300">
                  {category.title}
                </h2>

                {/* Description */}
                <p className="text-center text-gray-600 text-sm px-4 group-hover:text-gray-800 transition-colors duration-300">
                  {category.description}
                </p>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                {/* Arrow Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Bottom Border Accent */}
              <div className={`h-1 bg-gradient-to-r ${category.gradient}`}></div>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          {galleryCategories.map((category, index) => (
            <div key={index} className={`bg-white border-2 ${category.borderColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{category.title}</p>
                  <p className={`text-3xl font-bold ${category.iconColor}`}>{category.count}</p>
                </div>
                <div className={`${category.iconBg} p-3 rounded-full`}>
                  <div className={category.iconColor}>
                    {category.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info Card */}
        <div className="mt-8 bg-white border-2 border-teal-200 rounded-2xl p-8 shadow-lg text-center">
          <p className="text-gray-600 text-lg mb-2">
            Each gallery category tells a unique story of innovation, partnership, and celebration
          </p>
          <p className="text-teal-600 font-semibold">
            Click any category above to manage content
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;