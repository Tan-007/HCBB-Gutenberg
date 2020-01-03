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
const { RichText, InspectorControls } = wp.editor; // Import RichText from wp.block-editor
const { ColorPicker, PanelBody, ColorPalette } = wp.components; // import ColorPicker from wp.components

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
registerBlockType( 'hcbb-blocks/cover', {
	
	// Block title.
	title: __( 'Cover Block' ),

	// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	icon: 'editor-paste-text', 

	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	category: 'hcbb-blocks', 

	// keywords to look for when searching for a block
	keywords: [
		__( 'hcbb-blocks - Block' ),
		__( 'block cover' ),
	],

	// supports
	supports: {
		align: true,
		align: ['wide']
	},

	// custom attributes
	attributes: {
		// stores the block's header
		block_header: {
			type    : 'string',
			selector: '.block__header',
		},
		// stores the block's description
		block_desc: {
			type    : 'string',
			selector: '.block__desc',
		},
		// stores first gradient color
		grad_1: {
			type: 'string',
			selector: '.block-wrapper',
			default: '#0d1260'
		},
		// stores second gradient color
		grad_2: {
			type: 'string',
			selector: '.block-wrapper',
			default: '#3677a1'
		}
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
				block_header,
				block_desc,
				grad_1,
				grad_2,
			},
			setAttributes,
			className
		} = props;

		const defaultColors = [
			{ name: 'Primary'  , color: '#0d1260' },
			{ name: 'Secondary', color: '#3677a1' }
		]

		/**
		 * Function is triggered when the header text is changed.
		 * The function sets the new value to the 'block_header' variable
		 * 
		 * @param {string} newText new title
		 */
		const onHeaderChange = ( newText ) => {
			setAttributes ( {
				block_header: newText
			} );
		}

		/**
		 * Function is triggered when the description text is changed.
		 * The function sets the new value to the 'block_desc' variable
		 * 
		 * @param {string} newText new title
		 */
		const onDescChange = ( newText ) => {
			setAttributes ( {
				block_desc: newText
			} );
		}

		/**
		 * function is triggered when a color is selected from the color picker
		 * 
		 * @param {string} newColor 
		 */
		const onChangeGrad1 = ( newColor ) => {
			setAttributes( {
				grad_1: newColor
			} );
		}

		/**
		 * function is triggered when a color is selected from the color picker
		 * 
		 * @param {string} newColor 
		 */
		const onChangeGrad2 = ( newColor ) => {
			setAttributes( {
				grad_2: newColor
			} );
		}

		  
		return ([
			<InspectorControls>
				<div className = { className }>
					<PanelBody title = { __( 'Gradient settings', 'hcbb-blocks' ) }>
						<p><strong>{ __( 'Select 1st gradient color:', 'hcbb-blocks' ) }</strong></p>
						<ColorPalette
							colors   = { defaultColors }
							value    = { grad_1 }
							onChange = { onChangeGrad1 }
						/>

						<p><strong>{ __( 'Select 2nd gradient color:', 'hcbb-blocks' ) }</strong></p>
						<ColorPalette
							colors   = { defaultColors }
							value    = { grad_2 }
							onChange = { onChangeGrad2 }
						/>
					</PanelBody>
				</div>
			</InspectorControls>
			,
			<div className = { className }>
				<div className = "block-wrapper"
					 style = { { background: `linear-gradient(to bottom, ${ grad_1 }, ${ grad_2 })` } }
				>
					<div className = "block">
						<RichText
							tagName     = "h2"
							className   = "block__header"
							value       = { block_header }
							onChange    =  { onHeaderChange }
							placeholder = { __( 'Block title', 'hcbb-blocks' ) }
						/>
						<RichText 
							tagName     = "p"
							className   = "block__desc"
							value       = {block_desc }
							onChange    = { onDescChange }
							placeholder = { __( 'Block description', 'hcbb-blocks' ) }
						/>
					</div>
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
				block_header,
				block_desc,
				grad_1,
				grad_2,
			},
			className
		} = props;

		return (
			<div className = { className }>
				<div className = "block-wrapper"
					 style = { { background: `linear-gradient(to bottom, ${ grad_1 }, ${ grad_2 })` } }
				>
					<div className = "block">
						<RichText.Content
							tagName = "h2"
							className = "block__header"
							value = { block_header }
						/>
						<RichText.Content
							tagName = "p"
							className = "block__desc"
							value = { block_desc }
						/>
					</div>
				</div>
			</div>
		);
	},
} );
