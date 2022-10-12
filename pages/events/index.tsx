import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../dummy-data';
import { Event } from '../../types';

const AllEventsPage = () => {
  const events: Event[] = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    router.push({
      pathname: `/events/${year}/${month}`,
    });
  };

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export default AllEventsPage;
