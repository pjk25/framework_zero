import h from "virtual-dom/h";
import m from "mori";
import Thunk from "vdom-thunk/immutable-thunk";
import shallowEq from "vdom-thunk/shallow-eq";
import {Subject} from "rxjs/Rx";
import {touch, untouch} from "./actions";

export default (dispatcher, scheduler, i) => {
    const hideSubject = new Subject();

    hideSubject
        .map(() => touch(i))
        .subscribe(dispatcher);

    hideSubject
        .debounceTime(500, scheduler)
        .map(() => untouch(i))
        .subscribe(dispatcher);

    const onMousemove = hideSubject.next.bind(hideSubject);

    return t => {
        const style = {
            width: '10px',
            height: '10px',
            'background-color': 'blue',
            opacity: t ? 1.0 : 0.0,
            transition: `opacity ${t ? 0 : 1}s`
        };

        return h('div', {key: `matrix-${i}`, style: style, 'ev-mousemove': onMousemove});
    }
}
