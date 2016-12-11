import h from 'virtual-dom/h';
import m from 'mori';

export default function render(state) {
  return h('div', {}, [m.get(state, 'message')]);
}
