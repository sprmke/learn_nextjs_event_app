import { GetStaticProps, InferGetStaticPropsType } from 'next';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
};
