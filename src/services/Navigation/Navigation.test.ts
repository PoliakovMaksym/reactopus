import { History } from 'history';
import { NavigationClass } from './Navigation';

describe('Navigation service', () => {
  const mockHistoryObject = (): History => {
    return ({
      replace: jest.fn(),
      push: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
    } as unknown) as History;
  };

  it('should save history internally on construction under the "history" key', () => {
    const Navigation = new NavigationClass({ thisIs: 'history object' } as any);

    expect(Navigation.history).toEqual({ thisIs: 'history object' });
  });

  describe('goTo method', () => {
    it('should call history.replace once by default', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('');

      expect(history.replace).toHaveBeenCalledTimes(1);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should call history.replace once when persistState = false', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('', { persistState: false });

      expect(history.replace).toHaveBeenCalledTimes(1);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should call history.push once when persistState = true', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('', { persistState: true });

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.replace).not.toHaveBeenCalled();
    });

    it('should correctly replace route params with values when urlParams are specified', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('part1/:param1/part2/:param2', {
        persistState: false,
        urlParams: {
          param1: 15,
          param2: '50',
          param3: '',
        },
      });

      expect(history.replace).toHaveBeenCalledWith({ pathname: 'part1/15/part2/50' });
    });

    it('should pass location props down to the history "redirect" method', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('path', { persistState: false, state: { key: 'value' } });

      expect(history.replace).toHaveBeenCalledWith({ pathname: 'path', state: { key: 'value' } });
    });
  });
});
