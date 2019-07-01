import { History } from 'history';
import { NavigationClass } from './Navigation';

describe('Navigation service', () => {
  it('should save history internally on construction', () => {
    const Navigation = new NavigationClass({ thisIs: 'history object' } as any);

    expect(Navigation.history).toEqual({ thisIs: 'history object' });
  });

  describe('goTo method', () => {
    it('should call history.replace by default', () => {
      const history = ({ replace: jest.fn(), push: jest.fn() } as unknown) as History;
      const Navigation = new NavigationClass(history);

      Navigation.goTo('');

      expect(history.replace).toHaveBeenCalled();
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should call history.replace once when persistState = false', () => {
      const history = ({ replace: jest.fn(), push: jest.fn() } as unknown) as History;
      const Navigation = new NavigationClass(history);

      Navigation.goTo('', { persistState: false });

      expect(history.replace).toHaveBeenCalledTimes(1);
      expect(history.push).not.toHaveBeenCalled();
    });

    it('should call history.push once when persistState = true', () => {
      const history = ({ replace: jest.fn(), push: jest.fn() } as unknown) as History;
      const Navigation = new NavigationClass(history);

      Navigation.goTo('', { persistState: true });

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.replace).not.toHaveBeenCalled();
    });

    it('should correctly replace route params with values when urlParams are specified', () => {
      const history = ({ replace: jest.fn() } as unknown) as History;
      const Navigation = new NavigationClass(history);

      Navigation.goTo('part1/:param1/part2/:param2', {
        urlParams: {
          param1: 15,
          param2: '50',
          param3: '',
        },
      });

      expect(history.replace).toHaveBeenCalledWith({ pathname: 'part1/15/part2/50' });
    });

    it('should pass location props down to the history "redirect" method', () => {
      const history = ({ replace: jest.fn() } as unknown) as History;
      const Navigation = new NavigationClass(history);

      Navigation.goTo('path', { state: { key: 'value' } });

      expect(history.replace).toHaveBeenCalledWith({ pathname: 'path', state: { key: 'value' } });
    });
  });
});
