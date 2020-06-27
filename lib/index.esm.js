import React from 'react';
import { getVisibleSelectionRect } from 'draft-js';
import { ItalicButton, BoldButton, UnderlineButton, CodeButton } from 'draft-js-buttons';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var createStore = function createStore(initialState) {
  var state = initialState || {};
  var listeners = {};

  var subscribeToItem = function subscribeToItem(key, callback) {
    listeners[key] = listeners[key] || [];
    listeners[key].push(callback);
  };

  var unsubscribeFromItem = function unsubscribeFromItem(key, callback) {
    listeners[key] = listeners[key].filter(function (listener) {
      return listener !== callback;
    });
  };

  var updateItem = function updateItem(key, item) {
    state = _objectSpread2(_objectSpread2({}, state), {}, _defineProperty({}, key, item));

    if (listeners[key]) {
      listeners[key].forEach(function (listener) {
        return listener(state[key]);
      });
    }
  };

  var getItem = function getItem(key) {
    return state[key];
  };

  return {
    subscribeToItem: subscribeToItem,
    unsubscribeFromItem: unsubscribeFromItem,
    updateItem: updateItem,
    getItem: getItem
  };
};

var inCodeBlock = function inCodeBlock(editorState) {
  var startKey = editorState.getSelection().getStartKey();
  var endKey = editorState.getSelection().getEndKey();

  if (startKey && endKey) {
    var contentState = editorState.getCurrentContent();
    var blocks = contentState.getBlocksAsArray();
    var selectedBlocks = blocks.slice(Math.max(blocks.indexOf(contentState.getBlockForKey(startKey)) - 1, 0), Math.min(blocks.indexOf(contentState.getBlockForKey(endKey)) + 1, blocks.length));
    return selectedBlocks.find(function (block) {
      return block.getType() === 'code-block';
    });
  }

  return false;
};

var Toolbar = /*#__PURE__*/function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  var _super = _createSuper(Toolbar);

  function Toolbar() {
    var _this;

    _classCallCheck(this, Toolbar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isVisible: false,
      position: undefined,

      /**
       * If this is set, the toolbar will render this instead of the children
       * prop and will also be shown when the editor loses focus.
       * @type {Component}
       */
      overrideContent: undefined
    });

    _defineProperty(_assertThisInitialized(_this), "onOverrideContent", function (overrideContent) {
      _this.setState({
        overrideContent: overrideContent
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectionChanged", function () {
      // need to wait a tick for window.getSelection() to be accurate
      // when focusing editor with already present selection
      setTimeout(function () {
        if (!_this.toolbar) return; // The editor root should be two levels above the node from
        // `getEditorRef`. In case this changes in the future, we
        // attempt to find the node dynamically by traversing upwards.

        var editorRef = _this.props.store.getItem('getEditorRef')();

        if (!editorRef) return; // This keeps backwards compatibility with React 15

        var editorRoot = editorRef.refs && editorRef.refs.editor ? editorRef.refs.editor : editorRef.editor;

        while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
          editorRoot = editorRoot.parentNode;
        }

        var editorRootRect = editorRoot.getBoundingClientRect();
        var selectionRect = getVisibleSelectionRect(window);
        if (!selectionRect) return; // The toolbar shouldn't be positioned directly on top of the selected text,
        // but rather with a small offset so the caret doesn't overlap with the text.

        var extraTopOffset = -5;
        var position = {
          top: editorRoot.offsetTop - _this.toolbar.offsetHeight + (selectionRect.top - editorRootRect.top) + extraTopOffset,
          left: editorRoot.offsetLeft + (selectionRect.left - editorRootRect.left) + selectionRect.width / 2
        };

        _this.setState({
          position: position
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleToolbarRef", function (node) {
      _this.toolbar = node;
    });

    return _this;
  }

  _createClass(Toolbar, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.props.store.subscribeToItem('selection', this.onSelectionChanged);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.store.unsubscribeFromItem('selection', this.onSelectionChanged);
    }
    /**
     * This can be called by a child in order to render custom content instead
     * of the children prop. It's the responsibility of the callee to call
     * this function again with `undefined` in order to reset `overrideContent`.
     * @param {Component} overrideContent
     */

  }, {
    key: "getStyle",
    value: function getStyle() {
      var store = this.props.store;
      var _this$state = this.state,
          overrideContent = _this$state.overrideContent,
          position = _this$state.position; // const selection = store
      //   .getItem('getEditorState')()
      //   .getSelection();

      var editorState = store.getItem('getEditorState')();
      var selection = editorState.getSelection(); // overrideContent could for example contain a text input, hence we always show overrideContent
      // TODO: Test readonly mode and possibly set isVisible to false if the editor is readonly

      var isVisible = !selection.isCollapsed() && selection.getHasFocus() && !inCodeBlock(editorState) || overrideContent;

      var style = _objectSpread2({}, position);

      if (isVisible) {
        style.visibility = 'visible';
        style.transform = 'translate(-50%) scale(1)';
        style.transition = 'transform 0.15s cubic-bezier(.3,1.2,.2,1)';
      } else {
        style.transform = 'translate(-50%) scale(0)';
        style.visibility = 'hidden';
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          theme = _this$props.theme,
          store = _this$props.store;
      var OverrideContent = this.state.overrideContent;
      var childrenProps = {
        theme: theme.buttonStyles,
        getEditorState: store.getItem('getEditorState'),
        setEditorState: store.getItem('setEditorState'),
        onOverrideContent: this.onOverrideContent
      };
      return /*#__PURE__*/React.createElement("div", {
        className: theme.toolbarStyles.toolbar,
        style: this.getStyle(),
        ref: this.handleToolbarRef
      }, OverrideContent ? /*#__PURE__*/React.createElement(OverrideContent, childrenProps) : this.props.children(childrenProps));
    }
  }]);

  return Toolbar;
}(React.Component);

_defineProperty(Toolbar, "defaultProps", {
  children: function children(externalProps) {
    return (
      /*#__PURE__*/
      // may be use React.Fragment instead of div to improve perfomance after React 16
      React.createElement("div", null, /*#__PURE__*/React.createElement(ItalicButton, externalProps), /*#__PURE__*/React.createElement(BoldButton, externalProps), /*#__PURE__*/React.createElement(UnderlineButton, externalProps), /*#__PURE__*/React.createElement(CodeButton, externalProps))
    );
  }
});

var separator = "ssnjg3q";
var index = (function (_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === void 0 ? separator : _ref$className;
  return /*#__PURE__*/React.createElement("div", {
    className: className
  });
});

var buttonStyles = {
  buttonWrapper: "bvtkexh",
  button: "b14d7lf1",
  active: "a1fgkfaa"
};
var toolbarStyles = {
  toolbar: "t18td4u3"
};
var defaultTheme = {
  buttonStyles: buttonStyles,
  toolbarStyles: toolbarStyles
};

var index$1 = (function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var store = createStore({
    isVisible: false
  });
  var _config$theme = config.theme,
      theme = _config$theme === void 0 ? defaultTheme : _config$theme;

  var InlineToolbar = function InlineToolbar(props) {
    return /*#__PURE__*/React.createElement(Toolbar, _extends({}, props, {
      store: store,
      theme: theme
    }));
  };

  return {
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState,
          getEditorRef = _ref.getEditorRef;
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the text-toolbar on selection change
    onChange: function onChange(editorState) {
      store.updateItem('selection', editorState.getSelection());
      return editorState;
    },
    InlineToolbar: InlineToolbar
  };
});

export default index$1;
export { index as Separator };
