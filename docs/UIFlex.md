<a name="UIFlex"></a>

## UIFlex
**Kind**: global class  
**Npmpackage**:   

* [UIFlex](#UIFlex)
    * [new UIFlex()](#new_UIFlex_new)
    * [.flexDirection](#UIFlex.flexDirection) : <code>string</code>
    * [.justifyContent](#UIFlex.justifyContent) : <code>string</code>
    * [.flexWrap](#UIFlex.flexWrap) : <code>string</code>
    * [.alignItems](#UIFlex.alignItems) : <code>string</code>

<a name="new_UIFlex_new"></a>

### new UIFlex()
This is a display object class, extending [UIComponent](#UIComponent).  It is a DOM element that has default values for css flexbox. All children's position
is set to relative, to allow the flexbox to work. The default setup of UIFlex is to make a row, with the content evenly spread with no buffers on
the outside, aka space-around. There are setters for the primary orientation css keys. They can be passed in to the constructor or using the seeters.
They can still be overwritten by simply changing them with [Styles.setCss](Styles.setCss)
<br><br>
By default, UIFlex has these styles set:<br>
<pre class="sunlight-highlight-javascript">
display: flex;
flex-wrap: nowrap;
justify-content: space-around;
</pre>
<br><br>
By extending UIComponent this has all of its native properties and methods.  See [UIComponent](#UIComponent) for more info.
<br><br>
For all flexbox options, see https://www.w3schools.com/css/css3_flexbox.asp
<br><br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<br>
<pre class="sunlight-highlight-javascript">
// importing into an ES6 class
import { UIFlex } from 'ad-ui'
</pre>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
var myFlexContainer = new UIFlex({
	target: T,
	css: {
		width: 350,
		height: 100,
		backgroundColor: 'rgba(255,0,0,0.3)'
	},
	// optional
	flexDirection: 'column',
	justifyContent: 'space-between',
	flexWrap: 'wrap'
})
</pre>
<b>Sample 2:</b>Replace EndFrame UIComponent with a UIFlex<br>
<pre class="sunlight-highlight-javascript">
function EndFrame() {
	var T = new UIFlex({
		id: 'endframe-container',
		target: View.main,
		css: {
			width: 'inherit',
			height: 'inherit'
		}
	})
	return T
}
</pre>

<a name="UIFlex.flexDirection"></a>

### UIFlex.flexDirection : <code>string</code>
Setter : Changes the direction of the flexbox. Options: 'row', 'column'. Default: 'row'

**Kind**: static property of [<code>UIFlex</code>](#UIFlex)  
**Example**  
```js
// set
myFlexContainer.flexDirection = 'column'
```
<a name="UIFlex.justifyContent"></a>

### UIFlex.justifyContent : <code>string</code>
Setter : Changes the justify layout of the flexbox. Options: 'center', 'flex-start', 'flex-end', 'space-around', 'space-between'. Default: 'space-around'

**Kind**: static property of [<code>UIFlex</code>](#UIFlex)  
**Example**  
```js
// set
myFlexContainer.justifyContent = 'space-between'
```
<a name="UIFlex.flexWrap"></a>

### UIFlex.flexWrap : <code>string</code>
Setter : Changes the justify layout of the flexbox. Options: 'nowrap', 'wrap'. Default: 'nowrap'

**Kind**: static property of [<code>UIFlex</code>](#UIFlex)  
**Example**  
```js
// set
myFlexContainer.flexWrap = 'wrap'
```
<a name="UIFlex.alignItems"></a>

### UIFlex.alignItems : <code>string</code>
Setter : Changes the item alignment of the flexbox. Options: 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'.

**Kind**: static property of [<code>UIFlex</code>](#UIFlex)  
**Example**  
```js
// set
myFlexContainer.alignItems = 'flex-end'
```
