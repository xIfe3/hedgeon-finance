import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, HomeIcon, Slash } from "lucide-react"
import Image from 'next/image'

interface BreadcrumbsSectionProps {
    title: string
    subtitle?: string
}

const BreadcrumbsSection = ({ title, subtitle }: BreadcrumbsSectionProps) => {
    return (
        <section className="relative py-16 md:py-28 overflow-hidden bg-gray-900">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-bg.jpg"
                    alt="Investment landscape"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-90"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-primary/40" />
            </div>

            <div className="relative container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                        {title}
                    </h1>

                    {subtitle && (
                        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                            {subtitle}
                        </p>
                    )}

                    {/* Enhanced Breadcrumb */}
                    <nav
                        aria-label="breadcrumb"
                        className="flex justify-center items-center"
                    >
                        <Breadcrumb>
                            <BreadcrumbList className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10 hover:border-primary/30 transition-all duration-300">
                                <BreadcrumbItem className="flex items-center">
                                    <BreadcrumbLink
                                        href="/"
                                        className="text-gray-300 hover:text-gray-100 transition-colors flex items-center"
                                    >
                                        <HomeIcon className="w-4 h-4 mr-2" />
                                        Home
                                    </BreadcrumbLink>
                                </BreadcrumbItem>

                                <BreadcrumbSeparator className="text-gray-400">
                                    <ChevronRight className="w-4 h-4" />
                                </BreadcrumbSeparator>

                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        className="text-primary font-medium cursor-default"
                                        aria-current="page"
                                    >
                                        {title}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </nav>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-30" />
        </section>
    )
}
export default BreadcrumbsSection;
