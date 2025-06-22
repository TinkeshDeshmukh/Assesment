import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#80deea] overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-200 opacity-40 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 opacity-40 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-cyan-400 opacity-30 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
            
            <div className="bg-white/80 backdrop-blur-3xl border-2 border-cyan-200 rounded-3xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center transition-all duration-300 hover:scale-[1.025] hover:shadow-cyan-200/60">
                <h1
                    className="text-5xl md:text-6xl font-extrabold mb-4 text-center bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent animate-gradient drop-shadow-lg tracking-tight"
                >
                    Welcome to Your Review Hub
                </h1>
                <p className="text-xl md:text-2xl text-[#00838f] mb-8 text-center font-medium leading-relaxed">
                    Add items below and review them instantly.<br />Make your choices smarter!
                </p>
                <Link to="/register" className="w-full flex justify-center">
                    <button
                        className="flex items-center bg-gradient-to-r from-[#26c6da] to-[#00bcd4] hover:from-[#00bcd4] hover:to-[#26c6da] text-white font-semibold px-8 py-3 rounded-full shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-300 group text-lg gap-2"
                    >
                        <span className="mr-2">Get Started</span>
                        <span className="inline-block transition-transform group-hover:translate-x-2">
                            <ArrowRight size={24} />
                        </span>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
