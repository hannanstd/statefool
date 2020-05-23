"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withState = exports.useStateFrom = exports.Consumer = exports.Provider = exports.getContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Contexts;
Contexts = Contexts || {};

var getContext = function getContext(id) {
  return Contexts[id] = Contexts[id] || (0, _react.createContext)();
};

exports.getContext = getContext;

var useHook = function useHook(init) {
  var _useState = (0, _react.useState)(_objectSpread({}, init)),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      state = _useState2[0],
      _setState = _useState2[1];

  return _objectSpread(_objectSpread({
    state: state
  }, state), {}, {
    setState: function () {
      var _setState2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(argument) {
        var callback,
            name,
            updated,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                callback = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                name = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
                updated = state;
                _context.next = 5;
                return _setState(function (prevState) {
                  //
                  if (typeof argument === 'function') {
                    if (name) argument = (0, _defineProperty2["default"])({}, name, argument(prevState[name]));else argument = argument(prevState);
                  } else {
                    if (name) argument = (0, _defineProperty2["default"])({}, name, argument);
                  }

                  return updated = _objectSpread(_objectSpread({}, prevState), (0, _typeof2["default"])(argument) === 'object' ? argument : {});
                });

              case 5:
                if (typeof callback === 'function') callback(name ? updated[name] : _objectSpread(_objectSpread({}, updated), {}, {
                  state: updated
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setState(_x) {
        return _setState2.apply(this, arguments);
      }

      return setState;
    }()
  });
};

var Provider = function Provider(_ref) {
  var children = _ref.children,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? '' : _ref$id,
      _ref$state = _ref.state,
      state = _ref$state === void 0 ? null : _ref$state,
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === void 0 ? null : _ref$initialState;
  var Context = getContext(id);
  return /*#__PURE__*/_react["default"].createElement(Context.Provider, {
    value: useHook(state || initialState)
  }, children);
};

exports.Provider = Provider;

var Consumer = function Consumer(_ref2) {
  var children = _ref2.children,
      id = _ref2.id;
  var Context = getContext(id);
  return /*#__PURE__*/_react["default"].createElement(Context.Consumer, null, children);
};

exports.Consumer = Consumer;

var useStateFrom = function useStateFrom(id) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var ctx = (0, _react.useContext)(getContext(id));
  if (name === false) return ctx;
  return [ctx.state[name], function () {
    return ctx.setState(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1], name);
  }];
};

exports.useStateFrom = useStateFrom;

var withState = function withState(Component) {
  var ids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (props) {
    ids = ids || Object.keys(Contexts);
    ids = (0, _typeof2["default"])(ids) === 'object' && ids.constructor === Array ? ids : (0, _toConsumableArray2["default"])(ids.toString().split(','));
    var ctxs = {};
    ids.forEach(function (id) {
      id = id.trim();
      return ctxs[id] = useStateFrom(id);
    });
    return /*#__PURE__*/_react["default"].createElement(Component, (0, _extends2["default"])({}, props, ctxs));
  };
};

exports.withState = withState;
