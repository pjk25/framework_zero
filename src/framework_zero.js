import {BehaviorSubject} from 'rxjs/Rx';
import mainLoop from 'main-loop';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

export function events() {
  const subject = new BehaviorSubject(x => x);
  return {
    sourceObservable: subject.asObservable(),
    dispatcher: subject.next.bind(subject)
  }
}

export function bootstrap(initialState, events, render, onError = state => state) {
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
        return onError(state, event, error);
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
