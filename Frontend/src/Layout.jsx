import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
