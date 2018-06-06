/**
	@npmpackage
	@class UIFlex
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-ui">ad-ui</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { UIFlex } from 'ad-ui'
		</codeblock>
		<br><br>
		
		This is a display object class, extending {@link UIComponent}.  It is a DOM element that has default values for css flexbox. All children's position
		is set to relative, to allow the flexbox to work. The default setup of UIFlex is to make a row, with the content evenly spread with no buffers on 
		the outside, aka space-around. There are setters for the primary orientation css keys. They can be passed in to the constructor or using the seeters.
		They can still be overwritten by simply changing them with {@link Styles.setCss}
		<br><br>
		
		By default, UIFlex has these styles set:<br>
		<codeblock>
			display: flex; 
			flex-wrap: nowrap; 
			justify-content: space-around;
		</codeblock>
		<br><br>

		By extending UIComponent this has all of its native properties and methods.  See {@link UIComponent} for more info.
		<br><br>

		For all flexbox options, see https://www.w3schools.com/css/css3_flexbox.asp

		<br><br>

		<b>Sample 1:</b><br>
		<codeblock>			
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
		</codeblock>

		<b>Sample 2:</b>Replace EndFrame UIComponent with a UIFlex<br>
		<codeblock>
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
		</codeblock>
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

import { UIComponent } from 'ad-ui'
import { Styles } from 'ad-view'

export default class UIFlex extends UIComponent {
	constructor(arg) {
		super(arg)

		const T = this

		Styles.injectStylesheet(
			'RED_flex',
			'.flex-container',
			'display: flex; flex-wrap: nowrap; justify-content: space-around;',
			'.flex-container > div',
			'position: relative;'
		)
		Styles.addClass(T, 'flex-container')

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// GETTER | SETTTER
		Object.defineProperties(T, {
			/**
				@memberOf UIFlex
				@var {string} flexDirection
				@desc
					Setter : Changes the direction of the flexbox. Options: 'row', 'column'. Default: 'row'
				@example		
					// set
					myFlexContainer.flexDirection = 'column'
			*/
			flexDirection: {
				set: value => {
					Styles.setCss(T, { 'flex-direction': value })
				}
			},

			/**
				@memberOf UIFlex
				@var {string} justifyContent
				@desc
					Setter : Changes the justify layout of the flexbox. Options: 'center', 'flex-start', 'flex-end', 'space-around', 'space-between'. Default: 'space-around'
				@example		
					// set
					myFlexContainer.justifyContent = 'space-between'
			*/
			justifyContent: {
				set: value => {
					Styles.setCss(T, { 'justify-content': value })
				}
			},

			/**
				@memberOf UIFlex
				@var {string} flexWrap
				@desc
					Setter : Changes the justify layout of the flexbox. Options: 'nowrap', 'wrap'. Default: 'nowrap'
				@example		
					// set
					myFlexContainer.flexWrap = 'wrap'
			*/
			flexWrap: {
				set: value => {
					Styles.setCss(T, { 'flex-wrap': value })
				}
			},

			/**
				@memberOf UIFlex
				@var {string} alignItems
				@desc
					Setter : Changes the item alignment of the flexbox. Options: 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'.
				@example		
					// set
					myFlexContainer.alignItems = 'flex-end'
			*/
			alignItems: {
				set: value => {
					Styles.setCss(T, { 'align-items': value })
				}
			}
		})

		/* ------------------------------------------------------------------------------------------------------------------------------- */
		// INIT
		for (let key of ['flexDirection', 'flexWrap', 'justifyContent', 'alignItems']) {
			if (arg[key]) T[key] = arg[key]
		}

		return T
	}
}
