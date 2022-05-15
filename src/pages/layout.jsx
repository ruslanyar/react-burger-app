import { Outlet } from 'react-router-dom';

import AppHeader from '../components/app-header/app-header';

export function Layout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  )
}
