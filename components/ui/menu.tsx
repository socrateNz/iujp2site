"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./drawer"
import { usePathname, useRouter } from "next/navigation"

interface Props {
    children: React.ReactNode
}


export function Menu({ children }: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };
    const link = [
        {
            name: "Accueil",
            href: "/"
        },
        {
            name: "Nos Ecoles",
            href: "/nos-ecoles"
        },
        {
            name: "Formations",
            href: "/formations"
        },
        {
            name: "Actualités",
            href: "/actualites"
        },
        {
            name: "Contacts",
            href: "/contacts"
        },
    ];

    return (
        <Drawer direction="right" modal>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-md">
                    <DrawerHeader>
                        <DrawerTitle>Menu</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 p-4">
                        {link.map((item, index) => (
                            <DrawerClose asChild>
                                <Button
                                    key={index}
                                    variant="ghost"
                                    className={`text-[#1B2A4A] hover:bg-[#93b197] ${isActive(item.href) ? "bg-[#34773D] text-white" : ""} hover:text-white !rounded-button whitespace-nowrap cursor-pointer flex items-center justify-start`}
                                    onClick={() => router.push(item.href)}
                                >
                                    {item.name}
                                </Button>
                            </DrawerClose>
                        ))}
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Fermer</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
