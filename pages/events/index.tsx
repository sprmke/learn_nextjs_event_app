import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../dummy-data';
import { Event } from '../../types';

const AllEventsPage = () => {
  const events: Event[] = getAllEvents();

  return (
    <div>
      <EventSearch />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
