<a name="UIGroup"></a>

## UIGroup
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| target | <code>element</code> | the DOM element in which to add the UIGroup |
| children | <code>array</code> | an array of DOM elements which will be added |
| css | <code>object</code> | CSS properties to apply to the UIGroup parent container - <b>width and height will be ignored!</b> |
| align | <code>Align</code> | the alignment of the UIGroup parent container |

<a name="new_UIGroup_new"></a>

### new UIGroup(arg)
This is a display object class, extending [UIComponent](#UIComponent) and therefor contains all of the native properties and methods of extending [UIComponent](#UIComponent).
<br>It relocates an array of DOM elements into a newly created [UIComponent](#UIComponent), allowing for easy creation of lockups.
<br>Returns a UIComponent<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">Github repo</a>
<pre class="sunlight-highlight-javascript">
import { UIGroup } from 'ad-ui'
</pre>
<br><br>
<b>Sample 1:</b><br>
<pre class="sunlight-highlight-javascript">
// basic creation - add children to a UIGroup.
let _myLockup = new UIGroup({
	target: View.main,
	children: [myDIV, myTextField, myImage],
});
</pre>
<br><br>
<b>Sample 2:</b><br>
<pre class="sunlight-highlight-javascript">
// align the UIGroup after creation.
let _myLockup = new UIGroup({
	target: View.main,
	children: [myDIV, myTextField, myImage],
	align: Align.CENTER,
});
</pre>
<br><br>
<b>Sample 3:</b><br>
<pre class="sunlight-highlight-javascript">
// give the parent UIGroup a background color - handy for debugging!
let _myLockup = new UIGroup({
	target: View.main,
	children: [myDIV, myTextField, myImage],
	css:{
		backgroundColor: '#ff0000'
	}
});
</pre>
<br><br>


| Param | Type | Description |
| --- | --- | --- |
| arg | <code>object</code> | an object containing the arguments for defining / orienting the UIGroup, see Properties for more info: |

