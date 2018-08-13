const REG = /(^https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]$/i;
const ERRORS = {
    id: {
        there: 'There is no ID'
    },
    title: {
        there: 'There is no Title',
        minLength: 'Title length is less than 3 symbols'
    },
    description: {
        there: 'There is no Description',
        minLength: 'Description length is less than 3 symbols',
        maxLength: 'Description length is more than 500 symbols'
    },
    avatar: {
        there: 'There is no Avatar',
        isLink: 'Avatar is not a link'
    },
    gallery: {
        there: 'There is no Gallery',
        isArray: 'Gallery is not an Array',
        minLength: 'Gallery length is less than 4',
        isLink: 'Gallery items is not a links'
    },
    rating: {
        range: 'Wrong Rating! It must be from 0 to 5'
    }
}

export {REG, ERRORS}