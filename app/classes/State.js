class State {
    constructor (shows, selectedAction, selectedShow) {
        this._shows = shows;
        this._selectedAction = selectedAction;
        this._selectedShow = selectedShow;
    }

    get shows() {
        return this._shows;
    }

    get selectedAction() {
        return this._selectedAction;
    }

    set selectedAction(selectedAction) {
        this._selectedAction = selectedAction;
    }

    get selectedShow() {
        return this._selectedShow;
    }

    set selectedShow(selectedShow) {
        this._selectedShow = selectedShow;
    }
}

module.exports = State;