/*
 *
 *IUTILS UTILS LIBRARY
 *
 *CREATED BASED ON THE NEED OF A LIGHTWEIGHT LIBRARY FOR MOBILE WEB APPLICATIONS
 *version: 0.2
 *Copyright 2011 Ian Calderon Lopez
 *This library is distributed under the terms of the GNU General Public License
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
(function(window, document, undefined) {

	//creating Library
	var iUtils = function(selector, ctx) {
			return new iUtils.fn.initialize(selector, ctx);
		},

		//local splice call
		local_splice = Array.prototype.splice,

		//local push call
		local_push = Array.prototype.push,

		//to extend object
		local_extend = function(source, target) {
			var key;

			for(key in source) {
				target[key] = source[key];
			}

			key = null;

			return target;
		},
		local_remove = function(array) {

			local_each.call(array, function(i) {
				array[i] = null;
				local_splice.call(array, array[i]);
			});

			array = null;
		},
		local_each = function(fn, array) {
			var i;

			array = array || this;

			for(i = 0; i < array.length; i++) {
				fn.call(this, i);
			}
		};

	//configuration
	iUtils.config = {
		flags: {
			log: true
		}
	};

	var getTags = function(selector, ctx) {

			var els = [],
				nodes = ctx.getElementsByTagName(selector),
				i;

			local_each.call(nodes, function(i) {
				local_push.call(els, nodes[i]);
			});

			local_each.call(nodes, function() {
				nodes[i] = null;
			});

			nodes = null;
			return els;
		},

		//get Element by class
		getByClass = function(selector, ctx) {
			var tags = getTags('*', ctx),
				els = [],
				i;

			local_each.call(tags, function(i) {

				var el = tags[i];

				if(iUtils.fn.hasClass(selector, el)) {
					local_push.call(els, el);
				}

				el = null;

			});

			local_each.call(tags, function() {
				tags[i] = null;
			});

			tags = null;
			return els;
		},

		//to get element by selector
		getElement = function(selector, ctx) {
			var el;

			ctx = ctx || document;

			if(ctx !== document) {
				if(typeof ctx.tagName !== 'undefined') {
					ctx = ctx;
				} else if(ctx instanceof iUtils) {
					ctx = ctx.getElement(0);
				} else if(ctx.indexOf('#') === 0) {
					ctx = document.getElementById(ctx.substring(1));
				}
			}

			if(selector.indexOf('#') === 0) {
				el = document.getElementById(selector.substring(1));
			} else if(selector.indexOf(".") === 0) {
				el = getByClass(selector.substring(1), ctx);
			} else {
				el = getTags(selector, ctx)
			}

			return el;
		},

		//creating object
		makeObject = function(object, els) {
			var length = 0,
				i;

			object.push = local_push;
			object.splice = local_splice;

			if(els.length) {

				local_each.call(els, function(i) {
					local_push.call(object, els[i]);
					length++;
				});

			} else {
				if(els.length > 0 || typeof els.length === 'undefined') {
					local_push.call(object, els);
					length++;
				}
			}
			object.length = length;

			return object;
		};


	//object methods
	iUtils.fn = iUtils.prototype = {
		constructor: iUtils,
		version: '0.2',
		initialize: function(selector, ctx) {

			var el = selector.nodeName ? selector : getElement(selector, ctx);
			return makeObject(this, el);
		},
		hasClass: function(cls, element) {
			element = element || this.get(0);
			return !!(element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')));
		},
		addClass: function(cls, array) {
			array = this || array;

			local_each.call(array, function(i) {

				var el = array[i];
				if(!iUtils.fn.hasClass(cls, el)) {
					el.className += ' ' + cls;
				}
				el = null;
			});
			return this;
		},
		removeClass: function(cls, array) {
			//IE9+, webkit and firefox
			array = array || this;
			cls = cls || '';

			local_each.call(array, function(i) {
				var el = array[i],
					classes = el.className.split(' ');

				local_each.call(classes, function(x) {

					if(classes[x] === cls) {
						classes.splice(x, 1);
					}
				});

				el.className = classes.join(' ');

				classes = null;
				el = null;
			});

			return this;
		},
		bindEventListener: function(type, fn, array) {
			//IE9+, webkit and firefox
			array = array || this;

			local_each.call(array, function(i) {
				var el = array[i];
				el.addEventListener(type, fn);
				el = null;
			});
		},
		unbindEventListener: function(type, fn, array) {
			//IE9+, webkit and firefox
			array = array || this;

			local_each.call(array, function(i) {
				var el = array[i];
				el.removeEventListener(type, fn);
				el = null;
			});
		},
		htmls: function(html, array){
			array = array || this;

			local_each.call(array, function(i) {

				var el = array.getElement(i);
				el.innerHTML = html;
				el = null;

			});

			return this;
		},
		appendHtml: function(){

		},
		get: function(i) {
			return new iUtils.fn.initialize(this.getElement(i));
		},
		getElement: function(i) {
			return this[i];
		},
		getParent: function() {
			return new iUtils.fn.initialize(this.getElement(0).parentNode);
		},
		getAttr: function(attr) {
			return this.getElement(0).getAttribute(attr) || false;
		},
		setAttr: function(attr, val) {
			return this.getElement(0).setAttribute(attr, val);
		},
		removeAttr: function(attr) {
			return this.getElement(0).removeAttribute(attr);
		},
		addCss: function(name, val, array) {
			array = array || this;


			local_each.call(array, function(i) {
				var el = array[i];
				el.style[name] = val;
				el = null;
			});

			return this;
		},
		destroy: function(array) {

			array = array || this;

			local_each.call(array, function(i) {

				var parent = array[i].parentNode,
					el = array[i];

				parent.removeChild(el);

				parent = null;
				el = null;

			});

			local_remove(this);

			return this;
		},
		extend: local_extend,
		each: local_each
	};

	//to merge arrays
	iUtils.mergeArrays = function(target, arr) {

		target = target || [];

		local_each.call(arr, function(i) {
			local_push.call(target, arr[i]);
		});

		return target;
	};

	iUtils.extend = local_extend;

	//to log based on local config
	iUtils.log = function(msg) {
		if(!iUtils.config.flags.log) {
			return false;
		}
		console.log(msg);
	};

	//implemetation of setTimeout native function
	iUtils.delay = function(callback, time) {
		setTimeout(callback, time);
	};

	iUtils.fn.initialize.prototype = iUtils.fn;

	//defining in global object
	window.iUtils = i$ = iUtils;
}(this, document));

/*
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/