const ACTIONS = require('./actions');

function publicService(state) {
    // handler for the select option from the menuw
    function _getSelectedMenuFromOption(option) {
        if (typeof option === 'string') {
            switch(option.trim()) {
                case '1': return ACTIONS.ENTER_SHOW;
                case '2': return ACTIONS.SHOW_REVENUE;
                default: return null;
            }
        }
    }
    
    // handler for the select show number
    function _getSelectedShowFromOption(option) {
        try {
            return state.shows[parseInt(option, 10) - 1];
        } catch (e) {
            console.log('in catch');
            return false;
        }
       
    }
    
    // handler for the select seats
    function _getSelectedSeatsFromOptions(option) {
        try {
            return option.trim().split(' ');
        } catch (e) {
            return false;
        }
    }
    
    // function to display the response of the booking ticket
    function _displayBookingResponse(response) {
        try {
            if (response && response.success) {
                const revenue = {
                    subTotal: response.cost.subTotal,
                    serviceTax: response.cost.serviceTax,
                    swachhBharatCess: response.cost.swachhBharatCess,
                    krishiKalyanCess: response.cost.krishiKalyanCess,
                    total: response.cost.total,
                    tax: response.tax,
                }
                console.log('Successfully Booked', state.selectedShow.name);
                _displayLog(revenue);
            }
            else {
                console.log(response && response.message);
            }
        } catch (e) {
            console.log('failed due to unknown reason', e);
        }
    }
    
    // function to display the available shows
    function _displayAvailableShows() {
        try {
            state.shows.map((show, index) => {
                console.log(`${index + 1}. ${show.name}`);
            })
        } catch (e) {
            console.log('Failed to list shows');
        }
    }

    function _displayAvailableSeatsOfSelectedShow() {
        try {
            const availableSeats = state.selectedShow.getAvailableSeats();
            availableSeats.map(item => {
                console.log(`Line: ${item.code} Available Seats: ${item.availableSeats.join(' ') || 'No Seats'}`)
            })
        } catch (e) {
            console.log('failed to load available seats');
        }
    }
    
    // function to display total revenue
    function _displayTotalRevenueOfOwner(list) {
        totalRevenue = list.reduce((prevVal, currVal) => {
            const val = currVal.cost;
            return {
                subTotal: prevVal.subTotal + val.subTotal,
                serviceTax: prevVal.serviceTax + val.serviceTax,
                swachhBharatCess: prevVal.swachhBharatCess + val.swachhBharatCess,
                krishiKalyanCess: prevVal.krishiKalyanCess + val.krishiKalyanCess,
                total: prevVal.total + val.total,
                tax: currVal.tax,
            }
        }, {
            subTotal: 0,
            serviceTax: 0,
            swachhBharatCess: 0,
            krishiKalyanCess: 0,
            total: 0,
        });
        console.log('Total Revenue');
        _displayLog(totalRevenue);
    }
    
    function _displayLog(revenue) {
        console.log('Sub total: Rs. ', parseFloat(revenue.subTotal).toFixed(2));
        console.log(`Service tax @${revenue.tax.serviceTax}%: Rs. ${parseFloat(revenue.serviceTax).toFixed(2)}`);
        console.log(`Swachh Bharat Cess @${revenue.tax.swachhBharatCess}%: Rs. ${parseFloat(revenue.swachhBharatCess).toFixed(2)}`);
        console.log(`Krishi Kalyan Cess @${revenue.tax.krishiKalyanCess}%: Rs. ${parseFloat(revenue.krishiKalyanCess).toFixed(2)}`);
        console.log('Total:', parseFloat(revenue.total).toFixed(2));
    }

    return {
        getSelectedMenuFromOption: _getSelectedMenuFromOption,
        getSelectedShowFromOption: _getSelectedShowFromOption,
        getSelectedSeatsFromOptions: _getSelectedSeatsFromOptions,
        displayBookingResponse: _displayBookingResponse,
        displayAvailableShows: _displayAvailableShows,
        displayAvailableSeatsOfSelectedShow: _displayAvailableSeatsOfSelectedShow,
        displayTotalRevenueOfOwner: _displayTotalRevenueOfOwner,
        displayLog: _displayLog,
    };
}

module.exports = publicService;