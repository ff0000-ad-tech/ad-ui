<a name="UIButton"></a>

## UIButton
**Kind**: global class  
**Npmpackage**:   

* [UIButton](#UIButton)
    * [new UIButton()](#new_UIButton_new)
    * [.togglable](#UIButton.togglable) : <code>boolean</code>
    * [.bg](#UIButton.bg) : <code>element</code>
    * [.icon](#UIButton.icon) : <code>array</code>
    * [.state](#UIButton.state) : <code>element</code>
    * [.onClick()](#UIButton.onClick)
    * [.onOver()](#UIButton.onOver)
    * [.onOut()](#UIButton.onOut)
    * [.toString()](#UIButton.toString) ⇒ <code>string</code>
    * [._onClick()](#UIButton._onClick)
    * [._onOver()](#UIButton._onOver)
    * [._onOut()](#UIButton._onOut)

<a name="new_UIButton_new"></a>

### new UIButton()
This is a display object class, extending UIComponent.  It is a DOM element that has a child handling system for toggling the active state.
By extending UIComponent this has all of its native properties and methods.  See [UIComponent](#UIComponent) for more info.
<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
<pre class="sunlight-highlight-javascript">
// importing into an ES6 class
import { UIButton } from 'ad-ui'
</pre>
<br>
<b>Note:</b><br>
When adding a bg element or icons, there is no need to set the width and height at the css level. The UIButton will inherit the dimensions
of the children.  However, if either the width or height is set, that will be the size of the UIButton.  The hit state is the UIButton itself
so keep in mind that even if the content is very large, if the css sets the width and height to a smaller amount, there will be a small hit area
for clicks, rollovers and rollouts.
<br><br>
<b>Sample 1:</b>
<pre class="sunlight-highlight-javascript">
// Create a simple button on the Main container that passes in an image to the bg and 2 images 
// as the icons for the different states of the button.  Notice no width or height is set.
T.myButton = new UIButton({
	id : 'my-btn',
	target : T,
	css : {
		x : 30,
		y : 10
	},
	bg : 'btnBg',
	icon : [ 
		'btnPlay',
		'btnPause'
	],
	onClick : handleMyButtonClick
});
function handleMyButtonClick ( event ){
	console.log( event.target, 'clicked' )
}
// referenced later anywhere outside the class by
View.main.myButton			
</pre>
<br><br>
<b>Sample 2:</b>
<pre class="sunlight-highlight-javascript">
// create the same button as above, but more customized images 
// for the bg and the different states
T.myButton = new UIButton({
	id : 'my-btn',
	target : T,
	css : {
		x : 30,
		y : 10
	},
	bg : new UIImage({
		source : 'btnBg',
		css : {
			width : 120,
			height : 40,
		}
	}),
	icon : [ 
		new UIImage({
			source : 'btnPause',
			css : {
				x : 20,
				y : 10,
				width : 80,
				height : 20,
				backgroundColor : 'rgba(0,100,100,.5)'
			}
		}),
		new UIImage({
			source : 'btnPause',
			css : {
				x : 20,
				y : 10,
				width : 80,
				height : 20,
				backgroundColor : 'rgba(0,100,100,.5)'
			}
		}) 
	],
	onClick : handleMyButtonClick
});
</pre>
<br><br>
<b>Sample 3:</b><br>
<pre class="sunlight-highlight-javascript">
// create a button with a textfield passed in as the icon state of the button
// also it is aligned inline rather than with Align.set()
T.myButton = new UIButton({
	id : 'my-btn',
	target : T,
	css : {
		width : 100,
		height : 40,
		backgroundColor : '#ff0000'
	},
	bg : 'btnBg',
	icon: [
		new UITextField ({
			css : {
				width : 150,
				height : 40,
				color : '#ffffff'
			},
			fontSize : 12,
			fontFamily : 'template_font',
			format : TextFormat.INLINE_FIT,
			alignText : Align.CENTER,
			text : 'CLICK FOR MORE'
		})
	],
	align : {
		x : Align.CENTER,
		y : {
			type : Align.BOTTOM,
			offset : -30
		}
	}
	onClick : handleMyButtonClick
});
</pre>
<br><br>
<b>Sample Extension:</b><br>
<pre class="sunlight-highlight-javascript">
// When needing to make a custom button, use this template then add code accordingly
function UIButtonExtend( arg ){
	var U = new UIButton ( arg );
	U._onClick = function ( event ){
		// extended click method
	}

	function handleBaseEnabled ( event ){
		var listener = U.enabled ? 'addEventListener' : 'removeEventListener' ;
		// handle other listeners
	}

	U.addEventListener ( UIEvent.ENABLED, handleBaseEnabled )

	U.enabled = true;
	return U;
}
</pre>
<br><br>

<a name="UIButton.togglable"></a>

### UIButton.togglable : <code>boolean</code>
A Boolean to set whether or not the button will toggle between the different states of the button, which switches the
	visiblity of the child elements

**Kind**: static property of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.bg"></a>

### UIButton.bg : <code>element</code>
Getter : The bottom most element of a UIButton.  This allows for a background image to be set with a UIImage, or any other 
UIComponent natively. It is set in the constructor as the bg: param.  This allows public access to that element to that 
element as a getter, without allowing to overwrite the content.
<br><br>
<b>Example 1</b><br>
Internally create a UIImage as the background:<br> 
<pre class="sunlight-highlight-javascript">
var myButton = new UIButton({
	bg : 'btnBg'
});
</pre>
<br><br>
<b>Example 2</b><br>
Pass in a UIImage to add custom css to the elements:<br>
<pre class="sunlight-highlight-javascript">
var myButton = new UIButton({
	bg : new UIImage({
		source : 'btnBg',
		css : {
			width : 80,
			height : 20,
			backgroundColor : 'rgba(0,100,100,.5)'
		}
	})
});
</pre>
<br><br>

**Kind**: static property of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.icon"></a>

### UIButton.icon : <code>array</code>
Getter : An Array of the icons, which are set as an array in the constructor as the icon:[] param.  This allows public access to 
those icons as getters, without allowing to overwrite the array content.  When clicking the button, it will auto toggle 
between 0 and 1, however this can be set to any other state that is avaiable. When instantiating, pass in the elements as either 
strings for the name of images to create UIImages or use other dom elements such as UIComponents to create custom style.
<br><br>
<b>Example 1</b><br>
Internally creates 2 UIImages as the icons, aka states, of the button:<br>
<pre class="sunlight-highlight-javascript">
var myButton = new UIButton({
	icon : [ 
		'btnPlay',
		'btnPause'
	]
})
</pre>
<br><br>
<b>Example 2</b><br>
Pass in 2 UIImages as the icons of the button, to add custom css to the elements:<br>
<pre class="sunlight-highlight-javascript">
var myButton = new UIButton({
	icon : [ 
		new UIImage({
			source : 'btnPause',
			css : {
				x : 20,
				y : 10,
				width : 80,
				height : 20,
				backgroundColor : 'rgba(0,100,100,.5)'
			}
		}),
		new UIImage({
			source : 'btnPause',
			css : {
				x : 20,
				y : 10,
				width : 80,
				height : 20,
				backgroundColor : 'rgba(0,100,100,.5)'
			}
		}) 
	]
})
</pre>

**Kind**: static property of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.state"></a>

### UIButton.state : <code>element</code>
Getter|Setter : A Number representing the index of which icon is being displayed, aka the state of the button.  These are set as an array in
the constructor as the icon:[] param.  When clicking the button, it will auto toggle between 0 and 1, however this can be set to any other state that is avaiable.
<br><br>
<b>Example</b><br>
Internally creates 3 UIImages as the icons of the button, which will toggle between 'btnPlay' and 'btnPause', but can manually set
to show 'btnAlt' by setting state to 2:<br>
<pre class="sunlight-highlight-javascript">
var myButton = new UIButton({
	icon : [
		'btnPlay',
		'btnPause',
		'btnAlt'
	]
})
myButton.state = 2 	// sets the button to 'btnAlt'
</pre>

**Kind**: static property of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.onClick"></a>

### UIButton.onClick()
A Method that will be called on click of the button.  This is set in the constructor or can be manually assigned.
	It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.CLICK, handleClick );</code>

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.onOver"></a>

### UIButton.onOver()
A Method that will be called on roll over of the button.  This is set in the constructor or can be manually assigned.
	It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.OVER, handleRollOver );</code>

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.onOut"></a>

### UIButton.onOut()
A Method that will be called on roll out of the button.  This is set in the constructor or can be manually assigned.
	It is a shorthand for calling <code>Gesture.addEventListener( myButton, GestureEvent.OUT, handleRollOut );</code>

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
<a name="UIButton.toString"></a>

### UIButton.toString() ⇒ <code>string</code>
A String representing the object type.

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
**Returns**: <code>string</code> - [object UIButton]  
<a name="UIButton._onClick"></a>

### UIButton.\_onClick()
Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
<a name="UIButton._onOver"></a>

### UIButton.\_onOver()
Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
<a name="UIButton._onOut"></a>

### UIButton.\_onOut()
Protected Method for INTERNAL use when extending the class. Assign a handler directly to the button instance.

**Kind**: static method of [<code>UIButton</code>](#UIButton)  
