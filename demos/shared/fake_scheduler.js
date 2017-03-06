export function FakeScheduler(epoch = 0) {
    function FakeSubscription() {
        this.unsubscribe = function unsubscribe() {
        };
    }

    this.epoch = epoch;
    this.work = [];
    this.schedule = function schedule(work, delay, state) {
        this.work = this.work
            .concat({work: work, delay: delay, state: state})
            .sort((l, r) => r.delay - l.delay);
        return new FakeSubscription();
    }
    this.advanceBy = function advanceBy(time) {
        for (let key in this.work) {
            if (this.work.hasOwnProperty(key)) {
                let job = this.work[key];
                if (!job.done && job.delay <= time) {
                    job.work(job.state);
                    job.done = true;
                }
                job.delay = job.delay - time;
            }
        }
        this.epoch = this.epoch + time;
    }
}
