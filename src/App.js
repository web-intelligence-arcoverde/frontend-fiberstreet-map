import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import Routes from './routes';

import { LayoutProvider } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';

const App = () => {
  return (
    <>
      <LayoutProvider>
        <UserProvider>
          <ReduxToastr />
          <Routes />
        </UserProvider>
      </LayoutProvider>
    </>
  );
};
export default App;
