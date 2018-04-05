import h from "virtual-dom/h";
import m from "mori";
import Thunk from "vdom-thunk/immutable-thunk";
import shallowEq from "vdom-thunk/shallow-eq";
import cellGroup from "./cell_group";

export default (dispatcher, scheduler, cellsPerGroup, groupsPerMatrix) => {
    const cellGroups = m.map(
        i => cellGroup(dispatcher, scheduler, cellsPerGroup, groupsPerMatrix, i),
        m.range(groupsPerMatrix)
    );

    return state => {
        const thunks = m.map(
            (cg, ts, i) => new Thunk(cg, [ts], `cell-group-${i}`, shallowEq),
            cellGroups,
            state,
            m.range()
        );
        const style = {
            display: 'flex',
            'flex-flow': 'row wrap'
        };
        return h('div', {key: 'matrix', style: style}, m.toJs(thunks));
    }
}
