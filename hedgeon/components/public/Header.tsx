'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IconPhone, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { User2, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact-us' },
];

const authLinks = [
    { name: 'Login', path: '/auth/login' },
    { name: 'Sign Up', path: '/auth/signup' },
];

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-0' : 'bg-transparent py-2'}`}>
            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-5 md:px-8">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-start z-50"
                >
                    <Link href="/">
                        <Image
                            src="/images/logo.png"
                            width={200}
                            height={60}
                            alt="Hedgeon Finance Logo"
                            className="w-40 md:w-48"
                        />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
                    {navLinks.map((link) => (
                        <div
                            key={link.path}
                            className="relative group py-2"
                            onMouseEnter={() => setActiveSubmenu(link.name)}
                            onMouseLeave={() => setActiveSubmenu(null)}
                        >
                            <Link
                                href={link.path}
                                className={`flex items-center px-4 py-2 rounded-lg transition-all ${isScrolled
                                    ? 'text-gray-700 hover:text-primary hover:bg-gray-50'
                                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </div>
                    ))}
                </nav>

                {/* Desktop Auth + CTA */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="flex space-x-1">
                        {authLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`px-4 py-2 rounded-lg transition-colors ${isScrolled
                                    ? 'text-gray-700 hover:text-primary'
                                    : 'text-gray-200 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    aria-label="Toggle menu"
                    className="md:hidden p-2 z-50 cursor-pointer"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className={`w-6 h-0.5 mb-1.5 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-primary' : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`}`} />
                    <div className={`w-6 h-0.5 mb-1.5 transition-all ${isMobileMenuOpen ? 'opacity-0' : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`}`} />
                    <div className={`w-6 h-0.5 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-primary' : `${isScrolled ? 'bg-gray-700' : 'bg-white'}`}`} />
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                                onClick={() => setMobileMenuOpen(false)}
                            />

                            <motion.nav
                                ref={mobileMenuRef}
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ type: 'tween', ease: 'easeInOut' }}
                                className="fixed top-0 right-0 w-full max-w-md h-screen bg-white shadow-2xl z-50 p-8 overflow-y-auto"
                            >
                                <div className="flex justify-between items-center mb-10">
                                    <Image
                                        src="/images/logo.png"
                                        width={200}
                                        height={60}
                                        alt="Hedgeon Finance Logo"
                                        className="w-36"
                                    />
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                    >
                                        <IconX className="h-6 w-6 text-gray-700" />
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    {navLinks.map((link) => (
                                        <div key={link.path} className="border-b border-gray-100 py-2">
                                            <Link
                                                href={link.path}
                                                className="block text-gray-800 hover:text-primary text-lg py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    {link.name}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 pt-6 border-t border-gray-200">
                                    <div className="flex flex-col space-y-4">
                                        {authLinks.map((link) => (
                                            <Link
                                                key={link.path}
                                                href={link.path}
                                                className="text-center text-gray-800 hover:text-primary font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <User2 className="h-5 w-5 text-gray-700" />
                                        </button>
                                        <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <IconPhone className="h-5 w-5 text-gray-700" />
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-500 mt-4">
                                        support@hedgeonfinance.com<br />
                                        1 (580) 304-2990
                                    </p>
                                </div>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;