import Rx from 'rxjs/Rx';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

export function bootstrap(initial_state, render, container) {
  const events = new Rx.BehaviorSubject((x) => x);

  const appState = events.asObservable()
    .scan((state, event) => {
      try {
        return event(state);
      } catch(error) {
        console.log('Skipping failed app state update due to', error, 'raised by\n', event, '\nfor app state', m.toJs(state));
        return state;
      }
    }, initial_state);

  appState.scan(({tree, rootNode}, appState) => {
    let newTree = render(appState);
    if (!rootNode) {
      rootNode = createElement(newTree);
      container.appendChild(rootNode);
    } else {
      let patches = diff(tree, newTree);
      rootNode = patch(rootNode, patches);
    }
    return {
      tree: newTree,
      rootNode: rootNode
    }
  }, {}).subscribe();

  return events;
};
