'use client';

import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import ChangePasswordForm from './ChangePassword';
import { useUser } from '@/context/UserContext';
import { deleteAccountApi } from '@/app/api/userApi';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('en-US');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteConfirmInput, setDeleteConfirmInput] = useState('');

    const router = useRouter()

    const { user } = useUser();

    if (!user) return <div>Loading user...</div>;

    const handleFinalDelete = async () => {
        await deleteAccountApi();
        setDialogOpen(false);

        router.push("/auth/login")
    };

    return (
        <div className="w-full space-y-10 px-8 pb-5">
            <h2 className="text-3xl font-bold text-gray-800">Account Settings</h2>

            {/* Profile Info */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                <div className="space-y-4">
                    <Input type="text" placeholder="Full Name" value={user.name} readOnly />
                    <Input type="email" placeholder="Email" value={user.email} readOnly />
                    <Input type="tel" placeholder="Phone Number" value={user.phone} readOnly />
                </div>
            </section>

            {/* Security */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <ChangePasswordForm />
            </section>

            {/* Two-Factor Authentication */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-4">Enhance the security of your account by enabling 2FA.</p>
                <Button variant="secondary">Enable 2FA</Button>
            </section>

            {/* Notifications */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Get important updates via email.</p>
                        </div>
                        <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                    <div className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive alerts via text message.</p>
                        </div>
                        <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                    </div>
                </div>
            </section>

            {/* Recent Activity */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>Logged in from Chrome on Windows - Apr 25, 2025</li>
                    <li>Logged in from Safari on iPhone - Apr 22, 2025</li>
                    <li>Changed password - Apr 20, 2025</li>
                </ul>
            </section>

            {/* Language and Region */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                <select
                    className="w-full p-2 border rounded-md"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en-US">English (US)</option>
                    <option value="en-UK">English (UK)</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                </select>
            </section>

            {/* Preferences */}
            <section>
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="flex items-center justify-between border p-3 rounded-md">
                    <div>
                        <p className="font-medium">Enable Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch to a darker theme.</p>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
            </section>

            {/* Delete Account */}
            <section className="border-t border-red-200 pt-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Deleting your account will permanently remove all your data. This action is irreversible.
                </p>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Delete My Account</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-red-600">Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-700">Type <strong>delete</strong> below to confirm:</p>
                            <Input
                                placeholder="Type delete to confirm"
                                value={deleteConfirmInput}
                                onChange={(e) => setDeleteConfirmInput(e.target.value)}
                            />
                            <Button
                                variant="destructive"
                                disabled={deleteConfirmInput.toLowerCase() !== 'delete'}
                                onClick={handleFinalDelete}
                            >
                                Confirm Delete
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </section>
        </div>
    );
};

export default SettingsPage;
