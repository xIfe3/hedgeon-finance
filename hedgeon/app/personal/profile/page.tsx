'use client'
import { updateProfileApi, uploadProfilePictureApi } from '@/app/api/userApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

// User Details Section
const UploadImage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const { user } = useUser()

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile); // store file for upload

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string); // show preview
            };
            reader.readAsDataURL(uploadedFile);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setFile(null);
    };

    const handleSubmit = async () => {
        if (!file) return alert("No file selected");
        try {
            const res = await uploadProfilePictureApi(file);
            console.log("Upload success:", res.data);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Image Preview Box */}
            <div className="p-1 rounded-full w-32 h-32 border-2 border-badge">
                <div
                    className="rounded-full w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${user?.profilePicture || "https://via.placeholder.com/150?text=No+Image"})`,
                    }}
                ></div>
            </div>

            <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
            />
            <div className="flex space-x-3">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => document.getElementById("file-upload")?.click()}
                >
                    Upload
                </Button>

                <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleDeleteImage}
                >
                    Delete
                </Button>

                <Button
                    variant="default"
                    size="lg"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

function UserProfile() {
    const { updateUser, refreshUser, user } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const [userData, setUserData] = useState<{ name: string; email: string; phone: string }>({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
        }
    }, [user]);

    if (!user) return <div>Loading user...</div>;

    const fields = [
        {
            name: "name",
            label: "Name",
            placeholder: "Enter your full name",
            required: true,
            type: "text",
            readOnly: false,
        },
        {
            name: "email",
            label: "Email Address",
            placeholder: "Enter your email address",
            type: "email",
            readOnly: true,
        },
        {
            name: "phone",
            label: "Phone Number",
            placeholder: "Enter your phone",
            type: "text",
            readOnly: true,
        },
    ] as const;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = (await updateProfileApi(userData)).data;
            updateUser(response.updated_user);
            refreshUser();
            setSuccess(true);
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 w-full">
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-100 rounded-sm flex items-center space-x-3"
                >
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </motion.div>
            )}

            {success && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-100 rounded-sm flex items-center space-x-3"
                >
                    <Alert variant="default">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Profile updated successfully.</AlertDescription>
                    </Alert>
                </motion.div>
            )}

            <div className="bg-white p-10 rounded-xl shadow-sm space-y-10">
                <UploadImage />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-semibold">Personal Details</h1>

                    {fields.map((field) => (
                        <div key={field.name} className="flex flex-col space-y-2">
                            <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={userData[field.name]}
                                onChange={(e) => setUserData({ ...userData, [field.name]: e.target.value })}
                                readOnly={field?.readOnly}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {(field.name === "email" || field.name === "phone") && (
                                <p className="text-sm text-gray-500">
                                    Contact support to change your {field.name === "email" ? "email" : "phone number"}.
                                </p>
                            )}
                        </div>
                    ))}

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
