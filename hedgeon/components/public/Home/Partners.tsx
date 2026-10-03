import Image from 'next/image';

export default function PartnersSection() {
    const partners = [
        { src: '/images/partner-1.png', alt: 'Partner 1' },
        { src: '/images/partner-2.png', alt: 'Partner 2' },
        { src: '/images/partner-3.png', alt: 'Partner 3' },
        { src: '/images/partner-4.png', alt: 'Partner 4' },
        { src: '/images/partner-5.png', alt: 'Partner 5' },
        { src: '/images/partner-6.png', alt: 'Partner 6' },
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h6 className="text-lg font-light text-gray-600">
                        Our Partners
                    </h6>
                </div>

                <ul className="flex flex-wrap lg:flex-nowrap justify-center gap-10 overflow-x-auto">
                    {partners.map((partner, index) => (
                        <li
                            key={index}
                            className="flex-shrink-0 transition-opacity hover:opacity-75"
                        >
                            <Image
                                src={partner.src}
                                alt={partner.alt}
                                width={120}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}