/**
	@npmpackage
	@class UIImage
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIImage } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that has default values for the background image styles.
		They can still be overwritten by simply changing them with {@link Styles.setCss} or the native {@link UIComponent.setCss} method directly on the UIImage instance.
		<br><br>

		By default, UIImage has these styles set:<br>
		<codeblock>
			background-repeat : no-repeat; 
			background-size : contain;
		</codeblock>
		<br><br>

		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>


		<b>Sample 1:</b><br>
		<codeblock>
			// bare minimum creation - image source is required, but can be added to anything and named later.
			var myImage = new UIImage({
				source : 'template_image'
			});
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// simple creation - no style
			// Added to a container, such as Main
			T.myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image'
			});
		</codeblock>
		<br><br>
		

		<b>Sample 3:</b><br>
		<codeblock>
			// simple creation using a double sized source image
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				retina : true
			});
		</codeblock>
		<br><br>
		

		<b>Sample 4:</b><br>
		<codeblock>
			// create with assigned styles
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				css : {
					x : 36,
					y : 14,
					width : 120,
					height: 140
				}
			});
		</codeblock>
		<br><br>
		

		<b>Sample 5:</b><br>
		<codeblock>
			// create with only a known height, but maintain the aspect ratio
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				css : {
					width : 120
				},
				aspectRatio : true
			});
		</codeblock>
		<br><br>


		<b>Sample 6:</b><br>
		<codeblock>
			// create and align the image inline
			var myImage = new UIImage({
				target : T,
				id : 'my-image',
				source : 'template_image',
				align : { 
					x:{
						type : Align.RIGHT,
						offset : -10
					},
					y: {
						type : Align.TOP,
						offset : 10
					}	
				},
				aspectRatio : true
			});
		</codeblock>
		<br><br>
		
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
import UIComponent from './UIComponent'
import { ImageManager } from 'ad-control'
import { Styles } from 'ad-view'
import { UIEvent } from 'ad-events'

class UIImage {
	constructor(arg) {
		/* TODO
				- lock aspect ratio (booleam?)
		*/
		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// BASE CSS
		Styles.injectStylesheet('RED_uiImage', '.ui-image', 'background-repeat:no-repeat; background-size:contain;')

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE PROPERTIES
		var _init = true
		var _source = null
		var _retina = false
		var _ratio = 'contain'
		var _aspectRatio = !!arg.aspectRatio
		var _css = arg.css || {}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		if (!arg.source) throw new Error("UIImage : No image source set on '" + arg.id + "'")

		arg.css = arg.css || {}

		var U = new UIComponent(arg)
		Styles.addClass(U, 'ui-image')

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER
		Object.defineProperties(U, {
			/**
				@memberOf UIImage
				@var {string} source
				@desc
					Getter|Setter : The Image element id, via {@link ImageManager}, can be changed if need be but best to just make a new UIImage if a new source is needed.
					Also, use this if you need to access the image for things like getting the original width or height.  
				@example
					// get
					console.log( myImage.source );
	
					// set
					myImage.source = 'template_image';
			*/
			source: {
				get: function() {
					return _source
				},
				set: function(value) {
					_source = ImageManager.get(value)
					U.style.backgroundImage = 'url(' + _source.src + ')'
				}
			},

			/**
				@memberOf UIImage
				@var {boolean} retina
				@desc
					Getter|Setter : A Boolean to determine if the image source is double the size of the desired width & height. This is only relevant
					if when creating a new UIImage, you do not proved a width or height value.  If you do, the UIImage will simply be
					the size provided. 
				@example
					// get
					console.log( myImage.retina );
	
					// set
					myImage.retina = false;
			*/
			retina: {
				get: function() {
					return _retina
				},
				set: function(value) {
					_retina = value
					resize()
				}
			},

			/**
				@memberOf UIImage
				@var {string} ratio
					Getter|Setter : A String to set the background-size property.  Use the {@link Ratio} class for constants that are easier
					to understand: {@link Ratio.EXACT}, {@link Ratio.FIT}, {@link Ratio.FILL}, {@link Ratio.STRETCH}
				@example
					// get
					console.log( myImage.ratio );
	
					// set
					myImage.ratio = Ratio.FILL;
			*/
			ratio: {
				get: function() {
					return _ratio
				},
				set: function(value) {
					_ratio = value
					U.style.backgroundSize = value
				}
			},

			/**
				@memberOf UIImage
				@var {boolean} aspectRatio
				@desc
					Getter|Setter : A Boolean to allow for the size of the element to maintain aspect ratio when either the width or height
					are changed by directly setting them on the element, ie UIImage.width or UIImage.height.  If using Styles.setCss() this will NOT work.
				@example
					// get
					console.log( myImage.aspectRatio );
	
					// set
					myImage.aspectRatio = true;
			*/
			aspectRatio: {
				get: function() {
					return _aspectRatio
				},
				set: function(value) {
					_aspectRatio = value
					resize()
				}
			}
		})

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS
		U.toString = function() {
			return '[object UIImage]'
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE METHODS
		function resize(direction) {
			var denominator = _retina ? 2 : 1
			var ratio = _source.width / _source.height

			var sourceWidth = arg.css.width || _source.width
			var sourceHeight = arg.css.height || _source.height

			var updateWidth = arg.css.width == undefined
			var updateHeight = arg.css.height == undefined

			if (!_init) {
				updateWidth = direction == 'height'
				updateHeight = direction == 'width'
				sourceWidth = U.width
				sourceHeight = U.height
			}

			if (updateWidth) {
				var width
				if (_aspectRatio && !updateHeight) {
					width = sourceHeight * ratio
				} else {
					width = sourceWidth / denominator
				}
				U.style.width = Math.round(width) + 'px'
			}

			if (updateHeight) {
				var height

				if (_aspectRatio && !updateWidth) {
					height = sourceWidth / ratio
				} else {
					height = sourceHeight / denominator
				}
				U.style.height = Math.round(height) + 'px'
			}
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// EVENT HANDLERS
		function handleResize(event) {
			console.log('handleResize()', event, event.direction)
			resize(event.direction)
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		U.addEventListener(UIEvent.RESIZE, handleResize)

		U.source = arg.source
		U.retina = !!arg.retina

		if (arg.ratio) U.ratio = arg.ratio

		U._initAlign()
		_init = false

		return U
	}
}

export default UIImage
