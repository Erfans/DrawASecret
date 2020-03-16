/**
 * Util class
 */
export default class Util {
    /**
     * Create an object and extend it by arg objects
     * @param objects
     * @return {{} & *[]}
     */
    static extends(...objects) {
        let output = {};

        objects.forEach(function (object) {
            output = Object.assign(output, object)
        });

        return output
    }

    /**
     * Add multiple event listener to elements
     *
     * @param element
     * @param type: string
     * @param listener: EventListenerOrEventListenerObject
     * @param options?: boolean | AddEventListenerOptions
     * @return void
     */
    static addEventListener(element, type, listener, options) {
        type.split(' ').forEach(function (evt) {
            element.addEventListener(evt, listener, options)
        })
    }
}