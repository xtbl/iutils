
iUtils 0.2
==============

Lightweight toolbelt for modern browsers.
--------------


With this Library you can query elements by class, name or tag name just as with any other library like Zepto.js or Jquery.

IUTILS also has a set of utilities that have proven to be very useful in many projects.

Query Elements:

by Class:

	i$('.className')

by Id:

	i$('#idName')

by Tag name:

	i$('tagName')

You can also pass the context as a parameter:

	i$('#selector', context)

Where the context can be an iUtils object, a query selector, or a html element. It only works with single elements and not with arrays of elements.

Here are the utils you can make us of:


hasClass:
--------------

Only works with single elements and not with arrays of elements.
Returns true or false
Example:

	i$('#blockOne').hasClass('className');

--------------------------------------

addClass:
--------------

Works with both single elements or arrays of elements.
returns iUtils element object so you can chain other methods.
Example:

	i$('#blockOne').addClass('className');

--------------------------------------

removeClass:
--------------

Works with both single elements or arrays of elements.
returns iUtils element object so you can chain other methods.
Example:

	i$('#blockOne').removeClass('className');

--------------------------------------

addCss:
--------------

Works with both single elements or arrays of elements.
returns iUtils element object so you can chain other methods.
Example:

	i$('#blockOne').addCss('propertyName', 'value');

--------------------------------------

bindEventListener:
--------------

Works with both single elements or arrays of elements.
returns iUtils element object so you can chain other methods.
Example:

	i$('#blockOne').bindEventListener('eventType', fn);

--------------------------------------

unbindEventListener:
--------------

Works with both single elements or arrays of elements.
returns iUtils element object so you can chain other methods.
Example:

	i$('#blockOne').unbindEventListener('eventType', fn);

--------------------------------------

get:
--------------

Works with both single elements or arrays of elements.
Used to get an 'index' element wrapped with the iUtils Object.
returns single HTML Element wrapped in an iUtils Object
Example:

	i$('.block').get(index);

--------------------------------------

getElement:
--------------

Works with both single elements or arrays of elements.
returns single HTML Element.
Example:

	i$('.block').getElement(index);

--------------------------------------

getParent:
--------------

Only works with single elements and not with arrays of elements.
returns parent of the current Element in an iUtils wrapper so you can chain other methods.
Example:

	i$('#blockOne').getParent();

--------------------------------------

getAttr:
--------------

Works with both single elements or arrays of elements.
returns given attribute or false.
Example:

	i$('.block').getAttr('rel');

--------------------------------------

setAttr:
--------------

Works with both single elements or arrays of elements.
returns given attribute or false.
Example:

	i$('.block').setAttr('rel');

--------------------------------------

removeAttr:
--------------

Works with both single elements or arrays of elements.
returns given attribute or false.
Example:

	i$('.block').removeAttr('rel');

--------------------------------------

destroy:
--------------

Removes Elements from DOM
Works with both single elements or arrays of elements.
returns current Object
Example:

	i$('.block').destroy();

--------------------------------------

each:
--------------

creates a loop to walk through an array of elements
Example:

	i$('.block').each(function(index){});

--------------------------------------

extend:
--------------

adds properties from an object to another object and returns the target object
Example:

	i$.extend(sourceObj, targetObj);

--------------------------------------

mergeArrays:
--------------

add properties from one array to another and retursn the target array

	i$.mergeArrays(targetArr, sourceArr);

--------------------------------------

delay:
--------------

a set Interval in a wrapper so it can be reused:

	i$.delay(fn, time);

--------------------------------------

log:
--------------

A method used for logging. Login can be disabled by changing the configuration flag: i$.config.flags.log = false;
Example:
	


--------------------------------------
html:
--------------

adds html to an element
param: string or html element
returns current element to enable chaning
Example:

	i$('.block').html('<p>hello World</p>');

	i$('.block').html(htmlNode);

--------------------------------------
appendHtml:
--------------

appends html to an element
param: string or html element
returns current element to enable chaning
Example:

	i$('.block').appendHtml('<p>hello World</p>');

	i$('.block').appendHtml(htmlNode);

--------------------------------------
prependHtml:
--------------

prepends html to an element
param: string or html element
returns current element to enable chaning
Example:

	i$('.block').prependHtml('<p>hello World</p>');

	i$('.block').prependHtml(htmlNode);

*****

**Copyright 2011 Ian Calderon Lopez**

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
