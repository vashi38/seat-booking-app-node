const shows = [
    {
        name: 'show 1',
        seats: {
            A: {
                price: 320,
                list: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
            },
            B: {
                price: 280,
                list: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
            },
            C: {
                price: 240,
                list: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
            }
        }
    },
    {
        name: 'show 2',
        seats: {
            A: {
                price: 320,
                list: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
            },
            B: {
                price: 280,
                list: ['B2', 'B3', 'B4', 'B5', 'B6'],
            },
            C: {
                price: 240,
                list: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
            }
        }
    },
    {
        name: 'show 3',
        seats: {
            A: {
                price: 320,
                list: ['A1', 'A2', 'A3', 'A4', 'A5'],
            },
            B: {
                price: 280,
                list: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
            },
            C: {
                price: 240,
                list: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
            }
        }
    },
];

const Tax = {
    serviceTax: 14,
    swachhBharatCess: 0.5,
    krishiKalyanCess: 0.5,
}

module.exports = {
    shows,
    Tax,
};