import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';

const FitleredEventsPage = () => {
  const router = useRouter();
  const { slug: filterData }: { slug?: string[] } = router.query;

  if (!filterData) {
    return <p className='center'>Loading...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p className='center'>Invalid filter. Please adjust your values</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p className='center'>No events found for the chosen filter!</p>;
  }

  return <div>FitleredEventsPage</div>;
};

export default FitleredEventsPage;
