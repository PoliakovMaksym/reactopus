import { createBrowserHistory, History, Path } from 'history';

import { Navigation as NavigationService, Options } from './Navigation.types';

// Create a history of your choosing (we're using a browser history in this case)
const history: History = createBrowserHistory();

export class NavigationClass {
  readonly history: History;

  constructor(history: History) {
    this.history = history;
  }

  goTo(path: Path, options: Options = {}): void {
    const { urlParams, persistState, ...locationDescriptor } = options;

    let pathname = path;
    if (urlParams) {
      // Replace all the path params (for example `/:id`) with their values
      // Example: path "/users/:id" becomes "/users/15"
      Object.keys(urlParams).forEach(urlParamKey => {
        pathname = pathname.replace(`:${urlParamKey}`, `${urlParams[urlParamKey]}`);
      });
    }

    // Determine redirect strategy
    const redirectFunction = persistState ? this.history.push : this.history.replace;

    // TODO: maybe don't redirect if pathname, state, etc. are completely the same
    redirectFunction({ ...locationDescriptor, pathname });
  }
}

export const Navigation: NavigationService = new NavigationClass(history);
