import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import MetaHead from '../../components/meta/meta-head';
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
    <>
      <MetaHead
        title='All Events'
        description='Find a lot of great events that allow you to evolve...'
      />
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
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
