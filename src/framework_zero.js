import Rx from 'rxjs/Rx';
import mainLoop from 'main-loop';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';
import m from 'mori';

export function events() {
  const subject = new Rx.BehaviorSubject((x) => x);
  return {
    sourceObservable: subject.asObservable(),
    dispatcher: subject.next.bind(subject)
  }
}

export function bootstrap(initialState, events, render) {
  const subject = new Rx.BehaviorSubject((x) => x);

  const loop = mainLoop(initialState, render, {
    create: createElement,
    diff: diff,
    patch: patch
  });

  const appState = events
    .scan((state, event) => {
      try {
        return event(state);
      } catch(error) {
        console.log(
          'Skipping failed app state update due to', error,
          'raised by\n', event, '\nfor app state', m.toJs(state));
        return state;
      }
    }, initialState);

  appState.subscribe(loop.update);

  return loop.target;
};

export function memoize(render) {
  let tree, state;
  return function memoized(newState) {
    if (newState !== state) {
      state = newState;
      tree = render(state);
    }
    return tree;
  };
}
