import { Navigation } from './Navigation';

describe('Navigation', () => {
  //<editor-fold desc="setup">
  const history = {
    push: jest.fn(),
  };

  Navigation.init(history as any);

  beforeEach(() => {
    history.push.mockClear();
  });
  //</editor-fold>

  describe('when goTo method is called should correctly call history.push', () => {
    it('when only path is passed', () => {
      const path = 'test path';

      Navigation.goTo(path);

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith({ pathname: path });
    });

    it('when path without params and urlParams are passed', () => {
      const path = 'test path';
      const urlParams = { id: 15 };

      Navigation.goTo(path, { urlParams });

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith({ pathname: path });
    });

    it('when path with params and urlParams are passed', () => {
      const path = '/part1/:param1/part2/:param2';
      const urlParams = { param1: 15 };

      Navigation.goTo(path, { urlParams });

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith({
        pathname: path.replace(':param1', `${urlParams.param1}`),
      });
    });

    it('when path and other location props are passed', () => {
      const path = 'test path';
      const locationDescriptor = {
        pathname: 'pathname',
        state: { stateProp1: 'state value 1' },
      };

      Navigation.goTo(path, locationDescriptor);

      const { pathname, ...restLocationProps } = locationDescriptor;

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith({
        pathname: path,
        ...restLocationProps,
      });
    });
  });
});
