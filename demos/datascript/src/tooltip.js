import {datascript, mori, helpers} from "datascript-mori";
import h from "virtual-dom/h";

const d = datascript.core;

export default (dispatcher) => (state) => {

    const [id] = mori.toJs(mori.first(d.q(mori.parse('[:find ?e :where [?e "tooltip/message" ?m]]'), state)));

    const data = d.pull(state, mori.parse('[' +
        '"tooltip/message" ' +
        '"tooltip/visible" ' +
        '{"tooltip/position" ["position/x" "position/y"]}' +
        ']'), id);

    return h('div', {
        style: {
            position: 'absolute',
            color: 'white',
            background: 'red',
            width: '150px',
            height: '50px',
            'line-height': '50px',
            'text-align': 'center',
            left: mori.getIn(data, ['tooltip/position', 'position/x']) + 'px',
            top: mori.getIn(data, ['tooltip/position', 'position/y']) + 'px',
            opacity: mori.get(data, 'tooltip/visible') ? '1' : '0',
            transition: 'opacity 1s'
        }
    }, [mori.get(data, 'tooltip/message')]);
}
