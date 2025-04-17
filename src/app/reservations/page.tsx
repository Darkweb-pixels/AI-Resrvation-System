'use client';

import { useEffect, useState } from 'react';
import { Reservation } from '@/db/types';

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await fetch('/api/webhook');
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            const data = await response.json();
            setReservations(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Reservations</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {reservations.map((reservation) => (
                            <tr key={reservation.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.phone_no}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.party_size}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(reservation.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservation.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                          reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                          'bg-red-100 text-red-800'}`}>
                                        {reservation.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 