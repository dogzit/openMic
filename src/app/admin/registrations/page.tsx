"use client";

import React, { useEffect, useState } from "react";
import {
    Users,
    Search,
    Trash2,
    Mail,
    Phone,
    Edit3,
    X,
    Video,
    ExternalLink,
    CheckCircle2,
    LayoutGrid,
    AlertTriangle,
    Calendar,
} from "lucide-react";

export default function DarkAdminDashboard() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingItem, setEditingItem] = useState<any>(null);
    const [deleteItem, setDeleteItem] = useState<any>(null);

    const API_SECRET = "zolo_open_mic_2026";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/registrations?secret=${API_SECRET}`);
            const result = await res.json();

            if (result.success) {
                setRegistrations(result.data || []);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteItem) return;

        try {
            const res = await fetch(
                `/api/registrations/${deleteItem.id}?secret=${API_SECRET}`,
                { method: "DELETE" }
            );

            if (res.ok) {
                setRegistrations((prev) =>
                    prev.filter((item) => item.id !== deleteItem.id)
                );
                setDeleteItem(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `/api/registrations/${editingItem.id}?secret=${API_SECRET}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editingItem),
                }
            );

            if (res.ok) {
                setRegistrations((prev) =>
                    prev.map((item) =>
                        item.id === editingItem.id ? editingItem : item
                    )
                );
                setEditingItem(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const showValue = (value: any) => {
        if (value === null || value === undefined || value === "") {
            return "Хоосон байна";
        }
        return value;
    };

    const filteredData = registrations.filter((r) =>
        `${r.firstName} ${r.lastName} ${r.email} ${r.phone}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200">

            {/* TOP */}
            <nav className="sticky top-0 z-30 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl">
                            <LayoutGrid size={22} className="text-white" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-white">Open Mic Admin</h1>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                Management Portal
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full md:max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                            className="w-full bg-slate-900 border border-white/10 rounded-2xl p-3 pl-10 text-sm outline-none"
                            placeholder="Хайх..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </nav>

            {/* MAIN */}
            <main className="max-w-7xl mx-auto px-4 py-8">

                {loading ? (
                    <div className="py-32 text-center text-slate-500">
                        Уншиж байна...
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="py-32 text-center text-slate-500">
                        Бүртгэл олдсонгүй
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                        {filteredData.map((reg) => (
                            <div
                                key={reg.id}
                                className="bg-slate-900 border border-white/5 rounded-3xl p-6 space-y-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-lg font-bold text-white">
                                            {showValue(reg.lastName)} {showValue(reg.firstName)}
                                        </h2>

                                        <p className="text-xs text-slate-500 mt-1">
                                            ID: {reg.id}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditingItem(reg)}
                                            className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white"
                                        >
                                            <Edit3 size={16} />
                                        </button>

                                        <button
                                            onClick={() => setDeleteItem(reg)}
                                            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">

                                    <div className="flex gap-2">
                                        <Mail size={16} className="text-blue-400 mt-0.5" />
                                        <span>{showValue(reg.email)}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Phone size={16} className="text-emerald-400 mt-0.5" />
                                        <span>{showValue(reg.phone)}</span>
                                    </div>

                                    <div className="flex gap-2">
                                        <Users size={16} className="text-purple-400 mt-0.5" />
                                        <span>{showValue(reg.studentCount)} гишүүн</span>
                                    </div>

                                    <div>
                                        <span className="text-slate-500">Анги:</span>{" "}
                                        {showValue(reg.grade)} - {showValue(reg.classNumber)}
                                    </div>

                                    <div className="flex gap-2">
                                        <Calendar size={16} className="text-orange-400 mt-0.5" />
                                        <span>
                                            {reg.createdAt
                                                ? new Date(reg.createdAt).toLocaleString()
                                                : "Хоосон байна"}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-slate-500 block mb-2">
                                            YouTube:
                                        </span>

                                        {reg.youtubeLink ? (
                                            <a
                                                href={reg.youtubeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                            >
                                                <Video size={14} />
                                                Үзэх
                                                <ExternalLink size={12} />
                                            </a>
                                        ) : (
                                            <span className="text-slate-500">
                                                Хоосон байна
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </main>

            {/* DELETE MODAL */}
            {deleteItem && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0f172a] w-full max-w-md rounded-3xl p-6 border border-white/10">

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle size={30} />
                            </div>

                            <h2 className="text-xl font-bold text-white">
                                Устгах уу?
                            </h2>

                            <p className="text-slate-400 mt-2">
                                {deleteItem.lastName} {deleteItem.firstName}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button
                                onClick={() => setDeleteItem(null)}
                                className="py-3 rounded-2xl bg-white/5"
                            >
                                Болих
                            </button>

                            <button
                                onClick={handleDelete}
                                className="py-3 rounded-2xl bg-red-600 text-white"
                            >
                                Устгах
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editingItem && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0f172a] w-full max-w-2xl rounded-3xl p-6 border border-white/10">

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">
                                Бүртгэл засах
                            </h2>

                            <button
                                onClick={() => setEditingItem(null)}
                                className="p-2 hover:bg-white/10 rounded-full"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-4">

                            {[
                                "lastName",
                                "firstName",
                                "email",
                                "phone",
                                "grade",
                                "classNumber",
                                "studentCount",
                                "youtubeLink",
                            ].map((field) => (
                                <input
                                    key={field}
                                    className="p-3 rounded-xl bg-slate-900 border border-white/10"
                                    placeholder={field}
                                    value={editingItem[field] || ""}
                                    onChange={(e) =>
                                        setEditingItem({
                                            ...editingItem,
                                            [field]: e.target.value,
                                        })
                                    }
                                />
                            ))}

                            <button
                                type="button"
                                onClick={() => setEditingItem(null)}
                                className="py-3 rounded-2xl bg-white/5"
                            >
                                Болих
                            </button>

                            <button
                                type="submit"
                                className="py-3 rounded-2xl bg-blue-600 text-white flex items-center justify-center gap-2"
                            >
                                <CheckCircle2 size={18} />
                                Хадгалах
                            </button>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}