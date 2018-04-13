/**
	@npmpackage
	@class UIButton
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIButton } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending UIComponent.  It is a DOM element that has a child handling system for toggling the active state.
		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>
		<b>Note:</b><br>
		When adding a bg element or icons, there is no need to set the width and height at the css level. The UIButton will inherit the dimensions
		of the children.  However, if either the width or height is set, that will be the size of the UIButton.  The hit state is the UIButton itself
		so keep in mind that even if the content is very large, if the css sets the width and height to a smaller amount, there will be a small hit area
		for clicks, rollovers and rollouts.
		<br><br>


		<b>Sample 1:</b>
		<codeblock>
			// Create a simple button on the Main container that passes in an image to the bg and 2 images 
			// as the icons for the different states of the button.  Notice no width or height is set.
			T.myButton = new UIButton({
				id : 'my-btn',
				target : T,
				css : {
					x : 30,
					y : 10
				},
				bg : 'btnBg',
				icon : [ 
					'btnPlay',
					'btnPause'
				],
				onClick : handleMyButtonClick
			});

			function handleMyButtonClick ( event ){
				console.log( event.target, 'clicked' )
			}

			// referenced later anywhere outside the class by
			View.main.myButton			
		</codeblock>
		<br><br>


		<b>Sample 2:</b>
		<codeblock>
			// create the same button as above, but more customized images 
			// for the bg and the different states
			T.myButton = new UIButton({
				id : 'my-btn',
				target : T,
				css : {
					x : 30,
					y : 10
				},
				bg : new UIImage({
					source : 'btnBg',
					css : {
						width : 120,
						height : 40,
					}
				}),
				icon : [ 
					new UIImage({
						source : 'btnPause',
						css : {
							x : 20,
							y : 10,
							width : 80,
							height : 20,
							backgroundColor : 'rgba(0,100,100,.5)'
						}
					}),
					new UIImage({
						source : 'btnPause',
						css : {
							x : 20,
							y : 10,
							width : 80,
							height : 20,
							backgroundColor : 'rgba(0,100,100,.5)'
						}
					}) 
				],
				onClick : handleMyButtonClick
			});
		</codeblock>
		<br><br>


		<b>Sample 3:</b><br>
		<codeblock>
			// create a button with a textfield passed in as the icon state of the button
			// also it is aligned inline rather than with Align.set()
			T.myButton = new UIButton({
				id : 'my-btn',
				target : T,
				css : {
					width : 100,
					height : 40,
					backgroundColor : '#ff0000'
				},
				bg : 'btnBg',
				icon: [
					new UITextField ({
						css : {
							width : 150,
							height : 40,
							color : '#ffffff'
						},
						fontSize : 12,
						fontFamily : 'template_font',
						format : TextFormat.INLINE_FIT,
						alignText : Align.CENTER,
						text : 'CLICK FOR MORE'
					})
				],
				align : {
					x : Align.CENTER,
					y : {
						type : Align.BOTTOM,
						offset : -30
					}
				}
				onClick : handleMyButtonClick
			});
		</codeblock>
		<br><br>


		<b>Sample Extension:</b><br>
		<codeblock>
			// When needing to make a custom button, use this template then add code accordingly
			function UIButtonExtend( arg ){

				var U = new UIButton ( arg );

				U._onClick = function ( event ){
					// extended click method
				}

				function handleBaseEnabled ( event ){
					var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
					// handle other listeners
				}

				U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )

				U.enabled = true;

				return U;
			}
		</codeblock>
		<br><br>
*/
import UIComponent from './UIComponent'
import UIImage from './UIImage'
import {Styles, Clamp} from 'ad-view'
import {Gesture, GestureEvent, UIEvent} from 'ad-events'

