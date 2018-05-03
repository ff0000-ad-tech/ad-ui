/** 
	@npmpackage
	@class UISvg
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UISvg } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that contains a markup &lt;svg&gt; element
		which allows for vector display, manipulation and animation.  This allows for smaller file sizes with crisp visual aesthetics.
		<br><br>

		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>

		<b>&lt;svg&gt; formatting</b><br>
		Original code from Illustrator:
		<codeblock>
			&lt;?xml version="1.0" encoding="utf-8"?&gt;
			&lt;!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --&gt;
			&lt;svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 130 200" style="enable-background:new 0 0 130 200;" xml:space="preserve"&gt;
				&lt;style type="text/css"&gt;
					.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}
				&lt;/style&gt;
				&lt;path id="XMLID_1" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4
					c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/&gt;
			&lt;/svg&gt;
		</codeblock>
		<br><br>

		Things that are unnecessary:
		<codeblock>
			&lt;?xml version="1.0" encoding="utf-8"?&gt;
			&lt;!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --&gt;
			&lt;svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 style="enable-background:new 0 0 130 200;" xml:space="preserve"&gt;
		</codeblock>
		<br><br>
				
		The only thing that IS necessary in the &lt;svg&gt; node is:
		<codeblock>
			&lt;svg viewBox="0 0 130 200"&gt;
		</codeblock>
		<br><br>
		
		Trimmed down for source:	
		<codeblock>
			&lt;svg viewBox="0 0 130 200"&gt;
				&lt;style type="text/css"&gt;
					.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}
				&lt;/style&gt;
				&lt;path id="XMLID_1" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4
					c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/&gt;
			&lt;/svg&gt;
		</codeblock>
		<br><br>	

		NOTE: Sometimes there will be a width and/or height attribute.  This will overwrite the viewBox and cause display issues. This should be removed
		
		<br><br>
		Convert to string for javascript.  This can be done inline with the UISvg instance, but since vector is scalable and reusable 
		across all sizes, it is a good idea to place this in AdData so that it can be accessed by all builds, classes and instances.
		<codeblock>
			// In AdData
			this.svgSrc = '&lt;svg viewBox="0 0 130 200"&gt;'
						+ '&lt;style type="text/css"&gt;.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}&lt;/style&gt;'
						+ '&lt;path id="XMLID_1" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/&gt;'
						+ '&lt;/svg&gt;'
		</codeblock>
		<br><br>

		Create a UISvg:
		<codeblock>
			var mySvg = new UISvg ({
				id : 'my-svg',
				target : View.main,
				source : adData.svgSrc,
				css : {
					width : 75
				}
			})
		</codeblock>
*/
import UIComponent from './UIComponent'
import { Styles } from 'ad-view'

class UISvg {
	constructor(arg) {
		arg.css = arg.css || {}

		var _source = null
		var _css = arg.css || {}
		var _ratio = 1

		var _noWidth = _css.width == undefined
		var _noHeight = _css.height == undefined
		if (_noWidth && _noHeight) {
			_css.width = _css.height = 'inherit'
		}

		if (!arg.source) throw new Error("UISvg : No markup source set on '" + arg.id + "'")

		var U = new UIComponent(arg, 'svg')

		Object.defineProperties(U, {
			/**
				@memberOf UISvg
				@var {string} source
				@desc
					Getter|Setter : A string markup of an svg code: which is in an html/xml style format.  Note that when exporting from Illustrator or other
					programs there is extra bloat code that is not necessary.
				@example
					// get
					console.log(mySvg.source)

					// set
					mySvg.source = '<svg viewBox="0 0 130 200">'
									+ '<style type="text/css">.st0{fill:#00AEEF;stroke:#000000;stroke-miterlimit:10;}</style>'
									+ '<path id="XMLID_1_" class="st0" d="M104.4,149.8L6,194.5l5.1-105.3l66.4,13.1L10.6,6.7l63.6,37.6l24.4-30.4c26.7,5.8,38.5,90.3-10.1,54.8L104.4,149.8z"/>'
									+ '</svg>'						
			*/
			source: {
				get: function() {
					return _source
				},
				set: function(value) {
					_source = value
					U.innerHTML = value
					var svg = U.getElementsByTagName('svg')[0]
					var viewBox = svg.getAttribute('viewBox').split(/\s/g)
					_ratio = +viewBox[2] / +viewBox[3]
				}
			},

			/**
				@memberOf UISvg
				@var {number} width
					Getter|Setter : A Number representing the width of the div.  Directly gets/sets the style css width.
					<br><span style="color:#ff0000;">WARN:</span> This will change the height as well to maintain aspect ratio of the source 
				@example
					// get
					console.log(mySvg.width)

					// set
					mySvg.width = 140
			*/
			width: {
				get: function() {
					return U.offsetWidth
				},
				set: function(value) {
					var newHeight = value / _ratio
					Styles.setCss(U, {
						width: value,
						height: newHeight
					})
				}
			},

			/**
				@memberOf UISvg
				@var {number} height
					Getter|Setter : A Number representing the height of the div.  Directly gets/sets the style css height.
					<br><span style="color:#ff0000;">WARN:</span> This will change the width as well to maintain aspect ratio of the source 
				@example
					// get
					console.log(mySvg.height)

					// set
					mySvg.height = 140
			*/
			height: {
				get: function() {
					return U.offsetHeight
				},
				set: function(value) {
					var newWidth = value * _ratio
					Styles.setCss(U, {
						width: newWidth,
						height: value
					})
				}
			}
		})

		U.toString = function() {
			return '[object UISvg]'
		}

		U.source = arg.source

		if (_noWidth && _noHeight) {
		} else if (_noWidth) {
			U.height = _css.height
		} else if (_noHeight) {
			U.width = _css.width
		}

		U._initAlign()

		return U
	}
}

export default UISvg
