import { useRouter } from 'next/router';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import { getEventById } from '../../dummy-data';
import { Event } from '../../types';

const EventDetailPage = () => {
  const router = useRouter();
  const eventId = (router.query?.eventId as string) ?? '';
  const event: Event = getEventById(eventId);
  const { title, description, date, location, image, imageAlt } = event;

  if (!event) {
    return <p>No event found!</p>;
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
