import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import MetaHead from '../components/meta/meta-head';
import Notification from '../components/notification/notification';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationContextProvider>
      <Layout>
        <MetaHead viewport='initial-scale=1.0, width=device-with' />
        <Component {...pageProps} />
        <Notification title='title' message='message' status='success' />
      </Layout>
    </NotificationContextProvider>
  );
};

export default MyApp;
