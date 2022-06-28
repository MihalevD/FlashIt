import constraints from './constraints.js';

export default {
    name: (value) => typeof value === 'string' &&
        value.length >= constraints.minFormEntry &&
        value.length <= constraints.maxFormEntry,
    username: (value) => typeof value === 'string' &&
        value.length >= constraints.minFormEntry &&
        value.length <= constraints.maxFormEntry,
    email: (value) => typeof value === 'string' &&
        value.length >= constraints.minFormEntry &&
        value.length <= constraints.maxFormEntry,
    password: (value) => typeof value === 'string' &&
        value.length >= constraints.minFormEntry &&
        value.length <= constraints.maxFormEntry,
};