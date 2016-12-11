import Rx from 'rxjs/Rx';
import m from 'mori';
import render from './render';
import * as actions from './actions'

import {bootstrap} from './framework_zero'

const initial_state = m.toClj({
  message: 'Framework Zero'
});

const eventSink = bootstrap(initial_state, render, document.body);

Rx.Observable.of(actions.updateMessage)
  .delay(1000)
  .subscribe(eventSink);
