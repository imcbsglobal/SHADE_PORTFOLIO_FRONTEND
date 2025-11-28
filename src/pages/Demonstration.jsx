// Demonstration.jsx - Public display page (Dynamic)
import { useEffect, useState } from "react";
import { PlayCircle, Image, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Demonstration = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Match with your backend URL
  const API_BASE = "https://shade.imcbs.com";

  useEffect(() => {
    loadDemonstrations();
  }, []);

  const loadDemonstrations = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/demonstrations/`);
      if (!res.ok) throw new Error('Failed to fetch demonstrations');
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      console.error("Error loading demonstrations:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/showcase"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Showcase
        </Link>

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient drop-shadow-2xl">
            Product Demonstrations
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience the power of <span className="font-bold text-purple-400">Shade Solutions</span> — 
            cutting-edge technology that transforms your vision into reality
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <PlayCircle className="w-5 h-5 animate-pulse" />
            <span className="text-sm font-medium">Watch & Explore</span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
            <p className="mt-6 text-gray-400 text-lg">Loading demonstrations...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-400 text-lg font-semibold">Failed to load demonstrations</p>
              <p className="text-gray-400 mt-2">{error}</p>
              <button 
                onClick={loadDemonstrations}
                className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-12 max-w-md mx-auto">
              <Image className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-xl text-gray-300">No demonstrations available yet</p>
              <p className="text-gray-500 mt-2">Check back soon for exciting content!</p>
            </div>
          </div>
        ) : (
          <>
            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                  
                  {item.media_type === "video" ? (
                    // Video Display
                    <div className="relative">
                      <iframe
                        className="w-full h-64 md:h-72"
                        src={getYouTubeEmbedUrl(item.website_url)}
                        title={item.title}
                        allowFullScreen
                      ></iframe>
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    // Image Display
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <img
                        src={`${API_BASE}${item.media_file}`}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                        IMAGE
                      </div>
                    </div>
                  )}

                  {/* Content Overlay */}
                  <div className="relative p-6 bg-gradient-to-t from-slate-900 via-slate-800/95 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Hover Border Animation */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-20">
              <div className="inline-block bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
                <p className="text-gray-300 text-lg max-w-2xl">
                  Discover how our innovative solutions drive business growth and operational excellence. 
                  <span className="block mt-2 text-purple-400 font-semibold">Experience the future, today.</span>
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default Demonstration;