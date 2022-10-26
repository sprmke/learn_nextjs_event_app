import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import MetaHead from '../components/meta/meta-head';
import { getFeaturedEvents } from '../helpers/api-util';
import { Event } from '../types';

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  events,
}) => {
  return (
    <div>
      <MetaHead
        title='NextJS Events'
        description='Find a lot of great events that allow you to evolve...'
      />
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<{ events: Event[] }> = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
};
