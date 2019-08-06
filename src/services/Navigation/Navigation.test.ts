import { History } from 'history';
import { NavigationClass } from './Navigation';

describe('Navigation service', () => {
  //<editor-fold desc="Tests setup">
  const mockHistoryObject = (): History => {
    return ({
      replace: jest.fn(),
      push: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
    } as unknown) as History;
  };
  //</editor-fold>

  test('should save history internally on construction under the "history" key', () => {
    const Navigation = new NavigationClass({ thisIs: 'history object' } as any);

    expect(Navigation.history).toEqual({ thisIs: 'history object' });
  });

  describe('Navigation.goTo method', () => {
    test('should call history.push once', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('');

      expect(history.push).toHaveBeenCalledTimes(1);
    });

    test('should correctly replace route params with values when urlParams are specified', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('part1/:param1/part2/:param2', {
        urlParams: {
          param1: 15,
          param2: '50',
          param3: '',
        },
      });

      expect(history.push).toHaveBeenCalledWith({ pathname: 'part1/15/part2/50' });
    });

    test('should pass location props down to the history "redirect" method', () => {
      const history = mockHistoryObject();
      const Navigation = new NavigationClass(history);

      Navigation.goTo('path', { state: { key: 'value' } });

      expect(history.push).toHaveBeenCalledWith({ pathname: 'path', state: { key: 'value' } });
    });
  });
});
