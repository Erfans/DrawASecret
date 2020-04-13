import BDAS from './bdas.js';

/**
 * Base class for "draw a secrets" implementations
 */
export default class DAS {
    /**
     * Version number
     * @returns {string}
     * @constructor
     */
    static get version() {
        return '1.2.0'
    }

    /**
     * Background draw-a-secret
     * @return {BDAS}
     * @constructor
     */
    static get BDAS() {
        return BDAS;
    }
}