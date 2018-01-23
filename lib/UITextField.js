/** 
	@class UITextField
	@desc
		<a href="https://github.com/ff0000-ad-tech/ad-ui">Github repo</a>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  By extending {@link UIComponent} this has all of its native properties and methods.  
		See {@link UIComponent} for more info.
		<br><br>

		It is a DOM element that contains text and handles its styling, layout, and formatting.  There are multiple format types, which allow for different 
		use cases, whether it be an auto word wrapping paragraph style or rigid lines.  
		<br><br>

		Auto-sizing of font is built into the types, so there is no longer a need to run a secondary method.  Just set that type and it does it automatically.  
		See {@link TextFormat} for more info on each type. 
		<br><br>

		UITextfield works by utilizing native css properties to accomplish things like vertical and horizontal alignment, leading (line spacing),
		and padding. There are getter/setters for display properties so generally speaking, there should not be a need to manually manipulate the css of the content.
		Rather than having multiple nested divs that all must using their width and height to accomplish these, using the native css allows for greater control.  
		<br><br>

		So, UITextField is simply a &lt;div> and a child &lt;span> element that holds the content. That &lt;span> element is relativly placed which is how all the css 
		works, so it is advised against targeting that &lt;span> for any reason.  Use the top level for animation.
		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>
			// creates a textfield on Main container that displays text in a line
			T.myTextField = new UITextField({
				target : T,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 300,
					height : 90
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.INLINE,
				alignText : Align.CENTER,
				bufferText : {
					top : 1,
					bottom : 1,
					left : 5,
					right : 5
				},
				leading : .8,
				spacing : 2,
				text : 'This is my awesome sentence!'
			});

			// referenced later anywhere outside the class by
			View.main.myTextField
		</codeblock>
		<br><br>


		<b>Sample 2:</b><br>
		<codeblock>
			// creates a textfield that displays text as a paragraph, but resizes to fit the container
			T.myTextField = new UITextField ({
				target : T,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 200,
					height : 90
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.PARAGRAPH_FIT,
				alignText : Align.LEFT,
				leading : .8,
				text : 'This is my awesome sentence!'
			});
		</codeblock>
		<br><br>


		<b>Sample 3:</b><br>
		<codeblock>
			// creates a textfield and resizes the container to fit the text
			adData.elements.myTextField = new UITextField ({
				target : View.main,
				id : 'my-textfield',
				css : {
					x : 50,
					y : 200,
					width : 30,
					height : 10
				},
				fontSize : 30,
				fontFamily : 'template_font',
				format : TextFormat.INLINE_CLAMP,
				alignText : Align.LEFT,
				leading : .8,
				text : 'This is my awesome sentence!'
			});
		</codeblock>
		<br><br>
*/
import UIComponent from './UIComponent'
import {
	Styles
} from 'ad-view'
import {
	MathUtils
} from 'ad-utils'

