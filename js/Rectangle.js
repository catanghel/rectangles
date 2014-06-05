/**
 * @class tui.Rectangle
 * @namespace tui
 * @constructor This class creates and manages a rectangle object
 */
tui.Rectangle = function (config) {
    tui.Util.apply(this, config || tui.rectangle);
    this.initComponent();
};

/**
 * Main init function
 */
tui.Rectangle.prototype.initComponent = function () {
    var stage = document.getElementById('stage');
    var htmlContent = '<div class="rectangle"></div>';
    this.editOnStage = false;
    this.id = Math.random().toString(16).substr(2, 8);
    this.container = document.createElement('div');
    this.container.setAttribute('id', this.id);
    this.container.className = 'rectangle_container';
    htmlContent += '<div class="rectangle_actions">';
    htmlContent += '<p><a id="edit_' + this.id + '" href="javascript:void(0)">Edit</a></p>';
    htmlContent += '<p><a id="delete_' + this.id + '" href="javascript:void(0)">Delete</a></p>';
    htmlContent += '</div>';
    this.container.innerHTML = htmlContent;
    stage.appendChild(this.container);

    this.attachListeners();
    this.updateRectangle();
};

/**
 * Removes listeners
 */
tui.Rectangle.prototype.removeListeners = function () {
    document.getElementById('delete_' + this.id).removeEventListener('click', tui.Util.proxy(this.onDeleteRectangle, this));
    document.getElementById('edit_' + this.id).removeEventListener('click', tui.Util.proxy(this.onEditRectangle, this));
};

/**
 * Attach listeners
 */
tui.Rectangle.prototype.attachListeners = function () {
    document.getElementById('delete_' + this.id).addEventListener('click', tui.Util.proxy(this.onDeleteRectangle, this));
    document.getElementById('edit_' + this.id).addEventListener('click', tui.Util.proxy(this.onEditRectangle, this));
};

/**
 * Renders rectangle according to the configuration
 */
tui.Rectangle.prototype.updateRectangle = function () {
    var children = this.container.childNodes;
    children[0].style.height = this.height + 'px';
    children[0].style.width = this.width + 'px';
    children[0].style.backgroundColor = this.color;
};

/**
 * Handler for the Edit Rectangle button click event
 * @param {Object} e The click event
 */
tui.Rectangle.prototype.onEditRectangle = function (e) {
    if (!this.editOnStage) {
        var id = e.currentTarget.id.substr(5, 8);
        var html = '<div class="form">';
        html += '<p><label for="width">Width</label><input type="text" name="width" value="' + this.width + '"/></p>';
        html += '<p><label for="height">Height</label><input type="text" name="height" value="' + this.height + '"/></p>';
        html += '<p><label for="color">Color</label><input type="text" name="color" value="' + this.color + '"/></p>';
        html += '</div>';
        html += '<div class="edit_actions">';
        html += '<input id="save_' + this.id + '" type="button" value="Save"/>';
        html += ' or ';
        html += '<a id="cancel_' + this.id + '" href="javascript:void(0)">Cancel</a>';
        html += '</div>';
        var editorContainer = document.createElement('div');
        editorContainer.setAttribute('id', 'form_' + this.id);
        editorContainer.className = 'editor_container';
        editorContainer.innerHTML = html;
        document.getElementById(id).appendChild(editorContainer);

        document.getElementById('save_' + this.id).removeEventListener('click', tui.Util.proxy(this.onSave, this));
        document.getElementById('cancel_' + this.id).removeEventListener('click', tui.Util.proxy(this.onCancel, this));
        document.getElementById('save_' + this.id).addEventListener('click', tui.Util.proxy(this.onSave, this));
        document.getElementById('cancel_' + this.id).addEventListener('click', tui.Util.proxy(this.onCancel, this));
        
        this.editOnStage = true;
    }
};

/**
 * Handler for the Save Rectangle button click event
 * @param {Object} e The click event
 */
tui.Rectangle.prototype.onSave = function (e) {
    var form = e.currentTarget.parentNode.parentNode;
    var formInputs = form.firstChild.getElementsByTagName('input');
    var width = parseInt(formInputs[0].value, 10);
    var height = parseInt(formInputs[1].value, 10);
    var color = formInputs[2].value;

    this.height = height;
    this.width = width;
    this.color = color;

    this.updateRectangle();
    this.container.removeChild(document.getElementById('form_' + this.id));
    this.editOnStage = false;
};

/**
 * Handler for the Cancel link click event
 * @param {Object} e The click event
 */
tui.Rectangle.prototype.onCancel = function (e) {
    this.container.removeChild(document.getElementById('form_' + this.id));
    this.editOnStage = false;
};

/**
 * Handler for the Delete Rectangle button click event
 * @param {Object} e The click event
 */
tui.Rectangle.prototype.onDeleteRectangle = function (e) {
    this.destroy();
    app.updateCounter();
};

/**
 * Destroy
 */
tui.Rectangle.prototype.destroy = function () {
    this.removeListeners();
    document.getElementById('stage').removeChild(this.container);
    app.rectangleList.splice(app.rectangleList.indexOf(this), 1);
};