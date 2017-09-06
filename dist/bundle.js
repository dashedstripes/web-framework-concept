/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Html = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// State object
var state = {};

// Initial Model
var model = Object.freeze({
  input: '',
  todos: [{
    id: 1,
    text: 'Order a tesla'
  }, {
    id: 2,
    text: 'Build a web framework'
  }]
});

// Messages
var msg = Object.freeze({
  ADD_TODO: 0,
  SET_INPUT: 1
});

// Action creators
var setInput = function setInput(payload) {
  return {
    type: msg.SET_INPUT,
    payload: payload
  };
};

var addTodo = function addTodo(payload) {
  return {
    type: msg.ADD_TODO,
    payload: payload
  };
};

// Update the state
var update = function update(state, action) {
  switch (action.type) {
    case msg.SET_INPUT:
      return _extends({}, state, { input: action.payload });
    case msg.ADD_TODO:
      return _extends({}, state, { todos: [].concat(_toConsumableArray(state.todos), [action.payload]) });
    default:
      return state;
  }
};

// Dispatch an action and set the state
var dispatch = function dispatch(action) {
  console.log(action);
  state = update(state, action);
  console.log(state);
};

// Render the HTML
var Todo = function Todo(_ref) {
  var text = _ref.text;
  return (0, _Html.li)([{ text: text }], [], []);
};

var TodoList = function TodoList() {
  return (0, _Html.ul)([{ class: 'todo-list' }], [], state.todos.map(function (todo) {
    return Todo(todo);
  }));
};

var NewTodo = function NewTodo() {
  return (0, _Html.div)([], [], [(0, _Html.input)([{ type: 'text', value: state.input }], [], []), (0, _Html.button)([{ text: 'Add Todo' }], [], [])]);
};

var App = function App() {
  return [(0, _Html.h2)([{ text: 'Todo List' }], [], []), TodoList(), NewTodo()];
};

// Start the app
state = model;

(0, _Html.render)(App);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var node = function node() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var events = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  return {
    type: type,
    attributes: attributes,
    events: events,
    children: children
  };
};

function renderTree(tree, parent) {
  tree.map(function (v) {
    var el = createElement(v);
    setAttributes(v, el);
    renderElement(parent, el);

    if (v.children.length > 0) {
      renderTree(v.children, el);
    }
  });
}

function createElement(node) {
  return document.createElement(node.type);
}

function setAttributes(node, element) {
  node.attributes.map(function (a) {
    for (var prop in a) {
      switch (prop) {
        case 'text':
          setText(element, a[prop]);
          break;
        default:
          setAttribute(prop, element, a[prop]);
          break;
      }
    }
  });
}

function setAttribute(attr, el, val) {
  el.setAttribute(attr, val);
}

function setText(element, text) {
  element.innerText = text;
}

function renderElement(parent, element) {
  parent.appendChild(element);
}

function render(view) {
  renderTree(view(), document.body);
}

function toExport() {
  var elements = ['a', 'article', 'aside', 'blockquote', 'br', 'button', 'canvas', 'caption', 'code', 'div', 'em', 'embed', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'iframe', 'img', 'input', 'label', 'li', 'link', 'main', 'nav', 'ol', 'option', 'p', 'picture', 'section', 'select', 'span', 'strong', 'td', 'textarea', 'th', 'thead', 'title', 'tr', 'ul'];

  var toExport = {};

  elements.map(function (element) {
    toExport[element] = function (attributes, events, children) {
      return node(element, attributes, events, children);
    };
  });

  toExport['render'] = render;

  return toExport;
}

module.exports = toExport();

/***/ })
/******/ ]);