import BreadcrumbsSection from '@/components/public/Breadcrumb'
import { Clock, Headphones, Mail, MapPin, Phone, Video } from 'lucide-react'
import React from 'react'

function ContactUsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <BreadcrumbsSection
                title="Contact Us"
            />

            <section className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-indigo-950">
                {/* Interactive Map Section */}
                <div className="relative h-[500px] group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent z-10"></div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d96671.06751999454!2d-74.1108090142642!3d40.7846547752833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s415%20Liberty%20Street!5e0!3m2!1sen!2sng!4v1748858076133!5m2!1sen!2sng"
                        className="w-full h-full object-cover transform transition-all group-hover:scale-105"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    {/* Map Overlay Card */}
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <div className="bg-slate-900/80 backdrop-blur-lg p-8 rounded-2xl border border-sky-800/30 max-w-md">
                            <h3 className="text-2xl font-semibold text-sky-200 mb-4">Our Headquarters</h3>
                            <div className="space-y-3 text-slate-300">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-sky-400" />
                                    <p>415 Liberty Street, Suite 800, New York, NY 10006, United States</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-sky-400" />
                                    <p>+1 (580) 304-2990</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-sky-400" />
                                    <p>support@hedgeonfinance.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Information */}
                        <div className="space-y-12">
                            <div className="text-center lg:text-left">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent mb-4">
                                    Let's Transform Your Financial Future
                                </h2>
                                <p className="text-slate-300 text-lg max-w-xl">
                                    Our team of experts is ready to provide personalized guidance.
                                    Whether you're an individual investor or institutional client,
                                    we're here to help you navigate complex markets.
                                </p>
                            </div>

                            {/* Contact Cards */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-900/40 p-6 rounded-2xl border border-sky-800/30 hover:border-sky-500/50 transition-colors">
                                    <div className="bg-sky-500/10 p-4 rounded-xl w-max mb-4">
                                        <Clock className="w-8 h-8 text-sky-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-sky-200 mb-2">Operating Hours</h4>
                                    <p className="text-slate-300">
                                        Mon-Fri: 8am - 8pm GMT<br />
                                        Saturday: 9am - 5pm GMT<br />
                                        Sunday: Closed
                                    </p>
                                </div>

                                <div className="bg-slate-900/40 p-6 rounded-2xl border border-purple-800/30 hover:border-purple-500/50 transition-colors">
                                    <div className="bg-purple-500/10 p-4 rounded-xl w-max mb-4">
                                        <Headphones className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-purple-200 mb-2">24/7 Support</h4>
                                    <p className="text-slate-300">
                                        Emergency line:<br />
                                        +1 (580) 304-2990<br />
                                        support@hedgeonfinance.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form className="bg-slate-900/40 backdrop-blur-lg p-10 rounded-3xl border border-sky-800/30 shadow-xl">
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sky-300 font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-slate-900/30 border border-sky-800/30 rounded-xl px-5 py-4
                                        text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50
                                        transition-all placeholder-slate-500"
                                            placeholder="John Anderson"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sky-300 font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-slate-900/30 border border-sky-800/30 rounded-xl px-5 py-4
                                        text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50
                                        transition-all placeholder-slate-500"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sky-300 font-medium">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-900/30 border border-sky-800/30 rounded-xl px-5 py-4
                                    text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50
                                    transition-all placeholder-slate-500"
                                        placeholder="Investment Inquiry"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sky-300 font-medium">Message</label>
                                    <textarea
                                        rows={6}
                                        required
                                        className="w-full bg-slate-900/30 border border-sky-800/30 rounded-xl px-5 py-4
                                    text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/50
                                    transition-all placeholder-slate-500 resize-none"
                                        placeholder="Describe your financial goals..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-sky-500 to-cyan-600 px-8 py-5 rounded-xl
                                font-semibold text-lg hover:shadow-2xl transition-all hover:scale-[1.02]"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center border-t border-sky-800/30 pt-20">
                        <h3 className="text-3xl font-semibold text-sky-200 mb-6">
                            Prefer Direct Communication?
                        </h3>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                            <button className="bg-gradient-to-r from-purple-500 to-pink-600 px-10 py-5 rounded-xl
                                font-semibold hover:shadow-2xl transition-all flex items-center gap-3">
                                <Video className="w-6 h-6" />
                                Schedule Video Consultation
                            </button>
                            <div className="text-slate-300 text-lg">
                                or call directly:
                                <span className="text-sky-300 ml-2 hover:text-sky-200 transition-colors">
                                    +1 (580) 304-2990
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ContactUsPage
