import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-util';
import { Event } from '../../types';

const AllEventsPage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps = async () => {
  const allEvents: Event[] = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};
