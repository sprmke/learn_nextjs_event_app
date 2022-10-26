import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Comments from '../../components/input/comments';
import MetaHead from '../../components/meta/meta-head';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import { Event } from '../../types';

type PageParams = {
  eventId: string;
};

const EventDetailPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  event,
}) => {
  const { id, title, description, date, location, image, imageAlt } = event;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <MetaHead title={title} description={description} />
      <EventSummary title={title} />
      <EventLogistics
        date={date}
        location={location}
        image={image}
        imageAlt={imageAlt}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
      <Comments eventId={id} />
    </>
  );
};

export default EventDetailPage;

export const getStaticProps: GetStaticProps<{ event: Event }> = async ({
  params,
}: GetStaticPropsContext<PageParams>) => {
  const { eventId } = params;
  const event: Event = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const featuredEvents: Event[] = await getFeaturedEvents();
  const eventPaths = featuredEvents.map(({ id }: Event) => ({
    params: { eventId: id },
  }));

  return {
    paths: eventPaths,
    fallback: 'blocking',
  };
};
