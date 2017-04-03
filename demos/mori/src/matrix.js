import h from "virtual-dom/h";
import m from "mori";
import Thunk from "vdom-thunk/immutable-thunk";
import shallowEq from "vdom-thunk/shallow-eq";
import cell from "./cell";

export default (dispatcher, scheduler) => {
    return state => {
        const cells = m.map(
            (t, i) => new Thunk(cell(dispatcher, scheduler, i), [t], `cell-${i}`, shallowEq),
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
