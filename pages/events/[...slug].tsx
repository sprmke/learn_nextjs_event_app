import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import MetaHead from '../../components/meta/meta-head';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';
import { Event } from '../../types';

const FitleredEventsPage: NextPage = () => {
  const router = useRouter();
  const { slug: filterData = [] }: { slug?: string[] } = router.query;

  const [filteredYear, filteredMonth] = filterData;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const fetchFilteredEvents = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    const events: Event[] = Object.values(data);

    const filteredEvents = getFilteredEvents(events, {
      year: numYear,
      month: numMonth,
    });

    return filteredEvents;
  };

  const { data: filteredEvents, error } = useSWR(
    process.env.NEXT_PUBLIC_FIREBASE_URL,
    fetchFilteredEvents
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <div className='center'>
        <MetaHead
          title='Filtered Events'
          description='A list of filtered events'
        />
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  if (!filteredEvents) {
    return (
      <>
        <MetaHead
          title='Filtered Events'
          description='A list of filtered events'
        />
        <p className='center'>Loading...</p>
      </>
    );
  }

  if (filteredEvents && filteredEvents?.length === 0) {
    return (
      <div className='center'>
        <MetaHead
          title='Filtered Events'
          description={`All events for ${numMonth}/${numYear}`}
        />
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <Button link='/events'>Show All Events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <MetaHead
        title='Filtered Events'
        description={`All events for ${numMonth}/${numYear}`}
      />
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default FitleredEventsPage;
