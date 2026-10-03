import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
    return (
        <section className="bg-white py-24" id="contact">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    {/* Left Column */}
                    <div className="md:w-1/3 w-full">
                        <div className="text-center lg:text-left space-y-6">
                            <h2 className="text-4xl font-primary">Get In Touch</h2>
                            <p className="text-lg text-muted-foreground">
                                Any question? Reach out to us and we'll get back to you shortly
                            </p>

                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <Mail className="w-6 h-6 text-primary" />
                                    <span className="text-muted-foreground">
                                        support@hedgonefinance.com
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:w-1/2 w-full">
                        <div className="bg-muted/50 p-8 rounded-xl shadow-sm">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <Textarea
                                        name="message"
                                        placeholder="Your Message"
                                        className="w-full h-32"
                                    />
                                </div>

                                <Button type="submit" className="w-full lg:w-auto">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}