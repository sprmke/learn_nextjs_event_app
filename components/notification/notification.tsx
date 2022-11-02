import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import classes from './notification.module.css';

type NotificationProps = {
  title: string;
  message: string;
  status: string;
};

const Notification = ({ title, message, status }: NotificationProps) => {
  const { hideNotification } = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
