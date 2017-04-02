import h from "virtual-dom/h";
import m from "mori";
import partial from "vdom-thunk";
import {Subject} from "rxjs/Rx";
import tooltip from "./tooltip";
import matrix from "./matrix";
import {hideTooltip, updateTooltipPosition} from "./actions";

export default (dispatcher, scheduler) => {
    const tt = tooltip(dispatcher, scheduler);
    const mtx = matrix(dispatcher, scheduler);

    const hideSubject = new Subject();

    hideSubject
        .map(e => updateTooltipPosition(e.clientX, e.clientY))
        .subscribe(dispatcher);

    hideSubject
        .debounceTime(200, scheduler)
        .map(() => hideTooltip())
        .subscribe(dispatcher);

    const onMousemove = hideSubject.next.bind(hideSubject);

    return (state) => {
        return h('div', {style: {height: '100vh'}, 'ev-mousemove': onMousemove}, [
            h('p', {}, [m.get(state, 'message')]),
            partial(tt, m.get(state, 'tooltip')),
            partial(mtx, m.get(state, 'blocks'))
        ]);
    }
}
