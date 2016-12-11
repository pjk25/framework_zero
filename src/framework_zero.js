import Rx from 'rxjs/Rx';
import m from 'mori';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

export function bootstrap(initial_state, render) {
  const events = new Rx.BehaviorSubject(m.identity);

  const appState = events.asObservable()
    .scan((state, event) => {
      try {
        return event(state);
      } catch(error) {
        console.log('Skipping failed app state update due to', error, 'raised by\n', event, '\nfor app state', m.toJs(state));
        return state;
      }
    }, initial_state);

  appState.scan((uiState, appState) => {
    let newTree = render(appState);
    let tree = m.get(uiState, 'tree');
    let rootNode = m.get(uiState, 'rootNode');
    if (!rootNode) {
      rootNode = createElement(newTree);
      document.body.appendChild(rootNode);
    } else {
      let patches = diff(tree, newTree);
      rootNode = patch(rootNode, patches);
    }
    return m.hashMap(
      'tree', newTree,
      'rootNode', rootNode
    );
  }, m.hashMap()).subscribe();

  return events;
};
