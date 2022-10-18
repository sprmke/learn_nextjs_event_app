import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/error-alert';
import { getAllEvents, getEventById } from '../../helpers/api-util';
import { Event } from '../../types';

type PageParams = {
  eventId: string;
};

const EventDetailPage = ({
  event,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, description, date, location, image, imageAlt } = event;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <>
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
    </>
  );
};

export default EventDetailPage;

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>) => {
  const { eventId } = params;
  const event: Event = await getEventById(eventId);

  return {
    props: {
      event,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allEvents: Event[] = await getAllEvents();
  const eventPaths = allEvents.map(({ id }: Event) => ({
    params: { eventId: id },
  }));

  return {
    paths: eventPaths,
    fallback: false,
  };
};
