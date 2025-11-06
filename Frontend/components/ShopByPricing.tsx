"use client";

import Image from "next/image";
interface PriceRange {
    name: string;
    range: string;
    background: string; // just a string path now
    description: string;
}

export const ShopByPricing: React.FC = () => {
    const priceRanges: PriceRange[] = [
        {
            name: "Budget Friendly",
            range: "Under ₹15,000",
            background: "/pricing-budget.jpg", // path from public folder
            description: "Beautiful designs without breaking the bank",
        },
        {
            name: "Premium Collection",
            range: "₹15,000 - ₹40,000",
            background: "/pricing-premium.jpg",
            description: "Exquisite craftsmanship meets affordability",
        },
        {
            name: "Luxury Range",
            range: "₹40,000 - ₹80,000",
            background: "/pricing-luxury.jpg",
            description: "Opulent designs for the discerning bride",
        },
        {
            name: "Designer Couture",
            range: "₹80,000+",
            background: "/pricing-designer.jpg",
            description: "Exclusive masterpieces for your special day",
        },
    ];;

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
                        Shop by Pricing
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Find your dream lehenga within your budget
                    </p>
                </div>

                {/* Price Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {priceRanges.map((range) => (
                        <div
                            key={range.name}
                            className="group relative h-80 rounded-lg overflow-hidden cursor-pointer hover-lift shadow-card"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={range.background} // string path works
                                    alt={range.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                                        {range.name}
                                    </h3>
                                    <p className="text-accent text-xl font-semibold mb-2">
                                        {range.range}
                                    </p>
                                    <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {range.description}
                                    </p>
                                </div>

                                {/* Decorative Arrow */}
                                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-accent/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-accent text-xl">→</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
