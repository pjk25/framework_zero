import {datascript, mori, helpers} from "datascript-mori";
import h from "virtual-dom/h";
import {Subject} from "rxjs/Rx";
import tooltip from "./tooltip";
import {updateTooltipPosition, hideTooltip} from "./actions";

const d = datascript.core;

export default (dispatcher, scheduler) => {
    const tt = tooltip(dispatcher);

    const hideSubject = new Subject();

    hideSubject
        .map(e => updateTooltipPosition(e.clientX, e.clientY))
        .subscribe(dispatcher);

    hideSubject
        .debounceTime(1000, scheduler)
        .map(() => hideTooltip())
        .subscribe(dispatcher);

    const onMousemove = hideSubject.next.bind(hideSubject);

    return (state) => {
        const [message] = mori.toJs(mori.first(d.q(mori.parse('[:find ?m :where [?e "message" ?m]]'), state)));

        return h('div', {style: {height: '100vh'}, 'ev-mousemove': onMousemove}, [
            h('p', {}, [message]),
            tt(state)
        ]);
    }
}
