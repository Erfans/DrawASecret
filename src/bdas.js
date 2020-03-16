import DAS from './das.js'
import Util from './util.js'

/**
 * Background draw-a-secret
 */
export default class BDAS extends DAS {
    /**
     * Default config
     *
     * @returns {{bgImageIds: Array, inputPasswordId: null, numberOfRows: number, numberOfColumns: number, onChange:
     *   null, onClear: null, hashFn: null}}
     */
    static get defaultConfig() {
        return {
            bgImageIds: [],
            inputPasswordId: null,
            numberOfRows: 15,
            numberOfColumns: 15,
            onChange: null,
            onClear: null,
            hashFn: null
        }
    }

    /**
     * Constructor
     *
     * @param {{
     *    bgImageIds: Array,
     *    inputPasswordId: null,
     *    numberOfRows: number,
     *    numberOfColumns: number,
     *    onChange: null,
     *    onClear: null,
     *    hashFn: null
     *  }} config
     */
    constructor(config) {
        super();

        config = Util.extends(BDAS.defaultConfig, config);

        this.bgImageIds = typeof config.bgImageIds === 'string' ? [config.bgImageIds] : config.bgImageIds
        this.inputPasswordId = config.inputPasswordId;
        this.numberOfRows = config.numberOfRows;
        this.numberOfColumns = config.numberOfColumns;
        this.onChange = config.onChange;
        this.onClear = config.onClear;
        this.hashFn = config.hashFn;

        this.pathString = '';
        this.isTouching = false;
        this.lastPosition = {
            x: -1,
            y: -1
        };

        let imgNum = 0;
        const self = this;

        this.input = document.getElementById(this.inputPasswordId);

        for (const imgId of this.bgImageIds) {
            const img = document.getElementById(imgId);

            img.drawASecret = {
                num: imgNum++,
                cw: Math.floor(img.width / this.numberOfColumns),
                rh: Math.floor(img.height / this.numberOfRows)
            };

            // disable dragging images
            img.draggable = false;
            img.ondragstart = function () {
                return false;
            };

            Util.addEventListener(img, 'touchstart mousedown', function (event) {
                event.preventDefault();
                let data = this.drawASecret;
                self.makeString(event, {top: this.offsetTop, left: this.offsetLeft}, data.cw, data.rh, data.num);
                self.isTouching = true;
            }, false);

            Util.addEventListener(img, 'touchmove mousemove', function (event) {
                event.preventDefault();
                if (self.isTouching) {
                    let data = this.drawASecret;
                    self.makeString(event, {top: this.offsetTop, left: this.offsetLeft}, data.cw, data.rh, data.num);

                    // call on change
                    if (self.onChange && typeof self.onChange === 'function') {
                        self.options.onChange();
                    }
                }
            });

            // notice: arrow functions have lexical context
            Util.addEventListener(img, 'touchend mouseup', (event) => {
                event.preventDefault();
                this.isTouching = false;
            })
        }

        // notice: arrow functions have lexical context
        Util.addEventListener(document, 'touchend mouseup', () => {
            this.lastPosition = {
                x: -1,
                y: -1
            };
            this.isTouching = false;
        })
    }

    makeString(event, offset, columnWidth, rowHeight, imgNum) {
        let lastPosition = this.lastPosition;
        let data = event.touches ? event.touches[0] : event;

        let bounding = data.target.getBoundingClientRect();
        let currentPosition = {
            x: Math.floor((data.clientX - bounding.left) / columnWidth),
            y: Math.floor((data.clientY - bounding.top) / rowHeight)
        };

        if (lastPosition.x !== currentPosition.x || lastPosition.y !== currentPosition.y) {
            this.pathString += '' + imgNum + currentPosition.x + currentPosition.y;

            if (this.input) {
                this.input.value = this.hashFn ? this.hashFn(this.pathString) : this.pathString;
            }

            this.lastPosition = currentPosition
        }
    }

    clearPassword() {
        this.pathString = '';
        if (this.input) {
            this.input.value = '';
        }

        if (this.onClear && typeof this.onClear === 'function') {
            this.onClear();
        }
    }
}