class UITextField {
	constructor(arg) {
		/* 
			VERSION
			- 2016.07.27
				
			TODO 
			- debug - use class
		   
		   BUGS
			- 

			CODE NOTE
				div {
					width: 250px;
					height: 100px;
					text-align: center;
					border: 1px solid #123456;
					font-size: 24px;
					display: inline-block;
				}

				span {
					display: table-cell;
					vertical-align: center;
					height: 100px;
					width: 250px;
					line-height: 130%;
					background-color: rgba(200,0,0,.5);
				}
		*/

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// BASE CSS
		Styles.injectStylesheet('RED_uiTextfield',
			'.ui-textfield', 'position:absolute; white-space:nowrap;',
			'.smooth-text', '-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;',
			'.ui-textfield .content', 'position:relative; display:table-cell; cursor:default; pointer-events:none; line-height:100%; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;'
		)

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE PROPERTIES	
		var _alignText;
		var _fontSize = 0;
		var _fontFamily;
		var _format = '';
		var _leading;
		var _spacing;
		var _bufferText = {
			top: 0,
			bottom: 0,
			left: 0,
			right: 0
		};
		var _text = '';
		var _init = true;

		var _verticalAlign;
		var _smoothing;

		var _defaults = {}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// MARKUP
		arg = arg || {};
		var U = new UIComponent(arg);
		Styles.addClass(U, 'ui-textfield');

		var _content = document.createElement('span');
		Styles.addClass(_content, 'content');
		U.appendChild(_content);

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER

		Object.defineProperties(U, {

			/**
				@memberOf UITextField
				@var {string|Align} alignText
					Getter|Setter : A String, or {@link Align} constant, representing the alignment of the text content inside the UITextField.
				@example
					// change the size of the font
					adData.elements.myTextField.alignText = Align.BOTTOM_RIGHT;

					// get the current size of the font
					trace ( adData.elements.myTextField.alignText );
			*/
			alignText: {
				get: function () {
					return _alignText;
				},
				set: function (value) {
					//trace ( 'UITextfield :: SET -> alignText =', value )	
					if (value && _alignText != value) {
						_alignText = value;

						var ta = (_alignText.match(/(left|right)/gi) || ['center'])[0].toLowerCase();
						Styles.setCss(U, {
							lineHeight: U.height,
							textAlign: ta
						});

						_verticalAlign = (_alignText.match(/(bottom|top)/gi) || ['middle'])[0].toLowerCase();
						Styles.setCss(_content, {
							verticalAlign: _verticalAlign
						})
					}
				}
			},


			/**
				@memberOf UITextField
				@var {number} fontSize
					Getter|Setter : A Number representing the current size of the text font. 
				@example
					// change the size of the font
					adData.elements.myTextField.fontSize = 14;

					// get the current size of the font
					trace ( adData.elements.myTextField.fontSize );
			*/
			fontSize: {
				get: function () {
					return _fontSize;
				},
				set: function (value) {
					if (!isNaN(value) && value > 0) {
						_fontSize = value;
						U.style.fontSize = ~~value + 'px';

						update();
					}
				}
			},


			/**
				@memberOf UITextField
				@var {string} fontFamily
					Getter|Setter : A String representing the current font family being assigned to the text. 
				@example
					// change the font 
					adData.elements.myTextField.fontFamily = 'Arial';

					// get the current font
					trace ( adData.elements.myTextField.fontFamily );
			*/
			fontFamily: {
				get: function () {
					return _fontFamily;
				},
				set: function (value) {
					_fontFamily = value;
					U.style.fontFamily = value;
					update();
				}
			},


			/**
				@memberOf UITextField
				@var {string|TextFormat} format
					Getter|Setter : A String, or {@link TextFormat} constant, representing the layout type for the text within the UITextField.  
					<br><br>

					This is what defines if the text is either in a line, word wrapped like a paragraph, has auto sizing to the font soze or if the 
					UITextField is resized to the content.  See {@link TextFormat} for more info.
				@example
					adData.elements.myTextField = new UITextField({
						target : View.main,
						id : 'my-textfield',
						css : {
							width : 200,
							height : 90
						},
						fontSize : 30,
						format : TextFormat.INLINE,
						text : 'This is my awesome sentence!'
					});

					// change from an inline to a word warping paragraph style
					adData.elements.myTextField.format = TextFormat.PARAGRAPH;

					// change back to inline with autosizing
					adData.elements.myTextField.format = TextFormat.INLINE_FIT;

					// change back to a word warpping paragraph style that auto sizes the font to fit perfectly
					adData.elements.myTextField.format = TextFormat.PARAGRAPH_FIT;

					// resize the UITextField to fit the size of all the text as inline
					adData.elements.myTextField.format = TextFormat.INLINE_CLAMP;

					// resize the UITextField to fit the size of all the text as a paragraph
					adData.elements.myTextField.format = TextFormat.PARAGRAPH_CLAMP;
			*/
			format: {
				get: function () {
					return _format;
				},
				set: function (value) {
					//trace ( 'UITextfield :: SET -> format =', value )	
					if (_format != value) {
						_format = value;
						// any inline type uses 'nowrap' / any paragraph uses 'normal'
						Styles.setCss(U, {
							whiteSpace: (/inline/g.exec(_format) != null) ? 'nowrap' : 'normal'
						});
						update();
					}
				}
			},


			/**
				@memberOf UITextField
				@var {number} leading
					Getter|Setter : A Number representing the percentage of spacing between each line relative to the font size.
					<br><br>

					By default, a value of 1 is equal to a default line-height value similar to Photoshop. A value of 0 will have each line on top of each other, 
					as if it was written over the previous line.  So to create a look that is slightly tighter than default, you would use something like a value of .8 to bring
					the lines a little closer together. 
					<br><br>

					The use of a percentage allows for the font size to change without having to redefine the line-height spacing.
				@example
					// change the percentage of spacing between lines relative to the font size
					adData.elements.myTextField.leading = .8;

					// get the current percentage of spacing between lines relative to the font size
					trace ( adData.elements.myTextField.leading );
			*/
			leading: {
				get: function () {
					return _leading;
				},
				set: function (value) {
					//trace ( 'UITextfield :: SET -> leading =', value )	
					if (value && _leading != value) {
						_leading = value;

						Styles.setCss(_content, {
							lineHeight: (_leading * 100) + '%'
						});

						update();
					}
				}
			},


			/**
				@memberOf UITextField
				@var {number} spacing
					Getter|Setter : A Number representing the spacing between each letter.
				@example
					// change the spacing between each letter
					adData.elements.myTextField.spacing = 3;

					// get the current letter spacing
					trace ( adData.elements.myTextField.spacing );
			*/
			spacing: {
				get: function () {
					return Styles.getCss(U, 'letter-spacing') || _spacing;
				},
				set: function (value) {
					if (value && _spacing != value) {
						_spacing = value;

						Styles.setCss(U, {
							letterSpacing: value
						});

						update();
					}
				}
			},


			/**
				@memberOf UITextField
				@var {number|array} bufferText
					Getter|Setter : A Number or Array of Numbers representing the amount of spacing from the edges of the UITextField and the 
					text content.
					<br><br>

					This sets the css margin, but also is used for calculations for auto sized formats.  Setting the margin 
					manually will cause layout issues as the class does not have those numbers to calculate against.
				@example
					// set the padding on all 4 sides uniformly
					adData.elements.myTextField.bufferText = 5;

					// set the padding on top & bottom = 7 and left & right = 5
					adData.elements.myTextField.bufferText = [7,5];

					// set the top = 7, right = 3, bottom = 5, left = 6
					adData.elements.myTextField.bufferText = [7,3,5,6];

					// get the current padding
					trace ( adData.elements.myTextField.bufferText );
			*/
			bufferText: {
				get: function () {
					return _bufferText;
				},
				set: function (value) {
					//trace ( 'UITextfield :: SET -> bufferText =', value )	
					if (value && _bufferText != value) {

						var style = '';
						var order = ['top', 'right', 'bottom', 'left']

						for (var i = 0; i < 4; i++) {
							var prop = order[i];
							var propValue = isNaN(value) ? (value[prop] || 0) : value;
							//trace ( i, prop, propValue, value[prop] )
							_bufferText[prop] = propValue;
							style += propValue + 'px ';
						}

						Styles.setCss(_content, {
							padding: style
						});

						update();
					}
				}
			},


			/**
				@memberOf UITextField
				@var {string} text
					Getter|Setter : A String representing the current String text content. 
				@example
					// change the display text
					adData.elements.myTextField.text = "Change my text to say this.";

					// get the current display text
					trace ( adData.elements.myTextField.text );
			*/
			text: {
				get: function () {
					return _text;
				},
				set: function (value) {
					//trace ( 'UITextfield :: SET -> text =', value )	
					if (value != undefined && value != '') {
						_text = value;
						U.setDefault('text', value)
						_content.innerHTML = value;
						update();
					}
				}
			},


			/**
				@memberOf UITextField
				@var {boolean} smoothing
					Getter|Setter : A Boolean to add or remove the css smoothing: <code>-webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;</code>
				@example
					adData.elements.myTextField.smoothing = false;
					//
					// get the current smoothing
					trace ( adData.elements.myTextField.smoothing );
			*/
			smoothing: {
				get: function () {
					return _smoothing;
				},
				set: function (value) {
					_smoothing = value;
					Styles[_smoothing ? 'addClass' : 'removeClass'](_content, 'smooth-text');
				}
			}
		});


		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PUBLIC METHODS

		/**
			@memberOf UITextField
			@method resetToDefault
			@param {args} arguments
			@desc
				Change specific properties, or all properties (by passing nothing in) back to their default values, which are initally set to the values passed in upon instantiation
				of a UITextField. This is useful when reusing this for multiple inputs, such as with carousels where the content is
				of various sizes.
			@example
				// reset specific default values
				myTextField.resetToDefault( 'leading', 'fontSize' );

				// reset all default values
				myTextField.resetToDefault();
		*/
		U.resetToDefault = function () {
			_init = true;
			if (arguments.length > 0) {
				for (var i = 0; i < arguments.length; i++) {
					U[arguments[i]] = _defaults[arguments[i]];
				}

			} else {
				//			trace ( Array(100).join('*') )
				//			trace ( _defaults )
				for (var param in _defaults) {
					// check for the param first, only errors in IE11/Win7
					// also check for undefined becusue only checking the key will be false with a 0 value
					if (U[param] != undefined) {
						U[param] = _defaults[param];
					}
				}
			}
			_init = false;
			update()
		}

		/**
			@memberOf UITextField
			@method setDefault
			@desc
				Assign a default value, so that when resetToDefault() is called, it will include this value.
			@example
				myTextField.setDefault( 'fontSize', 16 );
		*/
		U.setDefault = function (key, value) {
			_defaults[key] = value;
		}

		U.toString = function () {
			return '[object UITextfield]';
		}


		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// PRIVATE METHODS
		function initDefaults() {
			for (var a in arg) {
				if (a == 'css') {
					for (var b in arg.css) {
						switch (b) {
							case 'x':
							case 'y':
							case 'width':
							case 'height':
								_defaults[b] = arg.css[b]
								break;
						}
					}
				} else if (a == 'bufferText') {
					_defaults[a] = {}
					for (var prop in _bufferText) {
						_defaults[a][prop] = arg[a][prop] || 0
					}
				} else {
					_defaults[a] = arg[a]
				}
			}
			//trace ( 'defaults:', _defaults )
			delete _defaults.target;
			delete _defaults.id;
		}

		function update() {
			if (_init) return;

			switch (_format) {
				case 'paragraphClamp':
				case 'inlineClamp':
					resizeToContent();
					break;

					// FitClamp types are 2 phases, easiest to temp change it, run update twice, and set it back
				case 'inlineFitClamp':
					_format = 'inlineFit';
					autoSizeContent();
					_format = 'inlineClamp';
					resizeToContent();
					_format = 'inlineFitClamp';
					break;
				case 'paragraphFitClamp':
					_format = 'paragraphFit';
					autoSizeContent();
					_format = 'paragraphClamp';
					resizeToContent();
					_format = 'paragraphFitClamp';

				default:
					autoSizeContent();
			}
		}

		function autoSizeContent() {
			//temp set it to default for resizing
			Styles.setCss(_content, {
				verticalAlign: 'auto',
				height: 'auto',
				width: 'auto'
			});

			if (_format == 'paragraphFit') {
				var tempFontSize = _fontSize;

				// check the height first to allow for word wrap to fit vertically first
				while (U.scrollHeight > U.offsetHeight) {
					if (tempFontSize <= 0) break;
					tempFontSize--;
					U.style.fontSize = tempFontSize + 'px';
				}

				// then, if it is still overspraying horizontally, shrink again to fit
				while (U.scrollWidth > U.offsetWidth) {
					if (tempFontSize <= 0) break;
					tempFontSize--;
					U.style.fontSize = tempFontSize + 'px';
				}

				_fontSize = tempFontSize;
				U.style.fontSize = _fontSize + 'px';

			} else if (_format == 'inlineFit') {

				// NOTE: IE wont return correct width/height if the font is smaller than the parent, so using large numbers for ratios
				var parentWidth = U.offsetWidth;
				var parentHeight = U.offsetHeight;

				U.style.fontSize = '243px';
				var largeWidth = _content.offsetWidth;
				var largeHeight = _content.offsetHeight;

				U.style.fontSize = '182px';
				var smallWidth = _content.offsetWidth;
				var smallHeight = _content.offsetHeight;

				var fontSizeWidth = MathUtils.rel(243, 182, largeWidth, smallWidth, parentWidth);
				var fontSizeHeight = MathUtils.rel(243, 182, largeHeight, smallHeight, parentHeight);

				_fontSize = ~~Math.min(_fontSize, Math.min(fontSizeWidth, fontSizeHeight));

				U.style.fontSize = _fontSize + 'px';
			}

			if (_verticalAlign) {
				Styles.setCss(_content, {
					verticalAlign: _verticalAlign,
					height: U.offsetHeight - _bufferText.top - _bufferText.bottom,
					width: U.offsetWidth - _bufferText.left - _bufferText.right
				});
			}
		}

		function resizeToContent() {
			//Styles.setCss( U, { lineHeight: 'normal' });
			//Styles.setCss( _content, { lineHeight:'normal', verticalAlign:'auto' });

			// set the content width/height for assigning clamp after created with fit
			Styles.setCss(_content, {
				height: 'auto',
				width: 'auto'
			});

			U.width = _content.offsetWidth;
			U.height = _content.offsetHeight;
		}

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		U.enabled = true;

		initDefaults();

		U.format = arg.format;
		U.fontSize = arg.fontSize;
		U.fontFamily = arg.fontFamily || 'Arial';
		U.alignText = arg.alignText;
		U.bufferText = arg.bufferText;
		U.leading = arg.leading;
		U.spacing = arg.spacing;
		U.smoothing = arg.smoothing != false;

		_init = false;
		U.text = arg.text;

		U._initAlign();

		return U;
	}
}

export default UITextField