import Rx from 'rxjs/Rx';
import m from 'mori';
import Delegator from 'dom-delegator';
import rootComponent from './root_component';
import * as actions from './actions'

import {bootstrap, events, memoize} from './framework_zero'

const initial_state = m.toClj({
  message: 'Framework Zero',
  tooltip: {
    position: {x: 0, y: 0},
    visible: false,
    message: 'This is a tooltip'
  }
});

const {eventSource, eventSink} = events();

const element = bootstrap(initial_state, eventSource, memoize(rootComponent(eventSink)));

document.body.appendChild(element);

const delegator = Delegator();
delegator.listenTo('mousemove');

Rx.Observable.of(actions.updateMessage())
  .delay(1000)
  .subscribe((action) => eventSink.next(action));
