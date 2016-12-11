import Rx from 'rxjs/Rx';
import m from 'mori';
import render from './render';

import {bootstrap} from './framework_zero'

const initial_state = m.toClj({
  message: 'Framework Zero'
});

const eventSink = bootstrap(initial_state, render, document.body);

Rx.Observable.of((s) => m.updateIn(s, ['message'], (m) => m + '!'))
  .delay(1000)
  .subscribe(eventSink);
