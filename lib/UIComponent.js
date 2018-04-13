/** 
	@npmpackage
	@class UIComponent
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIComponent } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, which is an extension of a DOM element &lt;div> with extra base functionality.  
		There are inherited properties and methods for enabling, show, hide, etc. It is a base class that can be 
		extended for custom UI elements. 
		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>
			// bare minimum creation - can be added to anything and named later.
			var myBase = new UIComponent();
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// simple creation - no style
			var myBase = new UIComponent({
				target : View.main,
				id : 'my-component'
			});
		</codeblock>
		<br><br>
		

		<b>Sample 3:</b><br>
		<codeblock>
			// create with assigned styles
			var myBase = new UIComponent({
				target : View.main,
				id : 'my-component',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			});
		</codeblock>
		<br><br>


		<b>Sample 4:</b><br>
		<codeblock>
			// create and align the image inline
			var myImage = new UIComponent({
				target : View.main,
				id : 'my-component',
				align : { 
					x:{
						type : Align.RIGHT,
						offset : -10
					},
					y: {
						type : Align.TOP,
						offset : 10
					}	
				}
			});
		</codeblock>
		<br><br>
*/
import UIDiv from './UIDiv'
import { Styles, Align, Markup } from 'ad-view'
import { UIEvent } from 'ad-events'

class UIComponent extends UIDiv {
	constructor(arg, type) {
		var _enabled = true
		var _showing = true
		var _typeDef = type || 'div'

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		arg = arg || {}
		type = _typeDef == 'svg' ? 'div' : type
		super(arg, type)

		var U = this

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PROTECTED PROPERTIES
		U._align = arg.align

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER

		Object.defineProperties(U, {
			/**
				@memberOf UIComponent
				@var {number} x
					Getter|Setter : A Number representing the x position.  Directly gets/sets the css transform x. 
				@example
					// get
					console.log( myComponent.x );
	
					// set
					myComponent.x = 7;
			*/
			x: {
				get: function() {
					//return +getTransformMatrix()[4]
					return Styles.getCss(U, 'x')
				},
				set: function(value) {
					Styles.setCss(U, {
						x: value
					})
				}
			},

			/**
				@memberOf UIComponent
				@var {number} y
					Getter|Setter : A Number representing the y position.  Directly gets/sets the css transform y.
				@example
					// get
					console.log( myComponent.y );
	
					// set
					myComponent.y = 14;
			*/
			y: {
				get: function() {
					//return +getTransformMatrix()[5]
					return Styles.getCss(U, 'y')
				},
				set: function(value) {
					Styles.setCss(U, {
						y: value
					})
				}
			},

			/**
				@memberOf UIComponent
				@var {boolean} enabled
					Getter|Setter : A Boolean to toggle if the Gesture events are active.
				@example
					// get
					console.log( myComponent.enabled );
	
					// set
					myComponent.enabled = true;
			*/
			enabled: {
				get: function() {
					return _enabled
				},
				set: function(state) {
					_enabled = state
					//U.dispatchEvent ( new CustomEvent( 'uiComponentEnabled' ))
					U.dispatchEvent(UIEvent.componentEnabled)
				}
			},

			/**
				@memberOf UIComponent
				@var {boolean} showing
					Getter|Setter : A Boolean to check if the component is currently showing. Can NOT be set.
				@example
					// get
					console.log( myComponent.showing );
			*/
			showing: {
				get: function() {
					return _showing
				},
				set: function() {
					console.log(':: WARNING ::\n\n\tUIComponent.showing cannot be set.\n\n')
				}
			}
		})

		if (_typeDef != 'canvas' && _typeDef != 'svg') {
			Object.defineProperties(U, {
				/**
					@memberOf UIComponent
					@var {number} width
						Getter|Setter : A Number representing the width of the div.  Directly gets/sets the style css width. 
					@example
						// get
						console.log( myComponent.width );
	
						// set
						myComponent.width = 140;
				*/
				width: {
					get: function() {
						return U.offsetWidth
					},
					set: function(value) {
						Styles.setCss(U, {
							width: value
						})

						var evt = new CustomEvent(UIEvent.RESIZE)
						evt.direction = 'width'
						U.dispatchEvent(evt)
					}
				},

				/**
					@memberOf UIComponent
					@var {number} height
						Getter|Setter : A Number representing the height of the div.  Directly gets/sets the style css height.
					@example
						// get
						console.log( myComponent.height );
	
						// set
						myComponent.height = 140;
				*/
				height: {
					get: function() {
						return U.offsetHeight
					},
					set: function(value) {
						Styles.setCss(U, {
							height: value
						})

						var evt = new CustomEvent(UIEvent.RESIZE)
						evt.direction = 'height'
						U.dispatchEvent(evt)
					}
				}
			})
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS

		/**
			@memberOf UIComponent
			@method hide
			@desc
				Visually removes the component from the DOM by setting its display property to none
			@example
				myComponent.hide();
		*/
		U.hide = function() {
			U.style.display = 'none'
			_showing = false
		}

		/**
			@memberOf UIComponent
			@method show
			@desc
				Visually displays the component in the DOM
			@example
				myComponent.show();
		*/
		U.show = function() {
			try {
				//console.log( '    try removeProperty()')
				U.style.removeProperty('display')
			} catch (e) {
				//console.log( '    catch display = null' )
				U.style.display = null
			}
			_showing = true
		}

		/**
			@memberOf UIComponent
			@method setCss
			@desc
				Set any of the style properites of the component.  A direct link to Styles.setCss() for convience.
			@example
				myComponent.setCss({ 
					width : 300,
					height : 150
				});
		*/
		U.setCss = function(args) {
			Styles.setCss(U, args)
		}

		/**
			@memberOf UIComponent
			@method addChild
			@desc
				Add a DOM element to the component.
			@example
				myComponent.addChild( myChild );
		*/
		U.addChild = function(elem) {
			var child = Markup.get(elem)
			U.appendChild(child)

			if (elem._align) Align.set(elem, elem._align)
		}

		/**
			@memberOf UIComponent
			@method inspect
			@desc
				Traces out an object of all the public properties and methods of the component.
			@example
				myComponent.inspect();
		*/
		U.inspect = function() {
			var o = {}
			var props = Object.getOwnPropertyNames(U)
			for (var i = 0; i < props.length; i++) {
				var val = U[props[i]]
				o[props[i]] = val
			}
			console.log('\n\t', U.toString(), '\t', U.id, '\n\t', o)
		}

		/**
			@memberOf UIComponent
			@method toString
			@desc
				A String to represet the object type.
			@example
				myComponent.toString();
		*/
		U.toString = function() {
			return '[object UIComponent]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE METHODS
		U._initAlign = function(parentTriggered) {
			var fire = parentTriggered ? parentTriggered == true : arg.target != undefined

			if (arg.align && fire) {
				Align.set(U, arg.align)
			}
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		U.enabled = true

		U._initAlign()

		return U
	}
}

export default UIComponent
