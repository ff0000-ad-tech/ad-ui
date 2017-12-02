/**
	@class TextSplitType
	@desc
		Constants defining how a {@link UISplitText} should break apart the textfields
		*/
var TextSplitType = new function() {
	return {
		/**
			@memberof TextSplitType
			@const {string} LINES
				Limits the splitting of a {@link UISplitText} to line and words only
				<br><br>
				Functionally identical to TextSplitType.WORDS
			@example
				TextSplitType.LINES
				*/
		LINES: 'lines',
		/**
			@memberof TextSplitType
			@const {string} WORDS 
				Limits the splitting of a {@link UISplitText} to line and words only
				<br><br>
				Functionally identical to TextSplitType.LINES
			@example
				TextSplitType.WORDS
				*/
		WORDS: 'words',
		/**
			@memberof TextSplitType
			@const {string} CHARACTERS
				Limits the splitting of a {@link UISplitText} to lines, words, and also characters
			@example
				TextSplitType.CHARACTERS
				*/
		CHARACTERS: 'characters'
	}
}
export default TextSplitType