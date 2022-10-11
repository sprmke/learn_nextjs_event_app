import React from 'react';
import EventItem from './event-item';

const EventList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        <EventItem />;
      })}
    </ul>
  );
};

export default EventList;
