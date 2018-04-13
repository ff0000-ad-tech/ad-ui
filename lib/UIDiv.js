/** 
	@npmpackage
	@class UIDiv
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIDiv } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, which is a DOM element <div>, that internally handles assigning the passed in parameters.
		<br><br>  

		<b>Sample 1:</b><br>
		<codeblock>
			// bare minimum creation - can be added to anything and named later.
			var myBase = new UIDiv();
		</codeblock>
		<br><br>


		<b>Sample 1:</b><br>
		<codeblock>
			// simple creation - no style
			// Added to a container, such as Main
			T.myBase = new UIDiv({
				target : T,
				id : 'my-div'
			});
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// create with assigned styles
			var myBase = new UIDiv({
				target : T,
				id : 'my-div',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			});
		</codeblock>
		<br><br>
*/
import { Styles, Markup } from 'ad-view'

class UIDiv {
	constructor(arg, type) {
		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// BASE CSS
		Styles.injectStylesheet('RED_uiElement', '.ui-elem', 'position:absolute;')

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP

		// internal pass in other type of element, such as <canvas>
		type = type || 'div'
		var U = document.createElement(type)
		Styles.addClass(U, 'ui-elem')

		arg = arg || {}
		if (arg.id) U.id = arg.id
		Styles.setCss(U, arg.css)
		if (arg.target) {
			var target = Markup.get(arg.target)
			target.appendChild(U)
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER

		/**
				@memberOf UIDiv
				@var {element} parent
					Getter : Returns the parent, ie the DOM element this <div> is inside of.
				@example
					// get
					console.log( myImage.source );
		
					// set
					myImage.source = 'template_image';
			*/
		Object.defineProperty(U, 'parent', {
			get: function() {
				return U.parentNode
			}
		})

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS

		/**
			@memberOf UIDiv
			@method toString
			@desc
				A String to represet the object type.
			@example
				myDiv.toString();
		*/
		U.toString = function() {
			return '[object UIDiv]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */

		return U
	}
}

export default UIDiv
