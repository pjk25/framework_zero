import m from 'mori';
import Rx from 'rxjs/Rx';
import Delegator from 'dom-delegator';
import DOMEvent from 'synthetic-dom-events';
import createElement from 'virtual-dom/create-element';
import rootComponent from '../src/root_component';

describe('RootComponent', () => {
  beforeEach(() => {
    this.subject = new Rx.Subject();
    const dispatcher = this.subject.next.bind(this.subject);

    this.state = m.hashMap('message', 'Framework Zero');
    this.tree = rootComponent(dispatcher)(this.state);
    this.element = createElement(this.tree);

    document.body.appendChild(this.element);

    Delegator(this.element).listenTo('mousemove');
  });

  afterEach(() => {
    document.body.removeChild(this.element);
  });

  it('should render html', () => {
    expect(this.element.innerText).toContain('Framework Zero');
  });

  it('should update the tooltip on mousemove', (done) => {
    this.subject.subscribe((action) => {
      expect(m.toJs(action(this.state))).toEqual({
        message: 'Framework Zero',
        tooltip: {
          visible: true,
          position: {
            x: 10,
            y: 19
          }
        }
      });
      done();
    }, done.fail);

    this.element.dispatchEvent(DOMEvent('mousemove', {
      bubbles: true,
      clientX: 10,
      clientY: 19
    }));
  });
});
