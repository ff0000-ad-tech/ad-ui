/**
	@npmpackage
	@class TextSplitType
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { TextSplitType } from 'ad-ui'
		</codeblock>
		<br><br>
		
		Constants defining how a {@link UISplitText} should break apart the textfields
		*/

/**
	@memberof TextSplitType
	@const {string} LINES
		Limits the splitting of a {@link UISplitText} to line and words only
		<br><br>
		Functionally identical to TextSplitType.WORDS
	@example
		TextSplitType.LINES
		*/
export const LINES = 'lines'

/**
	@memberof TextSplitType
	@const {string} WORDS 
		Limits the splitting of a {@link UISplitText} to line and words only
		<br><br>
		Functionally identical to TextSplitType.LINES
	@example
		TextSplitType.WORDS
		*/
export const WORDS = 'words'

/**
	@memberof TextSplitType
	@const {string} CHARACTERS
		Limits the splitting of a {@link UISplitText} to lines, words, and also characters
	@example
		TextSplitType.CHARACTERS
		*/
export const CHARACTERS = 'characters'
