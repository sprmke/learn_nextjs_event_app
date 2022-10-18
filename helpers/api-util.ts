import { Event } from '../types';

export const getAllEvents = async () => {
  const response = await fetch(process.env.REACT_APP_FIREBASE_URL);
  const data = await response.json();

  const events: Event[] | [] = Object.values(data);
  console.log('events::', events);

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event: Event) => event.isFeatured);
};
