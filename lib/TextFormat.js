/**
	@npmpackage
	@class TextFormat
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { TextFormat } from 'ad-ui'
		</codeblock>
		<br><br>
		
		Custom constants to identify the layout type for a <UITextField>.  Each type changes the format of how the text content
		is displayed and will run an internal auto size if applicable to the type.
*/

/**
	@memberOf TextFormat
	@const {string} INLINE
	@desc
		UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
		If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
		This does NOT auto size and will overflow horizontally and vertically depending on the width and height.
		<br>
		<img src="../docs_images/textformat/inline.png" />
	@example
		TextFormat.INLINE
*/
export const INLINE = 'inline'

/**
	@memberOf TextFormat
	@const {string} INLINE_CLAMP
		UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
		If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
		This does NOT auto size, however it changes the width AND height of the UITextField to clamp to the size of the content.
		<br>
		<img src="../docs_images/textformat/inline_clamp.png" />
	@example
		TextFormat.INLINE_CLAMP
*/
export const INLINE_CLAMP = 'inlineClamp'

/**
	@memberOf TextFormat
	@const {string} INLINE_FIT
		UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
		If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
		This DOES auto size and will shrink horizontally and vertically to fit inside the width and height.
		<br>
		<img src="../docs_images/textformat/inline_fit.png" />
	@example
		TextFormat.INLINE_FIT
*/
export const INLINE_FIT = 'inlineFit'

/**
	@memberOf TextFormat
	@const {string} INLINE_FIT_CLAMP
		This is a combination that applies TextFormat.INLINE_FIT followed by TextFormat.INLINE_CLAMP
		<br>
		<img src="../docs_images/textformat/inline_fit.png" />
		<br>
		<b>would then become</b>
		<br>
		<img src="../docs_images/textformat/inline_fit_clamp.png" />
	@example
		TextFormat.INLINE_FIT_CLAMP
*/
export const INLINE_FIT_CLAMP = 'inlineFitClamp'

/**
	@memberOf TextFormat
	@const {string} PARAGRAPH
		UITextField uses word wrapping to automatically break lines creating a paragraph layout.
		This does NOT auto size and will overflow vertically, just like a webpage.
		<br>
		<img src="../docs_images/textformat/paragraph.png" />
	@example
		TextFormat.PARAGRAPH
*/
export const PARAGRAPH = 'paragraph'

/**
	@memberOf TextFormat
	@const {string} PARAGRAPH_CLAMP
		UITextField uses word wrapping to automatically break lines creating a paragraph layout.
		This does NOT auto size and will overflow vertically, just like a webpage. 
		However, while maintaining the defined width, it changes the height of the UITextField to clamp to the size of the content.
		<br>
		<img src="../docs_images/textformat/paragraph_clamp.png" />
	@example
		TextFormat.PARAGRAPH_CLAMP
*/
export const PARAGRAPH_CLAMP = 'paragraphClamp'

/**
	@memberOf TextFormat
	@const {string} PARAGRAPH_FIT
		UITextField uses word wrapping to automatically break lines creating a paragraph layout.
		This DOES auto size and will shrink the entire chunk to fit inside the width and height.
		<br>
		<img src="../docs_images/textformat/paragraph_fit.png" />
	@example
		TextFormat.PARAGRAPH_FIT
*/
export const PARAGRAPH_FIT = 'paragraphFit'

/**
	@memberOf TextFormat
	@const {string} PARAGRAPH_FIT_CLAMP
		This is a combination that applies TextFormat.PARAGRAPH_FIT followed by TextFormat.PARAGRAPH_CLAMP
		<br>
		<img src="../docs_images/textformat/paragraph_fit.png" />
		<br>
		<b>would then become</b>
		<br>
		<img src="../docs_images/textformat/paragraph_fit_clamp.png" />
	@example
		TextFormat.PARAGRAPH_FIT_CLAMP
*/
export const PARAGRAPH_FIT_CLAMP = 'paragraphFitClamp'
