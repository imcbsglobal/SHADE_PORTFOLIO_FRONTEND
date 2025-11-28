import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Trash2, X, Save, Image as ImgIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Smiles = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    preview: "",
  });

  const API_BASE = "https://shade.imcbs.com";

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/smiles/`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error loading smiles:", err);
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
    if (!formData.title || (!formData.file && !editingId)) {
      alert("Title & Image Required");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description || "");

      if (formData.file) {
        formDataToSend.append("image", formData.file);
      }

      let res;
      if (editingId) {
        res = await fetch(`${API_BASE}/api/smiles/${editingId}/`, {
          method: "PUT",
          body: formDataToSend,
        });
      } else {
        res = await fetch(`${API_BASE}/api/smiles/`, {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (!res.ok) throw new Error("Failed");

      alert(editingId ? "Image updated!" : "Image added!");
      await loadItems();
      resetForm();
    } catch (err) {
      alert("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description || "",
      file: null,
      preview: `${API_BASE}${item.image}`,
    });
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/smiles/${id}/`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");
      alert("Image deleted!");
      await loadItems();
    } catch (err) {
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", file: null, preview: "" });
    setEditingId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-yellow-700 hover:text-yellow-900 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Gallery
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Smiles</h1>
              <p className="text-gray-600">Upload happy moment images</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 shadow-lg disabled:opacity-50"
            >
              <Upload className="w-5 h-5" />
              Add Smile
            </button>
          </div>
        </div>

        {loading && !items.length ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-500 border-t-transparent"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ImgIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No smiles yet</h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Add First Smile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative pb-[56.25%] bg-gray-900">
                  <img
                    src={`${API_BASE}${item.image}`}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-1"
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                <h2 className="text-2xl font-bold">{editingId ? "Edit Smile" : "Add Smile"}</h2>
                <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block font-bold mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Enter image title"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">Upload Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                </div>

                {formData.preview && (
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <img src={formData.preview} className="w-full rounded-lg" alt="Preview" />
                  </div>
                )}

                <div>
                  <label className="block font-bold mb-2">Description (Optional)</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg"
                    placeholder="Enter description"
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button onClick={resetForm} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? "Update" : "Add"} Smile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Smiles;