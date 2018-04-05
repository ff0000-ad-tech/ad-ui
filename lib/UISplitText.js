/** 
	@npmpackage
	@class UISplitText

	@param {arg} arg
		The OBJECT containing all of your UITextField and UISplitText arguments

		@property {TextSplitType|string} arg.splitType
			STRING determing if the UISplitText should break a UITextField into individuals words or characters; defaults to TextSplitType.WORDS.

		@property {boolean} arg.allowSpaceOnBreaks
			BOOLEAN determining if a line break should include a space following non-punctuational characters. For example: "word " rather than "word"; defaults to false.
			<br>
			<img src="../docs_images/uisplittext/breakSpace_true.jpg" />
			<br>
			<br>
			<img src="../docs_images/uisplittext/breakSpace_false.jpg" /> 
			<br>

		@property {string} arg.spaceBreakIncludes
			STRING determining what specific characters should be included as part of any line breaks if arg.allowSpaceOnBreaks is set to true; defaults to a-z, A-Z, and 0-9 represented as '[a-z0-9].'

		@property {boolean} arg.debug
			BOOLEAN for if you want a debug version featuring a background color and an unadulterated and un-split UITextField to compare your UISplitText instance to; defaults to false.

	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br><br>
		
		This is a display object class, utilizing {@link UISplitText} and {@link UIComponent}.  By extending {@link UIComponent} this has all of its native properties and methods.  
		See {@link UISplitText} and {@link UIComponent} for more info.
		<br><br>

		It is a DOM {@link UIComponent} element that contains text and handles its styling, layout, and formatting in all the same ways as {@link UITextField}. The difference, however, is the it returns a container with each line, word, or character of text broken into individual {@link UITextField}s.
		<br><br>

		By default, a UISplitText will convert a {@link UITextField} into individual words or letters, and group them into {@link UIComponent}s.
		<br><br>
		<b>For Example:</b>
		<br>setting the splitType to TextSplitType.WORDS will create a {@link UIComponent} per line and a {@link UITextField} per word.
		<br>setting the splitType to TextSplitType.CHARACTERS will create a {@link UIComponent} per line, a {@link UIComponent} per word, and a {@link UITextField} per character.
		<br><br>
		UISplitText returns a {@link UIComponent}, representing the main container of the lines, words, and possibly characters.
		<br>
		This container contains arrays:
		<codeblock>
			// an array of every line of text; each line is a UIComponent
			_mySplitText.lines;

			// an array of every word of text. If arg.splitType === TextSplitType.CHARACTERS, these will be UIComponents, otherwise they are UITextFields
			_mySplitText.words;

			// an array of every character of text; each character is a {@link UITextField}
			_mySplitText.characters;
		</codeblock>
		<br><br>

		<b>Sample:</b><br>
		<codeblock>
			// creates a {@link UITextField} that breaks each character of the text value into its own {@link UITextField}
			T.mySplitText = new UISplitText({
				target : View.main,
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
				text : 'This is my awesome sentence!',
				splitType: TextSplitType.CHARACTERS
			});

			// tweens the main container for the lines, words, and characters
			TweenLite.from ( View.main.mySplitText.lines[l], 1, {scale: 0 });

			// tweens each LINE of text from an alpha of 0
			for (var l = 0; l < View.main.mySplitText.lines.length; l++){
				TweenLite.from ( View.main.mySplitText.lines[l], 1, {alpha: 0 });
			}

			// tweens each WORD of text from a rotation of 180
			for (var w = 0; w < View.main.mySplitText.words.length; w++){
				TweenLite.from ( View.main.mySplitText.words[w], 1, {rotation: 180 });
			}

			// tweens each CHARACTER of text from a scale of of 2
			for (var c = 0; c < View.main.mySplitText.characters.length; c++){
				TweenLite.from ( View.main.mySplitText.characters[c], 1, {scale: 2 });
			}
		</codeblock>
		<br><br>
		*/
import UITextField from './UITextField'
import UIComponent from './UIComponent'
import UIGroup from './UIGroup'
import * as TextFormat from './TextFormat'
import { Styles, Align, Clamp } from 'ad-view'
import { ObjectUtils, ColorUtils } from 'ad-utils'

class UISplitText {
	constructor(arg) {
		return this._init(arg)
	}

