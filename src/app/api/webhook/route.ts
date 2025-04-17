import { NextResponse } from 'next/server';
import { createReservation, getReservations } from '@/db/service';
import { Reservation } from '@/db/types';

export async function POST(request: Request) {
    try {
        // Verify the request is from Make.com (you can add authentication here)
        const body = await request.json();
        
        // Validate required fields
        const requiredFields = ['name', 'phone_no', 'party_size', 'date', 'time'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Create reservation object
        const reservation: Reservation = {
            name: body.name,
            phone_no: body.phone_no,
            party_size: parseInt(body.party_size),
            date: body.date,
            time: body.time,
            status: body.status || 'pending' // Default status if not provided
        };

        // Save to database
        const savedReservation = await createReservation(reservation);

        return NextResponse.json(
            { 
                message: 'Reservation created successfully',
                reservation: savedReservation 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Add GET endpoint to fetch all reservations
export async function GET() {
    try {
        const reservations = await getReservations();
        return NextResponse.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
} 