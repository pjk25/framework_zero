import {datascript, mori, helpers} from "datascript-mori";
import {Subject} from "rxjs/Rx";
import Delegator from "dom-delegator";
import DOMEvent from "synthetic-dom-events";
import createElement from "virtual-dom/create-element";
import rootComponent from "../src/root_component";
import {FakeScheduler} from "../../shared/fake_scheduler";
import scheme from "../src/scheme";

const d = datascript.core;

describe('RootComponent', () => {
    beforeEach(() => {
        this.scheduler = new FakeScheduler();
        this.subject = new Subject();
        const dispatcher = this.subject.next.bind(this.subject);


        const {hashMap, vector} = mori;
        const {DB_ADD, DB_ID} = helpers;

        const db = d.empty_db(scheme);
        this.state = d.db_with(db, vector(
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

        const [messageId] = mori.toJs(mori.first(d.q(mori.parse('[:find ?e :where [?e "message" ?m]]'), this.state)));
        const [tooltipId] = mori.toJs(mori.first(d.q(mori.parse('[:find ?e :where [?e "tooltip/message" ?m]]'), this.state)));

        this.tree = rootComponent(dispatcher, messageId, tooltipId, this.scheduler)(this.state);
        this.element = createElement(this.tree);

        document.body.appendChild(this.element);

        Delegator(this.element).listenTo('mousemove');
    });

    afterEach(() => {
        document.body.removeChild(this.element);
    });

    it('should render html', () => {
        expect(this.element.innerText).toContain('Framework Zero');
    });

    it('should update the tooltip on mousemove', done => {
        this.subject
            .do(action => {
                const updated = action(this.state);

                const result = d.q(mori.parse('[:find ?v ?x ?y :where ' +
                    '[?t "tooltip/visible" ?v]' +
                    '[?t "tooltip/position" ?p] ' +
                    '[?p "position/x" ?x] ' +
                    '[?p "position/y" ?y]]'), updated);

                expect(mori.toJs(mori.first(result))).toEqual([true, 10, 19]);
            })
            .subscribe(done, done.fail);

        this.element.dispatchEvent(DOMEvent('mousemove', {
            bubbles: true,
            clientX: 10,
            clientY: 19
        }));
    });

    it('should hide the tooltip after one second', done => {
        this.subject
            .skip(1)
            .do(action => {
                const updated = action(this.state);

                const result = d.q(mori.parse('[:find ?v :where [?t "tooltip/visible" ?v]]'), updated);

                expect(mori.toJs(mori.first(result))).toEqual([false]);
            })
            .subscribe(done, done.fail);

        this.element.dispatchEvent(DOMEvent('mousemove', {
            bubbles: true,
            clientX: 10,
            clientY: 19
        }));

        this.scheduler.advanceBy(1000);
    });
});
