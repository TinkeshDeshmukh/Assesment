import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GetItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchItems() {
            try {
                const response = await axios.get("https://assesment-ldj4.onrender.com/api/data/fetch", {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`,
                    },
                });
                setItems(response.data.items);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchItems();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4">
            <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-10 drop-shadow-lg">
                Items
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {items.map((item, idx) => (
                    <div
                        key={item.id || item.name || idx}
                        className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
                    >
                        <div className="w-32 h-32 mb-4 rounded-full overflow-hidden shadow-lg border-4 border-purple-200 group-hover:border-pink-300 transition-all duration-300">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-purple-800 mb-2 group-hover:text-pink-600 transition-colors duration-300">
                            {item.name}
                        </h2>
                        <h3 className="text-lg font-semibold text-blue-500 mb-2 uppercase tracking-wide">
                            {item.type}
                        </h3>
                        <p className="text-gray-600 text-center mb-2">
                            {item.description}
                        </p>
                        <div className="mt-auto">
                            <Link to="/enquire">
                            <button className="px-5 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full shadow-md font-semibold hover:from-pink-400 hover:to-purple-400 transition-all duration-300 focus:outline-none">
                                Enquire
                            </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GetItems;
