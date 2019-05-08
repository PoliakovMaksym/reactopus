import React from 'react';
import { createBrowserHistory, History } from 'history';
import { Redirect, Route, Router as OriginalRouter, Switch } from 'react-router-dom';

import { AnyComponent } from 'types/react';
import * as Pages from 'pages';

//<editor-fold desc="Types">
interface RouteConfig {
  exact?: boolean;
  type: AnyComponent;
  path: string;
  component: AnyComponent;
}

interface RedirectConfig {
  exact?: boolean;
  type: AnyComponent;
  from: string;
  to: string;
}

interface RoutesList {
  [key: string]: RouteConfig;
}

interface RedirectsList {
  [key: string]: RedirectConfig;
}

interface RouterConfig {
  [key: string]: RouteConfig | RedirectConfig;
}

interface RouteNames {
  [key: string]: string;
}
//</editor-fold>

//<editor-fold desc="Configs">
const RouteNames: RouteNames = {
  page0: 'PAGE_0',
  page1: 'PAGE_1',
  page2: 'PAGE_2',
  page3: 'PAGE_3',
  page4: 'PAGE_4',
  page5: 'PAGE_5',
  page6: 'PAGE_6',
  page7: 'PAGE_7',
  page8: 'PAGE_8',
  page9: 'PAGE_9',
};

// TODO: write detailed description why exact property should be explicit

const RoutesList: RoutesList = {
  [RouteNames.page0]: { exact: true, type: Route, path: '/', component: Pages.Page0 },
  [RouteNames.page1]: { exact: true, type: Route, path: '/page1', component: Pages.Page1 },
  [RouteNames.page2]: {
    exact: true,
    type: Route,
    path: '/page2/:jobId',
    component: Pages.Page2,
  },
  [RouteNames.page3]: {
    exact: true,
    type: Route,
    path: '/page3/random',
    component: Pages.Page3,
  },
  [RouteNames.page6]: { exact: true, type: Route, path: '/page6', component: Pages.Page6 },
  [RouteNames.page7]: {
    exact: true,
    type: Route,
    path: '/page6/page7',
    component: Pages.Page7,
  },
  [RouteNames.page8]: {
    exact: true,
    type: Route,
    path: '/page6/page8',
    component: Pages.Page8,
  },
};

const RedirectsList: RedirectsList = {
  [RouteNames.page4]: {
    exact: true,
    type: Redirect,
    from: '/page4',
    to: RoutesList[RouteNames.page3].path,
  },
  [RouteNames.page5]: {
    exact: true,
    type: Redirect,
    from: '/page5/:userId',
    to: RoutesList[RouteNames.page1].path,
  },
};

const RouterConfig: RouterConfig = {
  ...RoutesList,
  ...RedirectsList,
};
//</editor-fold>

// Create a history of your choosing (we're using a browser history in this case)
const history: History = createBrowserHistory();

export class Router extends React.Component {
  // RENDER

  render() {
    // TODO: check if this method is called on navigation for performance reasons
    const routes = Object.keys(RouterConfig).reduce(
      (accumulator: React.ReactElement[], key: string) => {
        const { type: Component, ...props } = RouterConfig[key];
        return [...accumulator, <Component {...props} />];
      },
      [],
    );

    return (
      <OriginalRouter history={history}>
        <Switch>
          {routes}
          <Pages.PageNotFound />
        </Switch>
      </OriginalRouter>
    );
  }
}
