class Seat {
    constructor(code, price = 0, booked=false) {
        this._code = code;
        this._price = price;
        this._booked = booked
    }
    get code() {
        return this._code;
    }
    set code(code) {
        try {
            this._code = code;
            return true;
        } catch (e) {
            return false;
        }
    }

    get price() {
        return this._price;
    }

    set price(price) {
        try {
            this._price = price
            return true;
        } catch (e) {
            return false;
        }
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