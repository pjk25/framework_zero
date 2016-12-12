import h from 'virtual-dom/h';
import m from 'mori';
import tooltip from './tooltip';
import {memoize} from './framework_zero';
import {updateTooltipPosition, hideTooltip} from './actions';

let handle;

export default (events) => {
  const tt = memoize(tooltip(events));

  function onMousemove(e) {
    events.next(updateTooltipPosition(e.clientX, e.clientY));
    if (handle) {
      clearTimeout(handle);
      handle = undefined;
    }
    handle = setTimeout(() => events.next(hideTooltip()), 1000);
  }

  return (state) => {
    return h('div', {style: {height: '100%'}, 'ev-mousemove': onMousemove}, [
      h('p', {}, [m.get(state, 'message')]),
      tt(m.get(state, 'tooltip'))
    ]);
  }
}
