"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Star, MapPin } from "lucide-react";
import Image from "next/image";

// -----------------------------
// Interfaces
// -----------------------------
interface Testimonial {
    id: number;
    image: string;
    title: string;
    quote: string;
    author: string;
    location: string;
}

interface StatCounterProps {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
}

// -----------------------------
// Data
// -----------------------------
const testimonials: Testimonial[] = [
    {
        id: 1,
        image: "/bride-in-red-wedding-lehenga.jpg",
        title: "Amazing Collection!",
        quote:
            '"It was truly a pleasure shopping here for my wedding. The collection is always premium and beautifully crafted."',
        author: "AKANKSHA YADAV",
        location: "Prayagraj",
    },
    {
        id: 2,
        image: "/bride-couple-in-red-wedding-lehenga.jpg",
        title: "Exceptional Service!",
        quote:
            '"Thank you to the team for their exceptional hospitality and support. They made my special day stress-free and memorable."',
        author: "JAI NANDINI SINGH",
        location: "Kanpur",
    },
    {
        id: 3,
        image: "/bride-wedding-traditional-outfit.jpg",
        title: "Perfect Pieces!",
        quote:
            '"The craftsmanship and quality of each piece was outstanding. I found the perfect outfit with ease."',
        author: "PRIYA SHARMA",
        location: "Delhi",
    },
];

const stats = [
    {
        icon: Users,
        label: "Happy Customers",
        value: 5000,
        prefix: "+",
        color: "from-primary to-secondary",
    },
    {
        icon: Star,
        label: "5-Star Reviews",
        value: 4.8,
        suffix: "/5",
        color: "from-accent to-primary",
    },
    {
        icon: MapPin,
        label: "Serving Nationwide",
        value: 25,
        suffix: " States",
        color: "from-secondary to-accent",
    },
];

// -----------------------------
// Components
// -----------------------------
function StatCounter({ value, label, prefix = "", suffix = "" }: StatCounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById(`stat-${label}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [label, isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const increment = value / 50;
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= value) {
                    clearInterval(interval);
                    return value;
                }
                return prev + increment;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [isVisible, value]);

    return (
        <div id={`stat-${label}`} className="text-center">
            <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                {prefix}
                {Math.round(count)}
                {suffix}
            </div>
            <p className="text-gray-600 font-sans text-sm uppercase tracking-widest">{label}</p>
        </div>
    );
}

// -----------------------------
// Main Section
// -----------------------------
export function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    useEffect(() => {
        if (!isAutoPlay) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlay]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlay(false);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlay(false);
    };

    const current = testimonials[currentIndex];

    return (
        <section className="w-full bg-white py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-widest text-neutral-500">Our Happy Customers</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-neutral-900 mt-2">
                        Customer Testimonials
                    </h2>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={idx} className="text-center p-8 rounded-lg hover:bg-gray-50 transition group">
                                <div className="flex justify-center mb-6">
                                    <div className={`bg-gradient-to-br ${stat.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                </div>
                                {stat.value > 10 ? (
                                    <StatCounter value={stat.value} label={stat.label} prefix={stat.prefix} suffix={stat.suffix} />
                                ) : (
                                    <>
                                        <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                                            {stat.prefix}{stat.value.toFixed(1)}{stat.suffix}
                                        </div>
                                        <p className="text-gray-600 font-sans text-sm uppercase tracking-widest">{stat.label}</p>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Testimonials Carousel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Image */}
                    <div className="relative w-full max-w-[420px] h-[450px] md:h-[520px] mx-auto rounded-xl overflow-hidden shadow-xl">
                        <Image src={current.image} alt={current.author} fill className="object-cover" />
                    </div>

                    {/* Text & Controls */}
                    <div>
                        <h3 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-6">{current.title}</h3>
                        <p className="text-lg text-neutral-700 leading-relaxed italic mb-6">{current.quote}</p>
                        <p className="font-bold text-neutral-900 tracking-wide uppercase">{current.author}</p>
                        <p className="text-sm text-neutral-600">{current.location}</p>

                        <div className="flex justify-start items-center gap-6 mt-10">
                            <button onClick={goToPrevious} className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-neutral-100 transition">
                                <ChevronLeft className="h-6 w-6 text-neutral-900" />
                            </button>
                            <button onClick={goToNext} className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-neutral-100 transition">
                                <ChevronRight className="h-6 w-6 text-neutral-900" />
                            </button>
                        </div>

                        <div className="flex gap-2 mt-6">
                            {testimonials.map((_, index) => (
                                <div key={index} className={`h-2 rounded-full transition-all ${index === currentIndex ? "bg-neutral-900 w-6" : "bg-neutral-300 w-2"}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
