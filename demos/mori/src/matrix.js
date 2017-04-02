import h from "virtual-dom/h";
import m from "mori";
import partial from "vdom-thunk";
import {Subject} from "rxjs/Rx";
import {touch, untouch} from "./actions";

export default (dispatcher, scheduler) => {
    function cell(t, i) {
        const hideSubject = new Subject();

        hideSubject
            .map(() => touch(i))
            .subscribe(dispatcher);

        hideSubject
            .debounceTime(500, scheduler)
            .map(() => untouch(i))
            .subscribe(dispatcher);

        const onMousemove = hideSubject.next.bind(hideSubject);

        const style = {
            width: '10px',
            height: '10px',
            'background-color': 'blue',
            opacity: t ? 1.0 : 0.0,
            transition: `opacity ${t ? 0 : 1}s`
        };

        return h('div', {key: `matrix-${i}`, style: style, 'ev-mousemove': onMousemove});
    }

    return (state) => {
        const cells = m.map(
            (t, i) => partial(cell, t, i),
            state,
            m.range()
        );
        const style = {
            display: 'flex',
            'flex-flow': 'row wrap'
        };
        return h('div', {key: 'matrix', style: style}, m.toJs(cells));
    }
}
