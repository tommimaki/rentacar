import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

interface CalendarProps {
    carId: string;
    updateCalendar: boolean
}

const Calendar: React.FC<CalendarProps> = ({ carId, updateCalendar }) => {
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(carId)
                const response = await fetch(`https://carback.fly.dev/api/reservations/car/${carId}`);
                if (response.ok) {
                    const reservationsData = await response.json();
                    setReservations(reservationsData);
                    console.log(reservationsData)
                } else {
                    console.error("Error fetching reservations:", await response.json());
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        fetchData();
    }, [carId, updateCalendar]);


    const events = reservations.map((reservation: any) => ({
        title: "Reserved",
        start: reservation.startDate,
        end: reservation.endDate,
    }));

    return (
        <div className="bg-gray-800">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",

                }}
                events={events}
                eventColor="red"
                eventTextColor="#FFFFFF"

            />
        </div>
    );
};

export default Calendar;
