"use client"

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface Element {
    id: number;
    name: string;
}

interface MultiSelectUsersProps {
    elts: Element[];
    label?: string;
    placeholder?: string;
    className?: string;
    value?: Element[];
    onChange: (el: Element[]) => void;
    disabled?: boolean;
}

const MultiSelectUsers = React.forwardRef<HTMLDivElement, MultiSelectUsersProps>(
    (
        {
            elts,
            label,
            placeholder = "Rechercher un examen...",
            className,
            value = [],
            onChange,
            disabled = false,
        },
        ref
    ) => {
        const [search, setSearch] = useState("");
        const [isFocused, setIsFocused] = useState(false);
        const [selected, setSelected] = useState<Element[]>(value);
        const inputRef = useRef<HTMLInputElement>(null);
        const dropdownRef = useRef<HTMLDivElement>(null);
        const { error } = useFormField();

        useEffect(() => {
            if (value) {
                setSelected(value);
            }
        }, [value]);

        const filteredUsers = elts.filter(
            (elt) =>
                elt.name.toLowerCase().includes(search.toLowerCase()) &&
                !selected.some((u) => u.name === elt.name)
        );

        const handleSelect = (el: Element) => {
            const newSelected = [...selected, el];
            setSelected(newSelected);
            onChange(newSelected);
            setSearch("");
            inputRef.current?.focus();
        };

        const handleRemove = (id: number) => {
            const newSelected = selected.filter((u) => u.id !== id);
            setSelected(newSelected);
            onChange(newSelected);
            inputRef.current?.focus();
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === "Backspace" && search === "" && selected.length > 0) {
                const newSelected = selected.slice(0, -1);
                setSelected(newSelected);
                onChange(newSelected);
            }
        };

        return (
            <div
                ref={ref}
                className={cn("space-y-2 w-full", className)}
                onClick={() => inputRef.current?.focus()}
            >
                {label && (
                    <label className={cn(
                        "block text-sm font-medium leading-none",
                        error && "text-destructive"
                    )}>
                        {label}
                    </label>
                )}

                <div className="relative">
                    <div className='flex gap-2 items-center'>
                        <div className="relative w-full">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black h-5 w-5" />
                            <Input
                                ref={inputRef}
                                placeholder={selected.length === 0 ? placeholder : ""}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                onKeyDown={handleKeyDown}
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    {/* Utilisateurs sélectionnés */}
                    <div className="space-y-2 max-h-[240px] overflow-auto">
                        {selected.map((user, i) => (
                            <div
                                key={user.id}
                                className={`flex items-center gap-2 rounded-sm px-3 py-2 ${i % 2 === 0 ? "bg-gray-100" : "bg-white"} `}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleRemove(user.id)}
                                    className="text-gray-500 hover:text-red-600"
                                >
                                    <X size={16} />
                                </button>
                                <p>{user.name}</p>
                            </div>
                        ))}
                    </div>

                    {(isFocused || search) && (
                        <div
                            ref={dropdownRef}
                            className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md"
                        >
                            {filteredUsers.length === 0 ? (
                                <div className="p-2 text-sm text-muted-foreground">
                                    Aucun examens trouvé
                                </div>
                            ) : (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="cursor-pointer px-4 py-2 hover:bg-accent"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => handleSelect(user)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="font-medium">{user.name}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export { MultiSelectUsers };
