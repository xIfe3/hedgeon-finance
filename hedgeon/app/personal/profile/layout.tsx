import { Bell, Lock, Settings, User2Icon, Verified } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface LinkItem {
    path: string;
    name: string;
    icon: React.ReactNode;
}

interface ListItemProps {
    link: LinkItem;
}

const ListItem = ({ link }: ListItemProps) => {
    return (
        <Link
            href={link.path}
            key={link.name}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
        >
            <span className="text-gray-600 group-hover:text-primary-600">{link.icon}</span>
            <span className="text-sm font-medium text-gray-800 group-hover:text-primary-600">{link.name}</span>
        </Link>
    );
};

interface NavigationBoxProps {
    links: LinkItem[];
}

const NavigationBox = ({ links }: NavigationBoxProps) => {
    return (
        <div className="p-6 rounded-sm w-full md:w-1/4 bg-white space-y-3 h-fit md:border-none border-b">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">Navigation</h2>
            <div className="space-y-2">
                {links.map((link) => (
                    <ListItem key={link.name} link={link} />
                ))}
            </div>
        </div>
    );
};



function SettingsLayout({ children }: { children: React.ReactNode }) {
    const links = [
        {
            name: "Profile",
            path: "/personal/profile",
            icon: <User2Icon />,
        },
        {
            name: "KYC",
            path: "/personal/profile/kyc",
            icon: <Verified />,
        },
        {
            name: "Settings",
            path: "/personal/profile/settings",
            icon: <Settings />,
        },
    ];

    return (
        <div className="flex space-x-10 md:flex-row flex-col md:space-y-0 space-y-5">
            <NavigationBox links={links} />

            <main className="md:w-3/4 w-full">
                {children}
            </main>
        </div>
    );
}

export default SettingsLayout;
