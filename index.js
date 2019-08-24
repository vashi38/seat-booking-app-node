const data = require('./data');
const Show = require('./Show');
const ACTIONS = require('./actions');

let acceptInputAllowed = false;
const _shows = data.shows.map(show => new Show(show.name, show.seats, data.Tax));

//setup to accept user input
const standard_input = process.stdin;
standard_input.setEncoding('utf-8');
standard_input.on('data', (data) => {
    if (acceptInputAllowed) {
        acceptInputAllowed = false;
        switch(selectedAction) {
            case ACTIONS.SHOW_MENU: {
                const newSelectedOption = getSelectedMenuFromOption(data);
                if (newSelectedOption) {
                    selectedAction = newSelectedOption;
                } else {
                    console.log('Wrong option code, please select option from the menu')
                }
                showSelectedOptionOnScreen(selectedAction);
                break;
            }
            case ACTIONS.ENTER_SHOW: {
                const newSelectedShow = getSelectedShowFromOption(data, _shows);
                if (newSelectedShow) {
                    selectedAction = ACTIONS.ENTER_SEATS;
                    selectedShow = newSelectedShow;
                } else {
                    console.log('Wrong show code, please select show from the list')
                }
                showSelectedOptionOnScreen(selectedAction);
                break;
            }
            case ACTIONS.ENTER_SEATS: {
                const newSelectedSeats = getSelectedSeatsFromOptions(data);
                if (newSelectedSeats) {
                    const bookTicketsResponse = selectedShow.bookTickets(newSelectedSeats);
                    if (bookTicketsResponse.success) {
                        selectedAction = ACTIONS.SHOW_MENU;
                    }
                    displayBookingResponse(bookTicketsResponse);
                } else {
                    console.log('Entered wrong seats, please keep space between 2 seats');
                }
                showSelectedOptionOnScreen(selectedAction);
                break;
            }
        }
    }
});

//set default selected action as show menu
let selectedAction = ACTIONS.SHOW_MENU;
let selectedShow = null;
showSelectedOptionOnScreen(selectedAction);


function showSelectedOptionOnScreen(action) {
    switch (action) {
        case ACTIONS.SHOW_MENU: {
            console.log('Select from below menu:');
            console.log('1. Book show');
            console.log('2. Total Revenue');
            acceptInputAllowed = true;
            break;
        }
        case ACTIONS.ENTER_SHOW: {
            console.log('Enter show:');
            displayAvailableShows(_shows);
            acceptInputAllowed = true;
            break;
        }
        case ACTIONS.ENTER_SEATS: {
            console.log('Selected show: ', selectedShow.name);
            console.log('Enter seats:');
            try {
                const availableSeats = selectedShow.getAvailableSeats();
                availableSeats.map(item => {
                    console.log(`Line: ${item.code} Available Seats: ${item.availableSeats.join(' ')}`)
                })
            } catch (e) {
                console.log('failed to load available seats');
            }
            acceptInputAllowed = true;
            break;
        }
        case ACTIONS.SHOW_REVENUE: {
            const revenueList = _shows.map(show => show.getRevenue())
            displayTotalRevenueOfOwner(revenueList);
            acceptInputAllowed = true;
            selectedAction = ACTIONS.SHOW_MENU
            showSelectedOptionOnScreen(selectedAction);
            break;
        }
        default: break;
    }
}

function getSelectedMenuFromOption(option) {
    if (typeof option === 'string') {
        switch(option.trim()) {
            case '1': return ACTIONS.ENTER_SHOW;
            case '2': return ACTIONS.SHOW_REVENUE;
            default: return null;
        }
    }
}

function getSelectedShowFromOption(option, shows) {
    try {
        return shows[parseInt(option, 10) - 1];
    } catch (e) {
        console.log('in catch');
        return false;
    }
   
}

function getSelectedSeatsFromOptions(option) {
    try {
        return option.trim().split(' ');
    } catch (e) {
        return false;
    }
}

function displayBookingResponse(response) {
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
            console.log('Successfully Booked', selectedShow.name);
            displayLog(revenue);
        }
        else {
            console.log(response && response.message);
        }
    } catch (e) {
        console.log('failed due to unknown reason', e);
    }
}

function displayAvailableShows(shows) {
    try {
        shows.map((show, index) => {
            console.log(`${index + 1}. ${show.name}`);
        })
    } catch (e) {
        console.log('Failed to list shows');
    }
}

function displayTotalRevenueOfOwner(list) {
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
    displayLog(totalRevenue);
}

function displayLog(revenue) {
    console.log('Sub total: Rs. ', parseFloat(revenue.subTotal).toFixed(2));
    console.log(`Service tax @${revenue.tax.serviceTax}%: Rs. ${parseFloat(revenue.serviceTax).toFixed(2)}`);
    console.log(`Swachh Bharat Cess @${revenue.tax.swachhBharatCess}%: Rs. ${parseFloat(revenue.swachhBharatCess).toFixed(2)}`);
    console.log(`Krishi Kalyan Cess @${revenue.tax.krishiKalyanCess}%: Rs. ${parseFloat(revenue.krishiKalyanCess).toFixed(2)}`);
    console.log('Total:', parseFloat(revenue.total).toFixed(2));
}