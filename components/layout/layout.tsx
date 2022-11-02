import { PropsWithChildren, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../notification/notification';
import MainHeader from './main-header';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { notification } = useContext(NotificationContext);
  const { title, message, status } = notification || {};

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notification && (
        <Notification title={title} message={message} status={status} />
      )}
    </>
  );
};

export default Layout;
