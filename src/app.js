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

const {sourceObservable, dispatcher} = events();

const element = bootstrap(initial_state, sourceObservable, memoize(rootComponent(dispatcher)));

document.body.appendChild(element);

Delegator(element).listenTo('mousemove');

Rx.Observable.of(actions.updateMessage())
  .delay(1000)
  .subscribe(dispatcher);
