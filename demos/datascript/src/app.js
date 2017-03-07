import {datascript, mori, helpers} from "datascript-mori";
import {Observable} from "rxjs/Rx";
import Delegator from "dom-delegator";
import rootComponent from "./root_component";
import * as actions from "./actions";
import {bootstrap} from "framework_zero";
import scheme from "./scheme";

const d = datascript.core;
const {hashMap, vector} = mori;
const {DB_ADD, DB_ID} = helpers;

const db = d.empty_db(scheme);
const initialState = d.db_with(db, vector(
    vector(DB_ADD, -1, "message", "Framework Zero"),
    hashMap(
        DB_ID, -2,
        "position/x", 0,
        "position/y", 0
    ),
    hashMap(
        DB_ID, -3,
        "tooltip/position", -2,
        "tooltip/visible", false,
        "tooltip/message", "This is a tooltip"
    )
));

const messageId = mori.first(mori.first(d.q(Datalog.Q`[:find ?e :where [?e "message" ?m]]`, initialState)));
const tooltipId = mori.first(mori.first(d.q(Datalog.Q`[:find ?e :where [?e "tooltip/message" ?m]]`, initialState)));

const {element, dispatcher} = bootstrap(
    initialState,
    dispatcher => rootComponent(dispatcher, messageId, tooltipId),
    (state, event, error) => {
        console.log(
            'Skipping failed app state update due to', error);
        return state;
    }
);

document.body.appendChild(element);

Delegator(element).listenTo('mousemove');

Observable.of(actions.updateMessage())
    .delay(1000)
    .subscribe(dispatcher);
