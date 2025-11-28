import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const Showcase = () => {
  const [smileImages, setSmileImages] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [ceremonialData, setCeremonialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAllSmiles, setShowAllSmiles] = useState(false);
  const [showAllClients, setShowAllClients] = useState(false);
  const [showAllCeremonial, setShowAllCeremonial] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [smilesRes, clientsRes, ceremonialsRes] = await Promise.all([
        fetch(`${API_BASE}/api/smiles/`),
        fetch(`${API_BASE}/api/clients/`),
        fetch(`${API_BASE}/api/ceremonials/`),
      ]);

      if (!smilesRes.ok || !clientsRes.ok || !ceremonialsRes.ok) {
        throw new Error("Failed to load data");
      }

      const [smilesData, clientsData, ceremonialsData] = await Promise.all([
        smilesRes.json(),
        clientsRes.json(),
        ceremonialsRes.json(),
      ]);

      setSmileImages(smilesData);
      setClientData(clientsData);
      setCeremonialData(ceremonialsData);
      
      setLoading(false);
    } catch (err) {
      console.error("Error loading showcase:", err);
      setError(err.message);
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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Image Card Component
  const ImageCard = ({ item }) => (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => setSelectedImage(`${API_BASE}${item.image}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={`${API_BASE}${item.image}`}
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" dy=".3em">No Image</text></svg>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
        {item.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        )}
        {item.created_at && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(item.created_at)}</span>
          </div>
        )}
      </div>
    </div>
  );

  // Video Card Component
  const VideoCard = ({ item }) => (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        {item.media_type === "video" ? (
          <div className="relative pb-[56.25%] bg-gray-900">
            <iframe
              src={getYouTubeEmbedUrl(item.video_url)}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              title={item.title}
            ></iframe>
          </div>
        ) : (
          <div className="relative">
            <img
              src={`${API_BASE}${item.media_file}`}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f3f4f6"/><text x="50%" y="50%" text-anchor="middle" fill="%239ca3af" dy=".3em">No Image</text></svg>';
              }}
            />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
        {item.description && (
          <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading showcase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50 flex items-center justify-center p-8">
        <div className="bg-white border-2 border-red-200 rounded-2xl p-8 max-w-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-red-800 font-bold text-2xl mb-3">Unable to Load Content</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadAllData}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const hasData = smileImages.length > 0 || clientData.length > 0 || ceremonialData.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {!hasData ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-gray-300 text-6xl mb-6">📸</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">No Content Available Yet</h2>
            <p className="text-gray-600 text-lg">Start by adding content in the Gallery section</p>
          </div>
        ) : (
          <>
            {/* Smiles & Stories Section */}
            {smileImages.length > 0 && (
              <section className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">Smiles & Stories</h2>
                  <p className="text-gray-600 text-xl max-w-3xl mx-auto">Browse through our collection of images showcasing our work and events</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(showAllSmiles ? smileImages : smileImages.slice(0, 3)).map((item) => (
                    <ImageCard key={item.id} item={item} />
                  ))}
                </div>

                {!showAllSmiles && smileImages.length > 3 && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAllSmiles(true)}
                      className="px-8 py-4 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                    >
                      View More
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* What Our Clients Say Section */}
            {clientData.length > 0 && (
              <section className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                  <p className="text-gray-600 text-xl max-w-3xl mx-auto">Hear directly from our satisfied clients about their experiences</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(showAllClients ? clientData : clientData.slice(0, 3)).map((item) => (
                    <VideoCard key={item.id} item={item} />
                  ))}
                </div>

                {!showAllClients && clientData.length > 3 && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAllClients(true)}
                      className="px-8 py-4 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                    >
                      View More
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Ceremonial Moments Section */}
            {ceremonialData.length > 0 && (
              <section className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">Ceremonial Moments</h2>
                  <p className="text-gray-600 text-xl max-w-3xl mx-auto">Watch highlights from our store opening events</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(showAllCeremonial ? ceremonialData : ceremonialData.slice(0, 3)).map((item) => (
                    <VideoCard key={item.id} item={item} />
                  ))}
                </div>

                {!showAllCeremonial && ceremonialData.length > 3 && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setShowAllCeremonial(true)}
                      className="px-8 py-4 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                    >
                      View More
                    </button>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-[95%] max-h-[95%] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Showcase;