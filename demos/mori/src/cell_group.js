import h from "virtual-dom/h";
import m from "mori";
import Thunk from "vdom-thunk/immutable-thunk";
import shallowEq from "vdom-thunk/shallow-eq";
import cell from "./cell";

export default (dispatcher, scheduler, cellsPerGroup, groupsPerMatrix, i) => {
    const cells = m.map(
        j => cell(dispatcher, scheduler, i, j),
        m.range(cellsPerGroup)
    );

    return state => {
        const thunks = m.map(
            (c, t, j) => new Thunk(c, [t], `cell-${i}-${j}`, shallowEq),
            cells,
            state,
            m.range()
        );
        const style = {
            display: 'flex',
            'flex-flow': 'row wrap'
        };
        return h('div', {key: `cell-group-${i}`, style: style}, m.toJs(thunks));
    }
}
