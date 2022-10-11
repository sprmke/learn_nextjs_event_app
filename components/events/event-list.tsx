import { Event } from '../../types';
import EventItem from './event-item';
import classes from './event-list.module.css';

interface EventListProps {
  items: Event[];
}

const EventList = ({ items }: EventListProps) => {
  return (
    <ul className={classes.list}>
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
