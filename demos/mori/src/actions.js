import m from "mori";

export const updateMessage = () => (s) => {
    return m.updateIn(s, ['message'], (m) => m + '!');
};

export const updateTooltipPosition = (x, y) => (s) => {
    return m.pipeline(s,
        m.curry(m.assocIn, ['tooltip', 'visible'], true),
        m.curry(m.assocIn, ['tooltip', 'position', 'x'], x),
        m.curry(m.assocIn, ['tooltip', 'position', 'y'], y)
    );
};

export const hideTooltip = () => (s) => {
    return m.assocIn(s, ['tooltip', 'visible'], false);
};

export const touch = (i) => (s) => {
    return m.assocIn(s, ['blocks', i], true);
};

export const untouch = (i) => (s) => {
    return m.assocIn(s, ['blocks', i], false);
};