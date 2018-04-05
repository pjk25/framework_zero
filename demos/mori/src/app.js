import m from "mori";
import {Observable} from "rxjs/Rx";
import Delegator from "dom-delegator";
import rootComponent from "./root_component";
import * as actions from "./actions";
import {bootstrap} from "framework_zero";

const CELLS_PER_GROUP = 100;
const GROUPS_PER_MATRIX = 16;

const initial_state = m.toClj({
    message: 'Framework Zero',
    tooltip: {
        position: {x: 0, y: 0},
        visible: false,
        message: 'This is a tooltip'
    },
    blocks: new Array(GROUPS_PER_MATRIX).fill(new Array(CELLS_PER_GROUP).fill(false))
});

const {element, dispatcher} = bootstrap(
    initial_state,
    rootComponent(CELLS_PER_GROUP, GROUPS_PER_MATRIX),
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
    .delay(2000)
    .subscribe(dispatcher);
