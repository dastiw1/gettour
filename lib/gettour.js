(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("gettour", [], factory);
	else if(typeof exports === 'object')
		exports["gettour"] = factory();
	else
		root["gettour"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/hogan.js/lib/compiler.js":
/*!***********************************************!*\
  !*** ./node_modules/hogan.js/lib/compiler.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (Hogan) {
  // Setup regex  assignments
  // remove whitespace according to Mustache spec
  var rIsWhitespace = /\S/,
      rQuot = /\"/g,
      rNewline =  /\n/g,
      rCr = /\r/g,
      rSlash = /\\/g,
      rLineSep = /\u2028/,
      rParagraphSep = /\u2029/;

  Hogan.tags = {
    '#': 1, '^': 2, '<': 3, '$': 4,
    '/': 5, '!': 6, '>': 7, '=': 8, '_v': 9,
    '{': 10, '&': 11, '_t': 12
  };

  Hogan.scan = function scan(text, delimiters) {
    var len = text.length,
        IN_TEXT = 0,
        IN_TAG_TYPE = 1,
        IN_TAG = 2,
        state = IN_TEXT,
        tagType = null,
        tag = null,
        buf = '',
        tokens = [],
        seenTag = false,
        i = 0,
        lineStart = 0,
        otag = '{{',
        ctag = '}}';

    function addBuf() {
      if (buf.length > 0) {
        tokens.push({tag: '_t', text: new String(buf)});
        buf = '';
      }
    }

    function lineIsWhitespace() {
      var isAllWhitespace = true;
      for (var j = lineStart; j < tokens.length; j++) {
        isAllWhitespace =
          (Hogan.tags[tokens[j].tag] < Hogan.tags['_v']) ||
          (tokens[j].tag == '_t' && tokens[j].text.match(rIsWhitespace) === null);
        if (!isAllWhitespace) {
          return false;
        }
      }

      return isAllWhitespace;
    }

    function filterLine(haveSeenTag, noNewLine) {
      addBuf();

      if (haveSeenTag && lineIsWhitespace()) {
        for (var j = lineStart, next; j < tokens.length; j++) {
          if (tokens[j].text) {
            if ((next = tokens[j+1]) && next.tag == '>') {
              // set indent to token value
              next.indent = tokens[j].text.toString()
            }
            tokens.splice(j, 1);
          }
        }
      } else if (!noNewLine) {
        tokens.push({tag:'\n'});
      }

      seenTag = false;
      lineStart = tokens.length;
    }

    function changeDelimiters(text, index) {
      var close = '=' + ctag,
          closeIndex = text.indexOf(close, index),
          delimiters = trim(
            text.substring(text.indexOf('=', index) + 1, closeIndex)
          ).split(' ');

      otag = delimiters[0];
      ctag = delimiters[delimiters.length - 1];

      return closeIndex + close.length - 1;
    }

    if (delimiters) {
      delimiters = delimiters.split(' ');
      otag = delimiters[0];
      ctag = delimiters[1];
    }

    for (i = 0; i < len; i++) {
      if (state == IN_TEXT) {
        if (tagChange(otag, text, i)) {
          --i;
          addBuf();
          state = IN_TAG_TYPE;
        } else {
          if (text.charAt(i) == '\n') {
            filterLine(seenTag);
          } else {
            buf += text.charAt(i);
          }
        }
      } else if (state == IN_TAG_TYPE) {
        i += otag.length - 1;
        tag = Hogan.tags[text.charAt(i + 1)];
        tagType = tag ? text.charAt(i + 1) : '_v';
        if (tagType == '=') {
          i = changeDelimiters(text, i);
          state = IN_TEXT;
        } else {
          if (tag) {
            i++;
          }
          state = IN_TAG;
        }
        seenTag = i;
      } else {
        if (tagChange(ctag, text, i)) {
          tokens.push({tag: tagType, n: trim(buf), otag: otag, ctag: ctag,
                       i: (tagType == '/') ? seenTag - otag.length : i + ctag.length});
          buf = '';
          i += ctag.length - 1;
          state = IN_TEXT;
          if (tagType == '{') {
            if (ctag == '}}') {
              i++;
            } else {
              cleanTripleStache(tokens[tokens.length - 1]);
            }
          }
        } else {
          buf += text.charAt(i);
        }
      }
    }

    filterLine(seenTag, true);

    return tokens;
  }

  function cleanTripleStache(token) {
    if (token.n.substr(token.n.length - 1) === '}') {
      token.n = token.n.substring(0, token.n.length - 1);
    }
  }

  function trim(s) {
    if (s.trim) {
      return s.trim();
    }

    return s.replace(/^\s*|\s*$/g, '');
  }

  function tagChange(tag, text, index) {
    if (text.charAt(index) != tag.charAt(0)) {
      return false;
    }

    for (var i = 1, l = tag.length; i < l; i++) {
      if (text.charAt(index + i) != tag.charAt(i)) {
        return false;
      }
    }

    return true;
  }

  // the tags allowed inside super templates
  var allowedInSuper = {'_t': true, '\n': true, '$': true, '/': true};

  function buildTree(tokens, kind, stack, customTags) {
    var instructions = [],
        opener = null,
        tail = null,
        token = null;

    tail = stack[stack.length - 1];

    while (tokens.length > 0) {
      token = tokens.shift();

      if (tail && tail.tag == '<' && !(token.tag in allowedInSuper)) {
        throw new Error('Illegal content in < super tag.');
      }

      if (Hogan.tags[token.tag] <= Hogan.tags['$'] || isOpener(token, customTags)) {
        stack.push(token);
        token.nodes = buildTree(tokens, token.tag, stack, customTags);
      } else if (token.tag == '/') {
        if (stack.length === 0) {
          throw new Error('Closing tag without opener: /' + token.n);
        }
        opener = stack.pop();
        if (token.n != opener.n && !isCloser(token.n, opener.n, customTags)) {
          throw new Error('Nesting error: ' + opener.n + ' vs. ' + token.n);
        }
        opener.end = token.i;
        return instructions;
      } else if (token.tag == '\n') {
        token.last = (tokens.length == 0) || (tokens[0].tag == '\n');
      }

      instructions.push(token);
    }

    if (stack.length > 0) {
      throw new Error('missing closing tag: ' + stack.pop().n);
    }

    return instructions;
  }

  function isOpener(token, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].o == token.n) {
        token.tag = '#';
        return true;
      }
    }
  }

  function isCloser(close, open, tags) {
    for (var i = 0, l = tags.length; i < l; i++) {
      if (tags[i].c == close && tags[i].o == open) {
        return true;
      }
    }
  }

  function stringifySubstitutions(obj) {
    var items = [];
    for (var key in obj) {
      items.push('"' + esc(key) + '": function(c,p,t,i) {' + obj[key] + '}');
    }
    return "{ " + items.join(",") + " }";
  }

  function stringifyPartials(codeObj) {
    var partials = [];
    for (var key in codeObj.partials) {
      partials.push('"' + esc(key) + '":{name:"' + esc(codeObj.partials[key].name) + '", ' + stringifyPartials(codeObj.partials[key]) + "}");
    }
    return "partials: {" + partials.join(",") + "}, subs: " + stringifySubstitutions(codeObj.subs);
  }

  Hogan.stringify = function(codeObj, text, options) {
    return "{code: function (c,p,i) { " + Hogan.wrapMain(codeObj.code) + " }," + stringifyPartials(codeObj) +  "}";
  }

  var serialNo = 0;
  Hogan.generate = function(tree, text, options) {
    serialNo = 0;
    var context = { code: '', subs: {}, partials: {} };
    Hogan.walk(tree, context);

    if (options.asString) {
      return this.stringify(context, text, options);
    }

    return this.makeTemplate(context, text, options);
  }

  Hogan.wrapMain = function(code) {
    return 'var t=this;t.b(i=i||"");' + code + 'return t.fl();';
  }

  Hogan.template = Hogan.Template;

  Hogan.makeTemplate = function(codeObj, text, options) {
    var template = this.makePartials(codeObj);
    template.code = new Function('c', 'p', 'i', this.wrapMain(codeObj.code));
    return new this.template(template, text, this, options);
  }

  Hogan.makePartials = function(codeObj) {
    var key, template = {subs: {}, partials: codeObj.partials, name: codeObj.name};
    for (key in template.partials) {
      template.partials[key] = this.makePartials(template.partials[key]);
    }
    for (key in codeObj.subs) {
      template.subs[key] = new Function('c', 'p', 't', 'i', codeObj.subs[key]);
    }
    return template;
  }

  function esc(s) {
    return s.replace(rSlash, '\\\\')
            .replace(rQuot, '\\\"')
            .replace(rNewline, '\\n')
            .replace(rCr, '\\r')
            .replace(rLineSep, '\\u2028')
            .replace(rParagraphSep, '\\u2029');
  }

  function chooseMethod(s) {
    return (~s.indexOf('.')) ? 'd' : 'f';
  }

  function createPartial(node, context) {
    var prefix = "<" + (context.prefix || "");
    var sym = prefix + node.n + serialNo++;
    context.partials[sym] = {name: node.n, partials: {}};
    context.code += 't.b(t.rp("' +  esc(sym) + '",c,p,"' + (node.indent || '') + '"));';
    return sym;
  }

  Hogan.codegen = {
    '#': function(node, context) {
      context.code += 'if(t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),' +
                      'c,p,0,' + node.i + ',' + node.end + ',"' + node.otag + " " + node.ctag + '")){' +
                      't.rs(c,p,' + 'function(c,p,t){';
      Hogan.walk(node.nodes, context);
      context.code += '});c.pop();}';
    },

    '^': function(node, context) {
      context.code += 'if(!t.s(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,1),c,p,1,0,0,"")){';
      Hogan.walk(node.nodes, context);
      context.code += '};';
    },

    '>': createPartial,
    '<': function(node, context) {
      var ctx = {partials: {}, code: '', subs: {}, inPartial: true};
      Hogan.walk(node.nodes, ctx);
      var template = context.partials[createPartial(node, context)];
      template.subs = ctx.subs;
      template.partials = ctx.partials;
    },

    '$': function(node, context) {
      var ctx = {subs: {}, code: '', partials: context.partials, prefix: node.n};
      Hogan.walk(node.nodes, ctx);
      context.subs[node.n] = ctx.code;
      if (!context.inPartial) {
        context.code += 't.sub("' + esc(node.n) + '",c,p,i);';
      }
    },

    '\n': function(node, context) {
      context.code += write('"\\n"' + (node.last ? '' : ' + i'));
    },

    '_v': function(node, context) {
      context.code += 't.b(t.v(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
    },

    '_t': function(node, context) {
      context.code += write('"' + esc(node.text) + '"');
    },

    '{': tripleStache,

    '&': tripleStache
  }

  function tripleStache(node, context) {
    context.code += 't.b(t.t(t.' + chooseMethod(node.n) + '("' + esc(node.n) + '",c,p,0)));';
  }

  function write(s) {
    return 't.b(' + s + ');';
  }

  Hogan.walk = function(nodelist, context) {
    var func;
    for (var i = 0, l = nodelist.length; i < l; i++) {
      func = Hogan.codegen[nodelist[i].tag];
      func && func(nodelist[i], context);
    }
    return context;
  }

  Hogan.parse = function(tokens, text, options) {
    options = options || {};
    return buildTree(tokens, '', [], options.sectionTags || []);
  }

  Hogan.cache = {};

  Hogan.cacheKey = function(text, options) {
    return [text, !!options.asString, !!options.disableLambda, options.delimiters, !!options.modelGet].join('||');
  }

  Hogan.compile = function(text, options) {
    options = options || {};
    var key = Hogan.cacheKey(text, options);
    var template = this.cache[key];

    if (template) {
      var partials = template.partials;
      for (var name in partials) {
        delete partials[name].instance;
      }
      return template;
    }

    template = this.generate(this.parse(this.scan(text, options.delimiters), text, options), text, options);
    return this.cache[key] = template;
  }
})( true ? exports : undefined);


/***/ }),

