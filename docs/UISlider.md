<a name="UISlider"></a>

## UISlider
**Kind**: global class  
**Npmpackage**:   

* [UISlider](#UISlider)
    * [new UISlider()](#new_UISlider_new)
    * [.bg](#UISlider.bg) : <code>element</code>
    * [.loaded](#UISlider.loaded) : <code>element</code>
    * [.track](#UISlider.track) : <code>element</code>
    * [.handle](#UISlider.handle) : <code>element</code>
    * [.hitState](#UISlider.hitState) : <code>element</code>
    * [.percent](#UISlider.percent) : <code>number</code>
    * [.dragging](#UISlider.dragging) : <code>boolean</code>
    * [.U.onUpdate](#UISlider.U.onUpdate)
    * [.U.toString()](#UISlider.U.toString)
    * [.U._onUpdate()](#UISlider.U._onUpdate)

<a name="new_UISlider_new"></a>

### new UISlider()
This is a display object class, extending [UIComponent](#UIComponent).  It is a DOM element that has built-in
child &lt;div>s to make up a slider, which are all publicly accessible.  The list of child divs are:<br>
<ul>
 <li>.bg</li>
 <li>.loaded</li>
 <li>.track</li>
 <li>.handle</li>
 <li>.hitState</li>
</ul>
By extending [UIComponent](#UIComponent) this has all of its native properties and methods.  See [UIComponent](#UIComponent)
for more info.
<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<br>
<pre class="sunlight-highlight-javascript">
import { UISlider } from 'ad-ui'
</pre>
<br><br>
<b>Sample 1</b><br>
<pre class="sunlight-highlight-javascript">
var mySlider = new UISlider({
	id : 'my-slider',
	target : View.main,
	css : {
		x : 0,
		y : 0,
		width : 250,
		height : 20
	},
	bg : {
		height:'30%',
		top:'35%'
	},
	track : {
		height:'30%',
		top:'35%'
	},
	handle : {
		height:'70%',
		top:'15%'
	},
	onUpdate : handleSliderUpdate
});
// OR assign it after the fact
mySlider.onUpdate = handleSliderUpdate
// OR listen for the event
mySlider.addEventListener ( UIEvent.SLIDER_UPDATE, handleSliderUpdate );
function handleSliderUpdate ( event ){
	console.log( mySlider.percent );
}
</pre>
<br><br>
<b>Sample Extension:</b><br>
<pre class="sunlight-highlight-javascript">
function UICustomSlider( arg ) {
	var U = new UISlider( arg );

	function handleBaseSliderUpdate ( event ){
		console.log( U.percent );
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		U [ listener ] ( UIEvent.SLIDER_UPDATE, handleBaseSliderUpdate );
	}

	U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )
	U.enabled = true;

	return U;
}
</pre>

<a name="UISlider.bg"></a>

### UISlider.bg : <code>element</code>
A &lt;div> at the bottom most layer, simply the background.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Example**  
```js
// access
mySlider.bg

// change style:
Styles.setCss( mySlider.bg, { backgroundColor: '#ff0000' });
```
<a name="UISlider.loaded"></a>

### UISlider.loaded : <code>element</code>
A &lt;div> right above the bg element, represents the loaded value when used with loaders such as with progress bars.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Example**  
```js
// access
mySlider.loaded

// change style:
Styles.setCss( mySlider.loaded, { backgroundColor: '#ff0000' });
```
<a name="UISlider.track"></a>

### UISlider.track : <code>element</code>
A &lt;div> right above the loaded element, represents the percentage of the slider.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Example**  
```js
// access
mySlider.track

// change style:
Styles.setCss( mySlider.track, { backgroundColor: '#ff0000' });
```
<a name="UISlider.handle"></a>

### UISlider.handle : <code>element</code>
A &lt;div> right above the track element, represents the handle at the placement of the percentage of the slider.  Will line up with the track size.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Example**  
```js
// access
mySlider.handle

// change style:
Styles.setCss( mySlider.handle, { backgroundColor: '#ff0000' });
```
<a name="UISlider.hitState"></a>

### UISlider.hitState : <code>element</code>
A &lt;div> at the top most level, represents the hit area for the slider.  Ot is not a graphical element and generally this should not be manipulated.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Example**  
```js
mySlider.handle
```
<a name="UISlider.percent"></a>

### UISlider.percent : <code>number</code>
Getter|Setter : A Number 0-1 representing the percent position.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Example**  
```js
// get
mySlider.addEventListener( UIEvent.SLIDER_UPDATE, handleSliderUpdate );

function handleSliderUpdate( event ){
	console.log( mySlider.percent );
}

// set
mySlider.percent = .65;
```
<a name="UISlider.dragging"></a>

### UISlider.dragging : <code>boolean</code>
Getter : A Boolean representing whether or not the slider head is currently dragging.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
<a name="UISlider.U.onUpdate"></a>

### UISlider.U.onUpdate
A Method that will be called on the update of the slider.  This is set in the constructor or can be manually assigned.

**Kind**: static property of [<code>UISlider</code>](#UISlider)  
**Method:**: onUpdate  
<a name="UISlider.U.toString"></a>

### UISlider.U.toString()
A String representing the object type: [object UISlider]

**Kind**: static method of [<code>UISlider</code>](#UISlider)  
**Method:**: toString  
<a name="UISlider.U._onUpdate"></a>

### UISlider.U.\_onUpdate()
Protected Method for INTERNAL use when extending the class. Assign a handler directly to the component instance.

**Kind**: static method of [<code>UISlider</code>](#UISlider)  
**Method:**: _onUpdateslider  
