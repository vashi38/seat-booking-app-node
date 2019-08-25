const Tax = require('./Tax');
const data = require('../data');

let tax = null;
describe('Test for Tax class', () => {
    beforeEach(() => {
        tax = new Tax(data.Tax.serviceTax, data.Tax.swachhBharatCess, data.Tax.krishiKalyanCess);
    })

    it('tax class should initialised correctly', () => {
        const { serviceTax, swachhBharatCess, krishiKalyanCess } = data.Tax;
        expect(tax.serviceTax).toBe(serviceTax);
        expect(tax.swachhBharatCess).toBe(swachhBharatCess);
        expect(tax.krishiKalyanCess).toBe(krishiKalyanCess);
    })

    it('should give correct service tax on revenue', () => {
        const revenue = 100;
        const taxOnRevenue = tax.getServiceTaxOnRevenue(revenue)
        expect(parseFloat(taxOnRevenue).toFixed(2)).toBe('14.00');
    })

    it('should give correct Swachh Bharat Cess on revenue', () => {
        const revenue = 100;
        const taxOnRevenue = tax.getSwachhBharatCessOnRevenue(revenue)
        expect(parseFloat(taxOnRevenue).toFixed(2)).toBe('0.50');
    })

    it('should give correct Krishi Kalyan Cess on revenue', () => {
        const revenue = 100;
        const taxOnRevenue = tax.getSwachhBharatCessOnRevenue(revenue)
        expect(parseFloat(taxOnRevenue).toFixed(2)).toBe('0.50');
    })
})