import { History, Path } from 'history';
import { Navigation as NavigationService, Options } from './Navigation.types';

export const Navigation: NavigationService = (() => {
  let history: History;

  const isNavigationInitialized = (): boolean => {
    return !!history;
  };

  const init = (value: History): void => {
    if (!isNavigationInitialized()) {
      history = value;
    }
  };

  const goTo = (path: Path, options: Options = {}): void => {
    if (isNavigationInitialized()) {
      const { urlParams, ...locationDescriptor } = options;

      let pathname = path;
      if (urlParams) {
        // Replace all the path params (for example `/:id`) with values
        Object.keys(urlParams).forEach(urlParamKey => {
          pathname = pathname.replace(`:${urlParamKey}`, `${urlParams[urlParamKey]}`);
        });
      }

      // TODO: maybe don't push if pathname, state, etc. is the same
      history.push({ ...locationDescriptor, pathname });
    }
  };

  return { init, goTo };
})();
