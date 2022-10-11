import { PropsWithChildren } from 'react';
import MainHeader from './main-header';

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
