import {BehaviorSubject} from 'rxjs/Rx';
import mainLoop from 'main-loop';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

export function bootstrap(initialState, makeRenderer, onError = state => state) {
  if (!initialState) {
    throw 'initialState must be defined';
  }
  if (!makeRenderer) {
    throw 'makeRenderer must be defined';
  }

  const subject = new BehaviorSubject(x => x);
  const dispatcher = subject.next.bind(subject);

  const render = makeRenderer(dispatcher);

  const loop = mainLoop(initialState, render, {
    create: createElement,
    diff: diff,
    patch: patch
  });

  const appState = subject
    .asObservable()
    .scan((state, event) => {
      try {
        return event(state);
      } catch(error) {
        return onError(state, event, error);
      }
    }, initialState);

  appState.subscribe(loop.update);

  return {
    element: loop.target,
    dispatcher: dispatcher
   };
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
