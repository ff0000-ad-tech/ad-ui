/** 
	@class UIGroup

	@param {object} arg
		an object containing the arguments for defining / orienting the UIGroup, see Properties for more info:

	@property {element} target
		the DOM element in which to add the UIGroup

	@property {array} children
		an array of DOM elements which will be added

	@property {object} css
		CSS properties to apply to the UIGroup parent container - <b>width and height will be ignored!</b>

	@property {Align} align
		the alignment of the UIGroup parent container

	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">Github repo</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIGroup } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent} and therefor contains all of the native properties and methods of extending {@link UIComponent}.
		<br>It relocates an array of DOM elements into a newly created {@link UIComponent}, allowing for easy creation of lockups.
		<br>Returns a UIComponent
		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>
		// basic creation - add children to a UIGroup.
		let _myLockup = new UIGroup({
			target: View.main,
			children: [myDIV, myTextField, myImage],
		});
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
		// align the UIGroup after creation.
		let _myLockup = new UIGroup({
			target: View.main,
			children: [myDIV, myTextField, myImage],
			align: Align.CENTER,
		});
		</codeblock>
		<br><br>
		

		<b>Sample 3:</b><br>
		<codeblock>
		// give the parent UIGroup a background color - handy for debugging!
		let _myLockup = new UIGroup({
			target: View.main,
			children: [myDIV, myTextField, myImage],
			css:{
				backgroundColor: '#ff0000'
			}
		});
		</codeblock>
		<br><br>
*/
import UIComponent from './UIComponent'
import { Clamp, Align } from 'ad-view'
import { Gesture } from 'ad-events'

class UIGroup {
	constructor(arg) {
		// make a parent container to house our incoming children
		let U = new UIComponent(arg)

		// add the children
		let _children = arg.children.slice()
		while (_children.length > 0) {
			let _child = _children.shift()
			if (_child) U.appendChild(_child)
		}

		// if width or height values were passed in via arg.css, they will get overwritten here
		Clamp.set(U, Clamp.XY)

		if (arg.align) Align.set(U, arg.align)

		Gesture.disable(U)

		return U
	}
}

export default UIGroup
