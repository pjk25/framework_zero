import m from "mori";
import {Observable} from "rxjs/Rx";
import Delegator from "dom-delegator";
import rootComponent from "./root_component";
import * as actions from "./actions";
import {bootstrap, memoize} from "framework_zero";

const initial_state = m.toClj({
    message: 'Framework Zero',
    tooltip: {
        position: {x: 0, y: 0},
        visible: false,
        message: 'This is a tooltip'
    }
});

const {element, dispatcher} = bootstrap(
    initial_state,
    dispatcher => memoize(rootComponent(dispatcher)),
    (state, event, error) => {
        console.log(
            'Skipping failed app state update due to', error,
            'raised by\n', event, '\nfor app state', m.toJs(state));
        return state;
    }
);

document.body.appendChild(element);

Delegator(element).listenTo('mousemove');

Observable.of(actions.updateMessage())
    .delay(1000)
    .subscribe(dispatcher);
