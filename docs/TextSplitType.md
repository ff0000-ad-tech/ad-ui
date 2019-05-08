<a name="TextSplitType"></a>

## TextSplitType
**Kind**: global class  
**Npmpackage**:   

* [TextSplitType](#TextSplitType)
    * [new TextSplitType()](#new_TextSplitType_new)
    * [.LINES](#TextSplitType.LINES) : <code>string</code>
    * [.WORDS](#TextSplitType.WORDS) : <code>string</code>
    * [.CHARACTERS](#TextSplitType.CHARACTERS) : <code>string</code>

<a name="new_TextSplitType_new"></a>

### new TextSplitType()
Constants defining how a [UISplitText](#UISplitText) should break apart the textfields<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
import { TextSplitType } from 'ad-ui'
</pre>

<a name="TextSplitType.LINES"></a>

### TextSplitType.LINES : <code>string</code>
Limits the splitting of a [UISplitText](#UISplitText) to line and words only<br>
Functionally identical to TextSplitType.WORDS

**Kind**: static constant of [<code>TextSplitType</code>](#TextSplitType)  
**Example**  
```js
TextSplitType.LINES
```
<a name="TextSplitType.WORDS"></a>

### TextSplitType.WORDS : <code>string</code>
Limits the splitting of a [UISplitText](#UISplitText) to line and words only<br>
Functionally identical to TextSplitType.LINES

**Kind**: static constant of [<code>TextSplitType</code>](#TextSplitType)  
**Example**  
```js
TextSplitType.WORDS
```
<a name="TextSplitType.CHARACTERS"></a>

### TextSplitType.CHARACTERS : <code>string</code>
Limits the splitting of a [UISplitText](#UISplitText) to lines, words, and also characters

**Kind**: static constant of [<code>TextSplitType</code>](#TextSplitType)  
**Example**  
```js
TextSplitType.CHARACTERS
```
