import createElement from 'virtual-dom/create-element';
import h from 'virtual-dom/h';
import {bootstrap, memoize} from '../src/framework_zero';

describe('FrameworkZero', () => {
  describe('bootstrap', () => {
    beforeEach(() => {
      const initialState = {message: 'hi'};
      const render = s => h('div', s.message);
      const {element, dispatcher} = bootstrap(initialState, () => render);
      this.element = element;
      this.dispatcher = dispatcher;
    });

    it('renders the initial state', () => {
      expect(this.element).toEqual(createElement(h('div', 'hi')));
    });

    it('renders the updated data on dispatch', (done) => {
      this.dispatcher(s => { return {message: 'alice'}; });

      setTimeout(() => {
        expect(this.element).toEqual(createElement(h('div', 'alice')));
        done();
      }, 0);
    });
  });

  describe('memoize', () => {
    beforeEach(() => {
      this.render = s => { return {p: s}; };
      this.memoized = memoize(this.render);
    });

    it('returns the same thing for the same inputs', () => {
      expect(this.render('hi')).not.toBe(this.render('hi'));
      expect(this.memoized('hi')).toBe(this.memoized('hi'));
    });

    it('returns updated thing for new inputs', () => {
      const hi = this.memoized('hi');
      expect(hi).toEqual(this.render('hi'));
      const bob = this.memoized('bob');
      expect(bob).not.toBe(hi);
      expect(bob).toEqual(this.render('bob'));
    });
  });
});
