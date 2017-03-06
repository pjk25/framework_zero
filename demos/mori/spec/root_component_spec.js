import m from "mori";
import {Subject} from "rxjs/Rx";
import Delegator from "dom-delegator";
import DOMEvent from "synthetic-dom-events";
import createElement from "virtual-dom/create-element";
import rootComponent from "../src/root_component";
import {FakeScheduler} from "../../shared/fake_scheduler";

describe('RootComponent', () => {
  beforeEach(() => {
    this.scheduler = new FakeScheduler();
    this.subject = new Subject();
    const dispatcher = this.subject.next.bind(this.subject);

    this.state = m.hashMap('message', 'Framework Zero');
    this.tree = rootComponent(dispatcher, this.scheduler)(this.state);
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

  it('should hide the tooltip after one second', (done) => {
    this.subject.skip(1).subscribe((action) => {
      expect(m.toJs(action(this.state))).toEqual({
        message: 'Framework Zero',
        tooltip: {
          visible: false
        }
      });
      done();
    }, done.fail);

    this.element.dispatchEvent(DOMEvent('mousemove', {
      bubbles: true,
      clientX: 10,
      clientY: 19
    }));

    this.scheduler.advanceBy(1000);
  });
});