class UIButton {
	constructor(arg) {
		arg = arg || {}
		arg.css = arg.css || {}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// BASE CSS
		Styles.injectStylesheet(
			'RED_uiButton',
			'.ui-button',
			'position:absolute',
			'.ui-button-state',
			'position: absolute; width:inherit; height:inherit;'
		)

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE PROPERTIES
		var _state = 0
		var _icon = []
		var _bg
		// this is used by the video components so the icons will force fit inside buttons
		var _containChild = !!arg.containChild

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		var U = new UIComponent(arg)
		Styles.addClass(U, 'ui-button')

		if (arg.bg) {
			createChild(arg.bg, false)
		}
		// called after bg is set to define a width/height for icon align calls
		clampContainer()

		arg.icon = arg.icon || []
		for (var i = 0; i < arg.icon.length; i++) {
			createChild(arg.icon[i], true)
		}
		// call again to account for icons
		clampContainer()

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC PROPERTIES
		/**
			@memberOf UIButton
			@var {boolean} togglable
				A Boolean to set whether or not the button will toggle between the different states of the button, which switches the 
				visiblity of the child elements
		*/
		U.togglable = arg.icon.length > 1

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER
		Object.defineProperties(U, {
			/**
				@memberOf UIButton
				@var {element} bg
				@desc
					Getter : The bottom most element of a UIButton.  This allows for a background image to be set with a UIImage, or any other 
					UIComponent natively. It is set in the constructor as the bg: param.  This allows public access to that element to that 
					element as a getter, without allowing to overwrite the content.
					<br><br>

					<b>Example 1</b><br>
					Internally create a UIImage as the background:<br> 
					<codeblock>
						var myButton = new UIButton({
							bg : 'btnBg'
						});
					</codeblock>
					<br><br>

				<b>Example 2</b><br>
				Pass in a UIImage to add custom css to the elements:<br>
				<codeblock>
					var myButton = new UIButton({
						bg : new UIImage({
							source : 'btnBg',
							css : {
								width : 80,
								height : 20,
								backgroundColor : 'rgba(0,100,100,.5)'
							}
						})
					});
				</codeblock>
				<br><br>
			*/
			bg: {
				get: function() {
					return _bg
				}
			},

			/**
				@memberOf UIButton
				@var {array} icon
				@desc
					Getter : An Array of the icons, which are set as an array in the constructor as the icon:[] param.  This allows public access to 
					those icons as getters, without allowing to overwrite the array content.  When clicking the button, it will auto toggle 
					between 0 and 1, however this can be set to any other state that is avaiable. When instantiating, pass in the elements as either 
					strings for the name of images to create UIImages or use other dom elements such as UIComponents to create custom style.
					<br><br>

					<b>Example 1</b><br>
					Internally creates 2 UIImages as the icons, aka states, of the button:<br>
					<codeblock>
						var myButton = new UIButton({
							icon : [ 
								'btnPlay',
								'btnPause'
							]
						});
					</codeblock>
					<br><br>

					<b>Example 2</b><br>
					Pass in 2 UIImages as the icons of the button, to add custom css to the elements:<br>
					<codeblock>
						var myButton = new UIButton({
							icon : [ 
								new UIImage({
									source : 'btnPause',
									css : {
										x : 20,
										y : 10,
										width : 80,
										height : 20,
										backgroundColor : 'rgba(0,100,100,.5)'
									}
								}),
								new UIImage({
									source : 'btnPause',
									css : {
										x : 20,
										y : 10,
										width : 80,
										height : 20,
										backgroundColor : 'rgba(0,100,100,.5)'
									}
								}) 
							]
						});
					</codeblock>
					<br><br>
			*/
			icon: {
				get: function() {
					return _icon
				}
			},

			/**
				@memberOf UIButton
				@var {element} state
				@desc
					Getter|Setter : A Number representing the index of which icon is being displayed, aka the state of the button.  These are set as an array in 
					the constructor as the icon:[] param.  When clicking the button, it will auto toggle between 0 and 1, however this can be set to any other state that is avaiable.
					<br><br>
				
					<b>Example</b><br>
					Internally creates 3 UIImages as the icons of the button, which will toggle between 'btnPlay' and 'btnPause', but can manually set 
					to show 'btnAlt' by setting state to 2:<br>	
					<codeblock>
						var myButton = new UIButton({
							icon : [ 
								'btnPlay',
								'btnPause',
								'btnAlt'
							]
						});
						myButton.state = 2 	// sets the button to 'btnAlt'
					</codeblock>
					<br>
			*/
			state: {
				get: function() {
					return _state
				},
				set: function(value) {
					_state = value
					if (value >= _icon.length) {
						_state = 0
					}
					for (var i = 0; i < _icon.length; i++) {
						_icon[i].style.visibility = i == _state ? 'visible' : 'hidden'
					}
				}
			}
		})

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS

		/**
			@memberOf UIButton
			@method onClick
			@desc
				A Method that will be called on click of the button.  This is set in the constructor or can be manually assigned.
				It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.CLICK, handleClick );</code>
		*/
		U.onClick =
			arg.onClick ||
			function(event) {
				//console.log( 'UIButton.onClick()' )
			}

		/**
			@memberOf UIButton
			@method onOver
			@desc
				A Method that will be called on roll over of the button.  This is set in the constructor or can be manually assigned.
				It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.OVER, handleRollOver );</code>
		*/
		U.onOver =
			arg.onOver ||
			function(event) {
				//console.log( 'UIButton.onOver()' )
			}

		/**
			@memberOf UIButton
			@method onOut
			@desc
				A Method that will be called on roll out of the button.  This is set in the constructor or can be manually assigned.
				It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.OUT, handleRollOut );</code>
		*/
		U.onOut =
			arg.onOut ||
			function(event) {
				//console.log( 'UIButton.onOut()' )
			}

		/**
			@memberOf UIButton
			@method toString
			@returns {string} [object UIButton]
			@desc
				A String representing the object type.
		*/
		U.toString = function() {
			return '[object UIButton]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PROTECTED METHODS

		/**	Method: _onClick()
				Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
		*/
		U._onClick = function(event) {}

		/**	Method: _onOver()
				Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
		*/
		U._onOver = function(event) {}

		/**	Method: _onOut()
				Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.
		*/
		U._onOut = function(event) {}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE METHODS
		function createChild(name, isIcon) {
			var elem
			var id = arg.id + (isIcon ? '-state-' + _icon.length : '-bg')

			if (typeof name == 'string') {
				elem = new UIImage({
					target: U,
					id: id,
					source: name,
					css: _containChild
						? {
								width: 'inherit',
								height: 'inherit'
							}
						: {}
				})
			} else {
				elem = name
				elem.id = id
				U.addChild(elem)
				if (/(UITextField)/gi.exec(elem.toString())) {
					elem.resetToDefault()
				}
				elem._initAlign(true)
			}

			if (isIcon) {
				_icon.push(elem)
				Styles.addClass(elem, 'ui-button-state')
			} else {
				_bg = elem
			}

			Gesture.disable(elem)
		}

		function clampContainer() {
			Clamp.set(U, 'clamp' + (!arg.css.width ? 'X' : '') + (!arg.css.height ? 'Y' : ''), {}, false)
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// EVENT HANDLERS
		function handleClick(event) {
			GestureEvent.stop(event)
			if (U.togglable) U.state = Number(!_state)

			U._onClick.call(U, event)
			U.onClick.call(U, event)
		}

		function handleOver(event) {
			U._onOver.call(U, event)
			U.onOver.call(U, event)
		}

		function handleOut(event) {
			U._onOut.call(U, event)
			U.onOut.call(U, event)
		}

		function handleBaseEnabled(event) {
			var listener = U.enabled ? 'addEventListener' : 'removeEventListener'
			Gesture[listener](U, GestureEvent.CLICK, handleClick)
			Gesture[listener](U, GestureEvent.OVER, handleOver)
			Gesture[listener](U, GestureEvent.OUT, handleOut)
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		U.addEventListener(UIEvent.ENABLED, handleBaseEnabled)

		U.enabled = true
		U.state = arg.state || 0

		U._initAlign()

		return U
	}
}

export default UIButton
