<a name="TextFormat"></a>

## TextFormat
**Kind**: global class  
**Npmpackage**:   

* [TextFormat](#TextFormat)
    * [new TextFormat()](#new_TextFormat_new)
    * [.INLINE](#TextFormat.INLINE) : <code>string</code>
    * [.INLINE_CLAMP](#TextFormat.INLINE_CLAMP) : <code>string</code>
    * [.INLINE_FIT](#TextFormat.INLINE_FIT) : <code>string</code>
    * [.INLINE_FIT_CLAMP](#TextFormat.INLINE_FIT_CLAMP) : <code>string</code>
    * [.PARAGRAPH](#TextFormat.PARAGRAPH) : <code>string</code>
    * [.PARAGRAPH_CLAMP](#TextFormat.PARAGRAPH_CLAMP) : <code>string</code>
    * [.PARAGRAPH_FIT](#TextFormat.PARAGRAPH_FIT) : <code>string</code>
    * [.PARAGRAPH_FIT_CLAMP](#TextFormat.PARAGRAPH_FIT_CLAMP) : <code>string</code>

<a name="new_TextFormat_new"></a>

### new TextFormat()
Custom constants to identify the layout type for a <UITextField>.  Each type changes the format of how the text content
is displayed and will run an internal auto size if applicable to the type.<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
import { TextFormat } from 'ad-ui'
</pre>

<a name="TextFormat.INLINE"></a>

### TextFormat.INLINE : <code>string</code>
UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
This does NOT auto size and will overflow horizontally and vertically depending on the width and height.
<br>
<img src="../docs_images/textformat/inline.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.INLINE
```
<a name="TextFormat.INLINE_CLAMP"></a>

### TextFormat.INLINE\_CLAMP : <code>string</code>
UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
This does NOT auto size, however it changes the width AND height of the UITextField to clamp to the size of the content.
<br>
<img src="../docs_images/textformat/inline_clamp.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.INLINE_CLAMP
```
<a name="TextFormat.INLINE_FIT"></a>

### TextFormat.INLINE\_FIT : <code>string</code>
UITextField lays out the words inline with no word wrapping, which does not necessarily mean only 1 line.  
If html &lt;br> tags are used, they will be honored, but no autmatic line breaking happens. 
This DOES auto size and will shrink horizontally and vertically to fit inside the width and height.
<br>
<img src="../docs_images/textformat/inline_fit.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.INLINE_FIT
```
<a name="TextFormat.INLINE_FIT_CLAMP"></a>

### TextFormat.INLINE\_FIT\_CLAMP : <code>string</code>
This is a combination that applies TextFormat.INLINE_FIT followed by TextFormat.INLINE_CLAMP
<br>
<img src="../docs_images/textformat/inline_fit.png" />
<br>
<b>would then become</b>
<br>
<img src="../docs_images/textformat/inline_fit_clamp.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.INLINE_FIT_CLAMP
```
<a name="TextFormat.PARAGRAPH"></a>

### TextFormat.PARAGRAPH : <code>string</code>
UITextField uses word wrapping to automatically break lines creating a paragraph layout.
This does NOT auto size and will overflow vertically, just like a webpage.
<br>
<img src="../docs_images/textformat/paragraph.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.PARAGRAPH
```
<a name="TextFormat.PARAGRAPH_CLAMP"></a>

### TextFormat.PARAGRAPH\_CLAMP : <code>string</code>
UITextField uses word wrapping to automatically break lines creating a paragraph layout.
This does NOT auto size and will overflow vertically, just like a webpage. 
However, while maintaining the defined width, it changes the height of the UITextField to clamp to the size of the content.
<br>
<img src="../docs_images/textformat/paragraph_clamp.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.PARAGRAPH_CLAMP
```
<a name="TextFormat.PARAGRAPH_FIT"></a>

### TextFormat.PARAGRAPH\_FIT : <code>string</code>
UITextField uses word wrapping to automatically break lines creating a paragraph layout.
This DOES auto size and will shrink the entire chunk to fit inside the width and height.
<br>
<img src="../docs_images/textformat/paragraph_fit.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.PARAGRAPH_FIT
```
<a name="TextFormat.PARAGRAPH_FIT_CLAMP"></a>

### TextFormat.PARAGRAPH\_FIT\_CLAMP : <code>string</code>
This is a combination that applies TextFormat.PARAGRAPH_FIT followed by TextFormat.PARAGRAPH_CLAMP
<br>
<img src="../docs_images/textformat/paragraph_fit.png" />
<br>
<b>would then become</b>
<br>
<img src="../docs_images/textformat/paragraph_fit_clamp.png" />

**Kind**: static constant of [<code>TextFormat</code>](#TextFormat)  
**Example**  
```js
TextFormat.PARAGRAPH_FIT_CLAMP
```
