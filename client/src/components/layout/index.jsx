import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

import Homepage from '../../views/homepage';
import Goals from '../../views/goals';
import GoalCreation from '../../views/goalCreation';

function Layout() {

  const [isSideBarOpen, toggleSideBar] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    toggleSideBar(open);
  };

  return (
    <>
        <Header toggleDrawer={toggleDrawer}/>
        <Sidebar isOpen={isSideBarOpen} toggleDrawer={toggleDrawer}/>
        <Switch>
          <Route
            path='/goals'
            component={Goals}
            key={'goal-list'}
          />
          <Route
            path='/create'
            component={GoalCreation}
            key={'create'}
          />
          <Route
            path='/'
            component={Homepage}
            key={'homepage'}
          />
        </Switch>
    </>
  );
}

export default Layout;
