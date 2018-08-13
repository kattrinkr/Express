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
    films: {
        there: 'There is no Films',
        isArray: 'Films is not an Array'
    }
}

export {ERRORS}