class Tax {
    constructor(serviceTax, swachhBharatCess, krishiKalyanCess) {
        this._serviceTax = serviceTax;
        this._swachhBharatCess = swachhBharatCess;
        this._krishiKalyanCess = krishiKalyanCess;
    }

    get serviceTax() {
        return this._serviceTax;
    }

    get swachhBharatCess() {
        return this._swachhBharatCess;
    }

    get krishiKalyanCess() {
        return this._krishiKalyanCess;
    }

    getServiceTaxOnRevenue(revenue) {
        const _serviceTax = parseFloat(this._serviceTax);
        const _revenue = parseFloat(revenue);
        if (!isNaN(_serviceTax) && !isNaN(_revenue)) {
            return _revenue * (_serviceTax / 100)
        }
        return 0;
    }

    getSwachhBharatCessOnRevenue(revenue) {
        const _swachhBharatCess = parseFloat(this._swachhBharatCess);
        const _revenue = parseFloat(revenue);
        if (!isNaN(_swachhBharatCess) && !isNaN(_revenue)) {
            return _revenue * (_swachhBharatCess / 100)
        }
        return 0;
    }

    getKrishiKalyanCessOnRevenue(revenue) {
        const _krishiKalyanCess = parseFloat(this._krishiKalyanCess);
        const _revenue = parseFloat(revenue);
        if (!isNaN(_krishiKalyanCess) && !isNaN(_revenue)) {
            return _revenue * (_krishiKalyanCess / 100)
        }
        return 0;
    }

    getTaxOnRevenue(revenue) {
        const serviceTax = this.getServiceTaxOnRevenue(revenue);
        const swachhBharatCess = this.getSwachhBharatCessOnRevenue(revenue);
        const krishiKalyanCess = this.getKrishiKalyanCessOnRevenue(revenue);
        return {
            serviceTax,
            swachhBharatCess,
            krishiKalyanCess,
            total: revenue + serviceTax + swachhBharatCess + krishiKalyanCess,
        }
    }

    getTax() {
        return {
            serviceTax: this._serviceTax,
            swachhBharatCess: this._swachhBharatCess,
            krishiKalyanCess: this._krishiKalyanCess,
        }
    }
}

module.exports = Tax;
