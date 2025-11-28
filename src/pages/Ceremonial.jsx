import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Trash2, X, Save, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Ceremonial = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    mediaType: "video",
    videoUrl: "",
    file: null,
    preview: "",
    description: "",
  });

  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/ceremonials/`);
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error loading ceremonials:", error);
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

    if (formData.mediaType === "video" && !formData.videoUrl) {
      alert("Video URL is required for video type");
      return;
    }

    if (formData.mediaType === "image" && !formData.file && !editingId) {
      alert("Image file is required");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("media_type", formData.mediaType);

      if (formData.mediaType === "video") {
        formDataToSend.append("video_url", formData.videoUrl);
      } else if (formData.file) {
        formDataToSend.append("media_file", formData.file);
      }

      let res;
      if (editingId) {
        res = await fetch(`${API_BASE}/api/ceremonials/${editingId}/`, {
          method: "PATCH",
          body: formDataToSend,
        });
      } else {
        res = await fetch(`${API_BASE}/api/ceremonials/`, {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (!res.ok) throw new Error("Failed");

      alert(editingId ? "Ceremonial updated!" : "Ceremonial added!");
      resetForm();
      loadEvents();
    } catch (error) {
      alert("Failed to save ceremonial");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      mediaType: event.media_type,
      videoUrl: event.video_url || "",
      file: null,
      preview: event.media_file ? `${API_BASE}${event.media_file}` : "",
      description: event.description || "",
    });
    setEditingId(event.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this ceremonial?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/ceremonials/${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
      alert("Ceremonial deleted!");
      loadEvents();
    } catch (err) {
      alert("Error deleting ceremonial");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      mediaType: "video",
      videoUrl: "",
      file: null,
      preview: "",
      description: "",
    });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Gallery
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Ceremonial Moments</h1>
              <p className="text-gray-600">Manage store opening and event videos/images</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              <Upload className="w-5 h-5 inline-block mr-2" />
              Add Event
            </button>
          </div>
        </div>

        {loading && !events.length ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : events.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl shadow">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold">No ceremonial events yet</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Add First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <div className="relative pb-[56.25%] bg-black">
                  {e.media_type === "video" ? (
                    <img
                      src={getYouTubeThumbnail(e.video_url)}
                      alt={e.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={`${API_BASE}${e.media_file}`}
                      alt={e.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg">{e.title}</h3>
                  {e.description && <p className="text-sm mt-1 line-clamp-2">{e.description}</p>}

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(e)}
                      className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {editingId ? "Edit Ceremonial Event" : "Add Ceremonial Event"}
                </h2>
                <button onClick={resetForm}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="font-semibold">Media Type *</label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) =>
                      setFormData({ ...formData, mediaType: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="video">Video (YouTube)</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold">Title *</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-lg"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                {formData.mediaType === "video" ? (
                  <div>
                    <label className="font-semibold">YouTube URL *</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg"
                      value={formData.videoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, videoUrl: e.target.value })
                      }
                      placeholder="https://youtu.be/..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="font-semibold">Upload Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="w-full p-3 border rounded-lg"
                    />
                    {formData.preview && (
                      <img
                        src={formData.preview}
                        className="mt-3 w-full rounded-lg"
                        alt="Preview"
                      />
                    )}
                  </div>
                )}

                <div>
                  <label className="font-semibold">Description</label>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows="3"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 flex justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? "Update Event" : "Add Event"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ceremonial;