/**
	@npmpackage
	@class UICanvas
	@param {string} id
	@param {element} target
	@param {object} css
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UICanvas } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  Unlike other UI elements, this creates a DOM &lt;canvas>.
		By extending {@link UIComponent} this has all of its native properties and methods.  See {@link UIComponent} for more info.
	@example
		var myCanvas = new UICanvas({
			id : 'my-btn',
			target : View.main,
			css : {
				x : 15,
				y : 18,
				width : 50,
				height : 20,
				backgroundColor : '#ff0000'
			}
		});
*/
import UIComponent from './UIComponent'

class UICanvas {
	constructor(arg) {
		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		arg = arg || {}

		var width = arg.css.width
		var height = arg.css.height

		delete arg.css.width
		delete arg.css.height

		var U = new UIComponent(arg, 'canvas')
		U.setAttribute('width', width)
		U.setAttribute('height', height)

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE PROPERTIES
		var _ctx2d = U.getContext('2d')
		var _ctx3d = U.getContext('webgl')

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER

		Object.defineProperties(U, {
			/**
				@memberOf UICanvas
				@var {canvas} context2d
				@desc
					Getter : Returns direct access to the canvas context of '2d'.
				@example
					console.log( myCanvas.context2d );
			*/
			context2d: {
				get: function() {
					return _ctx2d
				}
			},

			/**
				@memberOf UICanvas
				@var {canvas} context3d
				@desc
					Getter : Returns direct access to the canvas context of 'webgl'.
				@example
					console.log( myCanvas.context3d );
			*/
			context3d: {
				get: function() {
					return _ctx3d
				}
			}
		})

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS
		/**
			@memberOf UICanvas
			@method toString
			@returns {string} [object UICanvas]
			@desc
				A String representing the object type.
		*/
		U.toString = function() {
			return '[object UICanvas]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		U._initAlign(true)

		return U
	}
}

export default UICanvas
