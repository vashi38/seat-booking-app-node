const data = require('./data');
const Show = require('./classes/Show');
const ACTIONS = require('./actions');
const State = require('./classes/State');
const PublicService = require('./services/service');

const _shows = data.shows.map(show => new Show(show.name, show.seats, data.Tax));
const state = new State(_shows, ACTIONS.SHOW_MENU, null);
const publicService = PublicService(state);

//setup to accept user input
const standard_input = process.stdin;
standard_input.setEncoding('utf-8');

showSelectedOptionOnScreen(state);

// function to handle the change in the selected option from the state
function showSelectedOptionOnScreen(state) {
    const action = state.selectedAction;
    standard_input.removeAllListeners('data');
    switch (action) {
        case ACTIONS.SHOW_MENU: {
            handleShowMenuOption();
            break;
        }
        case ACTIONS.ENTER_SHOW: {
            handleEnterShowOption();
            break;
        }
        case ACTIONS.ENTER_SEATS: {
            handleEnterSeatsOption();
            break;
        }
        case ACTIONS.SHOW_REVENUE: {
            handleShowRevenueOption();
            break;
        }
        default: break;
    }
}


// hendler for show menue option
function handleShowMenuOption() {
    console.log('Select from below menu:');
    console.log('1. Book show');
    console.log('2. Total Revenue');
    standard_input.on('data', (data) => {
        const newSelectedOption = publicService.getSelectedMenuFromOption(data);
        if (newSelectedOption) {
            state.selectedAction = newSelectedOption;
            state.selectedShow = null;
        } else {
            console.log('Wrong option code, please select option from the menu')
        }
        showSelectedOptionOnScreen(state);
    });
}

// hendler for enter show number
function handleEnterShowOption() {
    console.log('Enter show:');
    publicService.displayAvailableShows();
    standard_input.on('data', (data) => {
        const newSelectedShow = publicService.getSelectedShowFromOption(data);
        if (newSelectedShow) {
            state.selectedAction = ACTIONS.ENTER_SEATS;
            state.selectedShow = newSelectedShow;
        } else {
            console.log('Wrong show code, please select show from the list')
        }
        showSelectedOptionOnScreen(state);
    });
}

// hendler for enter seats
function handleEnterSeatsOption() {
    console.log('Selected show: ', state.selectedShow.name);
    console.log('Enter seats:');
    publicService.displayAvailableSeatsOfSelectedShow();
    standard_input.on('data', (data) => {
        const newSelectedSeats = publicService.getSelectedSeatsFromOptions(data);
        if (newSelectedSeats) {
            const bookTicketsResponse = state.selectedShow.bookTickets(newSelectedSeats);
            if (bookTicketsResponse.success) {
                state.selectedAction = ACTIONS.SHOW_MENU;
            }
            publicService.displayBookingResponse(bookTicketsResponse);
        } else {
            console.log('Entered wrong seats, please keep space between 2 seats');
        }
        showSelectedOptionOnScreen(state);
    });
}

// hendler for show revenue of the owner
function handleShowRevenueOption() {
    const revenueList = state.shows.map(show => show.getRevenue());
    publicService.displayTotalRevenueOfOwner(revenueList);
    state.selectedAction = ACTIONS.SHOW_MENU;
    showSelectedOptionOnScreen(state);
}