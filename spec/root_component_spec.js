import m from 'mori';
import Rx from 'rxjs/Rx';
import createElement from 'virtual-dom/create-element';
import rootComponent from '../src/root_component';

describe('RootComponent', () => {
  it('should render html', () => {
    const state = m.hashMap('message', 'Framework Zero');

    const tree = rootComponent(new Rx.Subject())(state);

    const element = createElement(tree);

    expect(element.innerText).toContain('Framework Zero');
  });
});
