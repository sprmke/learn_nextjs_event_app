import { AppProps } from 'next/app';
import Layout from '../components/layout/layout';
import MetaHead from '../components/meta/meta-head';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <NotificationContextProvider>
      <Layout>
        <MetaHead viewport='initial-scale=1.0, width=device-with' />
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
};

export default MyApp;
