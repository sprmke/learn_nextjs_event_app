import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../dummy-data';
import { Event } from '../../types';

const AllEventsPage = () => {
  const events: Event[] = getAllEvents();

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
