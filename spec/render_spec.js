import m from 'mori';
import createElement from 'virtual-dom/create-element';
import render from '../src/render.js';

describe('render', () => {
  it('should render html', () => {
    const state = m.hashMap('message', 'Framework Zero');

    const tree = render(state);

    const element = createElement(tree);

    expect(element.innerText).toContain('Framework Zero');
  });
});
