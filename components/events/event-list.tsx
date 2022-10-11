import { Event } from '../../types';
import EventItem from './event-item';

interface EventListProps {
  items: Event[];
}

const EventList = ({ items }: EventListProps) => {
  return (
    <ul>
      {items.map(({ id, title, image, date, location }: Event) => (
        <EventItem
          key={id}
          id={id}
          title={title}
          image={image}
          date={date}
          location={location}
        />
      ))}
    </ul>
  );
};

export default EventList;
