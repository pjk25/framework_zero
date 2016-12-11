import m from 'mori';

export function updateMessage(s) {
  return m.updateIn(s, ['message'], (m) => m + '!');
}
