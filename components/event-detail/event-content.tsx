import { PropsWithChildren } from 'react';
import classes from './event-content.module.css';

function EventContent({ children }: PropsWithChildren<{}>) {
  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
