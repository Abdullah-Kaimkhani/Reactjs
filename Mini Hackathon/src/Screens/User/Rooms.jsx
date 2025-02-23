import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { db, auth } from '../../firebaseConfig'; // Your Firebase config file
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

const RoomCard = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:3000/rooms');
                const roomsData = response.data.map(room => ({
                    ...room,
                    imageSrc: room.imageSrc.replace('/?', '?')
                }));
                setRooms(roomsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching rooms:', err);
            }
        };

        fetchRooms();
    }, []);

    const handleBookRoom = async (roomId) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                Swal.fire("Error!", "Please login to book a room!", "error");
                return;
            }

            const roomToBook = rooms.find(room => room.id === roomId);
            if (!roomToBook) {
                Swal.fire("Error!", "Room not found!", "error");
                return;
            }

            // Update local state first for instant feedback
            const updatedRooms = rooms.map(room => 
                room.id === roomId ? { ...room, status: 'Occupied' } : room
            );
            setRooms(updatedRooms);

            // Update JSON server
            await axios.patch(`http://localhost:3000/rooms/${roomId}`, {
                status: 'Occupied'
            });

            // Save to Firestore
            await addDoc(collection(db, 'bookings'), {
                userId: user.uid,
                roomId: roomToBook.id,
                roomNo: roomToBook.roomNo,
                roomType: roomToBook.type,
                price: roomToBook.price,
                bookedAt: serverTimestamp(),
                status: 'active',
                image: roomToBook.imageSrc
            });

            Swal.fire({
                title: "Booking Confirmed!",
                text: `${roomToBook.roomNo} booked successfully!`,
                icon: "success",
                confirmButtonText: 'OK'
            });

        } catch (err) {
            console.error('Booking error:', err);
            Swal.fire("Error!", err.message, "error");
            // Revert local state on error
            setRooms(rooms);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading rooms...</div>;
    }

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    return (
        <div style={styles.container}>
            {rooms.length === 0 ? (
                <p style={styles.noRooms}>No rooms available</p>
            ) : (
                rooms.map(room => (
                    <div key={room.id} style={styles.card}>
                        <img
                            src={room.imageSrc}
                            alt={`Room ${room.roomNo}`}
                            style={styles.image}
                            onError={(e) => {
                                e.target.src = 'https://placehold.co/400x300?text=No+Image';
                                e.target.style.objectFit = 'contain';
                            }}
                        />
                        <div style={styles.details}>
                            <h3 style={styles.roomNo}>{room.roomNo}</h3>
                            <p style={styles.type}>Type: {room.type}</p>
                            <p style={styles.price}>${room.price}/night</p>
                            <p style={{
                                ...styles.status,
                                color: room.status === 'Available' ? 'green' : 'red'
                            }}>
                                Status: {room.status}
                            </p>
                            <button
                                style={{
                                    ...styles.button,
                                    backgroundColor: room.status === 'Available' ? '#007bff' : '#6c757d'
                                }}
                                onClick={() => handleBookRoom(room.id)}
                                disabled={room.status !== 'Available'}
                            >
                                {room.status === 'Available' ? 'Book Now' : 'Occupied'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

// Keep the same styles object from previous code
const styles = { /* ... (same as previous styles object) ... */ };

export default RoomCard;