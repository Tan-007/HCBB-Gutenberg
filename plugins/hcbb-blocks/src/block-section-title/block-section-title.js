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
const { RichText } = wp.editor; // Import RichText from wp.block-editor

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
registerBlockType( 'hcbb-blocks/section-title', {
	
	// Block title.
	title: __( 'Section Title' ),
	// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	icon: 'editor-paste-text', 
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	category: 'hcbb-blocks', 
	// keywords to look for when searching for a block
	keywords: [
		__( 'hcbb-blocks — CGB Block' ),
		__( 'CGB Example' ),
	],
	supports: {
		align: true,
		align: ['wide'],
	},
	// custom attributes
	attributes: {
		align: {
			type   : 'string',
			default: 'wide',
		},
		// stores the title text
		title_text: {
			type    : 'string',
			selector: '.title__text',
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
				title_text,
			},
			setAttributes,
			className
		} = props;

		/**
		 * Function is triggered when the title text is changed.
		 * The function sets the new value to the 'title_text' variable
		 * 
		 * @param {string} newTitle new title
		 */
		const onTitleChange = ( newTitle ) => {
			setAttributes ( {
				title_text: newTitle
			} );
		}

		return (
			<div className = { className }>
				<RichText
					tagName   = "h2"
					className = "title__text"
					value     = { title_text }
					onChange  =  { onTitleChange }
				/>
			</div>
		);
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
				title_text,
			},
			className
		} = props;

		return (
			<div className = { className }>
				<RichText.Content
					tagName   = "h2"
					className = "title__text"
					value     = { title_text }
				/>
			</div>
		);
	},
} );
