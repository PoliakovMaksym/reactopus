import { createBrowserHistory, History, Path } from 'history';
import { Navigation as NavigationService, Options } from './Navigation.types';

export class NavigationClass {
  readonly history: History;

  constructor(history: History) {
    this.history = history;
  }

  goTo(path: Path, options: Options = {}): void {
    // Separate custom options from default history.push/replace options
    const { urlParams, ...locationDescriptor } = options;

    let pathname = path;
    if (urlParams) {
      // Replace all the path params with their values
      // Example: given urlParams = { id: 15 } path "/users/:id" becomes "/users/15"
      Object.keys(urlParams).forEach(urlParamKey => {
        pathname = pathname.replace(`:${urlParamKey}`, `${urlParams[urlParamKey]}`);
      });
    }

    // TODO: maybe don't redirect if pathname, state, etc. are completely the same
    this.history.push({ ...locationDescriptor, pathname });
  }
}

// Create a history of your choosing (we're using a browser history in this case)
const history: History = createBrowserHistory();

// Create a Navigation service
export const Navigation: Readonly<NavigationService> = new NavigationClass(history);
