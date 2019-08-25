class Seat {
    constructor(code, price = 0, booked=false) {
        this._code = code;
        this._price = price;
        this._booked = booked
    }
    get code() {
        return this._code;
    }

    get price() {
        return this._price;
    }

    get booked() {
        return this._booked;
    }
    
    set booked(booked) {
        try {
            this._booked = booked
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = Seat;