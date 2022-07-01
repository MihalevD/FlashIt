import constraints from './constraints.js';

export default {
    description: (value) => typeof value === 'string' &&
        value.length >= constraints.minFormEntry &&
        value.length <= constraints.maxFormEntry,
    rating: (value) => typeof value === 'number' &&
        value >= constraints.minRating &&
        value.length <= constraints.maxRating,
};