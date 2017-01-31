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

  const render = makeRenderer(dispatcher);

  const loop = mainLoop(initialState, render, {
    create: createElement,
    diff: diff,
    patch: patch
  });

  let state = initialState;

  function dispatcher(action) {
    try {
      state = action(state);
    } catch (error) {
      state = onError(state, action, error);
    } finally {
      loop.update(state);
    }
  }

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