/***/ "./node_modules/hogan.js/lib/hogan.js":
/*!********************************************!*\
  !*** ./node_modules/hogan.js/lib/hogan.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// This file is for use with Node.js. See dist/ for browser files.

var Hogan = __webpack_require__(/*! ./compiler */ "./node_modules/hogan.js/lib/compiler.js");
Hogan.Template = __webpack_require__(/*! ./template */ "./node_modules/hogan.js/lib/template.js").Template;
Hogan.template = Hogan.Template;
module.exports = Hogan;


/***/ }),

/***/ "./node_modules/hogan.js/lib/template.js":
/*!***********************************************!*\
  !*** ./node_modules/hogan.js/lib/template.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 *  Copyright 2011 Twitter, Inc.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var Hogan = {};

(function (Hogan) {
  Hogan.Template = function (codeObj, text, compiler, options) {
    codeObj = codeObj || {};
    this.r = codeObj.code || this.r;
    this.c = compiler;
    this.options = options || {};
    this.text = text || '';
    this.partials = codeObj.partials || {};
    this.subs = codeObj.subs || {};
    this.buf = '';
  }

  Hogan.Template.prototype = {
    // render: replaced by generated code.
    r: function (context, partials, indent) { return ''; },

    // variable escaping
    v: hoganEscape,

    // triple stache
    t: coerceToString,

    render: function render(context, partials, indent) {
      return this.ri([context], partials || {}, indent);
    },

    // render internal -- a hook for overrides that catches partials too
    ri: function (context, partials, indent) {
      return this.r(context, partials, indent);
    },

    // ensurePartial
    ep: function(symbol, partials) {
      var partial = this.partials[symbol];

      // check to see that if we've instantiated this partial before
      var template = partials[partial.name];
      if (partial.instance && partial.base == template) {
        return partial.instance;
      }

      if (typeof template == 'string') {
        if (!this.c) {
          throw new Error("No compiler available.");
        }
        template = this.c.compile(template, this.options);
      }

      if (!template) {
        return null;
      }

      // We use this to check whether the partials dictionary has changed
      this.partials[symbol].base = template;

      if (partial.subs) {
        // Make sure we consider parent template now
        if (!partials.stackText) partials.stackText = {};
        for (key in partial.subs) {
          if (!partials.stackText[key]) {
            partials.stackText[key] = (this.activeSub !== undefined && partials.stackText[this.activeSub]) ? partials.stackText[this.activeSub] : this.text;
          }
        }
        template = createSpecializedPartial(template, partial.subs, partial.partials,
          this.stackSubs, this.stackPartials, partials.stackText);
      }
      this.partials[symbol].instance = template;

      return template;
    },

    // tries to find a partial in the current scope and render it
    rp: function(symbol, context, partials, indent) {
      var partial = this.ep(symbol, partials);
      if (!partial) {
        return '';
      }

      return partial.ri(context, partials, indent);
    },

    // render a section
    rs: function(context, partials, section) {
      var tail = context[context.length - 1];

      if (!isArray(tail)) {
        section(context, partials, this);
        return;
      }

      for (var i = 0; i < tail.length; i++) {
        context.push(tail[i]);
        section(context, partials, this);
        context.pop();
      }
    },

    // maybe start a section
    s: function(val, ctx, partials, inverted, start, end, tags) {
      var pass;

      if (isArray(val) && val.length === 0) {
        return false;
      }

      if (typeof val == 'function') {
        val = this.ms(val, ctx, partials, inverted, start, end, tags);
      }

      pass = !!val;

      if (!inverted && pass && ctx) {
        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
      }

      return pass;
    },

    // find values with dotted names
    d: function(key, ctx, partials, returnFound) {
      var found,
          names = key.split('.'),
          val = this.f(names[0], ctx, partials, returnFound),
          doModelGet = this.options.modelGet,
          cx = null;

      if (key === '.' && isArray(ctx[ctx.length - 2])) {
        val = ctx[ctx.length - 1];
      } else {
        for (var i = 1; i < names.length; i++) {
          found = findInScope(names[i], val, doModelGet);
          if (found !== undefined) {
            cx = val;
            val = found;
          } else {
            val = '';
          }
        }
      }

      if (returnFound && !val) {
        return false;
      }

      if (!returnFound && typeof val == 'function') {
        ctx.push(cx);
        val = this.mv(val, ctx, partials);
        ctx.pop();
      }

      return val;
    },

    // find values with normal names
    f: function(key, ctx, partials, returnFound) {
      var val = false,
          v = null,
          found = false,
          doModelGet = this.options.modelGet;

      for (var i = ctx.length - 1; i >= 0; i--) {
        v = ctx[i];
        val = findInScope(key, v, doModelGet);
        if (val !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) {
        return (returnFound) ? false : "";
      }

      if (!returnFound && typeof val == 'function') {
        val = this.mv(val, ctx, partials);
      }

      return val;
    },

    // higher order templates
    ls: function(func, cx, partials, text, tags) {
      var oldTags = this.options.delimiters;

      this.options.delimiters = tags;
      this.b(this.ct(coerceToString(func.call(cx, text)), cx, partials));
      this.options.delimiters = oldTags;

      return false;
    },

    // compile text
    ct: function(text, cx, partials) {
      if (this.options.disableLambda) {
        throw new Error('Lambda features disabled.');
      }
      return this.c.compile(text, this.options).render(cx, partials);
    },

    // template result buffering
    b: function(s) { this.buf += s; },

    fl: function() { var r = this.buf; this.buf = ''; return r; },

    // method replace section
    ms: function(func, ctx, partials, inverted, start, end, tags) {
      var textSource,
          cx = ctx[ctx.length - 1],
          result = func.call(cx);

      if (typeof result == 'function') {
        if (inverted) {
          return true;
        } else {
          textSource = (this.activeSub && this.subsText && this.subsText[this.activeSub]) ? this.subsText[this.activeSub] : this.text;
          return this.ls(result, cx, partials, textSource.substring(start, end), tags);
        }
      }

      return result;
    },

    // method replace variable
    mv: function(func, ctx, partials) {
      var cx = ctx[ctx.length - 1];
      var result = func.call(cx);

      if (typeof result == 'function') {
        return this.ct(coerceToString(result.call(cx)), cx, partials);
      }

      return result;
    },

    sub: function(name, context, partials, indent) {
      var f = this.subs[name];
      if (f) {
        this.activeSub = name;
        f(context, partials, this, indent);
        this.activeSub = false;
      }
    }

  };

  //Find a key in an object
  function findInScope(key, scope, doModelGet) {
    var val;

    if (scope && typeof scope == 'object') {

      if (scope[key] !== undefined) {
        val = scope[key];

      // try lookup with get for backbone or similar model data
      } else if (doModelGet && scope.get && typeof scope.get == 'function') {
        val = scope.get(key);
      }
    }

    return val;
  }

  function createSpecializedPartial(instance, subs, partials, stackSubs, stackPartials, stackText) {
    function PartialTemplate() {};
    PartialTemplate.prototype = instance;
    function Substitutions() {};
    Substitutions.prototype = instance.subs;
    var key;
    var partial = new PartialTemplate();
    partial.subs = new Substitutions();
    partial.subsText = {};  //hehe. substext.
    partial.buf = '';

    stackSubs = stackSubs || {};
    partial.stackSubs = stackSubs;
    partial.subsText = stackText;
    for (key in subs) {
      if (!stackSubs[key]) stackSubs[key] = subs[key];
    }
    for (key in stackSubs) {
      partial.subs[key] = stackSubs[key];
    }

    stackPartials = stackPartials || {};
    partial.stackPartials = stackPartials;
    for (key in partials) {
      if (!stackPartials[key]) stackPartials[key] = partials[key];
    }
    for (key in stackPartials) {
      partial.partials[key] = stackPartials[key];
    }

    return partial;
  }

  var rAmp = /&/g,
      rLt = /</g,
      rGt = />/g,
      rApos = /\'/g,
      rQuot = /\"/g,
      hChars = /[&<>\"\']/;

  function coerceToString(val) {
    return String((val === null || val === undefined) ? '' : val);
  }

  function hoganEscape(str) {
    str = coerceToString(str);
    return hChars.test(str) ?
      str
        .replace(rAmp, '&amp;')
        .replace(rLt, '&lt;')
        .replace(rGt, '&gt;')
        .replace(rApos, '&#39;')
        .replace(rQuot, '&quot;') :
      str;
  }

  var isArray = Array.isArray || function(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  };

})( true ? exports : undefined);


/***/ }),