	_init(arg) {
		var self = this

		// var _buffer = arg.bufferText;
		delete arg.bufferText

		arg.text = _mySplitText = arg.text.replace(/<br>/g, ' <br>')

		var _stringArray = []
		var _spanEnd = '</span>'
		var _spanIndexStart = _mySplitText.indexOf('<span')
		var _spanIndexEnd = _mySplitText.indexOf(_spanEnd)
		while (_spanIndexStart >= 0) {
			// push anything BEFORE the span into the array
			var _removeStr = _mySplitText.substring(0, _spanIndexStart)
			_stringArray.push(_removeStr)

			// strip the SPAN out of the text
			_mySplitText = _mySplitText.replace(_removeStr, '')
			console.log(_mySplitText)
			console.log(0, _mySplitText.indexOf('>') + 1)
			_removeStr = _mySplitText.substring(0, _mySplitText.indexOf('>') + 1)

			// push the text into the array
			_stringArray.push(_removeStr)

			_mySplitText = _mySplitText.replace(_removeStr, '')
			_spanIndexStart = _mySplitText.indexOf('<span')
		}

		_stringArray.push(_mySplitText)

		var _finalArray = []
		for (var t = 0; t < _stringArray.length; t++) {
			var _temp = _stringArray[t].split(_spanEnd)
			_finalArray.push(_temp[0])

			if (_temp.length > 1) {
				_finalArray.push(_spanEnd)
				_finalArray.push(_temp[1])
			}
		}

		// Now that we have looked at the entire string, make the primary reference UITextField out of it
		var _mainTF = new UITextField(arg)

		if (!arg.text || !arg.text.length) {
			_mainTF.lines = []
			_mainTF.words = []
			_mainTF.characters = []
			return _mainTF
		}

		var _parsedWords = []
		for (var t = 0; t < _finalArray.length; t++) {
			var _temp = _finalArray[t].indexOf('span') >= 0 ? [_finalArray[t]] : _finalArray[t].split(' ')

			for (var i = 0; i < _temp.length; i++) if (_temp[i]) _parsedWords.push(_temp[i])
		}

		var _textContainer = new UIComponent({
			target: arg.target,
			id: '_textContainer',
			css: ObjectUtils.defaults(
				{
					x: _mainTF.x,
					y: _mainTF.y,
					width: _mainTF.width,
					height: _mainTF.height,
					opacity: 1,
					backgroundColor: arg.debug ? 'cyan' : arg.css.backgroundColor || null
				},
				arg.css,
				true
			)
		})

		_textContainer.appendChild(_mainTF)

		var _prevText
		var _x = 0
		var _y = 0
		var _textLines = {
			line1: {
				width: 0,
				children: []
			}
		}
		var _lineNum = 1
		var _lineWidth = 0

		// this creates a placeholder which effectively mimics the sizing of a space
		// a space in UITextField - " " - is equal to null, and renders no sizing information
		arg.text = '|'
		var _spaceText = new UITextField(arg)
		var _spacing = _spaceText.width //Math.ceil(_mainTF.fontSize / (3.7 / (arg.padding || arg.spacing || 1)));
		_spaceText.parent.removeChild(_spaceText)
		_spaceText = null

		// define the arguments for each individual thing we will make
		delete arg.css.overflow
		var _textArgs = {
			target: _textContainer,
			css: ObjectUtils.clone(arg.css),
			format: TextFormat.INLINE_CLAMP,
			fontSize: _mainTF.fontSize,
			fontFamily: _mainTF.fontFamily,
			alignText: _mainTF.alignText,
			leading: _mainTF.leading,
			spacing: _mainTF.spacing,
			smoothing: _mainTF.smoothing
		}

		if (arg.debug) {
			Styles.setCss(_mainTF, {
				color: ColorUtils.invert({
					color: _textArgs.css.color
				})
			})
		}

		var _span
		var _appendBreakToNext
		for (var i = 0; i < _parsedWords.length; i++) {
			var _word = _parsedWords[i]
			var _wordHasBreak = _word.indexOf('<br>') >= 0
			if (_word === '<br>') {
				_appendBreakToNext = true
			}
			_word = _word.replace(/<br>/g, '')

			// SOMETHING ABOUT STRIPPING AND REPLACING [LARGE] REMOVES A LINE BREAK;

			if (_word.indexOf('<span') >= 0) {
				_span = _word
				continue
			} else if (_word.indexOf('span>') >= 0) {
				_span = null
				continue
			}

			if (_word) {
				if (_appendBreakToNext) _wordHasBreak = true
				_appendBreakToNext = false

				// if (_span) _word = _span + _word + _spanEnd;

				var _clone = ObjectUtils.clone(_textArgs)

				_clone.css.x = _x
				_clone.css.y = _y
				_clone.text = _word
				_clone.id = _word

				if (_span) _clone.text = _span + _word + _spanEnd

				var _newWord = new UITextField(_clone)
				_newWord.copy = _word
				_newWord.span = _span

				// if our text is a paragraph, we want some line breaks. Do that here.
				if (_wordHasBreak || (_mainTF.format.indexOf('paragraph') >= 0 && _newWord.width + _newWord.x > _mainTF.width)) {
					_lineNum++
					_textLines['line' + _lineNum] = {
						width: 0,
						children: []
					}
					_newWord.x = _x = 0
					_y += _newWord.height
					_newWord.y = _y
					_textLines['line' + _lineNum].width = 0
				} else if (_prevText) {
					Align.set(_newWord, {
						y: {
							type: Align.CENTER,
							against: _prevText
						}
					})
				}

				_x += _newWord.width + _spacing

				_textLines['line' + _lineNum].width = _newWord.x + _newWord.width
				_textLines['line' + _lineNum].children.push(_newWord)

				_prevText = _newWord
			}
		}

		var _newLine
		var _offset
		var _prevGroup
		_textContainer.words = []
		_textContainer.lines = []
		for (var line in _textLines) {
			_newLine = _textLines[line]
			for (var l = 0; l < _newLine.children.length; l++) {
				var _child = _newLine.children[l]
				_textContainer.words.push(_child)

				if (_mainTF.alignText !== Align.LEFT) {
					_offset = _mainTF.width - _newLine.width
					if (_mainTF.alignText === Align.CENTER) _offset /= 2
					_child.x += _offset
				}
			}

			var _group = new UIGroup({
				children: _newLine.children,
				target: _textContainer
			})

			if (_prevGroup) _group.y = _prevGroup.y + _prevGroup.height * 1

			var _lastChar = _group.childNodes[_group.childNodes.length - 1]
			_lastChar = _lastChar.text.substring(_lastChar.text.length - 1, _lastChar.text.length)
			if (arg.allowSpaceOnBreaks && _lastChar.match(new RegExp(arg.spaceBreakIncludes || 'a-z0-9]', 'gi'))) _group.x -= _spacing

			_textContainer.lines.push(_group)
			_prevGroup = _group
		}

		var _splitType = arg.splitType || TextSplitType.WORDS
		if (_splitType === TextSplitType.CHARACTERS) {
			_textContainer.characters = []
			for (var w = 0; w < _textContainer.words.length; w++) {
				var _word = _textContainer.words[w]
				var _copy = _word.copy
				while (_word.childNodes.length > 0) _word.removeChild(_word.childNodes[0])

				var _x = 0
				var _newLetter
				var _originalW = _word.width
				for (var l = 0; l < _copy.length; l++) {
					_textArgs.css.x = _x
					_textArgs.css.y = 0

					_textArgs.target = _word
					_textArgs.text = _word.span ? _word.span + _copy[l] + _spanEnd : _copy[l]
					_textArgs.id = _copy + '_' + _copy[l]

					_newLetter = new UITextField(_textArgs)
					_x += _newLetter.width
					_textContainer.characters.push(_newLetter)
				}
				Clamp.set(_word, Clamp.XY)
				Styles.setCss(_word, {
					overflow: 'inherit',
					backgroundColor: null
				})

				if (_originalW < _word.width && _word.childNodes.length) {
					var _offset = (_word.width - _originalW) / (_word.childNodes.length - 1)
					for (l = 1; l < _word.childNodes.length; l++) {
						_newLetter = _word.childNodes[l]
						_newLetter.x -= Math.abs(_offset * l)
					}
				}
			}

			if (arg.allowSpaceOnBreaks) for (var l = 0; l < _textContainer.lines.length; l++) Clamp.set(_textContainer.lines[l], Clamp.XY)
		}

		if (arg.debug) {
			_mainTF.x = _mainTF.y = 0
		} else {
			_textContainer.removeChild(_mainTF)
			_mainTF = null
		}

		Clamp.set(_textContainer, Clamp.XY)

		return _textContainer
	}
}

export default UISplitText
