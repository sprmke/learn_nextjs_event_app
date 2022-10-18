import { Event } from '../types';

export const getAllEvents = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_FIREBASE_URL);
  const data = await response.json();

  const events: Event[] | [] = Object.values(data);

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event: Event) => event.isFeatured);
};

export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

export const getFilteredEvents = async (
  events: Event[],
  dateFilter: {
    year: number;
    month: number;
  }
) => {
  const allEvents = events?.length > 0 ? events : await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
