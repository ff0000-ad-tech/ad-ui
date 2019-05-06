<a name="UISplitText"></a>

## UISplitText
**Kind**: global class  
**Npmpackage**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| arg.splitType | [<code>TextSplitType</code>](#TextSplitType) \| <code>string</code> | STRING determing if the UISplitText should break a UITextField into individuals words or characters; defaults to TextSplitType.WORDS. |
| arg.allowSpaceOnBreaks | <code>boolean</code> | BOOLEAN determining if a line break should include a space following non-punctuational characters. For example: "word " rather than "word"; defaults to false. 		<br> 		<img src="../docs_images/uisplittext/breakSpace_true.jpg" /> 		<br> 		<br> 		<img src="../docs_images/uisplittext/breakSpace_false.jpg" /> 		<br> |
| arg.spaceBreakIncludes | <code>string</code> | STRING determining what specific characters should be included as part of any line breaks if arg.allowSpaceOnBreaks is set to true; defaults to a-z, A-Z, and 0-9 represented as '[a-z0-9].' |
| arg.splitWordSpacing | <code>number</code> | NUMBER by which to multiply the default empty space size used between each word; defaults to a multiple of 1, which is 100% of the default word spacing. <i>Do not confuse this with letter-spacing, which is defined in the <b>spacing</b> property.</i> |
| arg.splitLeading | <code>number</code> | NUMBER by which to multiply the default line space value used between each line; defaults to a multiple of 1, which is 100% of the default line spacing. <i>Do not confuse this with line-spacing, which is defined in the <b>leading</b> property.</i> |
| arg.debug | <code>boolean</code> | BOOLEAN for if you want a debug version featuring a background color and an unadulterated and un-split UITextField to compare your UISplitText instance to; defaults to false. |


* [UISplitText](#UISplitText)
    * [new UISplitText(arg)](#new_UISplitText_new)
    * [.wordSpacing](#UISplitText.wordSpacing) : <code>number</code>

<a name="new_UISplitText_new"></a>

### new UISplitText(arg)
This is a display object class, utilizing [UISplitText](#UISplitText) and [UIComponent](#UIComponent).  By extending [UIComponent](#UIComponent) this has all of its native properties and methods.
See [UISplitText](#UISplitText) and [UIComponent](#UIComponent) for more info.
<br><br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<br>
<pre class="sunlight-highlight-javascript">
import { UISplitText } from 'ad-ui'
</pre>
<br><br>
It is a DOM [UIComponent](#UIComponent) element that contains text and handles its styling, layout, and formatting in all the same ways as [UITextField](#UITextField). The difference, however, is the it returns a container with each line, word, or character of text broken into individual [UITextField](#UITextField)s.
<br><br>
By default, a UISplitText will convert a [UITextField](#UITextField) into individual words or letters, and group them into [UIComponent](#UIComponent)s.
<br><br>
<b>For Example:</b>
<br>setting the splitType to TextSplitType.WORDS will create a [UIComponent](#UIComponent) per line and a [UITextField](#UITextField) per word.
<br>setting the splitType to TextSplitType.CHARACTERS will create a [UIComponent](#UIComponent) per line, a [UIComponent](#UIComponent) per word, and a [UITextField](#UITextField) per character.
<br><br>
UISplitText returns a [UIComponent](#UIComponent), representing the main container of the lines, words, and possibly characters.
<br>
This container contains arrays:
<pre class="sunlight-highlight-javascript">
// an array of every line of text; each line is a UIComponent
_mySplitText.lines;

// an array of every word of text. If arg.splitType === TextSplitType.CHARACTERS, these will be UIComponents, otherwise they are UITextFields
_mySplitText.words;

// an array of every character of text; each character is a [UITextField](#UITextField)
_mySplitText.characters;
</pre>
<br><br>
<b>Sample:</b><br>
<pre class="sunlight-highlight-javascript">
// creates a [UITextField](#UITextField) that breaks each character of the text value into its own [UITextField](#UITextField)
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
for (let l = 0; l < View.main.mySplitText.lines.length; l++){
	TweenLite.from ( View.main.mySplitText.lines[l], 1, {alpha: 0 });
}

// tweens each WORD of text from a rotation of 180
for (let w = 0; w < View.main.mySplitText.words.length; w++){
	TweenLite.from ( View.main.mySplitText.words[w], 1, {rotation: 180 });
}

// tweens each CHARACTER of text from a scale of of 2
for (let c = 0; c < View.main.mySplitText.characters.length; c++){
	TweenLite.from ( View.main.mySplitText.characters[c], 1, {scale: 2 });
}
</pre>


| Param | Type | Description |
| --- | --- | --- |
| arg | <code>arg</code> | The OBJECT containing all of your UITextField and UISplitText arguments |

<a name="UISplitText.wordSpacing"></a>

### UISplitText.wordSpacing : <code>number</code>
READ-ONLY : NUMBER representing how much space exists between each word; affected by arg.splitWordSpacing on instantiation.

**Kind**: static property of [<code>UISplitText</code>](#UISplitText)  
**Example**  
```js
// get
console.log(myUISplitText.wordSpacing)

const _word1 = myUISplitText.words[0]
const _word2 = myUISplitText.words[1]
_word1.x = _word2.x + _word2.width + myUISplitText.wordSpacing
```
