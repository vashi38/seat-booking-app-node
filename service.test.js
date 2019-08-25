const data = require('./data');
const Show = require('./Show');
const ACTIONS = require('./actions');
const State = require('./State');
const PublicService = require('./service');


let publicService = null;
let state = null;

describe('check the initialised state', () => {
    beforeEach(() => {
        const _shows = data.shows.map(show => new Show(show.name, show.seats, data.Tax));
        state = new State(_shows, ACTIONS.SHOW_MENU, null);
        publicService = PublicService(state);
    })
    it('state should contain the shows', () => {
        expect(state.shows).toBeTruthy();
        expect(state.shows.length).toBe(3);
    })
    
    it('state should contain the selected action as default action', () => {
        expect(state.selectedAction).toBeTruthy();
        expect(state.selectedAction).toBe(ACTIONS.SHOW_MENU);
    })
    
    it('state should contain the selected show as null at first', () => {
        expect(state.selectedShow).toBeFalsy();
        expect(state.selectedShow).toBeNull();
    })

    it('update the selected action to ACTIONS.ENTER_SHOW', () => {
        state.selectedAction = ACTIONS.ENTER_SHOW;
        expect(state.selectedAction).toBe(ACTIONS.ENTER_SHOW);
    })

    it('get the selected show', () => {
        const show = publicService.getSelectedShowFromOption('1');
        expect(show.name).toBe('show 1');
    })

    it('set selected show as show 1', () => {
        state.selectedShow = publicService.getSelectedShowFromOption('1');
        expect(state.selectedShow.name).toBe('show 1');
    })

    it('should display available shows', () => {
        try {
            publicService.displayAvailableShows();
        } catch (e) {
            expect(e).toBeFalsy();
        }
    })

    it('should display available seats of the selected show', () => {
        try {
            state.selectedShow = publicService.getSelectedShowFromOption('1');
            expect(state.selectedShow.name).toBe('show 1');
            publicService.displayAvailableSeatsOfSelectedShow();
        } catch (e) {
            expect(e).toBeFalsy();
        }
    })
})

describe('book tickets tests', () => {
    beforeEach(() => {
        const _shows = data.shows.map(show => new Show(show.name, show.seats, data.Tax));
        state = new State(_shows, ACTIONS.SHOW_MENU, null);
        publicService = PublicService(state);
    })
    
    it('should book tickets with success', () => {
        const show = publicService.getSelectedShowFromOption('1');
        state.selectedShow = show;
        const selectedSeats = ['A1', 'A2'];
        const response = state.selectedShow.bookTickets(selectedSeats); 
        expect(response.success).toBeTruthy();
        expect(response.list).toBeTruthy();       
        expect(response.list.length).toBe(2); 
        expect(parseFloat(response.cost.subTotal).toFixed(2)).toBe('640.00'); //without tax
        expect(parseFloat(response.cost.total).toFixed(2)).toBe('736.00'); //with tax
        try {
            publicService.displayBookingResponse(response);
        } catch (e) {
            expect(e).toBeFalsy();
        }
    })

    it('should fail book tickets', () => {
        const show = publicService.getSelectedShowFromOption('1');
        state.selectedShow = show;
        const selectedSeats = ['A11', 'A22'];
        const response = state.selectedShow.bookTickets(selectedSeats); 
        expect(response.success).toBeFalsy();       
    })

    it('should fail book tickets when trying to book booked tickets', () => {
        const show = publicService.getSelectedShowFromOption('1');
        state.selectedShow = show;
        const selectedSeats = ['A1', 'A2'];
        const firstResponse = state.selectedShow.bookTickets(selectedSeats); 
        expect(firstResponse.success).toBeTruthy();
        const secondResponse = state.selectedShow.bookTickets(selectedSeats); 
        expect(secondResponse.success).toBeFalsy();    
    })
})

describe('Display revenue of the owner tests', () => {
    beforeEach(() => {
        const _shows = data.shows.map(show => new Show(show.name, show.seats, data.Tax));
        state = new State(_shows, ACTIONS.SHOW_MENU, null);
        publicService = PublicService(state);
    })

    it('should display total revenue of the owener', () => {
        const show = publicService.getSelectedShowFromOption('1');
        state.selectedShow = show;
        let selectedSeats = ['A1', 'A2'];
        const firstResponse = state.selectedShow.bookTickets(selectedSeats); 
        expect(firstResponse.success).toBeTruthy();
        selectedSeats = 'A3 A4';
        selectedSeats = publicService.getSelectedSeatsFromOptions(selectedSeats);
        const secondResponse = state.selectedShow.bookTickets(selectedSeats); 
        expect(secondResponse.success).toBeTruthy();
        try {
            const revenueList = state.shows.map(show => show.getRevenue());
            publicService.displayTotalRevenueOfOwner(revenueList);
        } catch (e) {
            expect(e).toBeFalsy();
        }
    })
})