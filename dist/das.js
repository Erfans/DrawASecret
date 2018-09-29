(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.util = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Util = function () {
    function Util() {
      _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
      key: 'extends',
      value: function _extends() {
        var output = {};

        for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
          objects[_key] = arguments[_key];
        }

        objects.forEach(function (object) {
          output = Object.assign(output, object);
        });

        return output;
      }
    }, {
      key: 'addEventListener',
      value: function addEventListener(element, type, listener, options) {
        type.split(' ').forEach(function (evt) {
          element.addEventListener(evt, listener, options);
        });
      }
    }]);

    return Util;
  }();

  exports.Util = Util;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.das = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var DAS = function () {
    function DAS() {
      _classCallCheck(this, DAS);
    }

    _createClass(DAS, null, [{
      key: 'version',
      get: function get() {
        return '1.2.0';
      }
    }]);

    return DAS;
  }();

  exports.DAS = DAS;
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './das', './util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./das'), require('./util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.das, global.util);
    global.bdas = mod.exports;
  }
})(this, function (exports, _das, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BDAS = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var BDAS = function (_DAS) {
    _inherits(BDAS, _DAS);

    _createClass(BDAS, null, [{
      key: 'defaultConfig',
      get: function get() {
        return {
          bgImageIds: [],
          inputPasswordId: null,
          numberOfRows: 15,
          numberOfColumns: 15,
          onChange: null,
          onClear: null,
          hashFn: null
        };
      }
    }]);

    /**
     * Constructor
     *
     * @param {{bgImageIds: Array, inputPasswordId: null, numberOfRows: number, numberOfColumns: number, onChange:
     *   null, onClear: null, hashFn: null}} config
     */
    function BDAS(config) {
      _classCallCheck(this, BDAS);

      var _this = _possibleConstructorReturn(this, (BDAS.__proto__ || Object.getPrototypeOf(BDAS)).call(this));

      config = _util.Util.extends(BDAS.defaultConfig, config);

      _this.bgImageIds = typeof config.bgImageIds === 'string' ? [config.bgImageIds] : config.bgImageIds;
      _this.inputPasswordId = config.inputPasswordId;
      _this.numberOfRows = config.numberOfRows;
      _this.numberOfColumns = config.numberOfColumns;
      _this.onChange = config.onChange;
      _this.onClear = config.onClear;
      _this.hashFn = config.hashFn;

      _this.pathString = '';
      _this.isTouching = false;
      _this.lastPosition = {
        x: -1,
        y: -1
      };

      var imgNum = 0;
      var self = _this;

      _this.input = document.getElementById(_this.inputPasswordId);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _this.bgImageIds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var imgId = _step.value;

          var img = document.getElementById(imgId);

          img.drawASecret = {
            num: imgNum++,
            cw: Math.floor(img.width / _this.numberOfColumns),
            rh: Math.floor(img.height / _this.numberOfRows)

            // disable dragging images
          };img.draggable = false;
          img.ondragstart = function () {
            return false;
          };

          _util.Util.addEventListener(img, 'touchstart mousedown', function (event) {
            event.preventDefault();
            var data = this.drawASecret;
            self.makeString(event, { top: this.offsetTop, left: this.offsetLeft }, data.cw, data.rh, data.num);
            self.isTouching = true;
          }, false);

          _util.Util.addEventListener(img, 'touchmove mousemove', function (event) {
            event.preventDefault();
            if (self.isTouching) {
              var data = this.drawASecret;
              self.makeString(event, { top: this.offsetTop, left: this.offsetLeft }, data.cw, data.rh, data.num);

              // call on change
              if (self.onChange && typeof self.onChange === 'function') {
                self.options.onChange();
              }
            }
          });

          // notice: arrow functions have lexical context
          _util.Util.addEventListener(img, 'touchend mouseup', function (event) {
            event.preventDefault();
            _this.isTouching = false;
          });
        }

        // notice: arrow functions have lexical context
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _util.Util.addEventListener(document, 'touchend mouseup', function () {
        _this.lastPosition = {
          x: -1,
          y: -1
        };
        _this.isTouching = false;
      });
      return _this;
    }

    _createClass(BDAS, [{
      key: 'makeString',
      value: function makeString(event, offset, columnWidth, rowHeight, imgNum) {
        var lastPosition = this.lastPosition;
        var data = event.touches ? event.touches[0] : event;

        var bounding = data.target.getBoundingClientRect();
        var currentPosition = {
          x: Math.floor((data.clientX - bounding.left) / columnWidth),
          y: Math.floor((data.clientY - bounding.top) / rowHeight)
        };

        if (lastPosition.x !== currentPosition.x || lastPosition.y !== currentPosition.y) {
          this.pathString += '' + imgNum + currentPosition.x + currentPosition.y;

          if (this.input) {
            this.input.value = this.hashFn ? this.hashFn(this.pathString) : this.pathString;
          }

          this.lastPosition = currentPosition;
        }
      }
    }, {
      key: 'clearPassword',
      value: function clearPassword() {
        this.pathString = '';
        if (this.input) {
          this.input.value = '';
        }

        if (this.onClear && typeof this.onClear === 'function') {
          this.onClear();
        }
      }
    }]);

    return BDAS;
  }(_das.DAS);

  exports.BDAS = BDAS;
});
//# sourceMappingURL=das.js.map
