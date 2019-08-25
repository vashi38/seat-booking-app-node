const Line = require ('./Line');
const Tax = require('./Tax');

class Show {
    constructor(name, lines, tax) {
        this._name = name;
        this._lines = this.getLines(lines);
        this._tax = new Tax(tax.serviceTax, tax.swachhBharatCess, tax.krishiKalyanCess);
    }

    get name() {
        return this._name;
    }

    get seats() {
        if (Array.isArray(this._lines)) {
            return this._lines;
        }
        return [];
    }

    getLines(lines) {
        try {
            return Object.keys(lines).map(code => {
                const price = lines[code].price;
                const seats = lines[code].list;
                return new Line(code, seats, price);
            });
        } catch (e) {
            console.log('in catch getListFromSeats', lines);
            return [];
        }
    }

    getAvailableSeats(onlyCode = true) {
        try {
            return this._lines.map(each => ({
                code: each.code,
                availableSeats: onlyCode ? each.getAvailableSeats().map(item => item.code) : each.getAvailableSeats(),
            }));
        } catch (e) {
            return [];
        }
    }

    getBookedSeats(onlyCode = true) {
        try {
            return this._lines.map(each => ({
                code: each.code,
                bookedSeats: onlyCode ? each.getBookedSeats().map(item => item.code) : each.getBookedSeats(),
            }));
        } catch (e) {
            return [];
        }
    }

    getCost(selectedSeats, withTax = false) {
        const subTotal = selectedSeats.reduce((prevVal, currentValue) => {
            return prevVal + currentValue.price;
        }, 0);
        let tax = {};
        if (withTax) {
            tax = this._tax.getTaxOnRevenue(subTotal);
        }
        return {
            subTotal,
            ...tax,
        }
    }

    bookTickets(list) {
        try {
            const availableSeats = [].concat(...this.getAvailableSeats(false).map(item => item.availableSeats));
            const selectedSeats = availableSeats.filter(each => list.includes(each.code));
            if (selectedSeats.length === list.length) {
                selectedSeats.map(each => {
                    each.booked = true;
                    return each;
                });
                return {
                    success: true,
                    list: selectedSeats,
                    cost: this.getCost(selectedSeats, true),
                    tax: this._tax.getTax(),
                    message: null,
                }
            }
            const invalidSeats = list.filter(each => !selectedSeats.find(item => item.code === each));
            return {
                success: false,
                list: [],
                message: `Failed to book seats, ${invalidSeats.join(' ')} not available`,
            }
        } catch (e) {
            console.log(e);
            return {
                success: false,
                list: [],
                message: 'Failed to book seats, reason unknown',
            }
        }
    }

    getRevenue() {
        try {
            const bookedSeats = [].concat(...this.getBookedSeats(false).map(item => item.bookedSeats));
            return {
                cost: this.getCost(bookedSeats, true),
                tax: this._tax.getTax(),
            };
        } catch (e) {
            return {
                cost: this.getCost([], true),
                tax: this._tax.getTax(),
            }
        }
    }
}

module.exports = Show;