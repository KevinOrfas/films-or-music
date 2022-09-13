import { Outlet } from 'react-router-dom';
import Header from './Header';

export const AppLayout = () => (
  <>
    <Header />
    <main>
      <section>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </section>
    </main>
  </>
);
