import h from "virtual-dom/h";
import m from "mori";

export default (dispatcher) => (state) => {
    return h('div', {
        style: {
            position: 'absolute',
            color: 'white',
            background: 'red',
            width: '150px',
            height: '50px',
            'line-height': '50px',
            'text-align': 'center',
            left: m.getIn(state, ['position', 'x']),
            top: m.getIn(state, ['position', 'y']),
            opacity: m.get(state, 'visible') ? '1' : '0',
            transition: 'opacity 1s'
        }
    }, [m.get(state, 'message')]);
}
