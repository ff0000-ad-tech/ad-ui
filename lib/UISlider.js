/**
	@npmpackage
	@class UISlider
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UISlider } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that has built-in 
		child &lt;div>s to make up a slider, which are all publicly accessible.  The list of child divs are:<br>
		<ul>
		 <li>.bg</li>
		 <li>.loaded</li>
		 <li>.track</li>
		 <li>.handle</li>
		 <li>.hitState</li>
		</ul>
		By extending {@link UIComponent} this has all of its native properties and methods.  See {@link UIComponent} 
		for more info.
		<br><br>

		<b>Sample 1</b><br>
		<codeblock>
			var mySlider = new UISlider({
				id : 'my-slider',
				target : View.main,
				css : {
					x : 0,
					y : 0,
					width : 250,
					height : 20
				},
				bg : {
					height:'30%',
					top:'35%'
				},
				track : {
					height:'30%',
					top:'35%'
				},
				handle : {
					height:'70%',
					top:'15%'
				},

				onUpdate : handleSliderUpdate
			});

			// OR assign it after the fact
			mySlider.onUpdate = handleSliderUpdate

			// OR listen for the event
			mySlider.addEventListener ( UIEvent.SLIDER_UPDATE, handleSliderUpdate );
			function handleSliderUpdate ( event ){
				console.log( mySlider.percent );
			}
		</codeblock>
		<br><br>


		<b>Sample Extension:</b><br>
		<codeblock>
			function UICustomSlider( arg ) {
				var U = new UISlider( arg );
				
				function handleBaseSliderUpdate ( event ){
					console.log( U.percent );
				}

				function handleBaseEnabled ( event ){
					var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
					U [ listener ] ( UIEvent.SLIDER_UPDATE, handleBaseSliderUpdate );
				}

				U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )
				U.enabled = true;

				return U;
			}
		</codeblock>
		<br><br>
*/
import UIComponent from './UIComponent'
import { Styles } from 'ad-view'
import { MathUtils } from 'ad-utils'
import { UIEvent, GestureEvent, Gesture } from 'ad-events'

