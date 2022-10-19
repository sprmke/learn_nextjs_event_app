import { GetStaticProps, InferGetStaticPropsType } from 'next';
import EventList from '../components/events/event-list';
import MetaHead from '../components/meta/meta-head';
import { getFeaturedEvents } from '../helpers/api-util';

const HomePage = ({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <MetaHead
        title='NextJS Events'
        description='Find a lot of great events that allow you to evolve...'
      />
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
    revalidate: 1800,
  };
};
