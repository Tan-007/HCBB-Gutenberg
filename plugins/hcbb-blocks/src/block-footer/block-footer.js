/**
 * BLOCK: hcbb-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { PanelBody, ColorPalette } = wp.components; // import ColorPicker from wp.components
const { InspectorControls } = wp.editor; // Import RichText from wp.block-editor

/**
 * global functions
 */
/**
 * 
 * @param {String} url url
 * @param {String} classOut class of wrapper elem 
 * @param {String} classIn class of inner elem
 */
const getUrlElem = ( url, classOut, classIn ) => {
	if ( url ) {
		return( 
			<a className = { classOut } href = { url }>
				<li>
					<i class = { classIn }></i>
				</li>
			</a>
		)
	}
}
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'hcbb-blocks/footer', {
	
	// Block title.
	title: __( 'Footer' ),

	// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	icon: 'location-alt', 

	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	category: 'hcbb-blocks', 

	// keywords to look for when searching for a block
	keywords: [
		__( 'hcbb-blocks - Block' ),
		__( 'block footer' ),
	],

	// custom attributes
	attributes: {
		urlFb: {
			type: 'string',
			selector: '.urlFb',
		},

		urlLn: {
			type: 'string',
			selector: '.urlLn',
		},

		urlTwit: {
			type: 'string',
			selector: '.urlTwit',
		},

		urlGp: {
			type: 'string',
			selector: '.urlGp',
		},
	},
	

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// object de-structuring
		const {
			attributes: {
				urlFb, 
				urlLn,
				urlTwit,
				urlGp,
			},
			setAttributes,
			className
		} = props;
		
		return ([
			<InspectorControls>
				<div className = { className }>
					<PanelBody title = { __( 'Footer links settings', 'hcbb-blocks' ) }>

						<p style = { { marginTop: '10px' } }><strong>{ __( 'Facebook Url:', 'hcbb-blocks' ) }</strong></p>
						<input
							style       = { { width: "100%" } }
							type        = "url"
							value       = { urlFb }
							onChange    = { ( newUrl ) => { setAttributes( { urlFb: newUrl.currentTarget.value } ) } }
							placeholder = "https://www.facebook.com/"
						/>

						<p style = { { marginTop: '10px' } }><strong>{ __( 'LinkedIn Url:', 'hcbb-blocks' ) }</strong></p>
						<input
							style       = { { width: "100%" } }
							type        = "url"
							value       = { urlLn }
							onChange    = { ( newUrl ) => { setAttributes( { urlLn: newUrl.currentTarget.value } ) } }
							placeholder = "https://www.linkedin.com/"
						/>

						<p style = { { marginTop: '10px' } }><strong>{ __( 'Twitter Url:', 'hcbb-blocks' ) }</strong></p>
						<input
							style       = { { width: "100%" } }
							type        = "url"
							value       = { urlTwit }
							onChange    = { ( newUrl ) => { setAttributes( { urlTwit: newUrl.currentTarget.value } ) } }
							placeholder = "https://www.twitter.com/"
						/>

						<p style = { { marginTop: '10px' } }><strong>{ __( 'Google Plus Url:', 'hcbb-blocks' ) }</strong></p>
						<input
							style       = { { width: "100%" } }
							type        = "url"
							value       = { urlGp }
							onChange    = { ( newUrl ) => { setAttributes( { urlGp: newUrl.currentTarget.value } ) } }
							placeholder = "https://www.google.com/"
						/>

					</PanelBody>
				</div>
			</InspectorControls>
			,
			<div className = { className }>
				<div className = "icons-wrapper">
					<ul className = "icons-list">

						{ getUrlElem( urlFb, "urlFb", "fa fa-facebook" ) }

						{ getUrlElem( urlLn, "urlLn", "fa fa-linkedin" ) }

						{ getUrlElem( urlTwit, "urlTwit", "fa fa-twitter" ) }

						{ getUrlElem( urlGp, "urlGp", "fa fa-google" ) }

					</ul>
				</div>
			</div>
		]);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

		// object de-structuring
		const {
			attributes: {
				urlFb,
				urlLn,
				urlTwit,
				urlGp,
			},
			className
		} = props;

		return (
			<div className = { className }>
				<div className = "icons-wrapper">
					<ul className = "icons-list">

						{ getUrlElem( urlFb, "urlFb", "fa fa-facebook" ) }

						{ getUrlElem( urlLn, "urlLn", "fa fa-linkedin" ) }

						{ getUrlElem( urlTwit, "urlTwit", "fa fa-twitter" ) }

						{ getUrlElem( urlGp, "urlGp", "fa fa-google" ) }

					</ul>
				</div>
			</div>
		);
	},
} );
