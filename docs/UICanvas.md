<a name="UICanvas"></a>

## UICanvas
**Kind**: global class  
**Npmpackage**:   

* [UICanvas](#UICanvas)
    * [new UICanvas(id, target, css)](#new_UICanvas_new)
    * [.context2d](#UICanvas.context2d) : <code>canvas</code>
    * [.context3d](#UICanvas.context3d) : <code>canvas</code>
    * [.toString()](#UICanvas.toString) ⇒ <code>string</code>

<a name="new_UICanvas_new"></a>

### new UICanvas(id, target, css)
This is a display object class, extending [UIComponent](#UIComponent).  Unlike other UI elements, this creates a DOM &lt;canvas>.
By extending [UIComponent](#UIComponent) this has all of its native properties and methods.  See [UIComponent](#UIComponent) for more info.<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>


| Param | Type |
| --- | --- |
| id | <code>string</code> | 
| target | <code>element</code> | 
| css | <code>object</code> | 

**Example**  
```js
import { UICanvas } from 'ad-ui'
var myCanvas = new UICanvas({
	id : 'my-btn',
	target : View.main,
	css : {
		x : 15,
		y : 18,
		width : 50,
		height : 20,
		backgroundColor : '#ff0000'
	}
})
```
<a name="UICanvas.context2d"></a>

### UICanvas.context2d : <code>canvas</code>
Getter : Returns direct access to the canvas context of '2d'.

**Kind**: static property of [<code>UICanvas</code>](#UICanvas)  
**Example**  
```js
console.log(myCanvas.context2d)
```
<a name="UICanvas.context3d"></a>

### UICanvas.context3d : <code>canvas</code>
Getter : Returns direct access to the canvas context of 'webgl'.

**Kind**: static property of [<code>UICanvas</code>](#UICanvas)  
**Example**  
```js
console.log(myCanvas.context3d)
```
<a name="UICanvas.toString"></a>

### UICanvas.toString() ⇒ <code>string</code>
A String representing the object type.

**Kind**: static method of [<code>UICanvas</code>](#UICanvas)  
**Returns**: <code>string</code> - [object UICanvas]  
