/**
 * @class Application
 * @namespace tui
 * @constructor
 */
tui.Application = function () {
    this.initComponent();
};

/**
 * Main init function
 */
tui.Application.prototype.initComponent = function () {
    this.rectangleList = [];
    this.updateCounter();
    this.removeListeners();
    this.attachListeners();
};

/**
 * Removes listeners
 */
tui.Application.prototype.removeListeners = function () {
    document.getElementById('add_rectangle').removeEventListener('click', tui.Util.proxy(this.onAddRectangle, this));
    document.getElementById('number_of_rectangles').removeEventListener('change', tui.Util.proxy(this.onCounterUpdate, this));
    document.getElementById('number_of_rectangles').removeEventListener('focus', this.onCounterFocus);
};

/**
 * Attach listeners
 */
tui.Application.prototype.attachListeners = function () {
    document.getElementById('add_rectangle').addEventListener('click', tui.Util.proxy(this.onAddRectangle, this));
    document.getElementById('number_of_rectangles').addEventListener('change', tui.Util.proxy(this.onCounterUpdate, this));
    document.getElementById('number_of_rectangles').addEventListener('focus', this.onCounterFocus);
};

/**
 * Handler for the Add Rectangle button click event
 * @param {Object} e The click event
 */
tui.Application.prototype.onAddRectangle = function (e) {
    this.rectangleList.push(new tui.Rectangle());
    this.updateCounter();
};

/**
 * Handler for the Number of rectangles input focus event
 * @param {Object} e The focus event
 */
tui.Application.prototype.onCounterFocus = function (e) {
    e.currentTarget.select();
};

/**
 * Handler for the Number of rectangles input keyup event
 * @param {Object} e The keyup event
 */
tui.Application.prototype.onCounterUpdate = function (e) {
    var value = parseInt(e.currentTarget.value, 10),
        length = this.rectangleList.length,
        diff,
        i;
    if (!isNaN(value)) {
        if (value === 0 || value < length) {
            diff = length - value;
            for (i = 0; i < diff; i++) {
                this.rectangleList[value].destroy();
            }
        } else if (value > length) {
            diff = value - length;
            for (i = 0; i < diff; i++) {
                this.rectangleList.push(new tui.Rectangle());
            }
        }
    }
    this.updateCounter();
};

/**
 * Updates rectangle counter input
 */
tui.Application.prototype.updateCounter = function () {
    var counter = document.getElementById('number_of_rectangles');
    counter.value = this.rectangleList.length;
};