/*
 *
 *IUTILS UTILS LIBRARY
 *
 *CREATED BASED ON THE NEED OF A LIGHTWEIGHT LIBRARY FOR MOBILE WEB APPLICATIONS
 *version: 0.2
 *Copyright 2011 Ian Calderon Lopez
 *This library is distributed under the terms of the GNU General Public License
 *
 */
(function (window, document, undefined) {
	
	//creating Library
	var iUtils = function (selector, ctx) {
		return new iUtils.fn.initialize(selector, ctx);
	},
	
	//local splice call
	local_splice = Array.prototype.splice,
	
	//local push call
	local_push = Array.prototype.push,
	
	//to extend object
	local_extend = function (obj) {
		var key,
		source = this.fn;
		
		for (key in obj) {
			source[key] = obj[key];
		}
		
		key = null;
		source = null;
	},
	local_destroy = function () {
		
		local_each.call(this, function (i) {
			this[i] = null;
			local_splice.call(this, this[i]);
		});

		local_removeFn.call(this);

		return this;
	},
	local_each = function (fn) {
		var i;
		
		for (i = 0; i < this.length; i++) {
			fn.call(this, i);
		}
	},
	local_removeFn = function(fnName){
		var key;

		for(key in this){
			delete this[key];
			this[key] = null;
		}
		
		key = null;
	},
	
	types = {
		0 : 'htmlNode',
		1 : 'iUtilsInstance',
		2 : 'id',
		3 : 'class'
	};
	
	//configuration
	iUtils.config = {
		flags : {
			log : true
		}
	};
	
	//get by tags
	var getTags = function (selector, ctx) {
		
		var els = [],
		nodes = ctx.getElementsByTagName(selector),
		i;
		
		local_each.call(nodes, function (i) {
			local_push.call(els, nodes[i]);
		});
		
		local_each.call(nodes, function () {
			nodes[i] = null;
		});
		
		nodes = null;
		return els;
	},
	
	//get Type of
	getType = function (param) {
		var ret;
		
		if (typeof param.tagName !== 'undefined') {
			ret = types[0];
		} else if (param instanceof iUtils) {
			ret = types[1];
		} else if (param.indexOf('#') === 0) {
			ret = types[2];
		} else if (param.indexOf(".") === 0) {
			ret = types[3];
		}
		
		return ret;
	},
	
	//get Element by class
	getByClass = function (selector, ctx) {
		var tags = getTags('*', ctx),
		els = [],
		i;
		
		local_each.call(tags, function (i) {
			
			var el = tags[i];
			
			if (iUtils.fn.hasClass(selector, el)) {
				local_push.call(els, el);
			}
			
			el = null;
			
		});
		
		local_each.call(tags, function () {
			tags[i] = null;
		});
		
		tags = null;
		return els;
	},
	
	//to get element by selector
	getElement = function (selector, ctx) {
		
		ctx = ctx || document;
		
		var el,
		ctxType,
		selectorType = getType(selector);
		
		if (ctx !== document) {
			
			ctxType = getType(ctx);
			
			if (ctxType === types[0]) {
				ctx = ctx;
			} else if (ctxType === types[1]) {
				ctx = ctx.getElement(0);
			} else if (ctxType === types[2]) {
				ctx = document.getElementById(ctx.substring(1));
			}
		}
		
		if (selectorType === types[2]) {
			el = document.getElementById(selector.substring(1));
		} else if (selectorType === types[3]) {
			el = getByClass(selector.substring(1), ctx);
		} else {
			el = getTags(selector, ctx)
		}
		
		return el;
	},
	
	//creating object
	makeObject = function (object, els) {
		var length = 0,
		i;
		
		object.push = local_push;
		object.splice = local_splice;
		
		if (els.length) {
			
			local_each.call(els, function (i) {
				local_push.call(object, els[i]);
				length++;
			});
			
		} else {
			if (els.length > 0 || typeof els.length === 'undefined') {
				local_push.call(object, els);
				length++;
			}
		}
		object.length = length;
		
		return object;
	};
	
	iUtils.extend = local_extend;

	iUtils.removeFn = local_removeFn;
	
	//object methods
	iUtils.fn = iUtils.prototype = {
		constructor : iUtils,
		version : '0.2',
		initialize : function (selector, ctx) {
			
			//if not receiving array of elements
			if (!(selector instanceof Array)) {
				selector = selector.nodeName ? selector : getElement(selector, ctx);
			}
			
			return makeObject(this, selector);
		},
		get : function (i) {
			return new iUtils.fn.initialize(this.getElement(i));
		},
		getElement : function (i) {
			return this[i];
		},
		getParent : function () {
			return new iUtils.fn.initialize(this.getElement(0).parentNode);
		},
		getAttr : function (attr) {
			return this.getElement(0).getAttribute(attr) || false;
		},
		setAttr : function (attr, val) {
			return this.getElement(0).setAttribute(attr, val);
		},
		removeAttr : function (attr) {
			return this.getElement(0).removeAttribute(attr);
		},
		each : local_each
	};
	
	iUtils.fn.initialize.prototype = iUtils.fn;
	
	//class related
	iUtils.extend({
		hasClass : function (cls, element) {
			element = element || this.getElement(0);
			return !!(element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')));
		},
		addClass : function (cls) {
			local_each.call(this, function (i) {
				
				var el = this[i];
				if (!iUtils.fn.hasClass(cls, el)) {
					el.className += ' ' + cls;
				}
				el = null;
			});
			return this;
		},
		removeClass : function (cls) {
			cls = cls || '';
			
			local_each.call(this, function (i) {
				var el = this[i],
				classes = el.className.split(' ');
				
				local_each.call(classes, function (x) {
					
					if (classes[x] === cls) {
						classes.splice(x, 1);
					}
				});
				
				el.className = classes.join(' ');
				
				classes = null;
				el = null;
			});
			
			return this;
		},
		addCss : function (prop) {
			
			local_each.call(this, function (i) {
				var el = this[i];
				
				el.style.cssText += prop;
				
				el = null;
				
			});
			
			return this;
		},
		filterByClass : function (cls) {
			
			var els = [];
			
			local_each.call(this, function (i) {
				var el = this.getElement(i);
				
				if (iUtils.fn.hasClass(cls, el)) {
					els.push(el);
				}
				
				el = null;
			});
			
			return new iUtils.fn.initialize(els);
			
		}
	});
	
	//event related
	iUtils.extend({
		bindEventListener : function (type, fn) {
			//IE9+, webkit and firefox
			
			local_each.call(this, function (i) {
				var el = this[i];
				el.addEventListener(type, fn);
				el = null;
			});
			
			return this;
		},
		unbindEventListener : function (type, fn) {
			//IE9+, webkit and firefox
			
			local_each.call(this, function (i) {
				var el = this[i];
				el.removeEventListener(type, fn);
				el = null;
			});
			
			return this;
		}
	});
	
	//DOM Related
	iUtils.extend({
		html : function (html) {
			
			if (getType(html) === types[0]) {
				local_each.call(this, function (i) {
					var el = this.getElement(i);
					el.innerHTML = '';
					el.appendChild(html);
					el = null;
				});
			} else {
				local_each.call(this, function (i) {
					var el = this.getElement(i);
					el.innerHTML = html;
					el = null;
				});
			}
			
			return this;
		},
		appendHtml : function (html) {
			
			if (getType(html) === types[0]) {
				local_each.call(this, function (i) {
					var el = this.getElement(i);
					el.appendChild(html);
					console.log(el);
					el = null;
				});
			} else {
				local_each.call(this, function (i) {
					var el = this.getElement(i);
					el.innerHTML += html;
					el = null;
				});
			}
			
			return this;
		},
		prependHtml : function (html) {
			
			if (getType(html) === types[0]) {
				local_each.call(this, function (i) {
					var el = this.getElement(i),
					firstNode = el.childNodes[0];
					
					el.insertBefore(html, firstNode);
					
					el = null;
					firstNode = null;
				});
			} else {
				local_each.call(this, function (i) {
					var el = this.getElement(i);
					el.innerHTML = html + el.innerHTML;
					el = null;
				});
			}
			
			return this;
		},
		destroy : function () {
			
			local_each.call(this, function (i) {
				
				var parent = this[i].parentNode,
				el = this[i];
				
				parent.removeChild(el);
				
				parent = null;
				el = null;
				
			});
			
			local_destroy.call(this);
			
			return null;
		}
	});
	
	//to merge arrays
	iUtils.mergeArrays = function (target, arr) {
		
		target = target || [];
		
		local_each.call(arr, function (i) {
			local_push.call(target, arr[i]);
		});
		
		return target;
	};
	
	//to log based on local config
	iUtils.log = function (msg) {
		if (!iUtils.config.flags.log) {
			return false;
		}
		console.log(msg);
	};
	
	//implemetation of setTimeout native function
	iUtils.delay = function (callback, time) {
		setTimeout(callback, time);
	};
	
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