class UISlider {
	constructor(arg) {
		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// BASE CSS
		Styles.injectStylesheet(
			'RED_uiSlider',
			'.ui-slider',
			'position:absolute; width:100%; height:100%;',
			'.ui-slider-bg, .ui-slider-track, .ui-slider-loaded, .ui-slider-handle, .ui-slider-hitState',
			'position:absolute; width:100%; height:inherit;',
			'.ui-slider-bg',
			'background-color: #666666;',
			'.ui-slider-loaded',
			'background-color: #560000; width:0%;',
			'.ui-slider-track',
			'background-color: #cc0000; width:0%;',
			'.ui-slider-handle',
			'background-color: #ffffff; width:5%; left:0%;'
		)

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE PROPERTIES
		var _percent = 0
		var _dragging = false
		var _startX = 0

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		arg = arg || {}
		var U = new UIComponent(arg)
		Styles.addClass(U, 'ui-slider')

		var children = ['bg', 'loaded', 'track', 'handle', 'hitState']
		U.elements = []
		for (var i = 0; i < children.length; i++) createChild(children[i])

		/**
			@memberOf UISlider
			@var {element} bg
				A &lt;div> at the bottom most layer, simply the background. 
			@example
				// access
				mySlider.bg

				// change style:
				Styles.setCss( mySlider.bg, { backgroundColor: '#ff0000' });
		*/

		/**
			@memberOf UISlider
			@var {element} loaded
				A &lt;div> right above the bg element, represents the loaded value when used with loaders such as with progress bars. 
			@example
				// access
				mySlider.loaded

				// change style:
				Styles.setCss( mySlider.loaded, { backgroundColor: '#ff0000' });
		*/

		/**
			@memberOf UISlider
			@var {element} track
				A &lt;div> right above the loaded element, represents the percentage of the slider.
			@example
				// access
				mySlider.track

				// change style:
				Styles.setCss( mySlider.track, { backgroundColor: '#ff0000' });
		*/

		/**
			@memberOf UISlider
			@var {element} handle
				A &lt;div> right above the track element, represents the handle at the placement of the percentage of the slider.  Will line up with the track size.
			@example
				// access
				mySlider.handle

				// change style:
				Styles.setCss( mySlider.handle, { backgroundColor: '#ff0000' });
		*/

		/**
			@memberOf UISlider
			@var {element} hitState
				A &lt;div> at the top most level, represents the hit area for the slider.  Ot is not a graphical element and generally this should not be manipulated.
			@example
				mySlider.handle
		*/

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTERS | SETTERS

		Object.defineProperties(U, {
			/**
				@memberOf UISlider
				@var {number} percent
					Getter|Setter : A Number 0-1 representing the percent position. 
				@example
					// get
					mySlider.addEventListener( UIEvent.SLIDER_UPDATE, handleSliderUpdate );

					function handleSliderUpdate( event ){
						console.log( mySlider.percent );
					}

					// set
					mySlider.percent = .65;
			*/
			percent: {
				get: function() {
					return _percent
				},
				set: function(value) {
					_percent = MathUtils.restrict(value, 0, 1)
					U.track.style.width = _percent * 100 + '%'
					U.handle.style.left = getHandlePercent() + '%'
				}
			},

			/**
				@memberOf UISlider
				@var {boolean} dragging
					Getter : A Boolean representing whether or not the slider head is currently dragging. 
			*/
			dragging: {
				get: function() {
					return _dragging
				}
			}
		})

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS

		/**
			@memberOf UISlider
			@method: onUpdate
			@desc
				A Method that will be called on the update of the slider.  This is set in the constructor or can be manually assigned.
		*/
		U.onUpdate = arg.onUpdate || function(event) {}

		/**
			@memberOf UISlider
			@method: toString
			@desc
				A String representing the object type: [object UISlider]
		*/
		U.toString = function() {
			return '[object UISlider]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PROTECTED METHODS

		/**	Method: _onUpdateslider()
				Protected Method for INTERNAL use when extending the class. Assign a handler directly to the component instance.
		*/
		U._onUpdate = function(event) {}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE METHODS
		function createChild(name) {
			U[name] = document.createElement('div')
			Styles.addClass(U[name], 'ui-slider-' + name)
			U[name].id = arg.id + '-' + name
			if (arg[name]) Styles.setCss(U[name], arg[name])
			if (arg[name] == false) U[name].style.display = 'none'
			U.appendChild(U[name])
			U.elements.push(U[name])
		}

		function positionToPercent(newX) {
			U.percent = newX / U.offsetWidth
		}

		function getHandlePercent() {
			var thumbHalf = U.handle.offsetWidth / U.offsetWidth / 2
			var perc = MathUtils.restrict(_percent, thumbHalf, 1 - thumbHalf) - thumbHalf

			return perc * 100
		}

		function dispatch() {
			// dispatching upward for extended classes such as UIProgress
			U.dispatchEvent(UIEvent.sliderUpdate)
			U.onUpdate.call(U, UIEvent.sliderUpdate)
			U._onUpdate.call(U, UIEvent.sliderUpdate)
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// EVENT HANDLERS
		function handleDown(event) {
			_dragging = true

			_startX = event.mouse.global.x - event.mouse.local.x

			positionToPercent(event.mouse.local.x)

			dispatch()
		}

		function handleUp(event) {
			_dragging = false
		}

		function handleDrag(event) {
			var pos = event.mouse.local.x

			if (event.mouse.global.x <= _startX) {
				pos = 0
			}

			positionToPercent(pos)
			dispatch()
		}

		function handleClick(event) {
			// stops a click event from bubbling up
			//event.stopImmediatePropagation();
			GestureEvent.stop(event)
		}

		function handleBaseEnabled(event) {
			var listener = U.enabled ? 'addEventListener' : 'removeEventListener'
			Gesture[listener](U.hitState, GestureEvent.PRESS, handleDown)
			Gesture[listener](U.hitState, GestureEvent.RELEASE, handleUp)
			Gesture[listener](U.hitState, GestureEvent.DRAG, handleDrag)
			Gesture[listener](U.hitState, GestureEvent.CLICK, handleClick)
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		U.addEventListener(UIEvent.ENABLED, handleBaseEnabled)

		U.enabled = true

		return U
	}
}

export default UISlider
