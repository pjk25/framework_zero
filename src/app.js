import Rx from 'rxjs/Rx';
import m from 'mori';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';
import render from './render';

const initial_state = m.toClj({
  message: 'Framework Zero'
});

const events = new Rx.BehaviorSubject(m.identity);

const appState = events.asObservable()
  .scan((state, event) => event(state), initial_state);

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

Rx.Observable.of((s) => m.updateIn(s, ['message'], (m) => m + '!'))
  .delay(1000)
  .subscribe(events);
