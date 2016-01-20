/*!
 * ows-fast-bind v1.0.0
 * https://github.com/spidercpsf/ows-fast-bind
 *
 * Optimized binding data with event-driven for AngularJS
 *
 * Copyright 2016, Giang Minh
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/helper.module.js
  var myModule = angular.module('owsFastBind', []);

  // src/js/directive.directive.js
  function bindChannelSimple(parse, scope, expression, attr, callback) {
      var update_channel = parse(attr.owsChannel)(scope);
      console.log("RegisterChannel:" + attr.owsChannel + " -> " + update_channel, scope);

      function onUpdate(event, args) {
          //console.log("Channel updated");
          callback();
      }

      scope.$on(update_channel, onUpdate);
      onUpdate();
  }

  function bindChannel(parse, scope, expression, attr, callback) {
      var update_channel = parse(attr.owsChannel)(scope);
      console.log("RegisterChannel:" + attr.owsChannel + " -> " + update_channel, scope);

      function onUpdate(event, args) {
          // console.log("Channel updated");
          var new_value = parse(expression)(scope);
          callback(new_value);
      }

      scope.$on(update_channel, onUpdate);
      onUpdate();
  }

  function bindChannelFlex(parse, scope, expression, attr, callback) {
      var update_channel = parse(attr.owsChannel)(scope);
      var old_value;
      console.log("RegisterChannel:" + attr.owsChannel + " -> " + update_channel, scope);

      function onUpdate(event, args) {
          // console.log("Channel updated");
          var new_value = parse(expression)(scope);
          callback(new_value, old_value);
          old_value = new_value;
      }

      scope.$on(update_channel, onUpdate);
      onUpdate();
  }

  //////////////////////////////////
  //JQLite
  //////////////////////////////////

  /**
   * @ngdoc function
   * @name angular.element
   * @module ng
   * @kind function
   *
   * @description
   * Wraps a raw DOM element or HTML string as a [jQuery](http://jquery.com) element.
   *
   * If jQuery is available, `angular.element` is an alias for the
   * [jQuery](http://api.jquery.com/jQuery/) function. If jQuery is not available, `angular.element`
   * delegates to Angular's built-in subset of jQuery, called "jQuery lite" or "jqLite."
   *
   * <div class="alert alert-success">jqLite is a tiny, API-compatible subset of jQuery that allows
   * Angular to manipulate the DOM in a cross-browser compatible way. **jqLite** implements only the most
   * commonly needed functionality with the goal of having a very small footprint.</div>
   *
   * To use `jQuery`, simply ensure it is loaded before the `angular.js` file.
   *
   * <div class="alert">**Note:** all element references in Angular are always wrapped with jQuery or
   * jqLite; they are never raw DOM references.</div>
   *
   * ## Angular's jqLite
   * jqLite provides only the following jQuery methods:
   *
   * - [`addClass()`](http://api.jquery.com/addClass/)
   * - [`after()`](http://api.jquery.com/after/)
   * - [`append()`](http://api.jquery.com/append/)
   * - [`attr()`](http://api.jquery.com/attr/) - Does not support functions as parameters
   * - [`bind()`](http://api.jquery.com/bind/) - Does not support namespaces, selectors or eventData
   * - [`children()`](http://api.jquery.com/children/) - Does not support selectors
   * - [`clone()`](http://api.jquery.com/clone/)
   * - [`contents()`](http://api.jquery.com/contents/)
   * - [`css()`](http://api.jquery.com/css/) - Only retrieves inline-styles, does not call `getComputedStyle()`. As a setter, does not convert numbers to strings or append 'px'.
   * - [`data()`](http://api.jquery.com/data/)
   * - [`detach()`](http://api.jquery.com/detach/)
   * - [`empty()`](http://api.jquery.com/empty/)
   * - [`eq()`](http://api.jquery.com/eq/)
   * - [`find()`](http://api.jquery.com/find/) - Limited to lookups by tag name
   * - [`hasClass()`](http://api.jquery.com/hasClass/)
   * - [`html()`](http://api.jquery.com/html/)
   * - [`next()`](http://api.jquery.com/next/) - Does not support selectors
   * - [`on()`](http://api.jquery.com/on/) - Does not support namespaces, selectors or eventData
   * - [`off()`](http://api.jquery.com/off/) - Does not support namespaces, selectors or event object as parameter
   * - [`one()`](http://api.jquery.com/one/) - Does not support namespaces or selectors
   * - [`parent()`](http://api.jquery.com/parent/) - Does not support selectors
   * - [`prepend()`](http://api.jquery.com/prepend/)
   * - [`prop()`](http://api.jquery.com/prop/)
   * - [`ready()`](http://api.jquery.com/ready/)
   * - [`remove()`](http://api.jquery.com/remove/)
   * - [`removeAttr()`](http://api.jquery.com/removeAttr/)
   * - [`removeClass()`](http://api.jquery.com/removeClass/)
   * - [`removeData()`](http://api.jquery.com/removeData/)
   * - [`replaceWith()`](http://api.jquery.com/replaceWith/)
   * - [`text()`](http://api.jquery.com/text/)
   * - [`toggleClass()`](http://api.jquery.com/toggleClass/)
   * - [`triggerHandler()`](http://api.jquery.com/triggerHandler/) - Passes a dummy event object to handlers.
   * - [`unbind()`](http://api.jquery.com/unbind/) - Does not support namespaces or event object as parameter
   * - [`val()`](http://api.jquery.com/val/)
   * - [`wrap()`](http://api.jquery.com/wrap/)
   *
   * ## jQuery/jqLite Extras
   * Angular also provides the following additional methods and events to both jQuery and jqLite:
   *
   * ### Events
   * - `$destroy` - AngularJS intercepts all jqLite/jQuery's DOM destruction apis and fires this event
   *    on all DOM nodes being removed.  This can be used to clean up any 3rd party bindings to the DOM
   *    element before it is removed.
   *
   * ### Methods
   * - `controller(name)` - retrieves the controller of the current element or its parent. By default
   *   retrieves controller associated with the `ngController` directive. If `name` is provided as
   *   camelCase directive name, then the controller for this directive will be retrieved (e.g.
   *   `'ngModel'`).
   * - `injector()` - retrieves the injector of the current element or its parent.
   * - `scope()` - retrieves the {@link ng.$rootScope.Scope scope} of the current
   *   element or its parent. Requires {@link guide/production#disabling-debug-data Debug Data} to
   *   be enabled.
   * - `isolateScope()` - retrieves an isolate {@link ng.$rootScope.Scope scope} if one is attached directly to the
   *   current element. This getter should be used only on elements that contain a directive which starts a new isolate
   *   scope. Calling `scope()` on this element always returns the original non-isolate scope.
   *   Requires {@link guide/production#disabling-debug-data Debug Data} to be enabled.
   * - `inheritedData()` - same as `data()`, but walks up the DOM until a value is found or the top
   *   parent element is reached.
   *
   * @param {string|DOMElement} element HTML string or DOMElement to be wrapped into jQuery.
   * @returns {Object} jQuery object.
   */

  JQLite.expando = 'ng339';

  var jqCache = JQLite.cache = {},
      jqId = 1,
      addEventListenerFn = function(element, type, fn) {
        element.addEventListener(type, fn, false);
      },
      removeEventListenerFn = function(element, type, fn) {
        element.removeEventListener(type, fn, false);
      };

  /*
   * !!! This is an undocumented "private" function !!!
   */
  JQLite._data = function(node) {
    //jQuery always returns an object on cache miss
    return this.cache[node[this.expando]] || {};
  };

  function jqNextId() { return ++jqId; }


  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var MOUSE_EVENT_MAP= { mouseleave: "mouseout", mouseenter: "mouseover"};
  var jqLiteMinErr = minErr('jqLite');

  /**
   * Converts snake_case to camelCase.
   * Also there is special case for Moz prefix starting with upper case letter.
   * @param name Name to normalize
   */
  function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
  }

  var SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
  var HTML_REGEXP = /<|&#?\w+;/;
  var TAG_NAME_REGEXP = /<([\w:-]+)/;
  var XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;

  var wrapMap = {
    'option': [1, '<select multiple="multiple">', '</select>'],

    'thead': [1, '<table>', '</table>'],
    'col': [2, '<table><colgroup>', '</colgroup></table>'],
    'tr': [2, '<table><tbody>', '</tbody></table>'],
    'td': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    '_default': [0, "", ""]
  };

  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;


  function jqLiteIsTextNode(html) {
    return !HTML_REGEXP.test(html);
  }

  function jqLiteAcceptsData(node) {
    // The window object can accept data but has no nodeType
    // Otherwise we are only interested in elements (1) and documents (9)
    var nodeType = node.nodeType;
    return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
  }

  function jqLiteHasData(node) {
    for (var key in jqCache[node.ng339]) {
      return true;
    }
    return false;
  }

  function jqLiteBuildFragment(html, context) {
    var tmp, tag, wrap,
        fragment = context.createDocumentFragment(),
        nodes = [], i;

    if (jqLiteIsTextNode(html)) {
      // Convert non-html into a text node
      nodes.push(context.createTextNode(html));
    } else {
      // Convert html into DOM nodes
      tmp = tmp || fragment.appendChild(context.createElement("div"));
      tag = (TAG_NAME_REGEXP.exec(html) || ["", ""])[1].toLowerCase();
      wrap = wrapMap[tag] || wrapMap._default;
      tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, "<$1></$2>") + wrap[2];

      // Descend through wrappers to the right content
      i = wrap[0];
      while (i--) {
        tmp = tmp.lastChild;
      }

      nodes = concat(nodes, tmp.childNodes);

      tmp = fragment.firstChild;
      tmp.textContent = "";
    }

    // Remove wrapper from fragment
    fragment.textContent = "";
    fragment.innerHTML = ""; // Clear inner HTML
    forEach(nodes, function(node) {
      fragment.appendChild(node);
    });

    return fragment;
  }

  function jqLiteParseHTML(html, context) {
    context = context || document;
    var parsed;

    if ((parsed = SINGLE_TAG_REGEXP.exec(html))) {
      return [context.createElement(parsed[1])];
    }

    if ((parsed = jqLiteBuildFragment(html, context))) {
      return parsed.childNodes;
    }

    return [];
  }

  /////////////////////////////////////////////
  function JQLite(element) {
    if (element instanceof JQLite) {
      return element;
    }

    var argIsString;

    if (isString(element)) {
      element = trim(element);
      argIsString = true;
    }
    if (!(this instanceof JQLite)) {
      if (argIsString && element.charAt(0) != '<') {
        throw jqLiteMinErr('nosel', 'Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element');
      }
      return new JQLite(element);
    }

    if (argIsString) {
      jqLiteAddNodes(this, jqLiteParseHTML(element));
    } else {
      jqLiteAddNodes(this, element);
    }
  }

  function jqLiteClone(element) {
    return element.cloneNode(true);
  }

  function jqLiteDealoc(element, onlyDescendants) {
    if (!onlyDescendants) jqLiteRemoveData(element);

    if (element.querySelectorAll) {
      var descendants = element.querySelectorAll('*');
      for (var i = 0, l = descendants.length; i < l; i++) {
        jqLiteRemoveData(descendants[i]);
      }
    }
  }

  function jqLiteOff(element, type, fn, unsupported) {
    if (isDefined(unsupported)) throw jqLiteMinErr('offargs', 'jqLite#off() does not support the `selector` argument');

    var expandoStore = jqLiteExpandoStore(element);
    var events = expandoStore && expandoStore.events;
    var handle = expandoStore && expandoStore.handle;

    if (!handle) return; //no listeners registered

    if (!type) {
      for (type in events) {
        if (type !== '$destroy') {
          removeEventListenerFn(element, type, handle);
        }
        delete events[type];
      }
    } else {
      forEach(type.split(' '), function(type) {
        if (isDefined(fn)) {
          var listenerFns = events[type];
          arrayRemove(listenerFns || [], fn);
          if (listenerFns && listenerFns.length > 0) {
            return;
          }
        }

        removeEventListenerFn(element, type, handle);
        delete events[type];
      });
    }
  }

  function jqLiteRemoveData(element, name) {
    var expandoId = element.ng339;
    var expandoStore = expandoId && jqCache[expandoId];

    if (expandoStore) {
      if (name) {
        delete expandoStore.data[name];
        return;
      }

      if (expandoStore.handle) {
        if (expandoStore.events.$destroy) {
          expandoStore.handle({}, '$destroy');
        }
        jqLiteOff(element);
      }
      delete jqCache[expandoId];
      element.ng339 = undefined; // don't delete DOM expandos. IE and Chrome don't like it
    }
  }


  function jqLiteExpandoStore(element, createIfNecessary) {
    var expandoId = element.ng339,
        expandoStore = expandoId && jqCache[expandoId];

    if (createIfNecessary && !expandoStore) {
      element.ng339 = expandoId = jqNextId();
      expandoStore = jqCache[expandoId] = {events: {}, data: {}, handle: undefined};
    }

    return expandoStore;
  }


  function jqLiteData(element, key, value) {
    if (jqLiteAcceptsData(element)) {

      var isSimpleSetter = isDefined(value);
      var isSimpleGetter = !isSimpleSetter && key && !isObject(key);
      var massGetter = !key;
      var expandoStore = jqLiteExpandoStore(element, !isSimpleGetter);
      var data = expandoStore && expandoStore.data;

      if (isSimpleSetter) { // data('key', value)
        data[key] = value;
      } else {
        if (massGetter) {  // data()
          return data;
        } else {
          if (isSimpleGetter) { // data('key')
            // don't force creation of expandoStore if it doesn't exist yet
            return data && data[key];
          } else { // mass-setter: data({key1: val1, key2: val2})
            extend(data, key);
          }
        }
      }
    }
  }

  function jqLiteHasClass(element, selector) {
    if (!element.getAttribute) return false;
    return ((" " + (element.getAttribute('class') || '') + " ").replace(/[\n\t]/g, " ").
        indexOf(" " + selector + " ") > -1);
  }

  function jqLiteRemoveClass(element, cssClasses) {
    if (cssClasses && element.setAttribute) {
      forEach(cssClasses.split(' '), function(cssClass) {
        element.setAttribute('class', trim(
            (" " + (element.getAttribute('class') || '') + " ")
            .replace(/[\n\t]/g, " ")
            .replace(" " + trim(cssClass) + " ", " "))
        );
      });
    }
  }

  function jqLiteAddClass(element, cssClasses) {
    if (cssClasses && element.setAttribute) {
      var existingClasses = (' ' + (element.getAttribute('class') || '') + ' ')
                              .replace(/[\n\t]/g, " ");

      forEach(cssClasses.split(' '), function(cssClass) {
        cssClass = trim(cssClass);
        if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
          existingClasses += cssClass + ' ';
        }
      });

      element.setAttribute('class', trim(existingClasses));
    }
  }


  function jqLiteAddNodes(root, elements) {
    // THIS CODE IS VERY HOT. Don't make changes without benchmarking.

    if (elements) {

      // if a Node (the most common case)
      if (elements.nodeType) {
        root[root.length++] = elements;
      } else {
        var length = elements.length;

        // if an Array or NodeList and not a Window
        if (typeof length === 'number' && elements.window !== elements) {
          if (length) {
            for (var i = 0; i < length; i++) {
              root[root.length++] = elements[i];
            }
          }
        } else {
          root[root.length++] = elements;
        }
      }
    }
  }


  function jqLiteController(element, name) {
    return jqLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
  }

  function jqLiteInheritedData(element, name, value) {
    // if element is the document object work with the html element instead
    // this makes $(document).scope() possible
    if (element.nodeType == NODE_TYPE_DOCUMENT) {
      element = element.documentElement;
    }
    var names = isArray(name) ? name : [name];

    while (element) {
      for (var i = 0, ii = names.length; i < ii; i++) {
        if (isDefined(value = jqLite.data(element, names[i]))) return value;
      }

      // If dealing with a document fragment node with a host element, and no parent, use the host
      // element as the parent. This enables directives within a Shadow DOM or polyfilled Shadow DOM
      // to lookup parent controllers.
      element = element.parentNode || (element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host);
    }
  }

  function jqLiteEmpty(element) {
    jqLiteDealoc(element, true);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function jqLiteRemove(element, keepData) {
    if (!keepData) jqLiteDealoc(element);
    var parent = element.parentNode;
    if (parent) parent.removeChild(element);
  }


  function jqLiteDocumentLoaded(action, win) {
    win = win || window;
    if (win.document.readyState === 'complete') {
      // Force the action to be run async for consistent behaviour
      // from the action's point of view
      // i.e. it will definitely not be in a $apply
      win.setTimeout(action);
    } else {
      // No need to unbind this handler as load is only ever called once
      jqLite(win).on('load', action);
    }
  }

  //////////////////////////////////////////
  // Functions which are declared directly.
  //////////////////////////////////////////
  var JQLitePrototype = JQLite.prototype = {
    ready: function(fn) {
      var fired = false;

      function trigger() {
        if (fired) return;
        fired = true;
        fn();
      }

      // check if document is already loaded
      if (document.readyState === 'complete') {
        setTimeout(trigger);
      } else {
        this.on('DOMContentLoaded', trigger); // works for modern browsers and IE9
        // we can not use jqLite since we are not done loading and jQuery could be loaded later.
        // jshint -W064
        JQLite(window).on('load', trigger); // fallback to window.onload for others
        // jshint +W064
      }
    },
    toString: function() {
      var value = [];
      forEach(this, function(e) { value.push('' + e);});
      return '[' + value.join(', ') + ']';
    },

    eq: function(index) {
        return (index >= 0) ? jqLite(this[index]) : jqLite(this[this.length + index]);
    },

    length: 0,
    push: push,
    sort: [].sort,
    splice: [].splice
  };

  jqLite = JQLite;

  /**
   * @description
   *
   * This object provides a utility for producing rich Error messages within
   * Angular. It can be called as follows:
   *
   * var exampleMinErr = minErr('example');
   * throw exampleMinErr('one', 'This {0} is {1}', foo, bar);
   *
   * The above creates an instance of minErr in the example namespace. The
   * resulting error will have a namespaced error code of example.one.  The
   * resulting error will replace {0} with the value of foo, and {1} with the
   * value of bar. The object is not restricted in the number of arguments it can
   * take.
   *
   * If fewer arguments are specified than necessary for interpolation, the extra
   * interpolation markers will be preserved in the final string.
   *
   * Since data will be parsed statically during a build step, some restrictions
   * are applied with respect to how minErr instances are created and called.
   * Instances should have names of the form namespaceMinErr for a minErr created
   * using minErr('namespace') . Error codes, namespaces and template strings
   * should all be static strings, not variables or general expressions.
   *
   * @param {string} module The namespace to use for the new minErr instance.
   * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
   *   error from returned function, for cases when a particular type of error is useful.
   * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
   */

  function minErr(module, ErrorConstructor) {
    ErrorConstructor = ErrorConstructor || Error;
    return function() {
      var SKIP_INDEXES = 2;

      var templateArgs = arguments,
        code = templateArgs[0],
        message = '[' + (module ? module + ':' : '') + code + '] ',
        template = templateArgs[1],
        paramPrefix, i;

      message += template.replace(/\{\d+\}/g, function(match) {
        var index = +match.slice(1, -1),
          shiftedIndex = index + SKIP_INDEXES;

        if (shiftedIndex < templateArgs.length) {
          return toDebugString(templateArgs[shiftedIndex]);
        }

        return match;
      });

      message += '\nhttp://errors.angularjs.org/1.4.7/' +
        (module ? module + '/' : '') + code;

      for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
        message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
          encodeURIComponent(toDebugString(templateArgs[i]));
      }

      return new ErrorConstructor(message);
    };
  }

  function serializeObject(obj) {
    var seen = [];

    return JSON.stringify(obj, function(key, val) {
      val = toJsonReplacer(key, val);
      if (isObject(val)) {

        if (seen.indexOf(val) >= 0) return '...';

        seen.push(val);
      }
      return val;
    });
  }

  function toDebugString(obj) {
    if (typeof obj === 'function') {
      return obj.toString().replace(/ \{[\s\S]*$/, '');
    } else if (isUndefined(obj)) {
      return 'undefined';
    } else if (typeof obj !== 'string') {
      return serializeObject(obj);
    }
    return obj;
  }

  function toJsonReplacer(key, value) {
    var val = value;

    if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
      val = undefined;
    } else if (isWindow(value)) {
      val = '$WINDOW';
    } else if (value &&  document === value) {
      val = '$DOCUMENT';
    } else if (isScope(value)) {
      val = '$SCOPE';
    }

    return val;
  }


  /**
   * Computes a hash of an 'obj'.
   * Hash of a:
   *  string is string
   *  number is number as string
   *  object is either result of calling $$hashKey function on the object or uniquely generated id,
   *         that is also assigned to the $$hashKey property of the object.
   *
   * @param obj
   * @returns {string} hash string such that the same input will have the same hash string.
   *         The resulting string key is in 'type:hashKey' format.
   */
  function hashKey(obj, nextUidFn) {
    var key = obj && obj.$$hashKey;

    if (key) {
      if (typeof key === 'function') {
        key = obj.$$hashKey();
      }
      return key;
    }

    var objType = typeof obj;
    if (objType == 'function' || (objType == 'object' && obj !== null)) {
      key = obj.$$hashKey = objType + ':' + (nextUidFn || nextUid)();
    } else {
      key = objType + ':' + obj;
    }

    return key;
  }

  /**
   * HashMap which can use objects as keys
   */
  function HashMap(array, isolatedUid) {
    if (isolatedUid) {
      var uid = 0;
      this.nextUid = function() {
        return ++uid;
      };
    }
    forEach(array, this.put, this);
  }
  HashMap.prototype = {
    /**
     * Store key value pair
     * @param key key to store can be any type
     * @param value value to store can be any type
     */
    put: function(key, value) {
      this[hashKey(key, this.nextUid)] = value;
    },

    /**
     * @param key
     * @returns {Object} the value for the key
     */
    get: function(key) {
      return this[hashKey(key, this.nextUid)];
    },

    /**
     * Remove the key/value pair
     * @param key
     */
    remove: function(key) {
      var value = this[key = hashKey(key, this.nextUid)];
      delete this[key];
      return value;
    }
  };

  var $$HashMapProvider = [function() {
    this.$get = [function() {
      return HashMap;
    }];
  }];

  ////////////////////////////////////

  /**
   * @ngdoc module
   * @name ng
   * @module ng
   * @description
   *
   * # ng (core module)
   * The ng module is loaded by default when an AngularJS application is started. The module itself
   * contains the essential components for an AngularJS application to function. The table below
   * lists a high level breakdown of each of the services/factories, filters, directives and testing
   * components available within this core module.
   *
   * <div doc-module-components="ng"></div>
   */

  var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/;

  // The name of a form control's ValidityState property.
  // This is used so that it's possible for internal tests to create mock ValidityStates.
  var VALIDITY_STATE_PROPERTY = 'validity';

  /**
   * @ngdoc function
   * @name angular.lowercase
   * @module ng
   * @kind function
   *
   * @description Converts the specified string to lowercase.
   * @param {string} string String to be converted to lowercase.
   * @returns {string} Lowercased string.
   */
  var lowercase = function(string) {return isString(string) ? string.toLowerCase() : string;};
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * @ngdoc function
   * @name angular.uppercase
   * @module ng
   * @kind function
   *
   * @description Converts the specified string to uppercase.
   * @param {string} string String to be converted to uppercase.
   * @returns {string} Uppercased string.
   */
  var uppercase = function(string) {return isString(string) ? string.toUpperCase() : string;};


  var manualLowercase = function(s) {  return isString(s)
        ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
        : s;
  };
  var manualUppercase = function(s) {  return isString(s)
        ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
        : s;
  };


  // String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
  // locale, for this reason we need to detect this case and redefine lowercase/uppercase methods
  // with correct but slower alternatives.
  if ('i' !== 'I'.toLowerCase()) {
    lowercase = manualLowercase;
    uppercase = manualUppercase;
  }


  var
      msie,             // holds major version number for IE, or NaN if UA is not IE.
      jqLite,           // delay binding since jQuery could be loaded after us.
      jQuery,           // delay binding
      slice             = [].slice,
      splice            = [].splice,
      push              = [].push,
      toString          = Object.prototype.toString,
      getPrototypeOf    = Object.getPrototypeOf,
      ngMinErr          = minErr('ng'),

      /** @name angular */
      angular           = window.angular || (window.angular = {}),
      angularModule,
      uid               = 0;

  /**
   * documentMode is an IE-only property
   * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
   */
  msie = document.documentMode;


  /**
   * @private
   * @param {*} obj
   * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
   *                   String ...)
   */
  function isArrayLike(obj) {
    if (obj == null || isWindow(obj)) {
      return false;
    }

    // Support: iOS 8.2 (not reproducible in simulator)
    // "length" in obj used to prevent JIT error (gh-11508)
    var length = "length" in Object(obj) && obj.length;

    if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
      return true;
    }

    return isString(obj) || isArray(obj) || length === 0 ||
           typeof length === 'number' && length > 0 && (length - 1) in obj;
  }

  /**
   * @ngdoc function
   * @name angular.isUndefined
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is undefined.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is undefined.
   */
  function isUndefined(value) {return typeof value === 'undefined';}


  /**
   * @ngdoc function
   * @name angular.isDefined
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is defined.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is defined.
   */
  function isDefined(value) {return typeof value !== 'undefined';}


  /**
   * @ngdoc function
   * @name angular.isObject
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
   * considered to be objects. Note that JavaScript arrays are objects.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is an `Object` but not `null`.
   */
  function isObject(value) {
    // http://jsperf.com/isobject4
    return value !== null && typeof value === 'object';
  }


  /**
   * Determine if a value is an object with a null prototype
   *
   * @returns {boolean} True if `value` is an `Object` with a null prototype
   */
  function isBlankObject(value) {
    return value !== null && typeof value === 'object' && !getPrototypeOf(value);
  }


  /**
   * @ngdoc function
   * @name angular.isString
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is a `String`.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `String`.
   */
  function isString(value) {return typeof value === 'string';}


  /**
   * @ngdoc function
   * @name angular.isNumber
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is a `Number`.
   *
   * This includes the "special" numbers `NaN`, `+Infinity` and `-Infinity`.
   *
   * If you wish to exclude these then you can use the native
   * [`isFinite'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
   * method.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `Number`.
   */
  function isNumber(value) {return typeof value === 'number';}


  /**
   * @ngdoc function
   * @name angular.isDate
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a value is a date.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `Date`.
   */
  function isDate(value) {
    return toString.call(value) === '[object Date]';
  }


  /**
   * @ngdoc function
   * @name angular.isArray
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is an `Array`.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is an `Array`.
   */
  var isArray = Array.isArray;

  /**
   * @ngdoc function
   * @name angular.isFunction
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is a `Function`.
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `Function`.
   */
  function isFunction(value) {return typeof value === 'function';}


  /**
   * Determines if a value is a regular expression object.
   *
   * @private
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a `RegExp`.
   */
  function isRegExp(value) {
    return toString.call(value) === '[object RegExp]';
  }


  /**
   * Checks if `obj` is a window object.
   *
   * @private
   * @param {*} obj Object to check
   * @returns {boolean} True if `obj` is a window obj.
   */
  function isWindow(obj) {
    return obj && obj.window === obj;
  }


  function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
  }


  function isFile(obj) {
    return toString.call(obj) === '[object File]';
  }


  function isFormData(obj) {
    return toString.call(obj) === '[object FormData]';
  }


  function isBlob(obj) {
    return toString.call(obj) === '[object Blob]';
  }


  function isBoolean(value) {
    return typeof value === 'boolean';
  }


  function isPromiseLike(obj) {
    return obj && isFunction(obj.then);
  }


  var TYPED_ARRAY_REGEXP = /^\[object (Uint8(Clamped)?)|(Uint16)|(Uint32)|(Int8)|(Int16)|(Int32)|(Float(32)|(64))Array\]$/;
  function isTypedArray(value) {
    return TYPED_ARRAY_REGEXP.test(toString.call(value));
  }


  var trim = function(value) {
    return isString(value) ? value.trim() : value;
  };

  // Copied from:
  // http://docs.closure-library.googlecode.com/git/local_closure_goog_string_string.js.source.html#line1021
  // Prereq: s is a string.
  var escapeForRegexp = function(s) {
    return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
             replace(/\x08/g, '\\x08');
  };


  /**
   * @ngdoc function
   * @name angular.isElement
   * @module ng
   * @kind function
   *
   * @description
   * Determines if a reference is a DOM element (or wrapped jQuery element).
   *
   * @param {*} value Reference to check.
   * @returns {boolean} True if `value` is a DOM element (or wrapped jQuery element).
   */
  function isElement(node) {
    return !!(node &&
      (node.nodeName  // we are a direct element
      || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
  }

  /**
   * @param str 'key1,key2,...'
   * @returns {object} in the form of {key1:true, key2:true, ...}
   */
  function makeMap(str) {
    var obj = {}, items = str.split(","), i;
    for (i = 0; i < items.length; i++) {
      obj[items[i]] = true;
    }
    return obj;
  }


  /**
   * Creates a new object without a prototype. This object is useful for lookup without having to
   * guard against prototypically inherited properties via hasOwnProperty.
   *
   * Related micro-benchmarks:
   * - http://jsperf.com/object-create2
   * - http://jsperf.com/proto-map-lookup/2
   * - http://jsperf.com/for-in-vs-object-keys2
   *
   * @returns {Object}
   */
  function createMap() {
    return Object.create(null);
  }

  var NODE_TYPE_ELEMENT = 1;
  var NODE_TYPE_ATTRIBUTE = 2;
  var NODE_TYPE_TEXT = 3;
  var NODE_TYPE_COMMENT = 8;
  var NODE_TYPE_DOCUMENT = 9;
  var NODE_TYPE_DOCUMENT_FRAGMENT = 11;

  /**
   * @ngdoc function
   * @name angular.forEach
   * @module ng
   * @kind function
   *
   * @description
   * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
   * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
   * is the value of an object property or an array element, `key` is the object property key or
   * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
   *
   * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
   * using the `hasOwnProperty` method.
   *
   * Unlike ES262's
   * [Array.prototype.forEach](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18),
   * Providing 'undefined' or 'null' values for `obj` will not throw a TypeError, but rather just
   * return the value provided.
   *
     ```js
       var values = {name: 'misko', gender: 'male'};
       var log = [];
       angular.forEach(values, function(value, key) {
         this.push(key + ': ' + value);
       }, log);
       expect(log).toEqual(['name: misko', 'gender: male']);
     ```
   *
   * @param {Object|Array} obj Object to iterate over.
   * @param {Function} iterator Iterator function.
   * @param {Object=} context Object to become context (`this`) for the iterator function.
   * @returns {Object|Array} Reference to `obj`.
   */

  function forEach(obj, iterator, context) {
    var key, length;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          // Need to check if hasOwnProperty exists,
          // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
          if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (isArray(obj) || isArrayLike(obj)) {
        var isPrimitive = typeof obj !== 'object';
        for (key = 0, length = obj.length; key < length; key++) {
          if (isPrimitive || key in obj) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
          obj.forEach(iterator, context, obj);
      } else if (isBlankObject(obj)) {
        // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
        for (key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      } else if (typeof obj.hasOwnProperty === 'function') {
        // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      } else {
        // Slow path for objects which do not have a method `hasOwnProperty`
        for (key in obj) {
          if (hasOwnProperty.call(obj, key)) {
            iterator.call(context, obj[key], key, obj);
          }
        }
      }
    }
    return obj;
  }


  function nodeName_(element) {
    return lowercase(element.nodeName || (element[0] && element[0].nodeName));
  }

  function includes(array, obj) {
    return Array.prototype.indexOf.call(array, obj) != -1;
  }

  function arrayRemove(array, value) {
    var index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return index;
  }

  /**
   * @ngdoc function
   * @name angular.copy
   * @module ng
   * @kind function
   *
   * @description
   * Creates a deep copy of `source`, which should be an object or an array.
   *
   * * If no destination is supplied, a copy of the object or array is created.
   * * If a destination is provided, all of its elements (for arrays) or properties (for objects)
   *   are deleted and then all elements/properties from the source are copied to it.
   * * If `source` is not an object or array (inc. `null` and `undefined`), `source` is returned.
   * * If `source` is identical to 'destination' an exception will be thrown.
   *
   * @param {*} source The source that will be used to make a copy.
   *                   Can be any type, including primitives, `null`, and `undefined`.
   * @param {(Object|Array)=} destination Destination into which the source is copied. If
   *     provided, must be of the same type as `source`.
   * @returns {*} The copy or updated `destination`, if `destination` was specified.
   *
   * @example
   <example module="copyExample">
   <file name="index.html">
   <div ng-controller="ExampleController">
   <form novalidate class="simple-form">
   Name: <input type="text" ng-model="user.name" /><br />
   E-mail: <input type="email" ng-model="user.email" /><br />
   Gender: <input type="radio" ng-model="user.gender" value="male" />male
   <input type="radio" ng-model="user.gender" value="female" />female<br />
   <button ng-click="reset()">RESET</button>
   <button ng-click="update(user)">SAVE</button>
   </form>
   <pre>form = {{user | json}}</pre>
   <pre>master = {{master | json}}</pre>
   </div>

   <script>
    angular.module('copyExample', [])
      .controller('ExampleController', ['$scope', function($scope) {
        $scope.master= {};

        $scope.update = function(user) {
          // Example with 1 argument
          $scope.master= angular.copy(user);
        };

        $scope.reset = function() {
          // Example with 2 arguments
          angular.copy($scope.master, $scope.user);
        };

        $scope.reset();
      }]);
   </script>
   </file>
   </example>
   */
  function copy(source, destination, stackSource, stackDest) {
    if (isWindow(source) || isScope(source)) {
      throw ngMinErr('cpws',
        "Can't copy! Making copies of Window or Scope instances is not supported.");
    }
    if (isTypedArray(destination)) {
      throw ngMinErr('cpta',
        "Can't copy! TypedArray destination cannot be mutated.");
    }

    if (!destination) {
      destination = source;
      if (isObject(source)) {
        var index;
        if (stackSource && (index = stackSource.indexOf(source)) !== -1) {
          return stackDest[index];
        }

        // TypedArray, Date and RegExp have specific copy functionality and must be
        // pushed onto the stack before returning.
        // Array and other objects create the base object and recurse to copy child
        // objects. The array/object will be pushed onto the stack when recursed.
        if (isArray(source)) {
          return copy(source, [], stackSource, stackDest);
        } else if (isTypedArray(source)) {
          destination = new source.constructor(source);
        } else if (isDate(source)) {
          destination = new Date(source.getTime());
        } else if (isRegExp(source)) {
          destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
          destination.lastIndex = source.lastIndex;
        } else if (isFunction(source.cloneNode)) {
            destination = source.cloneNode(true);
        } else {
          var emptyObject = Object.create(getPrototypeOf(source));
          return copy(source, emptyObject, stackSource, stackDest);
        }

        if (stackDest) {
          stackSource.push(source);
          stackDest.push(destination);
        }
      }
    } else {
      if (source === destination) throw ngMinErr('cpi',
        "Can't copy! Source and destination are identical.");

      stackSource = stackSource || [];
      stackDest = stackDest || [];

      if (isObject(source)) {
        stackSource.push(source);
        stackDest.push(destination);
      }

      var result, key;
      if (isArray(source)) {
        destination.length = 0;
        for (var i = 0; i < source.length; i++) {
          destination.push(copy(source[i], null, stackSource, stackDest));
        }
      } else {
        var h = destination.$$hashKey;
        if (isArray(destination)) {
          destination.length = 0;
        } else {
          forEach(destination, function(value, key) {
            delete destination[key];
          });
        }
        if (isBlankObject(source)) {
          // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
          for (key in source) {
            destination[key] = copy(source[key], null, stackSource, stackDest);
          }
        } else if (source && typeof source.hasOwnProperty === 'function') {
          // Slow path, which must rely on hasOwnProperty
          for (key in source) {
            if (source.hasOwnProperty(key)) {
              destination[key] = copy(source[key], null, stackSource, stackDest);
            }
          }
        } else {
          // Slowest path --- hasOwnProperty can't be called as a method
          for (key in source) {
            if (hasOwnProperty.call(source, key)) {
              destination[key] = copy(source[key], null, stackSource, stackDest);
            }
          }
        }
        setHashKey(destination,h);
      }
    }
    return destination;
  }

  /**
   * Creates a shallow copy of an object, an array or a primitive.
   *
   * Assumes that there are no proto properties for objects.
   */
  function shallowCopy(src, dst) {
    if (isArray(src)) {
      dst = dst || [];

      for (var i = 0, ii = src.length; i < ii; i++) {
        dst[i] = src[i];
      }
    } else if (isObject(src)) {
      dst = dst || {};

      for (var key in src) {
        if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
          dst[key] = src[key];
        }
      }
    }

    return dst || src;
  }


  /**
   * @ngdoc function
   * @name angular.equals
   * @module ng
   * @kind function
   *
   * @description
   * Determines if two objects or two values are equivalent. Supports value types, regular
   * expressions, arrays and objects.
   *
   * Two objects or values are considered equivalent if at least one of the following is true:
   *
   * * Both objects or values pass `===` comparison.
   * * Both objects or values are of the same type and all of their properties are equal by
   *   comparing them with `angular.equals`.
   * * Both values are NaN. (In JavaScript, NaN == NaN => false. But we consider two NaN as equal)
   * * Both values represent the same regular expression (In JavaScript,
   *   /abc/ == /abc/ => false. But we consider two regular expressions as equal when their textual
   *   representation matches).
   *
   * During a property comparison, properties of `function` type and properties with names
   * that begin with `$` are ignored.
   *
   * Scope and DOMWindow objects are being compared only by identify (`===`).
   *
   * @param {*} o1 Object or value to compare.
   * @param {*} o2 Object or value to compare.
   * @returns {boolean} True if arguments are equal.
   */
  function equals(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
      if (t1 == 'object') {
        if (isArray(o1)) {
          if (!isArray(o2)) return false;
          if ((length = o1.length) == o2.length) {
            for (key = 0; key < length; key++) {
              if (!equals(o1[key], o2[key])) return false;
            }
            return true;
          }
        } else if (isDate(o1)) {
          if (!isDate(o2)) return false;
          return equals(o1.getTime(), o2.getTime());
        } else if (isRegExp(o1)) {
          return isRegExp(o2) ? o1.toString() == o2.toString() : false;
        } else {
          if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) ||
            isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
          keySet = createMap();
          for (key in o1) {
            if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
            if (!equals(o1[key], o2[key])) return false;
            keySet[key] = true;
          }
          for (key in o2) {
            if (!(key in keySet) &&
                key.charAt(0) !== '$' &&
                isDefined(o2[key]) &&
                !isFunction(o2[key])) return false;
          }
          return true;
        }
      }
    }
    return false;
  }

  var csp = function() {
    if (!isDefined(csp.rules)) {


      var ngCspElement = (document.querySelector('[ng-csp]') ||
                      document.querySelector('[data-ng-csp]'));

      if (ngCspElement) {
        var ngCspAttribute = ngCspElement.getAttribute('ng-csp') ||
                      ngCspElement.getAttribute('data-ng-csp');
        csp.rules = {
          noUnsafeEval: !ngCspAttribute || (ngCspAttribute.indexOf('no-unsafe-eval') !== -1),
          noInlineStyle: !ngCspAttribute || (ngCspAttribute.indexOf('no-inline-style') !== -1)
        };
      } else {
        csp.rules = {
          noUnsafeEval: noUnsafeEval(),
          noInlineStyle: false
        };
      }
    }

    return csp.rules;

    function noUnsafeEval() {
      try {      new Function('');      return false;
      } catch (e) {
        return true;
      }
    }
  };

  /**
   * @ngdoc directive
   * @module ng
   * @name ngJq
   *
   * @element ANY
   * @param {string=} ngJq the name of the library available under `window`
   * to be used for angular.element
   * @description
   * Use this directive to force the angular.element library.  This should be
   * used to force either jqLite by leaving ng-jq blank or setting the name of
   * the jquery variable under window (eg. jQuery).
   *
   * Since angular looks for this directive when it is loaded (doesn't wait for the
   * DOMContentLoaded event), it must be placed on an element that comes before the script
   * which loads angular. Also, only the first instance of `ng-jq` will be used and all
   * others ignored.
   *
   * @example
   * This example shows how to force jqLite using the `ngJq` directive to the `html` tag.
   ```html
   <!doctype html>
   <html ng-app ng-jq>
   ...
   ...
   </html>
   ```
   * @example
   * This example shows how to use a jQuery based library of a different name.
   * The library name must be available at the top most 'window'.
   ```html
   <!doctype html>
   <html ng-app ng-jq="jQueryLib">
   ...
   ...
   </html>
   ```
   */
  var jq = function() {
    if (isDefined(jq.name_)) return jq.name_;
    var el;
    var i, ii = ngAttrPrefixes.length, prefix, name;
    for (i = 0; i < ii; ++i) {
      prefix = ngAttrPrefixes[i];
      if (el = document.querySelector('[' + prefix.replace(':', '\\:') + 'jq]')) {
        name = el.getAttribute(prefix + 'jq');
        break;
      }
    }

    return (jq.name_ = name);
  };

  function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
  }

  function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
  }

  /**
   * Return the DOM siblings between the first and last node in the given array.
   * @param {Array} array like object
   * @returns {Array} the inputted object or a jqLite collection containing the nodes
   */
  function getBlockNodes(nodes) {
    // TODO(perf): update `nodes` instead of creating a new object?
    var node = nodes[0];
    var endNode = nodes[nodes.length - 1];
    var blockNodes;

    for (var i = 1; node !== endNode && (node = node.nextSibling); i++) {
      if (blockNodes || nodes[i] !== node) {
        if (!blockNodes) {
          blockNodes = jqLite(slice.call(nodes, 0, i));
        }
        blockNodes.push(node);
      }
    }

    return blockNodes || nodes;
  }

  /**
   * @ngdoc directive
   * @name owsNgRepeat
   * @multiElement
   *
   * @description
   * The `owsNgRepeat` directive instantiates a template once per item from a collection. Each template
   * instance gets its own scope, where the given loop variable is set to the current collection item,
   * and `$index` is set to the item index or key.
   *
   * Special properties are exposed on the local scope of each template instance, including:
   *
   * | Variable  | Type            | Details                                                                     |
   * |-----------|-----------------|-----------------------------------------------------------------------------|
   * | `$index`  | {@type number}  | iterator offset of the repeated element (0..length-1)                       |
   * | `$first`  | {@type boolean} | true if the repeated element is first in the iterator.                      |
   * | `$middle` | {@type boolean} | true if the repeated element is between the first and last in the iterator. |
   * | `$last`   | {@type boolean} | true if the repeated element is last in the iterator.                       |
   * | `$even`   | {@type boolean} | true if the iterator position `$index` is even (otherwise false).           |
   * | `$odd`    | {@type boolean} | true if the iterator position `$index` is odd (otherwise false).            |
   *
   * <div class="alert alert-info">
   *   Creating aliases for these properties is possible with {@link ng.directive:ngInit `ngInit`}.
   *   This may be useful when, for instance, nesting owsNgRepeats.
   * </div>
   *
   *
   * # Iterating over object properties
   *
   * It is possible to get `owsNgRepeat` to iterate over the properties of an object using the following
   * syntax:
   *
   * ```js
   * <div ng-repeat="(key, value) in myObj"> ... </div>
   * ```
   *
   * You need to be aware that the JavaScript specification does not define the order of keys
   * returned for an object. (To mitigate this in Angular 1.3 the `owsNgRepeat` directive
   * used to sort the keys alphabetically.)
   *
   * Version 1.4 removed the alphabetic sorting. We now rely on the order returned by the browser
   * when running `for key in myObj`. It seems that browsers generally follow the strategy of providing
   * keys in the order in which they were defined, although there are exceptions when keys are deleted
   * and reinstated. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#Cross-browser_issues
   *
   * If this is not desired, the recommended workaround is to convert your object into an array
   * that is sorted into the order that you prefer before providing it to `owsNgRepeat`.  You could
   * do this with a filter such as [toArrayFilter](http://ngmodules.org/modules/angular-toArrayFilter)
   * or implement a `$watch` on the object yourself.
   *
   *
   * # Tracking and Duplicates
   *
   * When the contents of the collection change, `owsNgRepeat` makes the corresponding changes to the DOM:
   *
   * * When an item is added, a new instance of the template is added to the DOM.
   * * When an item is removed, its template instance is removed from the DOM.
   * * When items are reordered, their respective templates are reordered in the DOM.
   *
   * By default, `owsNgRepeat` does not allow duplicate items in arrays. This is because when
   * there are duplicates, it is not possible to maintain a one-to-one mapping between collection
   * items and DOM elements.
   *
   * If you do need to repeat duplicate items, you can substitute the default tracking behavior
   * with your own using the `track by` expression.
   *
   * For example, you may track items by the index of each item in the collection, using the
   * special scope property `$index`:
   * ```html
   *    <div ng-repeat="n in [42, 42, 43, 43] track by $index">
   *      {{n}}
   *    </div>
   * ```
   *
   * You may use arbitrary expressions in `track by`, including references to custom functions
   * on the scope:
   * ```html
   *    <div ng-repeat="n in [42, 42, 43, 43] track by myTrackingFunction(n)">
   *      {{n}}
   *    </div>
   * ```
   *
   * If you are working with objects that have an identifier property, you can track
   * by the identifier instead of the whole object. Should you reload your data later, `owsNgRepeat`
   * will not have to rebuild the DOM elements for items it has already rendered, even if the
   * JavaScript objects in the collection have been substituted for new ones:
   * ```html
   *    <div ng-repeat="model in collection track by model.id">
   *      {{model.name}}
   *    </div>
   * ```
   *
   * When no `track by` expression is provided, it is equivalent to tracking by the built-in
   * `$id` function, which tracks items by their identity:
   * ```html
   *    <div ng-repeat="obj in collection track by $id(obj)">
   *      {{obj.prop}}
   *    </div>
   * ```
   *
   * <div class="alert alert-warning">
   * **Note:** `track by` must always be the last expression:
   * </div>
   * ```
   * <div ng-repeat="model in collection | orderBy: 'id' as filtered_result track by model.id">
   *     {{model.name}}
   * </div>
   * ```
   *
   * # Special repeat start and end points
   * To repeat a series of elements instead of just one parent element, owsNgRepeat (as well as other ng directives) supports extending
   * the range of the repeater by defining explicit start and end points by using **ng-repeat-start** and **ng-repeat-end** respectively.
   * The **ng-repeat-start** directive works the same as **ng-repeat**, but will repeat all the HTML code (including the tag it's defined on)
   * up to and including the ending HTML tag where **ng-repeat-end** is placed.
   *
   * The example below makes use of this feature:
   * ```html
   *   <header ng-repeat-start="item in items">
   *     Header {{ item }}
   *   </header>
   *   <div class="body">
   *     Body {{ item }}
   *   </div>
   *   <footer ng-repeat-end>
   *     Footer {{ item }}
   *   </footer>
   * ```
   *
   * And with an input of {@type ['A','B']} for the items variable in the example above, the output will evaluate to:
   * ```html
   *   <header>
   *     Header A
   *   </header>
   *   <div class="body">
   *     Body A
   *   </div>
   *   <footer>
   *     Footer A
   *   </footer>
   *   <header>
   *     Header B
   *   </header>
   *   <div class="body">
   *     Body B
   *   </div>
   *   <footer>
   *     Footer B
   *   </footer>
   * ```
   *
   * The custom start and end points for owsNgRepeat also support all other HTML directive syntax flavors provided in AngularJS (such
   * as **data-ng-repeat-start**, **x-ng-repeat-start** and **ng:repeat-start**).
   *
   * @animations
   * **.enter** - when a new item is added to the list or when an item is revealed after a filter
   *
   * **.leave** - when an item is removed from the list or when an item is filtered out
   *
   * **.move** - when an adjacent item is filtered out causing a reorder or when the item contents are reordered
   *
   * @element ANY
   * @scope
   * @priority 1000
   * @param {repeat_expression} owsNgRepeat The expression indicating how to enumerate a collection. These
   *   formats are currently supported:
   *
   *   * `variable in expression` – where variable is the user defined loop variable and `expression`
   *     is a scope expression giving the collection to enumerate.
   *
   *     For example: `album in artist.albums`.
   *
   *   * `(key, value) in expression` – where `key` and `value` can be any user defined identifiers,
   *     and `expression` is the scope expression giving the collection to enumerate.
   *
   *     For example: `(name, age) in {'adam':10, 'amalie':12}`.
   *
   *   * `variable in expression track by tracking_expression` – You can also provide an optional tracking expression
   *     which can be used to associate the objects in the collection with the DOM elements. If no tracking expression
   *     is specified, ng-repeat associates elements by identity. It is an error to have
   *     more than one tracking expression value resolve to the same key. (This would mean that two distinct objects are
   *     mapped to the same DOM element, which is not possible.)
   *
   *     Note that the tracking expression must come last, after any filters, and the alias expression.
   *
   *     For example: `item in items` is equivalent to `item in items track by $id(item)`. This implies that the DOM elements
   *     will be associated by item identity in the array.
   *
   *     For example: `item in items track by $id(item)`. A built in `$id()` function can be used to assign a unique
   *     `$$hashKey` property to each item in the array. This property is then used as a key to associated DOM elements
   *     with the corresponding item in the array by identity. Moving the same object in array would move the DOM
   *     element in the same way in the DOM.
   *
   *     For example: `item in items track by item.id` is a typical pattern when the items come from the database. In this
   *     case the object identity does not matter. Two objects are considered equivalent as long as their `id`
   *     property is same.
   *
   *     For example: `item in items | filter:searchText track by item.id` is a pattern that might be used to apply a filter
   *     to items in conjunction with a tracking expression.
   *
   *   * `variable in expression as alias_expression` – You can also provide an optional alias expression which will then store the
   *     intermediate results of the repeater after the filters have been applied. Typically this is used to render a special message
   *     when a filter is active on the repeater, but the filtered result set is empty.
   *
   *     For example: `item in items | filter:x as results` will store the fragment of the repeated items as `results`, but only after
   *     the items have been processed through the filter.
   *
   *     Please note that `as [variable name] is not an operator but rather a part of owsNgRepeat micro-syntax so it can be used only at the end
   *     (and not as operator, inside an expression).
   *
   *     For example: `item in items | filter : x | orderBy : order | limitTo : limit as results` .
   *
   * @example
   * This example initializes the scope to a list of names and
   * then uses `owsNgRepeat` to display every person:
    <example module="ngAnimate" deps="angular-animate.js" animations="true">
      <file name="index.html">
        <div ng-init="friends = [
          {name:'John', age:25, gender:'boy'},
          {name:'Jessie', age:30, gender:'girl'},
          {name:'Johanna', age:28, gender:'girl'},
          {name:'Joy', age:15, gender:'girl'},
          {name:'Mary', age:28, gender:'girl'},
          {name:'Peter', age:95, gender:'boy'},
          {name:'Sebastian', age:50, gender:'boy'},
          {name:'Erika', age:27, gender:'girl'},
          {name:'Patrick', age:40, gender:'boy'},
          {name:'Samantha', age:60, gender:'girl'}
        ]">
          I have {{friends.length}} friends. They are:
          <input type="search" ng-model="q" placeholder="filter friends..." aria-label="filter friends" />
          <ul class="example-animate-container">
            <li class="animate-repeat" ng-repeat="friend in friends | filter:q as results">
              [{{$index + 1}}] {{friend.name}} who is {{friend.age}} years old.
            </li>
            <li class="animate-repeat" ng-if="results.length == 0">
              <strong>No results found...</strong>
            </li>
          </ul>
        </div>
      </file>
      <file name="animations.css">
        .example-animate-container {
          background:white;
          border:1px solid black;
          list-style:none;
          margin:0;
          padding:0 10px;
        }

        .animate-repeat {
          line-height:40px;
          list-style:none;
          box-sizing:border-box;
        }

        .animate-repeat.ng-move,
        .animate-repeat.ng-enter,
        .animate-repeat.ng-leave {
          transition:all linear 0.5s;
        }

        .animate-repeat.ng-leave.ng-leave-active,
        .animate-repeat.ng-move,
        .animate-repeat.ng-enter {
          opacity:0;
          max-height:0;
        }

        .animate-repeat.ng-leave,
        .animate-repeat.ng-move.ng-move-active,
        .animate-repeat.ng-enter.ng-enter-active {
          opacity:1;
          max-height:40px;
        }
      </file>
      <file name="protractor.js" type="protractor">
        var friends = element.all(by.repeater('friend in friends'));

        it('should render initial data set', function() {
          expect(friends.count()).toBe(10);
          expect(friends.get(0).getText()).toEqual('[1] John who is 25 years old.');
          expect(friends.get(1).getText()).toEqual('[2] Jessie who is 30 years old.');
          expect(friends.last().getText()).toEqual('[10] Samantha who is 60 years old.');
          expect(element(by.binding('friends.length')).getText())
              .toMatch("I have 10 friends. They are:");
        });

         it('should update repeater when filter predicate changes', function() {
           expect(friends.count()).toBe(10);

           element(by.model('q')).sendKeys('ma');

           expect(friends.count()).toBe(2);
           expect(friends.get(0).getText()).toEqual('[1] Mary who is 28 years old.');
           expect(friends.last().getText()).toEqual('[2] Samantha who is 60 years old.');
         });
        </file>
      </example>
   */
  var owsNgRepeatDirective = ['$parse', '$animate', function($parse, $animate) {
    var NG_REMOVED = '$$NG_REMOVED';
    var owsNgRepeatMinErr = minErr('owsNgRepeat');

    var updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
      // TODO(perf): generate setters to shave off ~40ms or 1-1.5%
      scope[valueIdentifier] = value;
      if (keyIdentifier) scope[keyIdentifier] = key;
      scope.$index = index;
      scope.$first = (index === 0);
      scope.$last = (index === (arrayLength - 1));
      scope.$middle = !(scope.$first || scope.$last);
      // jshint bitwise: false
      scope.$odd = !(scope.$even = (index&1) === 0);
      // jshint bitwise: true
    };

    var getBlockStart = function(block) {
      return block.clone[0];
    };

    var getBlockEnd = function(block) {
      return block.clone[block.clone.length - 1];
    };


    return {
      restrict: 'A',
      multiElement: true,
      transclude: 'element',
      priority: 1000,
      terminal: true,
      $$tlb: true,
      compile: function owsNgRepeatCompile($element, $attr) {
        var expression = $attr.owsNgRepeat;
        var owsNgRepeatEndComment = document.createComment(' end owsNgRepeat: ' + expression + ' ');

        var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

        if (!match) {
          throw owsNgRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
              expression);
        }

        var lhs = match[1];
        var rhs = match[2];
        var aliasAs = match[3];
        var trackByExp = match[4];

        match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);

        if (!match) {
          throw owsNgRepeatMinErr('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
              lhs);
        }
        var valueIdentifier = match[3] || match[1];
        var keyIdentifier = match[2];

        if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) ||
            /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) {
          throw owsNgRepeatMinErr('badident', "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.",
            aliasAs);
        }

        var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn;
        var hashFnLocals = {$id: hashKey};

        if (trackByExp) {
          trackByExpGetter = $parse(trackByExp);
        } else {
          trackByIdArrayFn = function(key, value) {
            return hashKey(value);
          };
          trackByIdObjFn = function(key) {
            return key;
          };
        }

        return function owsNgRepeatLink($scope, $element, $attr, ctrl, $transclude) {

          if (trackByExpGetter) {
            trackByIdExpFn = function(key, value, index) {
              // assign key, value, and $index to the locals so that they can be used in hash functions
              if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
              hashFnLocals[valueIdentifier] = value;
              hashFnLocals.$index = index;
              return trackByExpGetter($scope, hashFnLocals);
            };
          }

          // Store a list of elements from previous run. This is a hash where key is the item from the
          // iterator, and the value is objects with following properties.
          //   - scope: bound scope
          //   - element: previous element.
          //   - index: position
          //
          // We are using no-proto object so that we don't need to guard against inherited props via
          // hasOwnProperty.
          var lastBlockMap = createMap();

          //watch props
          bindChannelSimple($parse, $scope, '', $attr, function owsNgRepeatAction() {
            var collection = $parse(rhs)($scope);
            var index, length,
                previousNode = $element[0],     // node that cloned nodes should be inserted after
                                                // initialized to the comment node anchor
                nextNode,
                // Same as lastBlockMap but it has the current state. It will become the
                // lastBlockMap on the next iteration.
                nextBlockMap = createMap(),
                collectionLength,
                key, value, // key/value of iteration
                trackById,
                trackByIdFn,
                collectionKeys,
                block,       // last object information {scope, element, id}
                nextBlockOrder,
                elementsToRemove;

            if (aliasAs) {
              $scope[aliasAs] = collection;
            }

            if (isArrayLike(collection)) {
              collectionKeys = collection;
              trackByIdFn = trackByIdExpFn || trackByIdArrayFn;
            } else {
              trackByIdFn = trackByIdExpFn || trackByIdObjFn;
              // if object, extract keys, in enumeration order, unsorted
              collectionKeys = [];
              for (var itemKey in collection) {
                if (hasOwnProperty.call(collection, itemKey) && itemKey.charAt(0) !== '$') {
                  collectionKeys.push(itemKey);
                }
              }
            }

            collectionLength = collectionKeys.length;
            nextBlockOrder = new Array(collectionLength);

            // locate existing items
            for (index = 0; index < collectionLength; index++) {
              key = (collection === collectionKeys) ? index : collectionKeys[index];
              value = collection[key];
              trackById = trackByIdFn(key, value, index);
              if (lastBlockMap[trackById]) {
                // found previously seen block
                block = lastBlockMap[trackById];
                delete lastBlockMap[trackById];
                nextBlockMap[trackById] = block;
                nextBlockOrder[index] = block;
              } else if (nextBlockMap[trackById]) {
                // if collision detected. restore lastBlockMap and throw an error
                forEach(nextBlockOrder, function(block) {
                  if (block && block.scope) lastBlockMap[block.id] = block;
                });
                throw owsNgRepeatMinErr('dupes',
                    "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}",
                    expression, trackById, value);
              } else {
                // new never before seen block
                nextBlockOrder[index] = {id: trackById, scope: undefined, clone: undefined};
                nextBlockMap[trackById] = true;
              }
            }

            // remove leftover items
            for (var blockKey in lastBlockMap) {
              block = lastBlockMap[blockKey];
              elementsToRemove = getBlockNodes(block.clone);
              $animate.leave(elementsToRemove);
              if (elementsToRemove[0].parentNode) {
                // if the element was not removed yet because of pending animation, mark it as deleted
                // so that we can ignore it later
                for (index = 0, length = elementsToRemove.length; index < length; index++) {
                  elementsToRemove[index][NG_REMOVED] = true;
                }
              }
              block.scope.$destroy();
            }

            // we are not using forEach for perf reasons (trying to avoid #call)
            for (index = 0; index < collectionLength; index++) {
              key = (collection === collectionKeys) ? index : collectionKeys[index];
              value = collection[key];
              block = nextBlockOrder[index];

              if (block.scope) {
                // if we have already seen this object, then we need to reuse the
                // associated scope/element

                nextNode = previousNode;

                // skip nodes that are already pending removal via leave animation
                do {
                  nextNode = nextNode.nextSibling;
                } while (nextNode && nextNode[NG_REMOVED]);

                if (getBlockStart(block) != nextNode) {
                  // existing item which got moved
                  $animate.move(getBlockNodes(block.clone), null, jqLite(previousNode));
                }
                previousNode = getBlockEnd(block);
                updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
              } else {
                // new item which we don't know about
                $transclude(function owsNgRepeatTransclude(clone, scope) {
                  block.scope = scope;
                  // http://jsperf.com/clone-vs-createcomment
                  var endNode = owsNgRepeatEndComment.cloneNode(false);
                  clone[clone.length++] = endNode;

                  // TODO(perf): support naked previousNode in `enter` to avoid creation of jqLite wrapper?
                  $animate.enter(clone, null, jqLite(previousNode));
                  previousNode = endNode;
                  // Note: We only need the first/last node of the cloned nodes.
                  // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                  // by a directive with templateUrl when its template arrives.
                  block.clone = clone;
                  nextBlockMap[block.id] = block;
                  updateScope(block.scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
                });
              }
            }
            lastBlockMap = nextBlockMap;
          });
        };
      }
    };
  }];

  var owsNgRepeatOnlyPushDirective = ['$parse', '$animate', function($parse, $animate) {
    var NG_REMOVED = '$$NG_REMOVED';
    var owsNgRepeatMinErr = minErr('owsNgRepeatOnlyPush');

    var updateScope = function(scope, index, valueIdentifier, value, keyIdentifier, key, arrayLength) {
      // TODO(perf): generate setters to shave off ~40ms or 1-1.5%
      scope[valueIdentifier] = value;
      if (keyIdentifier) scope[keyIdentifier] = key;
      scope.$index = index;
      scope.$first = (index === 0);
      scope.$last = (index === (arrayLength - 1));
      scope.$middle = !(scope.$first || scope.$last);
      // jshint bitwise: false
      scope.$odd = !(scope.$even = (index&1) === 0);
      // jshint bitwise: true
    };

    var getBlockStart = function(block) {
      return block.clone[0];
    };

    var getBlockEnd = function(block) {
      return block.clone[block.clone.length - 1];
    };


    return {
      restrict: 'A',
      multiElement: true,
      transclude: 'element',
      priority: 1000,
      terminal: true,
      $$tlb: true,
      compile: function owsNgRepeatCompile($element, $attr) {
        var expression = $attr.owsNgRepeatOnlyPush;
        var owsNgRepeatEndComment = document.createComment(' end owsNgRepeat: ' + expression + ' ');

        var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

        if (!match) {
          throw owsNgRepeatMinErr('iexp', "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
              expression);
        }

        var lhs = match[1];
        var rhs = match[2];
        var aliasAs = match[3];
        var trackByExp = match[4];

        match = lhs.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);

        if (!match) {
          throw owsNgRepeatMinErr('iidexp', "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
              lhs);
        }
        var valueIdentifier = match[3] || match[1];
        var keyIdentifier = match[2];

        if (aliasAs && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(aliasAs) ||
            /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(aliasAs))) {
          throw owsNgRepeatMinErr('badident', "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.",
            aliasAs);
        }

        var trackByExpGetter, trackByIdExpFn, trackByIdArrayFn, trackByIdObjFn;
        var hashFnLocals = {$id: hashKey};

        if (trackByExp) {
          trackByExpGetter = $parse(trackByExp);
        } else {
          trackByIdArrayFn = function(key, value) {
            return hashKey(value);
          };
          trackByIdObjFn = function(key) {
            return key;
          };
        }

        return function owsNgRepeatLink($scope, $element, $attr, ctrl, $transclude) {

          if (trackByExpGetter) {
            trackByIdExpFn = function(key, value, index) {
              // assign key, value, and $index to the locals so that they can be used in hash functions
              if (keyIdentifier) hashFnLocals[keyIdentifier] = key;
              hashFnLocals[valueIdentifier] = value;
              hashFnLocals.$index = index;
              return trackByExpGetter($scope, hashFnLocals);
            };
          }

          // Store a list of elements from previous run. This is a hash where key is the item from the
          // iterator, and the value is objects with following properties.
          //   - scope: bound scope
          //   - element: previous element.
          //   - index: position
          //
          // We are using no-proto object so that we don't need to guard against inherited props via
          // hasOwnProperty.
          var lastBlockMap = createMap();
          var previousNode = $element[0];
          var preLength = 0;

          //watch props
          bindChannelSimple($parse, $scope, '', $attr, function owsNgRepeatAction() {
            var collection = $parse(rhs)($scope);
            var index, length,     // node that cloned nodes should be inserted after
                                                // initialized to the comment node anchor
                nextNode,
                // Same as lastBlockMap but it has the current state. It will become the
                // lastBlockMap on the next iteration.
                nextBlockMap = createMap(),
                collectionLength,
                key, value, // key/value of iteration
                trackById,
                trackByIdFn,
                collectionKeys,
                block,       // last object information {scope, element, id}
                elementsToRemove;

            if (aliasAs) {
              $scope[aliasAs] = collection;
            }

            console.log($element);


            //only support array
            collectionKeys = collection;
            trackByIdFn = trackByIdExpFn || trackByIdArrayFn;

            collectionLength = collectionKeys.length;

            // we are not using forEach for perf reasons (trying to avoid #call)
            for (index = preLength; index < collectionLength; index++) {
              value = collection[index];

              // new item which we don't know about
              $transclude(function owsNgRepeatTransclude(clone, scope) {
                  // http://jsperf.com/clone-vs-createcomment
                  var endNode = owsNgRepeatEndComment.cloneNode(false);
                  clone[clone.length++] = endNode;

                  // TODO(perf): support naked previousNode in `enter` to avoid creation of jqLite wrapper?
                  $animate.enter(clone, null, jqLite(previousNode));
                  previousNode = endNode;
                  // Note: We only need the first/last node of the cloned nodes.
                  // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                  // by a directive with templateUrl when its template arrives.

                  updateScope(scope, index, valueIdentifier, value, keyIdentifier, key, collectionLength);
              });
            }

            preLength = collectionLength;
          });
        };
      }
    };
  }];


  /**
   * @ngdoc directive
   * @name ngBind
   * @restrict AC
   *
   * @description
   * The `ngBind` attribute tells Angular to replace the text content of the specified HTML element
   * with the value of a given expression, and to update the text content when the value of that
   * expression changes.
   *
   * Typically, you don't use `ngBind` directly, but instead you use the double curly markup like
   * `{{ expression }}` which is similar but less verbose.
   *
   * It is preferable to use `ngBind` instead of `{{ expression }}` if a template is momentarily
   * displayed by the browser in its raw state before Angular compiles it. Since `ngBind` is an
   * element attribute, it makes the bindings invisible to the user while the page is loading.
   *
   * An alternative solution to this problem would be using the
   * {@link ng.directive:ngCloak ngCloak} directive.
   *
   *
   * @element ANY
   * @param {expression} ngBind {@link guide/expression Expression} to evaluate.
   *
   * @example
   * Enter a name in the Live Preview text box; the greeting below the text box changes instantly.
     <example module="bindExample">
       <file name="index.html">
         <script>
           angular.module('bindExample', [])
             .controller('ExampleController', ['$scope', function($scope) {
               $scope.name = 'Whirled';
             }]);
         </script>
         <div ng-controller="ExampleController">
           <label>Enter name: <input type="text" ng-model="name"></label><br>
           Hello <span ng-bind="name"></span>!
         </div>
       </file>
       <file name="protractor.js" type="protractor">
         it('should check ng-bind', function() {
           var nameInput = element(by.model('name'));

           expect(element(by.binding('name')).getText()).toBe('Whirled');
           nameInput.clear();
           nameInput.sendKeys('world');
           expect(element(by.binding('name')).getText()).toBe('world');
         });
       </file>
     </example>
   */
  var owsNgBindDirective = ['$compile', '$rootScope', '$parse',
      function($compile, $rootScope, $parse) {
          return {
              restrict: 'AC',
              compile: function ngBindCompile(templateElement) {
                  $compile.$$addBindingClass(templateElement);
                  return function ngBindLink(scope, element, attr) {
                      $compile.$$addBindingInfo(element, attr.owsNgBind);
                      element = element[0];

                      bindChannel($parse, scope, attr.owsNgBind, attr, function ngBindWatchAction(value) {
                          element.textContent = isUndefined(value) ? '' : value;
                      });
                  };
              }
          };
      }
  ];

  function valueFn(value) {return function() {return value;};}

  function ngDirective(directive) {
    if (isFunction(directive)) {
      directive = {
        link: directive
      };
    }
    directive.restrict = directive.restrict || 'AC';
    return valueFn(directive);
  }

  /**
   * @ngdoc directive
   * @name ngBindHtml
   *
   * @description
   * Evaluates the expression and inserts the resulting HTML into the element in a secure way. By default,
   * the resulting HTML content will be sanitized using the {@link ngSanitize.$sanitize $sanitize} service.
   * To utilize this functionality, ensure that `$sanitize` is available, for example, by including {@link
   * ngSanitize} in your module's dependencies (not in core Angular). In order to use {@link ngSanitize}
   * in your module's dependencies, you need to include "angular-sanitize.js" in your application.
   *
   * You may also bypass sanitization for values you know are safe. To do so, bind to
   * an explicitly trusted value via {@link ng.$sce#trustAsHtml $sce.trustAsHtml}.  See the example
   * under {@link ng.$sce#show-me-an-example-using-sce- Strict Contextual Escaping (SCE)}.
   *
   * Note: If a `$sanitize` service is unavailable and the bound value isn't explicitly trusted, you
   * will have an exception (instead of an exploit.)
   *
   * @element ANY
   * @param {expression} ngBindHtml {@link guide/expression Expression} to evaluate.
   *
   * @example

     <example module="bindHtmlExample" deps="angular-sanitize.js">
       <file name="index.html">
         <div ng-controller="ExampleController">
          <p ng-bind-html="myHTML"></p>
         </div>
       </file>

       <file name="script.js">
         angular.module('bindHtmlExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.myHTML =
                'I am an <code>HTML</code>string with ' +
                '<a href="#">links!</a> and other <em>stuff</em>';
           }]);
       </file>

       <file name="protractor.js" type="protractor">
         it('should check ng-bind-html', function() {
           expect(element(by.binding('myHTML')).getText()).toBe(
               'I am an HTMLstring with links! and other stuff');
         });
       </file>
     </example>
   */
  var owsNgBindHtmlDirective = ['$sce', '$parse', '$compile', function($sce, $parse, $compile) {
    return {
      restrict: 'A',
      compile: function owsNgBindHtmlCompile(tElement, tAttrs) {
        var owsNgBindHtmlGetter = $parse(tAttrs.owsNgBindHtml);
        var owsNgBindHtmlWatch = $parse(tAttrs.owsNgBindHtml, function getStringValue(value) {
          return (value || '').toString();
        });
        $compile.$$addBindingClass(tElement);

        return function owsNgBindHtmlLink(scope, element, attr) {
          $compile.$$addBindingInfo(element, attr.owsNgBindHtml);

          bindChannelSimple($parse, scope, owsNgBindHtmlWatch, attr, function ngBindWatchAction(value) {
            // we re-evaluate the expr because we want a TrustedValueHolderType
            // for $sce, not a string
            element.html($sce.getTrustedHtml(owsNgBindHtmlGetter(scope)) || '');
          });
        };
      }
    };
  }];

  function classDirective(name, selector) {
    name = 'owsNgClass' + name;
    return ['$animate', '$parse', function($animate, $parse) {
      return {
        restrict: 'AC',
        link: function(scope, element, attr) {
          var oldVal;

          bindChannel($parse, scope, attr[name], attr, owsNgClassWatchAction);

          attr.$observe('class', function(value) {
            owsNgClassWatchAction(scope.$eval(attr[name]));
          });


          if (name !== 'owsNgClass') {
            scope.$watch('$index', function($index, old$index) {
              // jshint bitwise: false
              var mod = $index & 1;
              if (mod !== (old$index & 1)) {
                var classes = arrayClasses(scope.$eval(attr[name]));
                mod === selector ?
                  addClasses(classes) :
                  removeClasses(classes);
              }
            });
          }

          function addClasses(classes) {
            var newClasses = digestClassCounts(classes, 1);
            attr.$addClass(newClasses);
          }

          function removeClasses(classes) {
            var newClasses = digestClassCounts(classes, -1);
            attr.$removeClass(newClasses);
          }

          function digestClassCounts(classes, count) {
            // Use createMap() to prevent class assumptions involving property
            // names in Object.prototype
            var classCounts = element.data('$classCounts') || createMap();
            var classesToUpdate = [];
            forEach(classes, function(className) {
              if (count > 0 || classCounts[className]) {
                classCounts[className] = (classCounts[className] || 0) + count;
                if (classCounts[className] === +(count > 0)) {
                  classesToUpdate.push(className);
                }
              }
            });
            element.data('$classCounts', classCounts);
            return classesToUpdate.join(' ');
          }

          function updateClasses(oldClasses, newClasses) {
            var toAdd = arrayDifference(newClasses, oldClasses);
            var toRemove = arrayDifference(oldClasses, newClasses);
            toAdd = digestClassCounts(toAdd, 1);
            toRemove = digestClassCounts(toRemove, -1);
            if (toAdd && toAdd.length) {
              $animate.addClass(element, toAdd);
            }
            if (toRemove && toRemove.length) {
              $animate.removeClass(element, toRemove);
            }
          }

          function owsNgClassWatchAction(newVal) {
            if (selector === true || scope.$index % 2 === selector) {
              var newClasses = arrayClasses(newVal || []);
              if (!oldVal) {
                addClasses(newClasses);
              } else if (!equals(newVal,oldVal)) {
                var oldClasses = arrayClasses(oldVal);
                updateClasses(oldClasses, newClasses);
              }
            }
            oldVal = shallowCopy(newVal);
          }
        }
      };

      function arrayDifference(tokens1, tokens2) {
        var values = [];

        outer:
        for (var i = 0; i < tokens1.length; i++) {
          var token = tokens1[i];
          for (var j = 0; j < tokens2.length; j++) {
            if (token == tokens2[j]) continue outer;
          }
          values.push(token);
        }
        return values;
      }

      function arrayClasses(classVal) {
        var classes = [];
        if (isArray(classVal)) {
          forEach(classVal, function(v) {
            classes = classes.concat(arrayClasses(v));
          });
          return classes;
        } else if (isString(classVal)) {
          return classVal.split(' ');
        } else if (isObject(classVal)) {
          forEach(classVal, function(v, k) {
            if (v) {
              classes = classes.concat(k.split(' '));
            }
          });
          return classes;
        }
        return classVal;
      }
    }];
  }

  /**
   * @ngdoc directive
   * @name owsNgClass
   * @restrict AC
   *
   * @description
   * The `owsNgClass` directive allows you to dynamically set CSS classes on an HTML element by databinding
   * an expression that represents all classes to be added.
   *
   * The directive operates in three different ways, depending on which of three types the expression
   * evaluates to:
   *
   * 1. If the expression evaluates to a string, the string should be one or more space-delimited class
   * names.
   *
   * 2. If the expression evaluates to an object, then for each key-value pair of the
   * object with a truthy value the corresponding key is used as a class name.
   *
   * 3. If the expression evaluates to an array, each element of the array should either be a string as in
   * type 1 or an object as in type 2. This means that you can mix strings and objects together in an array
   * to give you more control over what CSS classes appear. See the code below for an example of this.
   *
   *
   * The directive won't add duplicate classes if a particular class was already set.
   *
   * When the expression changes, the previously added classes are removed and only then are the
   * new classes added.
   *
   * @animations
   * **add** - happens just before the class is applied to the elements
   *
   * **remove** - happens just before the class is removed from the element
   *
   * @element ANY
   * @param {expression} owsNgClass {@link guide/expression Expression} to eval. The result
   *   of the evaluation can be a string representing space delimited class
   *   names, an array, or a map of class names to boolean values. In the case of a map, the
   *   names of the properties whose values are truthy will be added as css classes to the
   *   element.
   *
   * @example Example that demonstrates basic bindings via owsNgClass directive.
     <example>
       <file name="index.html">
         <p ng-class="{strike: deleted, bold: important, 'has-error': error}">Map Syntax Example</p>
         <label>
            <input type="checkbox" ng-model="deleted">
            deleted (apply "strike" class)
         </label><br>
         <label>
            <input type="checkbox" ng-model="important">
            important (apply "bold" class)
         </label><br>
         <label>
            <input type="checkbox" ng-model="error">
            error (apply "has-error" class)
         </label>
         <hr>
         <p ng-class="style">Using String Syntax</p>
         <input type="text" ng-model="style"
                placeholder="Type: bold strike red" aria-label="Type: bold strike red">
         <hr>
         <p ng-class="[style1, style2, style3]">Using Array Syntax</p>
         <input ng-model="style1"
                placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red"><br>
         <input ng-model="style2"
                placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red 2"><br>
         <input ng-model="style3"
                placeholder="Type: bold, strike or red" aria-label="Type: bold, strike or red 3"><br>
         <hr>
         <p ng-class="[style4, {orange: warning}]">Using Array and Map Syntax</p>
         <input ng-model="style4" placeholder="Type: bold, strike" aria-label="Type: bold, strike"><br>
         <label><input type="checkbox" ng-model="warning"> warning (apply "orange" class)</label>
       </file>
       <file name="style.css">
         .strike {
             text-decoration: line-through;
         }
         .bold {
             font-weight: bold;
         }
         .red {
             color: red;
         }
         .has-error {
             color: red;
             background-color: yellow;
         }
         .orange {
             color: orange;
         }
       </file>
       <file name="protractor.js" type="protractor">
         var ps = element.all(by.css('p'));

         it('should let you toggle the class', function() {

           expect(ps.first().getAttribute('class')).not.toMatch(/bold/);
           expect(ps.first().getAttribute('class')).not.toMatch(/has-error/);

           element(by.model('important')).click();
           expect(ps.first().getAttribute('class')).toMatch(/bold/);

           element(by.model('error')).click();
           expect(ps.first().getAttribute('class')).toMatch(/has-error/);
         });

         it('should let you toggle string example', function() {
           expect(ps.get(1).getAttribute('class')).toBe('');
           element(by.model('style')).clear();
           element(by.model('style')).sendKeys('red');
           expect(ps.get(1).getAttribute('class')).toBe('red');
         });

         it('array example should have 3 classes', function() {
           expect(ps.get(2).getAttribute('class')).toBe('');
           element(by.model('style1')).sendKeys('bold');
           element(by.model('style2')).sendKeys('strike');
           element(by.model('style3')).sendKeys('red');
           expect(ps.get(2).getAttribute('class')).toBe('bold strike red');
         });

         it('array with map example should have 2 classes', function() {
           expect(ps.last().getAttribute('class')).toBe('');
           element(by.model('style4')).sendKeys('bold');
           element(by.model('warning')).click();
           expect(ps.last().getAttribute('class')).toBe('bold orange');
         });
       </file>
     </example>

     ## Animations

     The example below demonstrates how to perform animations using owsNgClass.

     <example module="ngAnimate" deps="angular-animate.js" animations="true">
       <file name="index.html">
        <input id="setbtn" type="button" value="set" ng-click="myVar='my-class'">
        <input id="clearbtn" type="button" value="clear" ng-click="myVar=''">
        <br>
        <span class="base-class" ng-class="myVar">Sample Text</span>
       </file>
       <file name="style.css">
         .base-class {
           transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;
         }

         .base-class.my-class {
           color: red;
           font-size:3em;
         }
       </file>
       <file name="protractor.js" type="protractor">
         it('should check ng-class', function() {
           expect(element(by.css('.base-class')).getAttribute('class')).not.
             toMatch(/my-class/);

           element(by.id('setbtn')).click();

           expect(element(by.css('.base-class')).getAttribute('class')).
             toMatch(/my-class/);

           element(by.id('clearbtn')).click();

           expect(element(by.css('.base-class')).getAttribute('class')).not.
             toMatch(/my-class/);
         });
       </file>
     </example>


     ## owsNgClass and pre-existing CSS3 Transitions/Animations
     The owsNgClass directive still supports CSS3 Transitions/Animations even if they do not follow the ngAnimate CSS naming structure.
     Upon animation ngAnimate will apply supplementary CSS classes to track the start and end of an animation, but this will not hinder
     any pre-existing CSS transitions already on the element. To get an idea of what happens during a class-based animation, be sure
     to view the step by step details of {@link $animate#addClass $animate.addClass} and
     {@link $animate#removeClass $animate.removeClass}.
   */
  var owsNgClassDirective = classDirective('', true);

  /**
   * @ngdoc directive
   * @name owsNgClassOdd
   * @restrict AC
   *
   * @description
   * The `owsNgClassOdd` and `owsNgClassEven` directives work exactly as
   * {@link ng.directive:owsNgClass owsNgClass}, except they work in
   * conjunction with `ngRepeat` and take effect only on odd (even) rows.
   *
   * This directive can be applied only within the scope of an
   * {@link ng.directive:ngRepeat ngRepeat}.
   *
   * @element ANY
   * @param {expression} owsNgClassOdd {@link guide/expression Expression} to eval. The result
   *   of the evaluation can be a string representing space delimited class names or an array.
   *
   * @example
     <example>
       <file name="index.html">
          <ol ng-init="names=['John', 'Mary', 'Cate', 'Suz']">
            <li ng-repeat="name in names">
             <span ng-class-odd="'odd'" ng-class-even="'even'">
               {{name}}
             </span>
            </li>
          </ol>
       </file>
       <file name="style.css">
         .odd {
           color: red;
         }
         .even {
           color: blue;
         }
       </file>
       <file name="protractor.js" type="protractor">
         it('should check ng-class-odd and ng-class-even', function() {
           expect(element(by.repeater('name in names').row(0).column('name')).getAttribute('class')).
             toMatch(/odd/);
           expect(element(by.repeater('name in names').row(1).column('name')).getAttribute('class')).
             toMatch(/even/);
         });
       </file>
     </example>
   */
  var owsNgClassOddDirective = classDirective('Odd', 0);

  /**
   * @ngdoc directive
   * @name owsNgClassEven
   * @restrict AC
   *
   * @description
   * The `owsNgClassOdd` and `owsNgClassEven` directives work exactly as
   * {@link ng.directive:owsNgClass owsNgClass}, except they work in
   * conjunction with `ngRepeat` and take effect only on odd (even) rows.
   *
   * This directive can be applied only within the scope of an
   * {@link ng.directive:ngRepeat ngRepeat}.
   *
   * @element ANY
   * @param {expression} owsNgClassEven {@link guide/expression Expression} to eval. The
   *   result of the evaluation can be a string representing space delimited class names or an array.
   *
   * @example
     <example>
       <file name="index.html">
          <ol ng-init="names=['John', 'Mary', 'Cate', 'Suz']">
            <li ng-repeat="name in names">
             <span ng-class-odd="'odd'" ng-class-even="'even'">
               {{name}} &nbsp; &nbsp; &nbsp;
             </span>
            </li>
          </ol>
       </file>
       <file name="style.css">
         .odd {
           color: red;
         }
         .even {
           color: blue;
         }
       </file>
       <file name="protractor.js" type="protractor">
         it('should check ng-class-odd and ng-class-even', function() {
           expect(element(by.repeater('name in names').row(0).column('name')).getAttribute('class')).
             toMatch(/odd/);
           expect(element(by.repeater('name in names').row(1).column('name')).getAttribute('class')).
             toMatch(/even/);
         });
       </file>
     </example>
   */
  var owsNgClassEvenDirective = classDirective('Even', 1);

  var NG_HIDE_CLASS = 'ng-hide';
  var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';
  /**
   * @ngdoc directive
   * @name owsNgShow
   * @multiElement
   *
   * @description
   * The `owsNgShow` directive shows or hides the given HTML element based on the expression
   * provided to the `owsNgShow` attribute. The element is shown or hidden by removing or adding
   * the `.ng-hide` CSS class onto the element. The `.ng-hide` CSS class is predefined
   * in AngularJS and sets the display style to none (using an !important flag).
   * For CSP mode please add `angular-csp.css` to your html file (see {@link ng.directive:ngCsp ngCsp}).
   *
   * ```html
   * <!-- when $scope.myValue is truthy (element is visible) -->
   * <div ng-show="myValue"></div>
   *
   * <!-- when $scope.myValue is falsy (element is hidden) -->
   * <div ng-show="myValue" class="ng-hide"></div>
   * ```
   *
   * When the `owsNgShow` expression evaluates to a falsy value then the `.ng-hide` CSS class is added to the class
   * attribute on the element causing it to become hidden. When truthy, the `.ng-hide` CSS class is removed
   * from the element causing the element not to appear hidden.
   *
   * ## Why is !important used?
   *
   * You may be wondering why !important is used for the `.ng-hide` CSS class. This is because the `.ng-hide` selector
   * can be easily overridden by heavier selectors. For example, something as simple
   * as changing the display style on a HTML list item would make hidden elements appear visible.
   * This also becomes a bigger issue when dealing with CSS frameworks.
   *
   * By using !important, the show and hide behavior will work as expected despite any clash between CSS selector
   * specificity (when !important isn't used with any conflicting styles). If a developer chooses to override the
   * styling to change how to hide an element then it is just a matter of using !important in their own CSS code.
   *
   * ### Overriding `.ng-hide`
   *
   * By default, the `.ng-hide` class will style the element with `display: none!important`. If you wish to change
   * the hide behavior with owsNgShow/owsNgHide then this can be achieved by restating the styles for the `.ng-hide`
   * class CSS. Note that the selector that needs to be used is actually `.ng-hide:not(.ng-hide-animate)` to cope
   * with extra animation classes that can be added.
   *
   * ```css
   * .ng-hide:not(.ng-hide-animate) {
   *   /&#42; this is just another form of hiding an element &#42;/
   *   display: block!important;
   *   position: absolute;
   *   top: -9999px;
   *   left: -9999px;
   * }
   * ```
   *
   * By default you don't need to override in CSS anything and the animations will work around the display style.
   *
   * ## A note about animations with `owsNgShow`
   *
   * Animations in owsNgShow/owsNgHide work with the show and hide events that are triggered when the directive expression
   * is true and false. This system works like the animation system present with ngClass except that
   * you must also include the !important flag to override the display property
   * so that you can perform an animation when the element is hidden during the time of the animation.
   *
   * ```css
   * //
   * //a working example can be found at the bottom of this page
   * //
   * .my-element.ng-hide-add, .my-element.ng-hide-remove {
   *   /&#42; this is required as of 1.3x to properly
   *      apply all styling in a show/hide animation &#42;/
   *   transition: 0s linear all;
   * }
   *
   * .my-element.ng-hide-add-active,
   * .my-element.ng-hide-remove-active {
   *   /&#42; the transition is defined in the active class &#42;/
   *   transition: 1s linear all;
   * }
   *
   * .my-element.ng-hide-add { ... }
   * .my-element.ng-hide-add.ng-hide-add-active { ... }
   * .my-element.ng-hide-remove { ... }
   * .my-element.ng-hide-remove.ng-hide-remove-active { ... }
   * ```
   *
   * Keep in mind that, as of AngularJS version 1.3.0-beta.11, there is no need to change the display
   * property to block during animation states--ngAnimate will handle the style toggling automatically for you.
   *
   * @animations
   * addClass: `.ng-hide` - happens after the `owsNgShow` expression evaluates to a truthy value and the just before contents are set to visible
   * removeClass: `.ng-hide` - happens after the `owsNgShow` expression evaluates to a non truthy value and just before the contents are set to hidden
   *
   * @element ANY
   * @param {expression} owsNgShow If the {@link guide/expression expression} is truthy
   *     then the element is shown or hidden respectively.
   *
   * @example
    <example module="ngAnimate" deps="angular-animate.js" animations="true">
      <file name="index.html">
        Click me: <input type="checkbox" ng-model="checked" aria-label="Toggle owsNgHide"><br/>
        <div>
          Show:
          <div class="check-element animate-show" ng-show="checked">
            <span class="glyphicon glyphicon-thumbs-up"></span> I show up when your checkbox is checked.
          </div>
        </div>
        <div>
          Hide:
          <div class="check-element animate-show" ng-hide="checked">
            <span class="glyphicon glyphicon-thumbs-down"></span> I hide when your checkbox is checked.
          </div>
        </div>
      </file>
      <file name="glyphicons.css">
        @import url(../../components/bootstrap-3.1.1/css/bootstrap.css);
      </file>
      <file name="animations.css">
        .animate-show {
          line-height: 20px;
          opacity: 1;
          padding: 10px;
          border: 1px solid black;
          background: white;
        }

        .animate-show.ng-hide-add, .animate-show.ng-hide-remove {
          transition: all linear 0.5s;
        }

        .animate-show.ng-hide {
          line-height: 0;
          opacity: 0;
          padding: 0 10px;
        }

        .check-element {
          padding: 10px;
          border: 1px solid black;
          background: white;
        }
      </file>
      <file name="protractor.js" type="protractor">
        var thumbsUp = element(by.css('span.glyphicon-thumbs-up'));
        var thumbsDown = element(by.css('span.glyphicon-thumbs-down'));

        it('should check ng-show / ng-hide', function() {
          expect(thumbsUp.isDisplayed()).toBeFalsy();
          expect(thumbsDown.isDisplayed()).toBeTruthy();

          element(by.model('checked')).click();

          expect(thumbsUp.isDisplayed()).toBeTruthy();
          expect(thumbsDown.isDisplayed()).toBeFalsy();
        });
      </file>
    </example>
   */
  var owsNgShowDirective = ['$animate', '$parse', function($animate, $parse) {
    return {
      restrict: 'A',
      multiElement: true,
      link: function(scope, element, attr) {
         bindChannel($parse, scope, attr.owsNgShow, attr, function owsNgShowWatchAction(value) {
          // we're adding a temporary, animation-specific class for ng-hide since this way
          // we can control when the element is actually displayed on screen without having
          // to have a global/greedy CSS selector that breaks when other animations are run.
          // Read: https://github.com/angular/angular.js/issues/9103#issuecomment-58335845
          $animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
            tempClasses: NG_HIDE_IN_PROGRESS_CLASS
          });
        });
      }
    };
  }];


  /**
   * @ngdoc directive
   * @name owsNgHide
   * @multiElement
   *
   * @description
   * The `owsNgHide` directive shows or hides the given HTML element based on the expression
   * provided to the `owsNgHide` attribute. The element is shown or hidden by removing or adding
   * the `ng-hide` CSS class onto the element. The `.ng-hide` CSS class is predefined
   * in AngularJS and sets the display style to none (using an !important flag).
   * For CSP mode please add `angular-csp.css` to your html file (see {@link ng.directive:ngCsp ngCsp}).
   *
   * ```html
   * <!-- when $scope.myValue is truthy (element is hidden) -->
   * <div ng-hide="myValue" class="ng-hide"></div>
   *
   * <!-- when $scope.myValue is falsy (element is visible) -->
   * <div ng-hide="myValue"></div>
   * ```
   *
   * When the `owsNgHide` expression evaluates to a truthy value then the `.ng-hide` CSS class is added to the class
   * attribute on the element causing it to become hidden. When falsy, the `.ng-hide` CSS class is removed
   * from the element causing the element not to appear hidden.
   *
   * ## Why is !important used?
   *
   * You may be wondering why !important is used for the `.ng-hide` CSS class. This is because the `.ng-hide` selector
   * can be easily overridden by heavier selectors. For example, something as simple
   * as changing the display style on a HTML list item would make hidden elements appear visible.
   * This also becomes a bigger issue when dealing with CSS frameworks.
   *
   * By using !important, the show and hide behavior will work as expected despite any clash between CSS selector
   * specificity (when !important isn't used with any conflicting styles). If a developer chooses to override the
   * styling to change how to hide an element then it is just a matter of using !important in their own CSS code.
   *
   * ### Overriding `.ng-hide`
   *
   * By default, the `.ng-hide` class will style the element with `display: none!important`. If you wish to change
   * the hide behavior with owsNgShow/owsNgHide then this can be achieved by restating the styles for the `.ng-hide`
   * class in CSS:
   *
   * ```css
   * .ng-hide {
   *   /&#42; this is just another form of hiding an element &#42;/
   *   display: block!important;
   *   position: absolute;
   *   top: -9999px;
   *   left: -9999px;
   * }
   * ```
   *
   * By default you don't need to override in CSS anything and the animations will work around the display style.
   *
   * ## A note about animations with `owsNgHide`
   *
   * Animations in owsNgShow/owsNgHide work with the show and hide events that are triggered when the directive expression
   * is true and false. This system works like the animation system present with ngClass, except that the `.ng-hide`
   * CSS class is added and removed for you instead of your own CSS class.
   *
   * ```css
   * //
   * //a working example can be found at the bottom of this page
   * //
   * .my-element.ng-hide-add, .my-element.ng-hide-remove {
   *   transition: 0.5s linear all;
   * }
   *
   * .my-element.ng-hide-add { ... }
   * .my-element.ng-hide-add.ng-hide-add-active { ... }
   * .my-element.ng-hide-remove { ... }
   * .my-element.ng-hide-remove.ng-hide-remove-active { ... }
   * ```
   *
   * Keep in mind that, as of AngularJS version 1.3.0-beta.11, there is no need to change the display
   * property to block during animation states--ngAnimate will handle the style toggling automatically for you.
   *
   * @animations
   * removeClass: `.ng-hide` - happens after the `owsNgHide` expression evaluates to a truthy value and just before the contents are set to hidden
   * addClass: `.ng-hide` - happens after the `owsNgHide` expression evaluates to a non truthy value and just before the contents are set to visible
   *
   * @element ANY
   * @param {expression} owsNgHide If the {@link guide/expression expression} is truthy then
   *     the element is shown or hidden respectively.
   *
   * @example
    <example module="ngAnimate" deps="angular-animate.js" animations="true">
      <file name="index.html">
        Click me: <input type="checkbox" ng-model="checked" aria-label="Toggle owsNgShow"><br/>
        <div>
          Show:
          <div class="check-element animate-hide" ng-show="checked">
            <span class="glyphicon glyphicon-thumbs-up"></span> I show up when your checkbox is checked.
          </div>
        </div>
        <div>
          Hide:
          <div class="check-element animate-hide" ng-hide="checked">
            <span class="glyphicon glyphicon-thumbs-down"></span> I hide when your checkbox is checked.
          </div>
        </div>
      </file>
      <file name="glyphicons.css">
        @import url(../../components/bootstrap-3.1.1/css/bootstrap.css);
      </file>
      <file name="animations.css">
        .animate-hide {
          transition: all linear 0.5s;
          line-height: 20px;
          opacity: 1;
          padding: 10px;
          border: 1px solid black;
          background: white;
        }

        .animate-hide.ng-hide {
          line-height: 0;
          opacity: 0;
          padding: 0 10px;
        }

        .check-element {
          padding: 10px;
          border: 1px solid black;
          background: white;
        }
      </file>
      <file name="protractor.js" type="protractor">
        var thumbsUp = element(by.css('span.glyphicon-thumbs-up'));
        var thumbsDown = element(by.css('span.glyphicon-thumbs-down'));

        it('should check ng-show / ng-hide', function() {
          expect(thumbsUp.isDisplayed()).toBeFalsy();
          expect(thumbsDown.isDisplayed()).toBeTruthy();

          element(by.model('checked')).click();

          expect(thumbsUp.isDisplayed()).toBeTruthy();
          expect(thumbsDown.isDisplayed()).toBeFalsy();
        });
      </file>
    </example>
   */
  var owsNgHideDirective = ['$animate', '$parse', function($animate, $parse) {
    return {
      restrict: 'A',
      multiElement: true,
      link: function(scope, element, attr) {
        bindChannel($parse, scope, attr.owsNgHide, attr, function owsNgHideWatchAction(value) {
          // The comment inside of the owsNgShowDirective explains why we add and
          // remove a temporary class for the show/hide animation
          $animate[value ? 'addClass' : 'removeClass'](element,NG_HIDE_CLASS, {
            tempClasses: NG_HIDE_IN_PROGRESS_CLASS
          });
        });
      }
    };
  }];

  /**
   * @ngdoc directive
   * @name owsNgStyle
   * @restrict AC
   *
   * @description
   * The `owsNgStyle` directive allows you to set CSS style on an HTML element conditionally.
   *
   * @element ANY
   * @param {expression} owsNgStyle
   *
   * {@link guide/expression Expression} which evals to an
   * object whose keys are CSS style names and values are corresponding values for those CSS
   * keys.
   *
   * Since some CSS style names are not valid keys for an object, they must be quoted.
   * See the 'background-color' style in the example below.
   *
   * @example
     <example>
       <file name="index.html">
          <input type="button" value="set color" ng-click="myStyle={color:'red'}">
          <input type="button" value="set background" ng-click="myStyle={'background-color':'blue'}">
          <input type="button" value="clear" ng-click="myStyle={}">
          <br/>
          <span ng-style="myStyle">Sample Text</span>
          <pre>myStyle={{myStyle}}</pre>
       </file>
       <file name="style.css">
         span {
           color: black;
         }
       </file>
       <file name="protractor.js" type="protractor">
         var colorSpan = element(by.css('span'));

         it('should check ng-style', function() {
           expect(colorSpan.getCssValue('color')).toBe('rgba(0, 0, 0, 1)');
           element(by.css('input[value=\'set color\']')).click();
           expect(colorSpan.getCssValue('color')).toBe('rgba(255, 0, 0, 1)');
           element(by.css('input[value=clear]')).click();
           expect(colorSpan.getCssValue('color')).toBe('rgba(0, 0, 0, 1)');
         });
       </file>
     </example>
   */

   var owsNgStyleDirective = ['$animate', '$parse', function($animate, $parse) {
    return {
      restrict: 'AC',
      link: function(scope, element, attr) {
         bindChannelFlex($parse, scope, attr.owsNgStyle, attr, function owsNgStyleWatchAction(newStyles, oldStyles) {
  	    if (oldStyles && (newStyles !== oldStyles)) {
  	      forEach(oldStyles, function(val, style) { element.css(style, '');});
  	    }
  	    if (newStyles) element.css(newStyles);
  	   });
      }
    };
  }];

  /**
   * @ngdoc directive
   * @name owsNgSwitch
   * @restrict EA
   *
   * @description
   * The `owsNgSwitch` directive is used to conditionally swap DOM structure on your template based on a scope expression.
   * Elements within `owsNgSwitch` but without `owsNgSwitchWhen` or `owsNgSwitchDefault` directives will be preserved at the location
   * as specified in the template.
   *
   * The directive itself works similar to ngInclude, however, instead of downloading template code (or loading it
   * from the template cache), `owsNgSwitch` simply chooses one of the nested elements and makes it visible based on which element
   * matches the value obtained from the evaluated expression. In other words, you define a container element
   * (where you place the directive), place an expression on the **`on="..."` attribute**
   * (or the **`ng-switch="..."` attribute**), define any inner elements inside of the directive and place
   * a when attribute per element. The when attribute is used to inform owsNgSwitch which element to display when the on
   * expression is evaluated. If a matching expression is not found via a when attribute then an element with the default
   * attribute is displayed.
   *
   * <div class="alert alert-info">
   * Be aware that the attribute values to match against cannot be expressions. They are interpreted
   * as literal string values to match against.
   * For example, **`ng-switch-when="someVal"`** will match against the string `"someVal"` not against the
   * value of the expression `$scope.someVal`.
   * </div>

   * @animations
   * enter - happens after the owsNgSwitch contents change and the matched child element is placed inside the container
   * leave - happens just after the owsNgSwitch contents change and just before the former contents are removed from the DOM
   *
   * @usage
   *
   * ```
   * <ANY ng-switch="expression">
   *   <ANY ng-switch-when="matchValue1">...</ANY>
   *   <ANY ng-switch-when="matchValue2">...</ANY>
   *   <ANY ng-switch-default>...</ANY>
   * </ANY>
   * ```
   *
   *
   * @scope
   * @priority 1200
   * @param {*} owsNgSwitch|on expression to match against <code>ng-switch-when</code>.
   * On child elements add:
   *
   * * `owsNgSwitchWhen`: the case statement to match against. If match then this
   *   case will be displayed. If the same match appears multiple times, all the
   *   elements will be displayed.
   * * `owsNgSwitchDefault`: the default case when no other case match. If there
   *   are multiple default cases, all of them will be displayed when no other
   *   case match.
   *
   *
   * @example
    <example module="switchExample" deps="angular-animate.js" animations="true">
      <file name="index.html">
        <div ng-controller="ExampleController">
          <select ng-model="selection" ng-options="item for item in items">
          </select>
          <code>selection={{selection}}</code>
          <hr/>
          <div class="animate-switch-container"
            ng-switch on="selection">
              <div class="animate-switch" ng-switch-when="settings">Settings Div</div>
              <div class="animate-switch" ng-switch-when="home">Home Span</div>
              <div class="animate-switch" ng-switch-default>default</div>
          </div>
        </div>
      </file>
      <file name="script.js">
        angular.module('switchExample', ['ngAnimate'])
          .controller('ExampleController', ['$scope', function($scope) {
            $scope.items = ['settings', 'home', 'other'];
            $scope.selection = $scope.items[0];
          }]);
      </file>
      <file name="animations.css">
        .animate-switch-container {
          position:relative;
          background:white;
          border:1px solid black;
          height:40px;
          overflow:hidden;
        }

        .animate-switch {
          padding:10px;
        }

        .animate-switch.ng-animate {
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;

          position:absolute;
          top:0;
          left:0;
          right:0;
          bottom:0;
        }

        .animate-switch.ng-leave.ng-leave-active,
        .animate-switch.ng-enter {
          top:-50px;
        }
        .animate-switch.ng-leave,
        .animate-switch.ng-enter.ng-enter-active {
          top:0;
        }
      </file>
      <file name="protractor.js" type="protractor">
        var switchElem = element(by.css('[ng-switch]'));
        var select = element(by.model('selection'));

        it('should start in settings', function() {
          expect(switchElem.getText()).toMatch(/Settings Div/);
        });
        it('should change to home', function() {
          select.all(by.css('option')).get(1).click();
          expect(switchElem.getText()).toMatch(/Home Span/);
        });
        it('should select default', function() {
          select.all(by.css('option')).get(2).click();
          expect(switchElem.getText()).toMatch(/default/);
        });
      </file>
    </example>
   */
  var owsNgSwitchDirective = ['$animate', '$parse', function($animate, $parse) {
    return {
      require: 'owsNgSwitch',

      // asks for $scope to fool the BC controller module
      controller: ['$scope', function owsNgSwitchController() {
       this.cases = {};
      }],
      link: function(scope, element, attr, owsNgSwitchController) {
        var watchExpr = attr.owsNgSwitch || attr.on,
            selectedTranscludes = [],
            selectedElements = [],
            previousLeaveAnimations = [],
            selectedScopes = [];

        var spliceFactory = function(array, index) {
            return function() { array.splice(index, 1); };
        };

        bindChannel($parse, scope, watchExpr, attr, function owsNgSwitchWatchAction(value) {
          var i, ii;
          for (i = 0, ii = previousLeaveAnimations.length; i < ii; ++i) {
            $animate.cancel(previousLeaveAnimations[i]);
          }
          previousLeaveAnimations.length = 0;

          for (i = 0, ii = selectedScopes.length; i < ii; ++i) {
            var selected = getBlockNodes(selectedElements[i].clone);
            selectedScopes[i].$destroy();
            var promise = previousLeaveAnimations[i] = $animate.leave(selected);
            promise.then(spliceFactory(previousLeaveAnimations, i));
          }

          selectedElements.length = 0;
          selectedScopes.length = 0;

          if ((selectedTranscludes = owsNgSwitchController.cases['!' + value] || owsNgSwitchController.cases['?'])) {
            forEach(selectedTranscludes, function(selectedTransclude) {
              selectedTransclude.transclude(function(caseElement, selectedScope) {
                selectedScopes.push(selectedScope);
                var anchor = selectedTransclude.element;
                caseElement[caseElement.length++] = document.createComment(' end owsNgSwitchWhen: ');
                var block = { clone: caseElement };

                selectedElements.push(block);
                $animate.enter(caseElement, anchor.parent(), anchor);
              });
            });
          }
        });
      }
    };
  }];

  var owsNgSwitchWhenDirective = ngDirective({
    transclude: 'element',
    priority: 1200,
    require: '^owsNgSwitch',
    multiElement: true,
    link: function(scope, element, attrs, ctrl, $transclude) {
      ctrl.cases['!' + attrs.owsNgSwitchWhen] = (ctrl.cases['!' + attrs.owsNgSwitchWhen] || []);
      ctrl.cases['!' + attrs.owsNgSwitchWhen].push({ transclude: $transclude, element: element });
    }
  });

  var owsNgSwitchDefaultDirective = ngDirective({
    transclude: 'element',
    priority: 1200,
    require: '^owsNgSwitch',
    multiElement: true,
    link: function(scope, element, attr, ctrl, $transclude) {
      ctrl.cases['?'] = (ctrl.cases['?'] || []);
      ctrl.cases['?'].push({ transclude: $transclude, element: element });
     }
  });

  /**
   * @ngdoc directive
   * @name owsNgIf
   * @restrict A
   * @multiElement
   *
   * @description
   * The `owsNgIf` directive removes or recreates a portion of the DOM tree based on an
   * {expression}. If the expression assigned to `owsNgIf` evaluates to a false
   * value then the element is removed from the DOM, otherwise a clone of the
   * element is reinserted into the DOM.
   *
   * `owsNgIf` differs from `ngShow` and `ngHide` in that `owsNgIf` completely removes and recreates the
   * element in the DOM rather than changing its visibility via the `display` css property.  A common
   * case when this difference is significant is when using css selectors that rely on an element's
   * position within the DOM, such as the `:first-child` or `:last-child` pseudo-classes.
   *
   * Note that when an element is removed using `owsNgIf` its scope is destroyed and a new scope
   * is created when the element is restored.  The scope created within `owsNgIf` inherits from
   * its parent scope using
   * [prototypal inheritance](https://github.com/angular/angular.js/wiki/Understanding-Scopes#javascript-prototypal-inheritance).
   * An important implication of this is if `ngModel` is used within `owsNgIf` to bind to
   * a javascript primitive defined in the parent scope. In this case any modifications made to the
   * variable within the child scope will override (hide) the value in the parent scope.
   *
   * Also, `owsNgIf` recreates elements using their compiled state. An example of this behavior
   * is if an element's class attribute is directly modified after it's compiled, using something like
   * jQuery's `.addClass()` method, and the element is later removed. When `owsNgIf` recreates the element
   * the added class will be lost because the original compiled state is used to regenerate the element.
   *
   * Additionally, you can provide animations via the `ngAnimate` module to animate the `enter`
   * and `leave` effects.
   *
   * @animations
   * enter - happens just after the `owsNgIf` contents change and a new DOM element is created and injected into the `owsNgIf` container
   * leave - happens just before the `owsNgIf` contents are removed from the DOM
   *
   * @element ANY
   * @scope
   * @priority 600
   * @param {expression} owsNgIf If the {@link guide/expression expression} is falsy then
   *     the element is removed from the DOM tree. If it is truthy a copy of the compiled
   *     element is added to the DOM tree.
   *
   * @example
    <example module="ngAnimate" deps="angular-animate.js" animations="true">
      <file name="index.html">
        <label>Click me: <input type="checkbox" ng-model="checked" ng-init="checked=true" /></label><br/>
        Show when checked:
        <span ng-if="checked" class="animate-if">
          This is removed when the checkbox is unchecked.
        </span>
      </file>
      <file name="animations.css">
        .animate-if {
          background:white;
          border:1px solid black;
          padding:10px;
        }

        .animate-if.ng-enter, .animate-if.ng-leave {
          transition:all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s;
        }

        .animate-if.ng-enter,
        .animate-if.ng-leave.ng-leave-active {
          opacity:0;
        }

        .animate-if.ng-leave,
        .animate-if.ng-enter.ng-enter-active {
          opacity:1;
        }
      </file>
    </example>
   */
  var owsNgIfDirective = ['$animate', '$parse', function($animate, $parse) {
    return {
      multiElement: true,
      transclude: 'element',
      priority: 600,
      terminal: true,
      restrict: 'A',
      $$tlb: true,
      link: function($scope, $element, $attr, ctrl, $transclude) {
          var block, childScope, previousElements;

          bindChannel($parse, $scope, $attr.owsNgIf, $attr, function owsNgIfWatchAction(value) {

            if (value) {
              if (!childScope) {
                $transclude(function(clone, newScope) {
                  childScope = newScope;
                  clone[clone.length++] = document.createComment(' end owsNgIf: ' + $attr.owsNgIf + ' ');
                  // Note: We only need the first/last node of the cloned nodes.
                  // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                  // by a directive with templateUrl when its template arrives.
                  block = {
                    clone: clone
                  };
                  $animate.enter(clone, $element.parent(), $element);
                });
              }
            } else {
              if (previousElements) {
                previousElements.remove();
                previousElements = null;
              }
              if (childScope) {
                childScope.$destroy();
                childScope = null;
              }
              if (block) {
                previousElements = getBlockNodes(block.clone);
                $animate.leave(previousElements).then(function() {
                  previousElements = null;
                });
                block = null;
              }
            }
          });
      }
    };
  }];

  var owsFastBindGlobalInit = ['$rootScope', function($rootScope) {
    return {
      restrict: 'AC',
      link: function(scope, element, attr) {
         window.OwsFbUpdate = function(channel){
            $rootScope.$broadcast(channel);
         }
      }
    };
  }];myModule
      .directive('owsFastBindGlobalInit', owsFastBindGlobalInit)
      .directive('owsNgBind', owsNgBindDirective)
      .directive('owsNgBindHtml', owsNgBindHtmlDirective)
      .directive('owsNgClass', owsNgClassDirective)
      .directive('owsNgClassOdd', owsNgClassOddDirective)
      .directive('owsNgClassEven', owsNgClassEvenDirective)
      .directive('owsNgShow', owsNgShowDirective)
      .directive('owsNgHide', owsNgHideDirective)
      .directive('owsNgStyle', owsNgStyleDirective)
      .directive('owsNgSwitch', owsNgSwitchDirective)
      .directive('owsNgSwitchWhen', owsNgSwitchWhenDirective)
      .directive('owsNgSwitchDefault', owsNgSwitchDefaultDirective)
      .directive('owsNgIf', owsNgIfDirective)
      .directive('owsNgRepeat', owsNgRepeatDirective)
      .directive('owsNgRepeatOnlyPush', owsNgRepeatOnlyPushDirective)

  // /node_modules/grunt-angular-toolbox/.tmp/ng_templates.js
  angular.module('owsFastBind').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('directive.html',
      "<div><h1>My Directive 2</h1><h2>{{foo}}</h2></div>"
    );

  }]);
})(window.angular);
