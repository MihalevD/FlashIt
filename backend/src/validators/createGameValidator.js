import constraints from './constraints.js';

export default {
    name: (value) => typeof value === 'string' &&
        value.length >= constraints.minFormEntry &&
        value.length <= constraints.maxFormEntry &&
        value.slice(value.length - 2) === 'IO',
};