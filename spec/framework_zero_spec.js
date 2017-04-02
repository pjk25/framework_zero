import {create, h} from "virtual-dom";
import {bootstrap} from "../src/framework_zero";

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
      expect(this.element).toEqual(create(h('div', 'hi')));
    });

    it('renders the updated data on dispatch', (done) => {
      this.dispatcher(() => { return {message: 'alice'}; });

      setTimeout(() => {
        expect(this.element).toEqual(create(h('div', 'alice')));
        done();
      }, 0);
    });
  });
});
