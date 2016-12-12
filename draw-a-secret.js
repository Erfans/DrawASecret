/**
 * Document   : draw-a-secret aka. picture password
 * Author     : shamabadi.com
 * Description: jQuery extension to make draw-a-secret (aka. picture password) for java script
 */
(function ($, doc) {

    "use strict";

    var DrawASecret = function ($img, $input, options) {


        var _options = {
            rows: 15,
            columns: 15,
            onChange: null,
            onClear: null
        };


        this.$img = $img;
        this.$input = $input;

        this.pathString = "";
        this.isTouching = false;
        this.lastPosition = {
            x: -1,
            y: -1
        };

        this.init($.extend(_options, options));
    };

    DrawASecret.prototype.init = function (options) {

        this.options = options;

        var self = this;
        var imgNum = 0;
        var $img = self.$img;

        $img.each(function () {

            var img = this;

            img.drawASecret = {
                num: imgNum++,
                cw: Math.floor(img.width / options.columns),
                rh: Math.floor(img.height / options.rows)
            };
        });

        $img.on("touchstart mousedown", function (event) {
            event.preventDefault();
            var img = this;
            var pp = img.drawASecret;
            self.makeString(event, $(img).offset(), pp.cw, pp.rh, pp.num);
            self.isTouching = true;
        });

        $img.on("touchmove mousemove", function (event) {
            event.preventDefault();
            if (self.isTouching) {
                var img = this;
                var pp = img.drawASecret;
                self.makeString(event, $(img).offset(), pp.cw, pp.rh, pp.num);

                // call on change
                if (options.onChange && typeof options.onChange == "function") {
                    options.onChange();
                }
            }
        });

        $img.on("touchend mouseup", function (e) {
            e.preventDefault();
            self.isTouching = false;
        });

        $(doc).on("touchend mouseup", function () {
            self.lastPosition = {
                x: -1,
                y: -1
            };
            self.isTouching = false;
        });

        $img.on('dragstart', function (event) {
            event.preventDefault();
        });

    };

    DrawASecret.prototype.makeString = function (event, offset, columnWidth, rowHeight, imgNum) {
        var self = this;
        var lastPosition = self.lastPosition;
        var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;

        var currentPositionX = Math.floor((data.pageX - offset.left) / columnWidth);
        var currentPositionY = Math.floor((data.pageY - offset.top) / rowHeight);

        if (lastPosition.x != currentPositionX || lastPosition.y != currentPositionY) {
            self.pathString += '' + imgNum + currentPositionX + currentPositionY;

            if (self.$input) {
                self.$input.val(self.pathString);
            }

            self.lastPosition = {
                x: currentPositionX,
                y: currentPositionY
            };
        }
    };

    DrawASecret.prototype.clearPassword = function () {
        var self = this;
        var options = self.options;

        self.pathString = "";
        if (self.$input) {
            self.$input.val("");
        }

        if (options.onClear && typeof options.onClear == "function") {
            options.onClear();
        }
    };

    $.fn.drawSecret = $.fn.drawASecret = function (inputSelector, options) {
        var $input = inputSelector ? $(inputSelector) : null;
        return new DrawASecret(this, $input, options);
    };

})(jQuery, document);