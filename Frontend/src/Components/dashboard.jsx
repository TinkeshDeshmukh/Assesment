import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";

const AddItemPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
        image: null
    });
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState(""); // "success" or "error"
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            setFormData((prev) => ({ ...prev, image: file }));
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreview(null);
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("");
        setStatusType("");
        const data = new FormData();
        data.append("name", formData.name);
        data.append("type", formData.type);
        data.append("description", formData.description);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            await axios.post(
                "https://assesment-fmss.onrender.com/api/data/upload",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                }
            );
            setStatus("Item added successfully!");
            setStatusType("success");
            setFormData({
                name: "",
                type: "",
                description: "",
                image: null,
                token: "",
            });
            setImagePreview(null);
        } catch (err) {
            setStatus("Failed to add item.");
            setStatusType("error");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-200 shadow-2xl font-sans">
            <h2 className="text-center text-indigo-800 mb-8 font-bold text-3xl tracking-wide">Add New Item</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image Preview Side */}
                <div className="flex flex-col items-center md:w-1/3 w-full mb-6 md:mb-0">
                    <div className="relative flex items-center justify-center w-40 h-40 bg-white rounded-full shadow-lg border-4 border-indigo-200">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="object-cover w-36 h-36 rounded-full border-4 border-indigo-400 shadow-md transition-all duration-300"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-36 h-36 rounded-full bg-indigo-100 text-indigo-400 text-6xl font-bold">
                               <Image className="w-1/2 h-1/2"/>
                            </div>
                        )}
                    </div>
                    <span className="mt-4 text-indigo-700 font-medium text-lg">Preview</span>
                </div>
                {/* Form Side */}
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    autoComplete="off"
                    className="flex-1 w-full"
                >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                        required
                        className="w-full px-4 py-3 mb-5 border border-indigo-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    />
                    <input
                        type="text"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        placeholder="Type"
                        className="w-full px-4 py-3 mb-5 border border-indigo-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full px-4 py-3 mb-5 border border-indigo-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="mb-5 text-base file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-lg font-semibold text-lg shadow-md transition hover:from-indigo-600 hover:to-indigo-500 active:scale-95 flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {loading && (
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                        )}
                        {loading ? "Adding..." : "Add Item"}
                    </button>
                    <Link to="/fetch">
                        <button
                            type="button"
                            className="w-full py-3 my-2 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded-lg font-semibold text-lg shadow-md transition hover:from-indigo-600 hover:to-indigo-500 active:scale-95 flex items-center justify-center"
                        >
                            View Items
                        </button>
                    </Link>
                </form>
            </div>
            {status && (
                <p
                    className={`mt-6 text-center font-medium text-lg animate-fade-in ${statusType === "success" ? "text-green-600" : "text-red-600"}`}
                >
                    {status}
                </p>
            )}
            <style>
                {`
                .animate-fade-in {
                    animation: fadeIn 0.6s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                `}
            </style>
        </div>
    );
};

export default AddItemPage;
