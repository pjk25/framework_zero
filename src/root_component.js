import h from 'virtual-dom/h';
import m from 'mori';
import Rx from 'rxjs/Rx';
import tooltip from './tooltip';
import {memoize} from './framework_zero';
import {updateTooltipPosition, hideTooltip} from './actions';

export default (dispatcher, scheduler) => {
  const tt = memoize(tooltip(dispatcher));
  const hideSubject = new Rx.Subject();

  hideSubject
    .subscribeOn(scheduler)
    .debounceTime(1000)
    .subscribe(dispatcher);

  function onMousemove(e) {
    dispatcher(updateTooltipPosition(e.clientX, e.clientY));
    hideSubject.next(hideTooltip());
  }

  return (state) => {
    return h('div', {style: {height: '100%'}, 'ev-mousemove': onMousemove}, [
      h('p', {}, [m.get(state, 'message')]),
      tt(m.get(state, 'tooltip'))
    ]);
  }
}
