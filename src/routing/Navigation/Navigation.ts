import { History, Path, LocationDescriptorObject } from 'history';

interface Options extends LocationDescriptorObject {
  urlParams?: { [key: string]: string | number };
}

interface Navigation {
  init(history: History): void;
  goTo(path: Path, options?: Options): void;
}

export const Navigation = ((): Navigation => {
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
