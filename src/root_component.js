import h from 'virtual-dom/h';
import m from 'mori';
import {Subject} from 'rxjs/Rx';
import tooltip from './tooltip';
import {memoize} from './framework_zero';
import {updateTooltipPosition, hideTooltip} from './actions';

export default (dispatcher, scheduler) => {
  const tt = memoize(tooltip(dispatcher));

  const hideSubject = new Subject();

  hideSubject
    .map(e => updateTooltipPosition(e.clientX, e.clientY))
    .subscribe(dispatcher);

  hideSubject
    .debounceTime(1000, scheduler)
    .map(() => hideTooltip())
    .subscribe(dispatcher);

  const onMousemove = hideSubject.next.bind(hideSubject);

  return (state) => {
    return h('div', {style: {height: '100%'}, 'ev-mousemove': onMousemove}, [
      h('p', {}, [m.get(state, 'message')]),
      tt(m.get(state, 'tooltip'))
    ]);
  }
}
