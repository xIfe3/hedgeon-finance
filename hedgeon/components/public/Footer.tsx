import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBrandYoutube } from "@tabler/icons-react"
import Link from "next/link"
import { motion } from 'framer-motion';

import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function Footer() {
    return (
        <footer className="relative pt-24 pb-12">
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

            <div className="relative max-w-6xl mx-auto px-4 xl:px-0 z-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-base">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="block">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                            >
                                <Image src="/images/logo.png" width={200} height={300} alt="Hedgeon Finance Logo" />
                            </motion.div>
                        </Link>

                        <p className="text-white">
                            Empowering your financial future with innovative solutions and expert guidance.
                        </p>

                        {/* <div className="flex space-x-3">
                            {[IconBrandFacebook, IconBrandX, IconBrandInstagram, IconBrandYoutube].map((Icon, idx) => (
                                <Link
                                    key={idx}
                                    href="#"
                                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-dark transition-colors"
                                >
                                    <Icon className="w-6 h-6" />
                                </Link>
                            ))}
                        </div> */}
                    </div>

                    {/* Links Sections */}
                    {[
                        {
                            title: 'Quick Links',
                            links: [
                                { name: 'Home', href: '/' },
                                { name: 'About Us', href: '/about' },
                                { name: 'Services', href: '/services' },
                                { name: 'FAQ', href: '/faq' },
                                { name: 'Contact Us', href: '/contact-us' }
                            ]
                        },
                        {
                            title: 'Useful Links',
                            links: [
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Terms', href: '/terms' },
                                { name: 'Disclaimer', href: '/disclaimer' },
                                { name: 'Support', href: '/support' }
                            ]
                        }
                    ].map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-100">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-300 hover:text-[#00685E] hover:underline transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-100">Stay Updated</h3>
                        <p className="text-gray-100">
                            Subscribe to our newsletter for financial insights and updates.
                        </p>
                        <form className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-full px-6 h-12 border-2 border-white focus-visible:ring-primary"
                            />
                            <Button
                                type="submit"
                                className="rounded-full h-12 px-8 bg-primary hover:bg-primary-dark hover:shadow-lg transition-all"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Hedgeon Finance. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )

}

export default Footer
