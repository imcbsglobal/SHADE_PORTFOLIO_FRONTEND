// DemonstrationsAdmin.jsx - Admin management page for demonstrations
import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Trash2, X, Save, PlayCircle, Image as ImgIcon, Loader2, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const DemonstrationsAdmin = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState("image");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    videoUrl: "",
    preview: "",
  });

  const API_BASE = "https://starstay.imcbs.com";

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/demonstrations/`);
      if (!res.ok) throw new Error("Failed to load");
      
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error loading demonstrations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setFormData({ ...formData, file, preview });
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      alert("Title is required");
      return;
    }

    if (mediaType === "image" && !formData.file && !editingId) {
      alert("Please select an image");
      return;
    }

    if (mediaType === "video" && !formData.videoUrl) {
      alert("Please enter a video URL");
      return;
    }

    setLoading(true);

    try {
      let res;

      if (mediaType === "image") {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description || "");
        formDataToSend.append("media_type", "image");
        
        if (formData.file) {
          formDataToSend.append("media_file", formData.file);
        }

        if (editingId) {
          res = await fetch(`${API_BASE}/api/demonstrations/${editingId}/`, {
            method: "PUT",
            body: formDataToSend,
          });
        } else {
          res = await fetch(`${API_BASE}/api/demonstrations/`, {
            method: "POST",
            body: formDataToSend,
          });
        }
      } else {
        const payload = {
          title: formData.title,
          description: formData.description || "",
          media_type: "video",
          website_url: formData.videoUrl,
        };

        if (editingId) {
          res = await fetch(`${API_BASE}/api/demonstrations/${editingId}/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } else {
          res = await fetch(`${API_BASE}/api/demonstrations/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        }
      }

      if (!res.ok) throw new Error("Failed to save");

      alert(editingId ? "Demonstration updated!" : "Demonstration added!");
      await loadItems();
      resetForm();
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save demonstration");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setMediaType(item.media_type);
    setFormData({
      title: item.title,
      description: item.description || "",
      file: null,
      videoUrl: item.website_url || "",
      preview: item.media_type === "image" ? `${API_BASE}${item.media_file}` : "",
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this demonstration?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/demonstrations/${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      alert("Demonstration deleted!");
      await loadItems();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete demonstration");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      file: null,
      videoUrl: "",
      preview: "",
    });
    setMediaType("image");
    setEditingId(null);
    setIsModalOpen(false);
  };

  const getYouTubeThumbnail = (url) => {
    const match = url?.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\n?#]+)/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16 px-4">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Back Button */}
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gallery
        </Link>

        {/* Header Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                Demonstrations Manager
              </h1>
              <p className="text-gray-400">Manage product demonstration videos and images</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              <Upload className="w-5 h-5" />
              Add Demonstration
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
            <p className="mt-6 text-gray-400 text-lg">Loading demonstrations...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl shadow-xl p-12 text-center">
            <PlayCircle className="w-16 h-16 mx-auto mb-4 text-purple-400" />
            <h3 className="text-xl font-semibold text-gray-300 mb-4">No demonstrations yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first product demonstration</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Add First Demo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl shadow-xl overflow-hidden hover:shadow-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:-translate-y-1"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Media Preview */}
                <div className="relative pb-[56.25%] bg-slate-900">
                  {item.media_type === "image" ? (
                    <img
                      src={`${API_BASE}${item.media_file}`}
                      alt={item.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={getYouTubeThumbnail(item.website_url)}
                      alt={item.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {/* Media Type Badge */}
                  <div className="absolute top-3 right-3">
                    {item.media_type === "video" ? (
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" />
                        VIDEO
                      </div>
                    ) : (
                      <div className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                        <ImgIcon className="w-3 h-3" />
                        IMAGE
                      </div>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-purple-500/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-purple-500/30 flex justify-between items-center sticky top-0 bg-slate-800 z-10">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? "Edit Demonstration" : "Add Demonstration"}
                </h2>
                <button 
                  onClick={resetForm} 
                  className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                
                {/* Media Type Selection */}
                <div>
                  <label className="block font-bold text-white mb-3">Media Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setMediaType("image")}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        mediaType === "image"
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                      }`}
                    >
                      <ImgIcon className="w-10 h-10 mx-auto mb-2 text-purple-400" />
                      <div className="font-semibold text-white">Image</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setMediaType("video")}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        mediaType === "video"
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                      }`}
                    >
                      <PlayCircle className="w-10 h-10 mx-auto mb-2 text-pink-400" />
                      <div className="font-semibold text-white">Video</div>
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block font-bold text-white mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Enter demonstration title"
                  />
                </div>

                {/* Media Upload/URL */}
                {mediaType === "image" ? (
                  <div>
                    <label className="block font-bold text-white mb-2">Upload Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-bold text-white mb-2">YouTube URL *</label>
                    <input
                      type="text"
                      value={formData.videoUrl}
                      onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>
                )}

                {/* Preview */}
                {formData.preview && (
                  <div className="bg-slate-900 border border-purple-500/30 p-3 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                    <img src={formData.preview} className="w-full rounded-lg" alt="Preview" />
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block font-bold text-white mb-2">Description (Optional)</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                    placeholder="Enter description (optional)"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={resetForm} 
                    className="flex-1 py-3 border border-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all"
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingId ? "Update" : "Add"} Demo
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default DemonstrationsAdmin;