/***/ "./node_modules/js-cookie/src/js.cookie.js":
/*!*************************************************!*\
  !*** ./node_modules/js-cookie/src/js.cookie.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "./src/ChangesListener.js":
/*!********************************!*\
  !*** ./src/ChangesListener.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__isNativeEvent = __isNativeEvent;
exports.default = void 0;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function __isNativeEvent(event) {
  var defaultEvents = ['click', 'mouseover', 'mouseout', 'keyup', 'keypress', 'change', 'focus', 'submit'];
  return defaultEvents.indexOf(event) > -1;
}

var ChangesListener =
/*#__PURE__*/
function () {
  function ChangesListener(_ref) {
    var listener_id = _ref.listener_id,
        selector = _ref.selector,
        event = _ref.event,
        attributeName = _ref.attributeName;

    _classCallCheck(this, ChangesListener);

    this.__tourObject = null;
    this.listener_id = listener_id;
    this.selector = selector;
    this.event = event;
    this.attributeName = attributeName;
  }

  _createClass(ChangesListener, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.tourJs == null) {
        (0, _utils.showError)('Сперва задайте значение tourJs');
        return;
      }

      var isBody = false;
      var event = this.event; // конфигурация нашего observer:

      var config = {
        attributes: true,
        childList: true,
        characterData: false
      }; // выбираем целевой элемент

      var target = document.querySelector(this.selector);

      if (__isNativeEvent(event)) {
        // Обработка клика
        if (event === 'click') {
          this.callback = this.nativeClickListener.bind(this);
          document.addEventListener(event, this.callback, false);
        } else if (target != null) {
          // Обработка остального
          this.callback = this.nativeEventListener.bind(this);
          target.addEventListener(event, this.callback, false);
        } else if (target == null) {
          (0, _utils.showError)('Ошибка: Элемент отсутствует в DOM');
        }

        return;
      } // Если элемент не найден в DOM дереве


      if (!target) {
        target = document.body;
        config.subtree = true;
        isBody = true;
      }

      if (isBody === false) {
        var observer;
        var callback;

        switch (event) {
          case 'show':
            callback = this.IntersectionShowCallback;
            break;

          case 'hide':
            callback = this.IntersectionHideCallback;
            break;

          case 'class_change':
            callback = this.classChangeCallback;
            break;

          case 'attr_change':
            callback = this.attributeChangeCallback;
            break;

          case 'text_change':
            config = Object.assign(config, {
              subtree: true,
              characterData: true,
              attributeOldValue: true,
              characterDataOldValue: true
            });
            callback = this.characterDataChangeCallback;
            break;

          case 'children_change':
            config.subtree = true;
            callback = this.childrenChangeCallback;
            break;

          default:
            (0, _utils.showError)("\u041D\u0435 \u043F\u043E\u043F\u0430\u043B \u043F\u043E\u0434 \u0443\u0441\u043B\u043E\u0432\u0438\u044F: ".concat(this.selector, " - ").concat(event));
            return;
          // break;
        }

        if (typeof callback !== 'function') {
          (0, _utils.showError)('Callback функция не определена!');
          return;
        } // если используется IntersectionObserver


        if (['show', 'hide'].indexOf(event) > -1) {
          observer = new IntersectionObserver(function (entries, context) {
            entries.forEach(callback.bind(context));
          });
        } else {
          // Если используется MutationObserver
          observer = new MutationObserver(function (mutations, context) {
            mutations.forEach(callback.bind(context));
          });
        }

        this.tourJs.__observers[this.listener_id] = observer;
        observer.observe(target, config);
      } else {
        // создаём экземпляр MutationObserver
        var _observer = new MutationObserver(function (mutations, context) {
          switch (event) {
            case 'show':
              mutations.forEach(_this.showCallback.bind(context));
              break;

            case 'hide':
              mutations.forEach(_this.hideCallback.bind(context));
              break;

            default:
              (0, _utils.showError)("\u041D\u0435 \u043F\u043E\u043F\u0430\u043B \u043F\u043E\u0434 \u0443\u0441\u043B\u043E\u0432\u0438\u044F: ".concat(_this.selector, " - ").concat(_this.event));

              _this.disconnectListener();

              break;
          }
        }); // передаём в качестве аргументов целевой элемент и его конфигурацию


        this.tourJs.__observers[this.listener_id] = _observer;

        _observer.observe(target, config);
      }
    }
    /**
     *
     */

  }, {
    key: "disconnectListener",
    value: function disconnectListener() {
      var listener = this.tourJs.__observers[this.listener_id];

      if (!listener) {
        (0, _utils.showError)("Listener \u0441 id ".concat(this.listener_id, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"));
        return;
      }

      listener.disconnect();
    }
  }, {
    key: "sendMessage",
    value: function sendMessage() {
      this.tourJs.sendMessage({
        listener_id: this.listener_id
      });
    }
    /**
     * Callback функция для прослушивания нативных событии JavaScript
     * @param {Event} jsEvent
     */

  }, {
    key: "nativeEventListener",
    value: function nativeEventListener(jsEvent) {
      if (jsEvent.target.matches(this.selector)) {
        this.sendMessage();
        jsEvent.target.removeEventListener(this.event, this.callback, false);
      }
    }
    /**
     *Callback функция для прослушивания нативных CLICK событии JavaScript
     * @param {Event} jsEvent
     */

  }, {
    key: "nativeClickListener",
    value: function nativeClickListener(jsEvent) {
      if (jsEvent.target.matches(this.selector)) {
        this.sendMessage();
        jsEvent.target.removeEventListener(this.event, this.callback, false);
      }
    }
  }, {
    key: "IntersectionShowCallback",
    value: function IntersectionShowCallback(changeListener) {
      if (this.isIntersecting) {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
  }, {
    key: "IntersectionHideCallback",
    value: function IntersectionHideCallback(changeListener) {
      if (this.intersectionRatio === 0 && this.isIntersecting === false) {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
    /**
     * Callback функция когда event == 'show' (показ) и этого элемента нет в DOM
     */

  }, {
    key: "showCallback",
    value: function showCallback(changeListener) {
      if (this.type === 'childList' && this.addedNodes.length > 0) {
        var el = document.querySelector(changeListener.selector);

        if (this.addedNodes[0].isSameNode(el)) {
          changeListener.sendMessage();
          return changeListener.disconnectListener();
        }
      }

      return false;
    }
  }, {
    key: "hideCallback",
    value: function hideCallback(changeListener) {
      if (this.type === 'childList' && this.removedNodes.length > 0) {
        var node = this.removedNodes[0];

        if (node.nodeType === 1 && node.matches(changeListener.selector)) {
          changeListener.sendMessage();
          return changeListener.disconnectListener();
        }
      }

      return false;
    }
  }, {
    key: "classChangeCallback",
    value: function classChangeCallback(changeListener) {
      if (this.type === 'attributes' && this.attributeName === 'class') {
        changeListener.sendMessage();
        return changeListener.disconnectListener();
      }

      return false;
    }
  }, {
    key: "attributeChangeCallback",
    value: function attributeChangeCallback(changeListener) {
      if (this.type === 'attributes' && this.attributeName === changeListener.attributeName) {
        changeListener.sendMessage();
        return changeListener.disconnectListener();
      }

      return false;
    }
  }, {
    key: "characterDataChangeCallback",
    value: function characterDataChangeCallback(changeListener) {
      if (this.type === 'characterData' || this.type === 'childList') {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
  }, {
    key: "childrenChangeCallback",
    value: function childrenChangeCallback(changeListener) {
      if (this.type === 'childList') {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
  }, {
    key: "tourJs",
    get: function get() {
      return this.__tourObject;
    },
    set: function set(val) {
      this.__tourObject = val;
    }
  }]);

  return ChangesListener;
}();

var _default = ChangesListener;
exports.default = _default;

/***/ }),

/***/ "./src/ConditionEventsListeners.js":
/*!*****************************************!*\
  !*** ./src/ConditionEventsListeners.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsCookie = _interopRequireDefault(__webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pathKey = 'gw_last_path';

var ConditionEventsListeners =
/*#__PURE__*/
function () {
  function ConditionEventsListeners(conditions) {
    var _this = this;

    _classCallCheck(this, ConditionEventsListeners);

    this.interval = null;
    this.autoConditions = {};
    this.manualConditions = {};
    this.metrics = {
      siteEnterTime: new Date(),
      pageEnterTime: new Date()
    };
    this.active = null;
    Object.keys(conditions).forEach(function (key) {
      var cond = conditions[key];

      if (cond.onClick) {
        _this.manualConditions[key] = cond;
      } else {
        _this.autoConditions[key] = cond;
      }
    });
  }

  _createClass(ConditionEventsListeners, [{
    key: "watchForMatch",
    value: function watchForMatch() {
      var _this2 = this;

      this.interval = setInterval(function () {
        _this2.start();
      }, 1000);
      this.clickCallback = this.clickListener.bind(this);
      document.addEventListener('click', this.clickCallback);
    }
  }, {
    key: "testForPathname",
    value: function testForPathname(cond) {
      var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var regex = new RegExp(cond.page_url.value, 'i');
      var pathname = path === null ? window.location.pathname : path;
      return regex.test(pathname);
    }
    /**
     * Фильтрует условия по URL адресу
     * @param {Object} conds Список условии
     * @param {boolean} asArray
     */

  }, {
    key: "filterByPath",
    value: function filterByPath(conds) {
      var _this3 = this;

      var asArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var filtered = {};
      var uuidsArr = Object.keys(conds).filter(function (uuid) {
        var cond = conds[uuid];
        var path = window.location.pathname;
        return cond.page_url == null || _this3.testForPathname(cond, path);
      });

      if (asArray) {
        return uuidsArr;
      }

      uuidsArr.forEach(function (uuid) {
        filtered[uuid] = conds[uuid];
      });
      return filtered;
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;

      var matches = 0;
      this.filterByPath(this.autoConditions, true).forEach(function (uuid) {
        var path = window.location.pathname;

        var prevPath = _jsCookie.default.get(pathKey);

        var cond = _this4.autoConditions[uuid];

        if (prevPath !== path && _this4.matchDate(cond)) {
          window.getTourEventBus.dispatchEvent('ConditionMatched', {
            uuid: uuid
          });
          _this4.active = uuid;

          _jsCookie.default.set(pathKey, path);

          return;
        }
      });

      if (matches === 0 && this.active != null) {
        var regex = new RegExp(this.autoConditions[this.active].page_url.value, 'i');

        if (!regex.test(window.location.pathname)) {
          this.active = null;
        }
      }
    }
    /**
     * Проверяет action.condition на условие по времени
     * @param {Date} d - время в формате Date
     * @param {Object} cond - объект condition.{time_on_page|time_on_site|etc}
     */

  }, {
    key: "isMatchDateCondition",
    value: function isMatchDateCondition(d, cond) {
      var date = d.getTime() / 1000;
      var now = new Date().getTime() / 1000;
      var value = parseInt(cond.value, 10);

      switch (cond.operator) {
        case '<':
          return now < date + value;

        case '>':
          return now > date + value;

        default:
          return false;
      }
    }
    /**
     * Проверят проходит ли condition по условиям времени
     * @param {Object} cond - объект condition
     */

  }, {
    key: "matchDate",
    value: function matchDate(cond) {
      var condResults = [];
      condResults[0] = cond.time_on_page == null || this.isMatchDateCondition(this.metrics.siteEnterTime, cond.time_on_page);
      condResults[1] = cond.time_on_site == null || this.isMatchDateCondition(this.metrics.pageEnterTime, cond.time_on_site);
      return condResults.every(function (val) {
        return val === true;
      });
    }
    /**
     * Listener который слушает клики. Если нажатый элемент соответсвтует хоть одной
     * выборке из списка manualConditions-ов,
     * то выстреливаем событие ConditionMatched EventBus-а
     * @param {Event} jsEvent - JavaScript событие клика
     */

  }, {
    key: "clickListener",
    value: function clickListener(jsEvent) {
      var _this5 = this;

      Object.keys(this.manualConditions).forEach(function (uuid) {
        var cond = _this5.manualConditions[uuid];

        if (_this5.testForPathname(cond) && jsEvent.target.matches(cond.click_on_element.value)) {
          if (_this5.matchDate(cond)) {
            window.getTourEventBus.dispatchEvent('ConditionMatched', {
              uuid: uuid
            });
          }
        }
      });
    }
  }]);

  return ConditionEventsListeners;
}();

var _default = ConditionEventsListeners;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/EventBus.js":
/*!*************************!*\
  !*** ./src/EventBus.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventBus =
/*#__PURE__*/
function () {
  /**
   * Initialize a new event bus instance.
   */
  function EventBus() {
    _classCallCheck(this, EventBus);

    this.bus = document.createElement('fakeelement');
  }
  /**
   * Add an event listener.
   */


  _createClass(EventBus, [{
    key: "addEventListener",
    value: function addEventListener(event, callback) {
      this.bus.addEventListener(event, callback);
    }
    /**
     * Remove an event listener.
     */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(event, callback) {
      this.bus.removeEventListener(event, callback);
    }
    /**
     * Dispatch an event.
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.bus.dispatchEvent(new CustomEvent(event, {
        detail: detail
      }));
    }
  }]);

  return EventBus;
}();

exports.default = EventBus;
module.exports = exports["default"];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsCookie = _interopRequireDefault(__webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js"));

var _introChat = _interopRequireDefault(__webpack_require__(/*! ./intro-chat */ "./src/intro-chat.js"));

var _ChangesListener = _interopRequireDefault(__webpack_require__(/*! ./ChangesListener */ "./src/ChangesListener.js"));

var _ConditionEventsListeners = _interopRequireDefault(__webpack_require__(/*! ./ConditionEventsListeners */ "./src/ConditionEventsListeners.js"));

var _EventBus = _interopRequireDefault(__webpack_require__(/*! ./EventBus */ "./src/EventBus.js"));

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var widgetTemplateLoader = __webpack_require__(/*! ./templates/widget.mst */ "./src/templates/widget.mst");

window.getTourEventBus = new _EventBus.default();
/**
 * Warning. options - это свойсто объекта
 * @param {object} param0
 */

function setOptions(_ref) {
  var options = _ref.options;

  if (_typeof(options) === 'object') {
    this.__intro.setOptions(options);
  } else {
    this.__intro.setOptions(this.config);
  }
}

function isAnyPartOfElementInViewport(el) {
  var scroll = window.scrollY || window.pageYOffset;
  var boundsTop = el.getBoundingClientRect().top + scroll;
  var viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  var bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight
  };
  return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
}

function isMessageFromWidget(event) {
  // IMPORTANT: Check the origin of the data!
  if (event.origin.indexOf('https://getchat.me') || event.origin.indexOf('http://localhost:3000')) {
    // The data has been sent from your site
    // The data sent with postMessage is stored in event.data
    if (_typeof(event.data) !== 'object' || event.data.source !== 'getchat-widget') {
      return false;
    }

    return true;
  }

  return false;
}

var onboarding = {
  // stylesFilePath: 'https://cdn.jsdelivr.net/npm/gettour/dist/css/styles.css',
  stylesFilePath: '/css/gettour.min.css',
  selector: '.getchat-widget__frame',
  expandClass: 'getchat-widget--expanded',
  expandCookieKey: 'gw-state',
  active: {
    status: false,
    condition: {
      get: function get() {
        return this.ConditionEventsListeners.active;
      },
      set: function set(val) {
        this.ConditionEventsListeners.active = val;
      }
    }
  },
  __intro: null,
  widgetHash: null,
  autoShowConditions: [],
  hash: null,
  domain: null,
  block: null,
  setOptions: setOptions,
  stylesLoaded: false,
  triggeredCount: 0,
  __observers: {},
  options: {
    env: 'production'
  },
  ConditionEventsListeners: null,

  /**
   *
   * @param {string} hash
   * @param {object} options
   */
  init: function init(hash) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var self = this;
    this.hash = hash;
    this.options = Object.assign(this.options, options);
    this.loadWidgetData().then(function (data) {
      _this.domain = data.domain;
      _this.active.status = data.widget_active;
      _this.autoShowConditions = data.conditions;
      _this.options = data.widget_options;

      if (_this.domain !== window.location.host) {
        (0, _utils.showError)('[Ошибка] Виджет не для этого домена');
        return;
      }

      if (!_this.active.status) {
        return;
      }

      _this.__intro = (0, _introChat.default)();
      _this.ConditionEventsListeners = new _ConditionEventsListeners.default(_this.autoShowConditions);

      _this.ConditionEventsListeners.watchForMatch();

      _this.__intro.onchange(function () {
        self.__intro.refresh();

        return _this;
      });

      _this.__intro.onbeforechange(function () {
        if (_this.__intro._introItems.length) {
          var step = _this.__intro._introItems[0];
          self.setOptions(step);
        } //


        var closeBtn = document.querySelector('.getchat-widget > .getchat-widget__btn--icon');

        if (closeBtn) {
          closeBtn.style.display = 'none';
        }
      });

      _this.__intro.onexit(function () {
        var closeBtn = document.querySelector('.getchat-widget > .getchat-widget__btn--icon');

        if (closeBtn) {
          closeBtn.style.display = 'inline-flex';
        }
      }); // Слушать события выделения


      window.addEventListener('message', function (event) {
        _this.__listenForHighlightRequests.call(_this, event);
      }); // Слушать события кнопок чата

      window.addEventListener('message', function (event) {
        _this.__listenForActionClickedRequests.call(_this, event);
      }); // Слушать события для Observer-а

      window.addEventListener('message', function (event) {
        _this.__listenForObserveRequests.call(_this, event);
      }); // bla

      window.getTourEventBus.addEventListener('ConditionMatched', function (e) {
        if (e != null && _this.autoShowConditions[e.detail.uuid].onClick && _this.active.condition === e.detail.uuid && _this.active.condition) {
          // Если нажали на элемент вызывающий данный виджет, но виджет уже подгружен
          if (_this.block.classList.contains(_this.expandClass)) {
            _this.hideBlock();
          } else {
            _this.expandBlock();
          }
        } else {
          _this.loadCondition(e);
        }
      }); // Если не подходит под условия

      window.getTourEventBus.addEventListener('NoMatchedConditions', function (e) {
        _this.reset();
      }); // Слущать изменение URL

      _this.listenForLocationChange();
    });
    return this;
  },

  /**
   * Подгрузка виджета если попадает под одну из условии
   */
  loadCondition: function loadCondition(event) {
    if (event != null) {
      this.active.condition = event.detail.uuid;
    } else {
      this.active.condition = null;
    }

    if (this.active.condition) {
      var oldVal = _jsCookie.default.get(this.expandCookieKey);

      var asExpanded = oldVal === 'true';
      this.renderWidget(this.autoShowConditions[this.active.condition].link, asExpanded);

      if (!this.stylesLoaded) {
        this.loadStyles();
      }

      this.initSystemEventListeners();

      if (this.triggeredCount === 0 && this.options.launchAsExpanded) {
        this.expandBlock();
      }

      this.triggeredCount += 1;
    }
  },
  listenForLocationChange: function listenForLocationChange() {
    var _this2 = this;

    /* This modifies these three functions so that all fire
    a custom locationchange event for you to use,
    and also pushstate and replacestate events if you want to use those:
    From: https://stackoverflow.com/a/52809105/3939853 */
    var evt = 'locationchange';

    history.pushState = function (f) {
      return function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushState'));
        window.dispatchEvent(new Event(evt));
        return ret;
      };
    }(history.pushState);

    history.replaceState = function (f) {
      return function replaceState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replaceState'));
        window.dispatchEvent(new Event(evt));
        return ret;
      };
    }(history.replaceState);

    window.addEventListener('popstate', function () {
      window.dispatchEvent(new Event(evt));
    });
    /**
     * Слушать изменение URL. watchForMatch запускает по условию loadCondition
     */

    window.addEventListener('locationchange', function () {
      _this2.reset();

      if (_this2.autoShowConditions.length) {
        _this2.ConditionEventsListeners.watchForMatch();
      }
    });
  },

  /**
   * Если приходят такие экшны, то убирать highlight
   * @param {object} e
   */
  __listenForActionClickedRequests: function __listenForActionClickedRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'ACTION_CLICKED') {
      var answer_id = e.data.answer_id;

      if (answer_id === this.__intro._options.steps[0].highlightEventAnswerId) {
        this.__intro.exit();
      }
    }
  },

  /**
   * Запустить прослушнивание событии которые выстреливают listener_id
   * @param {Object} e
   */
  __listenForObserveRequests: function __listenForObserveRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'OBSERVE') {
      var listener = new _ChangesListener.default(e.data);
      listener.tourJs = this;
      listener.init();
    }
  },

  /**
   * Запустить прослушивание закрытия выделения элемента
   * @param {Object} e
   */
  __listenForHighlightRequests: function __listenForHighlightRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'HIGHLIGHT') {
      if (e.data.selector) {
        this.highlight(e.data);
      }
    }
  },
  __getElementForHighlight: function __getElementForHighlight(selector) {
    var elements = document.querySelectorAll(selector);
    var elementsArray = Array.from(elements);
    return elementsArray.find(isAnyPartOfElementInViewport);
  },
  highlight: function highlight(_ref2) {
    var _this3 = this;

    var selector = _ref2.selector,
        closeEvent = _ref2.closeEvent,
        highlightEventAnswerId = _ref2.highlightEventAnswerId;
    var step = {
      element: selector,
      fixed: true,
      closeEvent: closeEvent,
      highlightEventAnswerId: highlightEventAnswerId
    };

    var introElement = this.__getElementForHighlight(selector);

    if (introElement == null) {
      (0, _utils.showError)("Element doesn't exist on DOM");
      return;
    }

    if (closeEvent === 'chatListenerClick') {
      this.setOptions({
        options: {
          exitOnEsc: false,
          exitOnOverlayClick: false,
          disableInteraction: true
        }
      });
    } else {
      this.setOptions({
        options: {
          exitOnEsc: true,
          exitOnOverlayClick: false,
          disableInteraction: false
        }
      });
    }

    this.__intro.addStep(step); // Listen to event


    introElement.addEventListener(closeEvent, function () {
      _this3.__intro.exit();
    }, {
      once: true
    }); // Close

    if (this.__intro._introItems.length) {
      this.__intro.goToStepNumber(0);
    }

    this.__intro.exit();

    setTimeout(function () {
      _this3.__intro.start(step);
    }, 50);
  },
  sendMessage: function sendMessage(msg) {
    var msgType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'trigger';
    var exit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (exit) {
      this.__intro.exit();
    }

    var iframe = document.querySelector(this.selector);

    if (!iframe) {
      (0, _utils.showError)("Widget's iframe not found!");
      return;
    }

    iframe.contentWindow.postMessage(Object.assign(msg, {
      source: 'get-tour-library',
      msgType: msgType
    }));
  },
  reset: function reset() {
    this.__intro._options.steps = [];

    this.__intro.refresh(); // this.triggeredCount = 0;


    this.destroyWidget();
  },
  destroyWidget: function destroyWidget() {
    if (this.block) {
      this.block.remove();
    }
  },

  /**
   *
   * @param {string} widgetUrl
   * @param {boolean} asExpanded
   * @returns {void}
   */
  renderWidget: function renderWidget(widgetUrl, asExpanded) {
    this.block = document.createElement('div');
    this.block.className = 'getchat-widget';

    if (asExpanded) {
      this.block.classList.add(this.expandClass);
    }

    var vars = {
      widgetUrl: widgetUrl,
      asExpanded: asExpanded
    };
    var widgetHtml = widgetTemplateLoader(vars);
    this.block.innerHTML = widgetHtml;
    document.body.appendChild(this.block);

    (function () {
      new Image().src = widgetUrl;
    })();
  },
  loadStyles: function loadStyles() {
    (0, _utils.loadCss)(this.stylesFilePath);
    this.stylesLoaded = true;
  },

  /**
   * Подписывается на системные события виджета такие как открыти/закрытие по нажатию на иконку
   */
  initSystemEventListeners: function initSystemEventListeners() {
    var _this4 = this;

    var widget = document.querySelector('.getchat-widget');
    var $menuBtn = document.querySelector('.getchat-widget__btn--action-menu');
    var $closeBtn = document.querySelector('.getchat-widget__btn--action-close');
    var $launcher = document.querySelector('.getchat-widget__launcher');
    $closeBtn.addEventListener('click', function () {
      if (widget.classList.contains(_this4.expandClass)) {
        _this4.hideBlock();
      }
    });
    $menuBtn.addEventListener('click', function () {
      _this4.showAvailableBots();
    });
    $launcher.addEventListener('click', function () {
      if (!widget.classList.contains(_this4.expandClass)) {
        _this4.expandBlock();
      }
    });
    window.addEventListener('beforeunload', function () {
      clearInterval(_this4.ConditionEventsListeners.interval);

      _jsCookie.default.remove('gw_last_path');
    });
  },
  hideBlock: function hideBlock() {
    this.block.classList.remove(this.expandClass);

    _jsCookie.default.set(this.expandCookieKey, false, {
      expires: 2147483647
    });
  },
  expandBlock: function expandBlock() {
    this.block.classList.add(this.expandClass);

    _jsCookie.default.set(this.expandCookieKey, true, {
      expires: 2147483647
    });
  },
  showAvailableBots: function showAvailableBots() {
    var _this5 = this;

    var answers = this.ConditionEventsListeners.filterByPath(this.autoShowConditions, true).map(function (uuid) {
      var minimum = 9000000000000000;
      var maximum = 9007199254740991;
      var answer_id = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
      var _this5$autoShowCondit = _this5.autoShowConditions[uuid],
          bot_id = _this5$autoShowCondit.bot_id,
          name = _this5$autoShowCondit.name;
      return {
        answer: {
          answer_id: answer_id,
          bot_id: bot_id,
          listener_id: undefined,
          text: name,
          type: 'botLoader'
        },
        type: 'actionAnswer'
      };
    });
    console.log(answers);
    this.sendMessage({
      answers: answers
    }, 'botSelector', false);
  },
  loadWidgetData: function loadWidgetData() {
    if (!this.hash) {
      var err = '[Ошибка] hash отсутствует';
      throw err;
    }

    var host = 'https://getchat.me';
    var url = "".concat(host, "/api/the-bot/widget/").concat(this.hash, "/data");

    if (this.options.env === 'development') {
      url = url.replace(host, 'http://localhost:3000');
    }

    return new Promise(function (resolve, reject) {
      var init = {
        method: 'GET',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        dataType: 'jsonp'
      };
      return fetch(url, init).then(function (res) {
        if (res.status === 200) {
          return res.json();
        }

        (0, _utils.showError)("[\u041E\u0448\u0438\u0431\u043A\u0430] ".concat(res.statusText));
        return {};
      }).then(function (response) {
        return resolve(response);
      }).catch(function (error) {
        (0, _utils.showError)(error);
        reject(error);
      });
    });
  }
};
var _default = onboarding;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/intro-chat.js":
/*!***************************!*\
  !*** ./src/intro-chat.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */

/**
 * Intro.js v2.9.3  fork. only highlight element
 * https://github.com/usablica/intro.js
 *
 * Copyright (C) 2017 Afshin Mehrabani (@afshinmeh)
 */
(function (f) {
  if (( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    module.exports = f(); // deprecated function
    // @since 2.8.0

    module.exports.introJs = function () {
      console.warn('Deprecated: please use require("intro.js") directly, instead of the introJs method of the function'); // introJs()

      return f().apply(this, arguments);
    };
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var g; }
})(function () {
  //Default config/variables
  var VERSION = '2.9.3';
  /**
   * IntroJs main class
   *
   * @class IntroJs
   */

  function IntroJs(obj) {
    this._targetElement = obj;
    this._introItems = [];
    this._options = {
      /* CSS class that is added to the helperLayer */
      highlightClass: '',

      /* Close introduction when pressing Escape button? */
      exitOnEsc: true,

      /* Close introduction when clicking on overlay layer? */
      exitOnOverlayClick: true,

      /* Let user use keyboard to navigate the tour? */
      keyboardNavigation: false,

      /* Scroll to highlighted element? */
      scrollToElement: true,

      /*
       * Should we scroll the tooltip or target element?
       *
       * Options are: 'element' or 'tooltip'
       */
      scrollTo: 'element',

      /* Padding to add after scrolling when element is not in the viewport (in pixels) */
      scrollPadding: 30,

      /* Set the overlay opacity */
      overlayOpacity: 0.9,

      /* Precedence of positions, when auto is enabled */
      positionPrecedence: ['bottom', 'top', 'right', 'left'],

      /* Disable an interaction with element? */
      disableInteraction: false,

      /* Set how much padding to be used around helper element */
      helperElementPadding: 0,

      /* additional classes to put on the buttons */
      buttonClass: 'introjs-button'
    };
  }
  /**
   * Initiate a new introduction/guide from an element in the page
   *
   * @api private
   * @method _introForElement
   * @param {Object} targetElm
   * @param {String} group
   * @returns {Boolean} Success or not?
   */


  function _introForElement(targetElm, step) {
    var introItems = [];

    var currentItem = _cloneObject(step); //set the step


    currentItem.step = introItems.length + 1; //use querySelector function only when developer used CSS selector

    if (typeof currentItem.element === 'string') {
      //grab the element with given selector from the page
      currentItem.element = document.querySelector(currentItem.element);
    } //intro without element


    if (typeof currentItem.element === 'undefined' || currentItem.element === null) {
      var floatingElementQuery = document.querySelector('.introjsFloatingElement');

      if (floatingElementQuery === null) {
        floatingElementQuery = document.createElement('div');
        floatingElementQuery.className = 'introjsFloatingElement';
        document.body.appendChild(floatingElementQuery);
      }

      currentItem.element = floatingElementQuery;
      currentItem.position = 'floating';
    }

    currentItem.scrollTo = currentItem.scrollTo || this._options.scrollTo;

    if (typeof currentItem.disableInteraction === 'undefined') {
      currentItem.disableInteraction = this._options.disableInteraction;
    }

    if (currentItem.element !== null) {
      introItems = [currentItem];
    } //set it to the introJs object


    this._introItems = introItems; //add overlay layer to the page

    if (_addOverlayLayer.call(this, targetElm)) {
      //then, start the show
      _nextStep.call(this);

      if (this._options.keyboardNavigation) {
        DOMEvent.on(window, 'keydown', _onKeyDown, this, true);
      } //for window resize


      DOMEvent.on(window, 'resize', _onResize, this, true);
    }

    return false;
  }

  function _onResize() {
    this.refresh.call(this);
  }
  /**
   * on keyCode:
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   * This feature has been removed from the Web standards.
   * Though some browsers may still support it, it is in
   * the process of being dropped.
   * Instead, you should use KeyboardEvent.code,
   * if it's implemented.
   *
   * jQuery's approach is to test for
   *   (1) e.which, then
   *   (2) e.charCode, then
   *   (3) e.keyCode
   * https://github.com/jquery/jquery/blob/a6b0705294d336ae2f63f7276de0da1195495363/src/event.js#L638
   *
   * @param type var
   * @return type
   */


  function _onKeyDown(e) {
    var code = e.code === null ? e.which : e.code; // if code/e.which is null

    if (code === null) {
      code = e.charCode === null ? e.keyCode : e.charCode;
    }

    if ((code === 'Escape' || code === 27) && this._options.exitOnEsc === true) {
      //escape key pressed, exit the intro
      //check if exit callback is defined
      _exitIntro.call(this, this._targetElement);
    }
  }
  /*
   * makes a copy of the object
   * @api private
   * @method _cloneObject
   */


  function _cloneObject(object) {
    if (object === null || _typeof(object) !== 'object' || typeof object.nodeType !== 'undefined') {
      return object;
    }

    var temp = {};

    for (var key in object) {
      if (typeof window.jQuery !== 'undefined' && object[key] instanceof window.jQuery) {
        temp[key] = object[key];
      } else {
        temp[key] = _cloneObject(object[key]);
      }
    }

    return temp;
  }
  /**
   * Go to specific step of introduction
   *
   * @api private
   * @method _goToStep
   */


  function _goToStep(step) {
    //because steps starts with zero
    this._currentStep = step - 2;

    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }
  /**
   * Go to the specific step of introduction with the explicit [data-step] number
   *
   * @api private
   * @method _goToStepNumber
   */


  function _goToStepNumber(step) {
    this._currentStepNumber = step;

    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }
  /**
   * Go to next step on intro
   *
   * @api private
   * @method _nextStep
   */


  function _nextStep() {
    this._direction = 'forward';

    if (typeof this._currentStepNumber !== 'undefined') {
      _forEach(this._introItems, function (item, i) {
        if (item.step === this._currentStepNumber) {
          this._currentStep = i - 1;
          this._currentStepNumber = undefined;
        }
      }.bind(this));
    }

    if (typeof this._currentStep === 'undefined') {
      this._currentStep = 0;
    } else {
      ++this._currentStep;
    } // comment остыль var nextStep = this._introItems[this._currentStep];


    var nextStep = this._introItems[0];
    var continueStep = true;

    if (typeof this._introBeforeChangeCallback !== 'undefined') {
      continueStep = this._introBeforeChangeCallback.call(this, nextStep.element);
    } // if `onbeforechange` returned `false`, stop displaying the element


    if (continueStep === false) {
      --this._currentStep;
      return false;
    }

    if (this._introItems.length <= this._currentStep) {
      //end of the intro
      //check if any callback is defined
      if (typeof this._introCompleteCallback === 'function') {
        this._introCompleteCallback.call(this);
      }

      _exitIntro.call(this, this._targetElement);

      return;
    }

    _showElement.call(this, nextStep);
  }
  /**
   * Update placement of the intro objects on the screen
   * @api private
   */


  function _refresh() {
    // re-align intros
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-helperLayer'));

    _setHelperLayerPosition.call(this, document.querySelector('.introjs-tooltipReferenceLayer'));

    _setHelperLayerPosition.call(this, document.querySelector('.introjs-disableInteraction'));

    return this;
  }
  /**
   * Exit from intro
   *
   * @api private
   * @method _exitIntro
   * @param {Object} targetElement
   * @param {Boolean} force - Setting to `true` will skip the result of beforeExit callback
   */


  function _exitIntro(targetElement, force) {
    var continueExit = true; // calling onbeforeexit callback
    //
    // If this callback return `false`, it would halt the process

    if (this._introBeforeExitCallback !== undefined) {
      continueExit = this._introBeforeExitCallback.call(this);
    } // skip this check if `force` parameter is `true`
    // otherwise, if `onbeforeexit` returned `false`, don't exit the intro


    if (!force && continueExit === false) return; //remove overlay layers from the page

    var overlayLayers = targetElement.querySelectorAll('.introjs-overlay');

    if (overlayLayers && overlayLayers.length) {
      _forEach(overlayLayers, function (overlayLayer) {
        overlayLayer.style.opacity = 0;
        window.setTimeout(function () {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        }.bind(overlayLayer), 500);
      }.bind(this));
    } //remove all helper layers


    var helperLayer = targetElement.querySelector('.introjs-helperLayer');

    if (helperLayer) {
      helperLayer.parentNode.removeChild(helperLayer);
    }

    var referenceLayer = targetElement.querySelector('.introjs-tooltipReferenceLayer');

    if (referenceLayer) {
      referenceLayer.parentNode.removeChild(referenceLayer);
    } //remove disableInteractionLayer


    var disableInteractionLayer = targetElement.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    } //remove intro floating element


    var floatingElement = document.querySelector('.introjsFloatingElement');

    if (floatingElement) {
      floatingElement.parentNode.removeChild(floatingElement);
    }

    _removeShowElement(); //remove `introjs-fixParent` class from the elements


    var fixParents = document.querySelectorAll('.introjs-fixParent');

    _forEach(fixParents, function (parent) {
      _removeClass(parent, /introjs-fixParent/g);
    }); //clean listeners


    DOMEvent.off(window, 'keydown', _onKeyDown, this, true);
    DOMEvent.off(window, 'resize', _onResize, this, true); //check if any callback is defined

    if (this._introExitCallback !== undefined) {
      this._introExitCallback.call(this);
    } //set the step to zero


    this._currentStep = undefined;
  }
  /**
   * Set tooltip left so it doesn't go off the right side of the window
   *
   * @return boolean true, if tooltipLayerStyleLeft is ok.  false, otherwise.
   */


  function _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
    if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
      // off the right side of the window
      tooltipLayer.style.left = windowSize.width - tooltipOffset.width - targetOffset.left + 'px';
      return false;
    }

    tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
    return true;
  }
  /**
   * Set tooltip right so it doesn't go off the left side of the window
   *
   * @return boolean true, if tooltipLayerStyleRight is ok.  false, otherwise.
   */


  function _checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
    if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
      // off the left side of the window
      tooltipLayer.style.left = -targetOffset.left + 'px';
      return false;
    }

    tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
    return true;
  }
  /**
   * Determines the position of the tooltip based on the position precedence and availability
   * of screen space.
   *
   * @param {Object}    targetElement
   * @param {Object}    tooltipLayer
   * @param {String}    desiredTooltipPosition
   * @return {String}   calculatedPosition
   */


  function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {
    // Take a clone of position precedence. These will be the available
    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = _getWinSize();

    var tooltipHeight = _getOffset(tooltipLayer).height + 10;
    var tooltipWidth = _getOffset(tooltipLayer).width + 20;
    var targetElementRect = targetElement.getBoundingClientRect(); // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.

    var calculatedPosition = 'floating';
    /*
     * auto determine position
     */
    // Check for space below

    if (targetElementRect.bottom + tooltipHeight + tooltipHeight > windowSize.height) {
      _removeEntry(possiblePositions, 'bottom');
    } // Check for space above


    if (targetElementRect.top - tooltipHeight < 0) {
      _removeEntry(possiblePositions, 'top');
    } // Check for space to the right


    if (targetElementRect.right + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, 'right');
    } // Check for space to the left


    if (targetElementRect.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, 'left');
    } // @var {String}  ex: 'right-aligned'


    var desiredAlignment = function (pos) {
      var hyphenIndex = pos.indexOf('-');

      if (hyphenIndex !== -1) {
        // has alignment
        return pos.substr(hyphenIndex);
      }

      return '';
    }(desiredTooltipPosition || ''); // strip alignment from position


    if (desiredTooltipPosition) {
      // ex: "bottom-right-aligned"
      // should return 'bottom'
      desiredTooltipPosition = desiredTooltipPosition.split('-')[0];
    }

    if (possiblePositions.length) {
      if (desiredTooltipPosition !== 'auto' && possiblePositions.indexOf(desiredTooltipPosition) > -1) {
        // If the requested position is in the list, choose that
        calculatedPosition = desiredTooltipPosition;
      } else {
        // Pick the first valid position, in order
        calculatedPosition = possiblePositions[0];
      }
    } // only top and bottom positions have optional alignments


    if (['top', 'bottom'].indexOf(calculatedPosition) !== -1) {
      calculatedPosition += _determineAutoAlignment(targetElementRect.left, tooltipWidth, windowSize, desiredAlignment);
    }

    return calculatedPosition;
  }
  /**
   * auto-determine alignment
   * @param {Integer}  offsetLeft
   * @param {Integer}  tooltipWidth
   * @param {Object}   windowSize
   * @param {String}   desiredAlignment
   * @return {String}  calculatedAlignment
   */


  function _determineAutoAlignment(offsetLeft, tooltipWidth, windowSize, desiredAlignment) {
    var halfTooltipWidth = tooltipWidth / 2,
        winWidth = Math.min(windowSize.width, window.screen.width),
        possibleAlignments = ['-left-aligned', '-middle-aligned', '-right-aligned'],
        calculatedAlignment = ''; // valid left must be at least a tooltipWidth
    // away from right side

    if (winWidth - offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, '-left-aligned');
    } // valid middle must be at least half
    // width away from both sides


    if (offsetLeft < halfTooltipWidth || winWidth - offsetLeft < halfTooltipWidth) {
      _removeEntry(possibleAlignments, '-middle-aligned');
    } // valid right must be at least a tooltipWidth
    // width away from left side


    if (offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, '-right-aligned');
    }

    if (possibleAlignments.length) {
      if (possibleAlignments.indexOf(desiredAlignment) !== -1) {
        // the desired alignment is valid
        calculatedAlignment = desiredAlignment;
      } else {
        // pick the first valid position, in order
        calculatedAlignment = possibleAlignments[0];
      }
    } else {
      // if screen width is too small
      // for ANY alignment, middle is
      // probably the best for visibility
      calculatedAlignment = '-middle-aligned';
    }

    return calculatedAlignment;
  }
  /**
   * Remove an entry from a string array if it's there, does nothing if it isn't there.
   *
   * @param {Array} stringArray
   * @param {String} stringToRemove
   */


  function _removeEntry(stringArray, stringToRemove) {
    if (stringArray.indexOf(stringToRemove) > -1) {
      stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
  }
  /**
   * Update the position of the helper layer on the screen
   *
   * @api private
   * @method _setHelperLayerPosition
   * @param {Object} helperLayer
   */


  function _setHelperLayerPosition(helperLayer) {
    var _this = this;

    if (helperLayer) {
      //prevent error when `this._currentStep` in undefined
      if (!this._introItems[this._currentStep]) return;

      var currentElement = this._introItems[this._currentStep],
          elementPosition = _getOffset(currentElement.element),
          widthHeightPadding = this._options.helperElementPadding; // If the target element is fixed, the tooltip should be fixed as well.
      // Otherwise, remove a fixed class that may be left over from the previous
      // step.


      if (_isFixed(currentElement.element)) {
        _addClass(helperLayer, 'introjs-fixedTooltip');
      } else {
        _removeClass(helperLayer, 'introjs-fixedTooltip');
      }

      if (currentElement.position === 'floating') {
        widthHeightPadding = 0;
      } //set new position to helper layer


      helperLayer.style.cssText = 'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' + 'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' + 'top:' + (elementPosition.top - widthHeightPadding / 2) + 'px;' + 'left: ' + (elementPosition.left - widthHeightPadding / 2) + 'px;';
      window.setTimeout(function () {
        _setClipPathOfHelper.call(_this, helperLayer);
      }, 35);
    }
  }
  /**
   * Add disableinteraction layer and adjust the size and position of the layer
   *
   * @api private
   * @method _disableInteraction
   */


  function _disableInteraction() {
    var disableInteractionLayer = document.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer === null) {
      disableInteractionLayer = document.createElement('div');
      disableInteractionLayer.className = 'introjs-disableInteraction';

      this._targetElement.appendChild(disableInteractionLayer);
    }

    _setHelperLayerPosition.call(this, disableInteractionLayer);
  }
  /**
   * Setting anchors to behave like buttons
   *
   * @api private
   * @method _setAnchorAsButton
   */


  function _setAnchorAsButton(anchor) {
    anchor.setAttribute('role', 'button');
    anchor.tabIndex = 0;
  }
  /**
   * @api private
   * @method _getDimensions
   */


  function _getDimensions(helper) {
    return {
      width: helper.offsetWidth,
      height: helper.offsetHeight,
      left: helper.offsetLeft,
      top: helper.offsetTop
    };
  }
  /**
   * @api private
   * @method _setClipPathOfHelper
   */


  function _setClipPathOfHelper(helperLayer) {
    // костыль const step = this._introItems[this._currentStep];
    var step = this._introItems[0];
    var overlay = document.querySelector('.introjs-overlay');

    if (step.fixed) {
      var _getDimensions$call = _getDimensions.call(this, helperLayer),
          width = _getDimensions$call.width,
          height = _getDimensions$call.height,
          left = _getDimensions$call.left,
          top = _getDimensions$call.top;

      var coords = [{
        x: '0%',
        y: '0%'
      }, {
        x: '0%',
        y: '100%'
      }, {
        x: left + 'px',
        y: '100%'
      }, {
        x: left + 'px',
        y: top + 'px'
      }, {
        x: left + width + 'px',
        y: top + 'px'
      }, {
        x: left + width + 'px',
        y: top + height + 'px'
      }, {
        x: left + 'px',
        y: top + height + 'px'
      }, {
        x: left + 'px',
        y: '100%'
      }, {
        x: '100%',
        y: '100%'
      }, {
        x: '100%',
        y: '0%'
      }];

      if (overlay) {
        overlay.style.clipPath = "polygon(".concat(coords.map(function (_ref) {
          var x = _ref.x,
              y = _ref.y;
          return x + ' ' + y;
        }).join(', '), ")");
      }

      helperLayer.style.visibility = 'hidden';
    } else {
      overlay.style.clipPath = '';
      helperLayer.style.visibility = 'visible';
    }
  }
  /**
   * Show an element on the page
   *
   * @api private
   * @method _showElement
   * @param {Object} targetElement
   */


  function _showElement(targetElement) {
    if (typeof this._introChangeCallback !== 'undefined') {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this,
        oldHelperLayer = document.querySelector('.introjs-helperLayer'),
        oldReferenceLayer = document.querySelector('.introjs-tooltipReferenceLayer'),
        highlightClass = 'introjs-helperLayer',
        scrollParent; //check for a current step highlight class

    if (typeof targetElement.highlightClass === 'string') {
      highlightClass += ' ' + targetElement.highlightClass;
    } //check for options highlight class


    if (typeof this._options.highlightClass === 'string') {
      highlightClass += ' ' + this._options.highlightClass;
    }

    if (oldHelperLayer !== null) {
      // scroll to element
      scrollParent = _getScrollParent(targetElement.element);

      if (scrollParent !== document.body) {
        // target is within a scrollable element
        _scrollParentToElement(scrollParent, targetElement.element);
      } // set new position to helper layer


      _setHelperLayerPosition.call(self, oldHelperLayer);

      _setHelperLayerPosition.call(self, oldReferenceLayer); //remove `introjs-fixParent` class from the elements


      var fixParents = document.querySelectorAll('.introjs-fixParent');

      _forEach(fixParents, function (parent) {
        _removeClass(parent, /introjs-fixParent/g);
      }); //remove old classes if the element still exist


      _removeShowElement(); //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation


      if (self._lastShowElementTimer) {
        window.clearTimeout(self._lastShowElementTimer);
      }

      self._lastShowElementTimer = window.setTimeout(function () {
        // change the scroll of the window, if needed
        _scrollTo.call(self, targetElement.scrollTo, targetElement);
      }, 350); // end of old element if-else condition
    } else {
      var helperLayer = document.createElement('div'),
          referenceLayer = document.createElement('div');
      helperLayer.className = highlightClass;
      referenceLayer.className = 'introjs-tooltipReferenceLayer'; // scroll to element

      scrollParent = _getScrollParent(targetElement.element);

      if (scrollParent !== document.body) {
        // target is within a scrollable element
        _scrollParentToElement(scrollParent, targetElement.element);
      } //set new position to helper layer


      _setHelperLayerPosition.call(self, helperLayer);

      _setHelperLayerPosition.call(self, referenceLayer); //add helper layer to target element


      this._targetElement.appendChild(helperLayer);

      this._targetElement.appendChild(referenceLayer); // change the scroll of the window, if needed


      _scrollTo.call(this, targetElement.scrollTo, targetElement); //end of new element if-else condition

    } // removing previous disable interaction layer


    var disableInteractionLayer = self._targetElement.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    } //disable interaction


    if (targetElement.disableInteraction) {
      _disableInteraction.call(self);
    }

    _setShowElement(targetElement);

    if (typeof this._introAfterChangeCallback !== 'undefined') {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
  }
  /**
   * To change the scroll of `window` after highlighting an element
   *
   * @api private
   * @method _scrollTo
   * @param {String} scrollTo
   * @param {Object} targetElement
   */


  function _scrollTo(scrollTo, targetElement) {
    if (scrollTo === 'off') return;
    var rect;
    if (!this._options.scrollToElement) return;
    rect = targetElement.element.getBoundingClientRect();

    if (!_elementInViewport(targetElement.element)) {
      var winHeight = _getWinSize().height;

      var top = rect.bottom - (rect.bottom - rect.top); // TODO (afshinm): do we need scroll padding now?
      // I have changed the scroll option and now it scrolls the window to
      // the center of the target element or tooltip.

      if (top < 0 || targetElement.element.clientHeight > winHeight) {
        window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) - this._options.scrollPadding); // 30px padding from edge to look nice
        //Scroll down
      } else {
        window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) + this._options.scrollPadding); // 30px padding from edge to look nice
      }
    }
  }
  /**
   * To remove all show element(s)
   *
   * @api private
   * @method _removeShowElement
   */


  function _removeShowElement() {
    var elms = document.querySelectorAll('.introjs-showElement');

    _forEach(elms, function (elm) {
      _removeClass(elm, /introjs-[a-zA-Z]+/g);
    });
  }
  /**
   * To set the show element
   * This function set a relative (in most cases) position and changes the z-index
   *
   * @api private
   * @method _setShowElement
   * @param {Object} targetElement
   */


  function _setShowElement(targetElement) {
    var parentElm; // we need to add this show element class to the parent of SVG elements
    // because the SVG elements can't have independent z-index

    if (targetElement.element instanceof SVGElement) {
      parentElm = targetElement.element.parentNode;

      while (targetElement.element.parentNode !== null) {
        if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break;

        if (parentElm.tagName.toLowerCase() === 'svg') {
          _addClass(parentElm, 'introjs-showElement introjs-relativePosition');
        }

        parentElm = parentElm.parentNode;
      }
    }

    _addClass(targetElement.element, 'introjs-showElement');

    var currentElementPosition = _getPropValue(targetElement.element, 'position');

    if (currentElementPosition !== 'absolute' && currentElementPosition !== 'relative' && currentElementPosition !== 'fixed') {
      //change to new intro item
      _addClass(targetElement.element, 'introjs-relativePosition');
    }

    parentElm = targetElement.element.parentNode;

    while (parentElm !== null) {
      if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break; //fix The Stacking Context problem.
      //More detail: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context

      var zIndex = _getPropValue(parentElm, 'z-index');

      var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));

      var transform = _getPropValue(parentElm, 'transform') || _getPropValue(parentElm, '-webkit-transform') || _getPropValue(parentElm, '-moz-transform') || _getPropValue(parentElm, '-ms-transform') || _getPropValue(parentElm, '-o-transform');

      if (/[0-9]+/.test(zIndex) || opacity < 1 || transform !== 'none' && transform !== undefined) {
        _addClass(parentElm, 'introjs-fixParent');
      }

      parentElm = parentElm.parentNode;
    }
  }
  /**
   * Iterates arrays
   *
   * @param {Array} arr
   * @param {Function} forEachFnc
   * @param {Function} completeFnc
   * @return {Null}
   */


  function _forEach(arr, forEachFnc, completeFnc) {
    // in case arr is an empty query selector node list
    if (arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        forEachFnc(arr[i], i);
      }
    }

    if (typeof completeFnc === 'function') {
      completeFnc();
    }
  }
  /**
   * Mark any object with an incrementing number
   * used for keeping track of objects
   *
   * @param Object obj   Any object or DOM Element
   * @param String key
   * @return Object
   */


  var _stamp = function () {
    var keys = {};
    return function stamp(obj, key) {
      // get group key
      key = key || 'introjs-stamp'; // each group increments from 0

      keys[key] = keys[key] || 0; // stamp only once per object

      if (obj[key] === undefined) {
        // increment key for each new object
        obj[key] = keys[key]++;
      }

      return obj[key];
    };
  }();
  /**
   * DOMEvent Handles all DOM events
   *
   * methods:
   *
   * on - add event handler
   * off - remove event
   */


  var DOMEvent = function () {
    function DOMEvent() {
      var events_key = 'introjs_event';
      /**
       * Gets a unique ID for an event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @return String
       */

      this._id = function (obj, type, listener, context) {
        return type + _stamp(listener) + (context ? '_' + _stamp(context) : '');
      };
      /**
       * Adds event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @param Boolean useCapture
       * @return null
       */


      this.on = function (obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments),
            handler = function handler(e) {
          return listener.call(context || obj, e || window.event);
        };

        if ('addEventListener' in obj) {
          obj.addEventListener(type, handler, useCapture);
        } else if ('attachEvent' in obj) {
          obj.attachEvent('on' + type, handler);
        }

        obj[events_key] = obj[events_key] || {};
        obj[events_key][id] = handler;
      };
      /**
       * Removes event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @param Boolean useCapture
       * @return null
       */


      this.off = function (obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments),
            handler = obj[events_key] && obj[events_key][id];

        if (!handler) {
          return;
        }

        if ('removeEventListener' in obj) {
          obj.removeEventListener(type, handler, useCapture);
        } else if ('detachEvent' in obj) {
          obj.detachEvent('on' + type, handler);
        }

        obj[events_key][id] = null;
      };
    }

    return new DOMEvent();
  }();
  /**
   * Append a class to an element
   *
   * @api private
   * @method _addClass
   * @param {Object} element
   * @param {String} className
   * @returns null
   */


  function _addClass(element, className) {
    if (element instanceof SVGElement) {
      // svg
      var pre = element.getAttribute('class') || '';
      element.setAttribute('class', pre + ' ' + className);
    } else {
      if (element.classList !== undefined) {
        // check for modern classList property
        var classes = className.split(' ');

        _forEach(classes, function (cls) {
          element.classList.add(cls);
        });
      } else if (!element.className.match(className)) {
        // check if element doesn't already have className
        element.className += ' ' + className;
      }
    }
  }
  /**
   * Remove a class from an element
   *
   * @api private
   * @method _removeClass
   * @param {Object} element
   * @param {RegExp|String} classNameRegex can be regex or string
   * @returns null
   */


  function _removeClass(element, classNameRegex) {
    if (element instanceof SVGElement) {
      var pre = element.getAttribute('class') || '';
      element.setAttribute('class', pre.replace(classNameRegex, '').replace(/^\s+|\s+$/g, ''));
    } else {
      element.className = element.className.replace(classNameRegex, '').replace(/^\s+|\s+$/g, '');
    }
  }
  /**
   * Get an element CSS property on the page
   * Thanks to JavaScript Kit: http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
   *
   * @api private
   * @method _getPropValue
   * @param {Object} element
   * @param {String} propName
   * @returns Element's property value
   */


  function _getPropValue(element, propName) {
    var propValue = '';

    if (element.currentStyle) {
      //IE
      propValue = element.currentStyle[propName];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
      //Others
      propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
    } //Prevent exception in IE


    if (propValue && propValue.toLowerCase) {
      return propValue.toLowerCase();
    } else {
      return propValue;
    }
  }
  /**
   * Checks to see if target element (or parents) position is fixed or not
   *
   * @api private
   * @method _isFixed
   * @param {Object} element
   * @returns Boolean
   */


  function _isFixed(element) {
    var p = element.parentNode;

    if (!p || p.nodeName === 'HTML') {
      return false;
    }

    if (_getPropValue(element, 'position') === 'fixed') {
      return true;
    }

    return _isFixed(p);
  }
  /**
   * Provides a cross-browser way to get the screen dimensions
   * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
   *
   * @api private
   * @method _getWinSize
   * @returns {Object} width and height attributes
   */


  function _getWinSize() {
    if (window.innerWidth !== undefined) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    } else {
      var D = document.documentElement;
      return {
        width: D.clientWidth,
        height: D.clientHeight
      };
    }
  }
  /**
   * Check to see if the element is in the viewport or not
   * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   *
   * @api private
   * @method _elementInViewport
   * @param {Object} el
   */


  function _elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && // add 80 to get the text right
    rect.right <= window.innerWidth;
  }
  /**
   * Add overlay layer to the page
   *
   * @api private
   * @method _addOverlayLayer
   * @param {Object} targetElm
   */


  function _addOverlayLayer(targetElm) {
    var overlayLayer = document.createElement('div'),
        styleText = '',
        self = this; //set css class name

    overlayLayer.className = 'introjs-overlay'; //check if the target element is body, we should calculate the size of overlay layer in a better way

    if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
      styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
      overlayLayer.style.cssText = styleText;
    } else {
      //set overlay layer position
      var elementPosition = _getOffset(targetElm);

      if (elementPosition) {
        styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
        overlayLayer.style.cssText = styleText;
      }
    }

    targetElm.appendChild(overlayLayer);

    overlayLayer.onclick = function () {
      if (self._options.exitOnOverlayClick === true) {
        _exitIntro.call(self, targetElm);
      }
    };

    window.setTimeout(function () {
      styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
      overlayLayer.style.cssText = styleText;
    }, 10);
    return true;
  }
  /**
   * Get an element position on the page
   * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
   *
   * @api private
   * @method _getOffset
   * @param {Object} element
   * @returns Element's position info
   */


  function _getOffset(element) {
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var x = element.getBoundingClientRect();
    return {
      top: x.top + scrollTop,
      width: x.width,
      height: x.height,
      left: x.left + scrollLeft
    };
  }
  /**
   * Find the nearest scrollable parent
   * copied from https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
   *
   * @param Element element
   * @return Element
   */


  function _getScrollParent(element) {
    var style = window.getComputedStyle(element);
    var excludeStaticParent = style.position === 'absolute';
    var overflowRegex = /(auto|scroll)/;
    if (style.position === 'fixed') return document.body;

    for (var parent = element; parent = parent.parentElement;) {
      style = window.getComputedStyle(parent);

      if (excludeStaticParent && style.position === 'static') {
        continue;
      }

      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
    }

    return document.body;
  }
  /**
   * scroll a scrollable element to a child element
   *
   * @param Element parent
   * @param Element element
   * @return Null
   */


  function _scrollParentToElement(parent, element) {
    parent.scrollTop = element.offsetTop - parent.offsetTop;
  }
  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */


  function _mergeOptions(obj1, obj2) {
    var obj3 = {},
        attrname;

    for (attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }

    for (attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }

    return obj3;
  }

  var introJs = function introJs(targetElm) {
    var instance;

    if (_typeof(targetElm) === 'object') {
      //Ok, create a new instance
      instance = new IntroJs(targetElm);
    } else if (typeof targetElm === 'string') {
      //select the target element with query selector
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        instance = new IntroJs(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      instance = new IntroJs(document.body);
    } // add instance to list of _instances
    // passing group to _stamp to increment
    // from 0 onward somewhat reliably


    introJs.instances[_stamp(instance, 'introjs-instance')] = instance;
    return instance;
  };
  /**
   * Current IntroJs version
   *
   * @property version
   * @type String
   */


  introJs.version = VERSION;
  /**
   * key-val object helper for introJs instances
   *
   * @property instances
   * @type Object
   */

  introJs.instances = {}; //Prototype

  introJs.fn = IntroJs.prototype = {
    clone: function clone() {
      return new IntroJs(this);
    },
    setOption: function setOption(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function setOptions(options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
    start: function start(selector) {
      _introForElement.call(this, this._targetElement, selector);

      return this;
    },
    goToStep: function goToStep(step) {
      _goToStep.call(this, step);

      return this;
    },
    addStep: function addStep(options) {
      if (!this._options.steps) {
        this._options.steps = [];
      }

      this._options.steps.push(options);

      return this;
    },
    goToStepNumber: function goToStepNumber(step) {
      _goToStepNumber.call(this, step);

      return this;
    },
    nextStep: function nextStep() {
      _nextStep.call(this);

      return this;
    },
    exit: function exit(force) {
      _exitIntro.call(this, this._targetElement, force);

      return this;
    },
    refresh: function refresh() {
      _refresh.call(this);

      return this;
    },
    onbeforechange: function onbeforechange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforechange was not a function');
      }

      return this;
    },
    onchange: function onchange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onchange was not a function.');
      }

      return this;
    },
    onafterchange: function onafterchange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introAfterChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onafterchange was not a function');
      }

      return this;
    },
    oncomplete: function oncomplete(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introCompleteCallback = providedCallback;
      } else {
        throw new Error('Provided callback for oncomplete was not a function.');
      }

      return this;
    },
    onexit: function onexit(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onexit was not a function.');
      }

      return this;
    },
    onbeforeexit: function onbeforeexit(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforeexit was not a function.');
      }

      return this;
    }
  };
  return introJs;
});

