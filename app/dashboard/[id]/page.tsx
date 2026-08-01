"use client";

import { useEffect, useState } from "react";

export default function Dashboard({
    params,
}: {
    params: { id: string };
}) {
    const [responses, setResponses] = useState<any[]>([]);

    useEffect(() => {
        fetch(`/api/responses/${params.id}`)
            .then((r) => r.json())
            .then(setResponses);
    }, [params.id]);

    return (
        <div className="max-w-4xl mx-auto py-20">

            <h1 className="text-4xl font-bold mb-8">
                Responses
            </h1>

            {responses.length === 0 && (
                <p>No one has replied yet.</p>
            )}

            {responses.map((r) => (
                <div
                    key={r.id}
                    className="border rounded-xl p-6 mb-4"
                >
                    <h2 className="font-semibold text-lg">
                        {r.name}
                    </h2>

                    <p className="mt-3 whitespace-pre-wrap">
                        {r.message}
                    </p>

                    <small className="text-gray-500">
                        {new Date(r.createdAt).toLocaleString()}
                    </small>
                </div>
            ))}

        </div>
    );
}