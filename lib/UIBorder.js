/** 
	@npmpackage
	@class UIBorder
	@param {object} arg
	@property {string} id
		Element id.
	@property {element} target
		DOM Element in which to create this border.
	@property {number} size
		Border thickness.
	@property {string} color
		Hex code representing border color.
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIBorder } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending UIDiv which adds a border to a div.
	@example
		// simple button that passes in an image to the bg and 2 images as the icons for the different states of the button.  Notice no width or height is set.
		var myBorder = new UIBorder({
			id : 'my-border',
			target : View.main,
			size : 1,
			color : '#ff0000'
		})
*/
import UIDiv from './UIDiv'
import { Styles } from 'ad-view'
import { Gesture } from 'ad-events'

class UIBorder {
	constructor(arg) {
		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE PROPERTIES
		var _size
		var _color

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		var U = new UIDiv(arg)

		Styles.addClass(U, 'ui-border')

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER
		Object.defineProperties(U, {
			/**
				@memberOf UIBorder
				@var size
				@desc
					Getter|Setter : A Number representing the size of the border in pixels.
				@example
					// SET
					myBorder.size = 4;

					// GET
					console.log( myBorder.size )
			*/
			size: {
				get: function() {
					return _size
				},
				set: function(value) {
					//console.log( 'UIBorder :: SET -> size =', value );
					if (value != undefined && _size != value) {
						_size = value

						Styles.setCss(U, {
							borderWidth: _size
						})
					}
				}
			},

			/**
				@memberOf UIBorder
				@var color
				@desc
					Getter|Setter : A String representing the color of the border.
				@example
					// SET
					myBorder.color = '#fff000';

					// GET
					console.log( myBorder.color )
			*/
			color: {
				get: function() {
					return _color
				},
				set: function(value) {
					//console.log( 'UIBorder :: SET -> color =', value )
					if (value && _color != value) {
						_color = value

						Styles.setCss(U, {
							borderColor: _color
						})
					}
				}
			}
		})
		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS
		U.toString = function() {
			return '[object UIBorder]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		Gesture.disable(U)
		U.color = arg.color
		U.size = arg.size

		return U
	}
}

export default UIBorder
