import {datascript, mori, helpers} from "datascript-mori";

const d = datascript.core;
const {DB_ID} = helpers;

export const updateMessage = () => (s) => {
    const [e, m] = mori.toJs(mori.first(d.q(Datalog.Q`[:find ?e ?m :where [?e "message" ?m]]`, s)));

    return d.db_with(s, mori.vector(
        mori.hashMap(
            DB_ID, e,
            "message", m + '!'
        )
    ));
};

export const updateTooltipPosition = (x, y) => (s) => {
    const [t, p] = mori.toJs(mori.first(d.q(Datalog.Q`[:find ?t ?p :where [?t "tooltip/position" ?p]]`, s)));

    return d.db_with(s, mori.vector(
        mori.hashMap(
            DB_ID, p,
            "position/x", x,
            "position/y", y
        ),
        mori.hashMap(
            DB_ID, t,
            "tooltip/visible", true
        )
    ));
};

export const hideTooltip = () => (s) => {
    const t = mori.first(mori.first(d.q(Datalog.Q`[:find ?t :where [?t "tooltip/position" ?p]]`, s)));

    return d.db_with(s, mori.vector(
        mori.hashMap(
            DB_ID, t,
            "tooltip/visible", false
        )
    ));
};
