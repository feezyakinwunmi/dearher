"use client";

import { useState } from "react";

export default function ResponsePage({
    params,
}: {
    params: { id: string };
}) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);

    async function submit() {
        setSending(true);

        await fetch("/api/response", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                surpriseId: params.id,
                name,
                message,
            }),
        });

        setDone(true);
        setSending(false);
    }

    if (done)
        return (
            <div className="min-h-screen flex items-center justify-center">
                ❤️ Thank you for replying.
            </div>
        );

    return (
        <div className="max-w-xl mx-auto py-20 px-6 space-y-4">

            <h1 className="text-3xl font-bold">
                Send a reply
            </h1>

            <input
                className="border p-3 w-full"
                placeholder="Your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />

            <textarea
                rows={7}
                className="border p-3 w-full"
                placeholder="Write something..."
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
            />

            <button
                onClick={submit}
                disabled={sending}
                className="bg-pink-600 text-white px-6 py-3 rounded"
            >
                {sending ? "Sending..." : "Send ❤️"}
            </button>

        </div>
    );
}