/***/ }),

/***/ "./src/templates/widget.mst":
/*!**********************************!*\
  !*** ./src/templates/widget.mst ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var H = __webpack_require__(/*! hogan.js */ "./node_modules/hogan.js/lib/hogan.js");
module.exports = function() { var T = new H.Template({code: function (c,p,i) { var t=this;t.b(i=i||"");t.b("<div class=\"getchat-widget__wrapper\">");t.b("\n" + i);t.b("  <div class=\"getchat-widget__content\">");t.b("\n" + i);t.b("    <div class=\"getchat-widget__header\">");t.b("\n" + i);t.b("      <div class=\"getchat-widget__btn getchat-widget__btn--action-menu getchat-widget__btn--icon\">");t.b("\n" + i);t.b("        <span></span>");t.b("\n" + i);t.b("        <span></span>");t.b("\n" + i);t.b("        <span></span>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("      <div class=\"getchat-widget__btn getchat-widget__btn--action-close getchat-widget__btn--icon\">");t.b("\n" + i);t.b("        <i aria-hidden=\"true\" class=\"getchat-widget__icon--close\"></i>");t.b("\n" + i);t.b("      </div>");t.b("\n" + i);t.b("    </div>");t.b("\n" + i);t.b("    <iframe src=\"");t.b(t.v(t.f("widgetUrl",c,p,0)));t.b("\" class=\"getchat-widget__frame\"></iframe>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("  <div class=\"getchat-widget__launcher\">");t.b("\n" + i);t.b("    <div class=\"getchat-widget__launcher-content\">?</div>");t.b("\n" + i);t.b("  </div>");t.b("\n" + i);t.b("</div>");t.b("\n");return t.fl(); },partials: {}, subs: {  }}, "<div class=\"getchat-widget__wrapper\">\n  <div class=\"getchat-widget__content\">\n    <div class=\"getchat-widget__header\">\n      <div class=\"getchat-widget__btn getchat-widget__btn--action-menu getchat-widget__btn--icon\">\n        <span></span>\n        <span></span>\n        <span></span>\n      </div>\n      <div class=\"getchat-widget__btn getchat-widget__btn--action-close getchat-widget__btn--icon\">\n        <i aria-hidden=\"true\" class=\"getchat-widget__icon--close\"></i>\n      </div>\n    </div>\n    <iframe src=\"{{ widgetUrl }}\" class=\"getchat-widget__frame\"></iframe>\n  </div>\n  <div class=\"getchat-widget__launcher\">\n    <div class=\"getchat-widget__launcher-content\">?</div>\n  </div>\n</div>\n", H);return T.render.apply(T, arguments); };

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showError = showError;
exports.loadCss = loadCss;
exports.default = void 0;

/**
 * Вывод ошибок в консоль
 * @param {String} msg
 */
function showError(msg) {
  // eslint-disable-next-line no-console
  console.error(msg);
}

function loadCss(path) {
  var head = document.getElementsByTagName('HEAD')[0];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = path;
  head.appendChild(link);
}

var utils = {
  showError: showError,
  loadCss: loadCss
};
var _default = utils;
exports.default = _default;

/***/ })

/******/ });
});
//# sourceMappingURL=gettour.js.map