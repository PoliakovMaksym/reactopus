import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';

Enzyme.configure({ adapter: new Adapter() });

const { document } = new jsdom.JSDOM('<!doctype html><html><body></body></html>').window;

(global as any).document = document;
(global as any).window = document.defaultView;
(global as any).navigator = (global as any).window.navigator;
