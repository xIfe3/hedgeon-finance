import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

export default function Testimonials() {
    return (
        <section className="overflow-hidden py-16 lg:py-24 text-center relative text-white">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/testimonials-bg.jpg"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    priority
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 z-1"></div>

            <div className="relative container mx-auto px-4">
                <div className="max-w-2xl mx-auto mb-12 lg:mb-16 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-14 h-1 bg-white"></div>
                        <span className="text-gray-200 text-sm font-semibold uppercase tracking-wide">
                            What Investors are saying?
                        </span>
                    </div>
                    <h2 className="text-3xl lg:text-6xl text-white mt-4">Testimonials</h2>
                </div>

                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    loop={true}
                    className="mySwiper"
                >
                    {/* Slide 1 */}
                    <SwiperSlide>
                        <div className="max-w-3xl mx-auto px-4">
                            <div className="relative w-24 h-24 rounded-full mx-auto mb-6">
                                <Image
                                    src="/images/testimonial-1.jpg"
                                    alt="Sam Ashton"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sam Ashton</h3>
                            <div className="flex justify-center gap-1 text-primary mb-4">
                                ★★★★★
                            </div>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                "Hedgeon Finance has achieved impressive growth and returns on investment. I highly recommend considering investing in this company to anyone looking for a promising investment opportunity."
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* Slide 2 */}
                    <SwiperSlide>
                        <div className="max-w-3xl mx-auto px-4">
                            <div className="relative w-24 h-24 rounded-full mx-auto mb-6">
                                <Image
                                    src="/images/testimonial-2.jpg"
                                    alt="Sajid Hassan"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sajid Hassan</h3>
                            <div className="flex justify-center gap-1 text-primary mb-4">
                                ★★★★★
                            </div>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                "Investing in Hedgeon Finance has been one of the best decisions I've made. Not only have I seen impressive returns, but I've also gained a deeper understanding of the rapidly evolving world of blockchain technology."
                            </p>
                        </div>
                    </SwiperSlide>

                    {/* Slide 3 */}
                    <SwiperSlide>
                        <div className="max-w-3xl mx-auto px-4">
                            <div className="relative w-24 h-24 rounded-full mx-auto mb-6">
                                <Image
                                    src="/images/testimonial-3.jpg"
                                    alt="Peter P. Becton"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Peter P. Becton</h3>
                            <div className="flex justify-center gap-1 text-primary mb-4">
                                ★★★★☆
                            </div>
                            <p className="text-gray-200 text-lg leading-relaxed">
                                "Investing in Hedgeon Finance has been a smart move for me. The professionals provided me with valuable insights & strategies that have helped me grow my portfolio & achieve my financial goals."
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
}