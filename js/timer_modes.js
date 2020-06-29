/* This script handles everything related to the timer itself:
counting, updating, and more. */

class mode {
    constructor() {}

    load(endMoment) {
        if (this.interval != null) {
            // Stop timer if aleady running
            clearInterval(this.interval);
        }

        // Update timer every second
        this.interval = setInterval(this.update, 1000, endMoment);
    }

    update(endMoment) {
        let curMoment = moment();

        $("#timer-container > #days").text(endMoment.diff(curMoment, "days"));
        $("#timer-container > #hours").text(
            endMoment.diff(curMoment, "hours") % 24
        );
        $("#timer-container > #minutes").text(
            endMoment.diff(curMoment, "minutes") % 60
        );
        $("#timer-container > #seconds").text(
            endMoment.diff(curMoment, "seconds") % 60
        );
    }
}

class countdown extends mode {
    constructor() {
        super();
    }

    load() {
        let endMoment = moment().add(10, "minutes");
        super.load(endMoment);
    }

    update(endMoment) {
        super.update(endMoment);
    }
}

let cd = new countdown();
cd.load();
