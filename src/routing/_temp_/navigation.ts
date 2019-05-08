import { History, Location, LocationDescriptorObject, Path } from 'history';

interface Navigation {
  init(history: History): void;
  goTo(path: Path): void;
  goTo(location: LocationDescriptorObject): void;
  clearState(location: Location): void;
  goBack(): void;
}

export const navigation: Navigation = ((): Navigation => {
  const InitializeError = new Error('You can not initialize "Navigation" more than once');
  const NotInitializedError = new Error('"Navigation" was not initialized yet');

  let history: History | undefined = undefined;

  const init = (value: History): void => {
    if (history === undefined) {
      history = value;
    } else {
      throw InitializeError;
    }
  };

  const goTo = (path: Path | LocationDescriptorObject): void => {
    if (history) {
      if (typeof path === 'string') {
        history.push(path);
      } else {
        const location: LocationDescriptorObject = path;
        history.push({ ...location, pathname: location.pathname });
      }
    } else {
      throw NotInitializedError;
    }
  };

  const clearState = (location: Location): void => {
    if (history) {
      history.replace({ ...location, pathname: location.pathname, state: {} });
    } else {
      throw NotInitializedError;
    }
  };

  const goBack = (): void => {
    if (history) {
      history.goBack();
    } else {
      throw NotInitializedError;
    }
  };

  return { init, goTo, clearState, goBack };
})();
