import pool from './config';
import { Reservation } from './types';

export async function createReservation(reservation: Reservation) {
    const query = `
        INSERT INTO reservations (name, phone_no, party_size, date, time, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
    
    const values = [
        reservation.name,
        reservation.phone_no,
        reservation.party_size,
        reservation.date,
        reservation.time,
        reservation.status
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}

export async function getReservations() {
    const query = 'SELECT * FROM reservations ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
}

export async function updateReservationStatus(id: number, status: string) {
    const query = `
        UPDATE reservations
        SET status = $1
        WHERE id = $2
        RETURNING *`;
    
    const result = await pool.query(query, [status, id]);
    return result.rows[0];
} 