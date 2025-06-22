import React, { useState } from "react";

const fields = [
    { name: "name", type: "text", placeholder: "Name", required: true },
    { name: "email", type: "email", placeholder: "Email", required: true },
    { name: "message", type: "textarea", placeholder: "Message", required: true },
];

const Enquire = () => {
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResult("Sending...");
        const formData = new FormData(event.target);
        formData.append("access_key", "af05c260-086a-4162-8094-ca069cd1b082");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            setResult(data.message);
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
            <div className="relative w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl p-10 animate-fade-in overflow-hidden">
                {/* Decorative Gradient Blobs */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-blue-400 via-blue-200 to-purple-300 opacity-30 rounded-full blur-2xl z-0 animate-blob1"></div>
                <div className="absolute -bottom-12 -right-12 w-52 h-52 bg-gradient-to-br from-purple-300 via-pink-200 to-blue-200 opacity-30 rounded-full blur-2xl z-0 animate-blob2"></div>
                <h2 className="relative z-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-blue-400 mb-8 text-center animate-slide-down drop-shadow-lg">
                    Enquire Now
                </h2>
                <form onSubmit={onSubmit} className="relative z-10 space-y-6">
                    {fields.map((field) =>
                        field.type === "textarea" ? (
                            <div key={field.name} className="group">
                                <textarea
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className="w-full px-5 py-4 border border-blue-200 rounded-xl bg-white/80 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-sm group-hover:shadow-lg resize-none"
                                    rows={4}
                                />
                            </div>
                        ) : (
                            <div key={field.name} className="group">
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className="w-full px-5 py-4 border border-blue-200 rounded-xl bg-white/80 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-sm group-hover:shadow-lg"
                                />
                            </div>
                        )
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 hover:from-blue-700 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                            loading ? "opacity-60 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                        ) : null}
                        {loading ? "Submitting..." : "Submit Form"}
                    </button>
                </form>
                <span
                    className={`relative z-10 block mt-8 text-center text-base transition-all duration-300 ${
                        result
                            ? "opacity-100 animate-fade-in text-blue-700 font-semibold"
                            : "opacity-0"
                    }`}
                >
                    {result}
                </span>
                {/* Custom Animations */}
                <style>{`
                    .animate-fade-in {
                        animation: fadeIn 0.7s ease;
                    }
                    .animate-slide-down {
                        animation: slideDown 0.7s cubic-bezier(.4,0,.2,1);
                    }
                    @keyframes fadeIn {
                        from { opacity: 0 }
                        to { opacity: 1 }
                    }
                    @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-20px);}
                        to { opacity: 1; transform: translateY(0);}
                    }
                    .animate-blob1 {
                        animation: blob1 8s infinite ease-in-out alternate;
                    }
                    .animate-blob2 {
                        animation: blob2 9s infinite ease-in-out alternate;
                    }
                    @keyframes blob1 {
                        0% { transform: scale(1) translateY(0) }
                        100% { transform: scale(1.15) translateY(20px) }
                    }
                    @keyframes blob2 {
                        0% { transform: scale(1) translateY(0) }
                        100% { transform: scale(1.1) translateY(-20px) }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Enquire;