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
const { MediaUpload } = wp.editor; // import ColorPicker from wp.components
const { withSelect } = wp.data;
const { Button, SelectControl } = wp.components;


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
registerBlockType( 'hcbb-blocks/pages', {
	
	// Block title.
	title: __( 'Pages Section' ),
	
	// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	icon: 'editor-paste-text', 
	
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	category: 'hcbb-blocks', 
	
	// keywords to look for when searching for a block
	keywords: [
		__( 'hcbb-blocks - Block' ),
		__( 'block pages section' ),
	],
	
	supports: {
		align: true,
		align: ['wide']
	},
	
	// custom attributes
	attributes: {
		url1: {
			type: 'string',
		},
		id1: {
			type: 'string',
		},
		url2: {
			type: 'string',
		},
		id2: {
			type: 'string'
		},
		url3: {
			type: 'string',
		},
		id3: {
			type: 'string',
		},
		sPage1: {
			type: 'string',
		},
		sPage2: {
			type: 'string',
		},
		sPage3: {
			type: 'string',
		},
		pageId1: {
			type: 'number',
		},
		pageId2: {
			type: 'number',
		},
		pageId3: {
			type: 'number',
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
	
	edit: withSelect( ( select ) => {
		return {
			pages: select( 'core' ).getEntityRecords( 'postType', 'page', { status: 'publish', per_page: 30 } )
		};
	} )( ( { pages, className, attributes, setAttributes } ) => {
		
		const {
			url1, id1,
			url2, id2,
			url3, id3,
			sPage1, sPage2, sPage3,
		} = attributes;
		
		/**
		 * The function renders the button to upload an image if there is no image
		 * selected.
		 * renders image if an image is already selected. 
		 * 
		 * @param {Object} openEvent contains object related properties
		 * @param {string} url image url
		 * 
		 * @returns {Mixed} JSX
		 * 
		 * @since 1.5.0
		 */
		const getImageButton = ( openEvent, url ) => {
			if ( url ) {
				return (
					<div 
					className = "icon-container"
					onClick   = { openEvent }
					>
						<img 
							src       = { url }
							className = "image"
							/>
						<span className = "hover-text">
							{ __( 'Change Icon', 'hcbb-blocks' ) }
						</span>
					</div>
				);
			}
			else {
				return (
					<div className = "icon-container">
						<Button 
							onClick   = { openEvent }
							className = "button button-large"
							>
							{ __( 'Pick an icon', 'block-image-card' ) }
						</Button>
					</div>
				);
			}
		};
		
		/**
		 * function generates options for the pages dropdown and returns it
		 * 
		 * @returns {Array} array containing all the options
		 */
		const getSelectControlOptions = () => {
			// value: custom JSON, it's very custom and error prone. I couldn't get to a solution for this problem.
			// having value: null, would cause JSON.parse() to fail, that's why.
			let options = [ { value: '{"title":{"rendered":"No title"},"page_excerpt":{"rendered":"Select a page"}}', label: 'Select a Page', default: true } ];
			pages.map(( page ) => {
				options.push( { value: JSON.stringify( page ), label: ( '' !== page.title ) ? page.title.rendered : "(No title)" } );
			})
			
			return options;
		}
		
		// const getMediaUrl = ( page ) => {
			// 	if ( page && ( 0 !== JSON.parse(page).featured_media ) ) {
				// 		const url = 'http://hcbb.test/index.php?rest_route=/wp/v2/media/' + JSON.parse(page).featured_media;
				// 		fetch( url )
				// 		.then( response => response.json() )
				// 		.then( data => { url1 = data.media_details.sizes.thumbnail.source_url } );
				// 	}
				// }
				
				if ( ! pages ) {
					return 'Loading...';
				}
				
				if ( pages && pages.length === 0 ) {
					return 'No posts';
				}
				
				return([
					<div className = { className }>
				<div className = "pages-wrapper">

					{/* Page 1 */}
					<div className = "page">

						<div className = "page__selector">
							<SelectControl
								value    = { sPage1 ? sPage1 : null }
								onChange = { ( page ) => { setAttributes( { sPage1: page } ) } }
								options  = { getSelectControlOptions() }
								/>
						</div>

						<div className = "page__icon">
							<MediaUpload
								onSelect     = { media => { setAttributes( { id1: media.id, url1: media.url } ); } }
								type         = 'image'
								allowedTypes = { [ 'image', 'image/gif' ] }
								value        = { id1 }
								render       = { ( { open } ) => getImageButton( open, url1 ) }
							/>
						</div>
						
						<div className = "page__title">
							{ sPage1 ? JSON.parse(sPage1).title.rendered : "" }
						</div>
						
						<div className = "page__excerpt" dangerouslySetInnerHTML = { { __html: ( 
							( sPage1 && JSON.parse(sPage1).excerpt ) ? JSON.parse(sPage1).excerpt.rendered : "No content" ) } } 
						/>

					</div>
						
					{/* Page 2 */}
					<div className = "page">

						<div className = "page__selector">
							<SelectControl
								value    = { sPage2 ? sPage2 : null }
								onChange = { ( page ) => { setAttributes( { sPage2: page } ) } }
								options  = { getSelectControlOptions() }
							/>
						</div>

						<div className = "page__icon">
							<MediaUpload
								onSelect     = { media => { setAttributes( { id2: media.id, url2: media.url } ); } }
								type         = 'image'
								allowedTypes = { [ 'image', 'image/gif' ] }
								value        = { id2 }
								render       = { ( { open } ) => getImageButton( open, url2 ) }
							/>
						</div>

						<div className = "page__title">
							{ sPage2 ? JSON.parse(sPage2).title.rendered : "" }
						</div>

						<div className = "page__excerpt" dangerouslySetInnerHTML = { { __html: ( 
							( sPage2 && JSON.parse(sPage2).excerpt ) ? JSON.parse(sPage2).excerpt.rendered : "No content" ) } } 
						/>
					</div>

					{/* Page 3 */}
					<div className = "page">

						<div className = "page__selector">
							<SelectControl
								value    = { sPage3 ? sPage3 : null }
								onChange = { ( page ) => { setAttributes( { sPage3: page } ) } }
								options  = { getSelectControlOptions() }
							/>
						</div>

						<div className = "page__icon">
							<MediaUpload
								onSelect     = { media => { setAttributes( { id3: media.id, url3: media.url } ); } }
								type         = 'image'
								allowedTypes = { [ 'image', 'image/gif' ] }
								value        = { id3 }
								render       = { ( { open } ) => getImageButton( open, url3 ) }
							/>
						</div>

						<div className = "page__title">
							{ sPage3 ? JSON.parse( sPage3 ).title.rendered : "" }
						</div>

						<div className = "page__excerpt" dangerouslySetInnerHTML = { { __html: ( 
							( sPage3 && JSON.parse(sPage3).excerpt ) ? JSON.parse(sPage3).excerpt.rendered : "No content" ) } } 
						/>
					</div>
				</div>
			</div>
		]);
		} 
	),

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
				
			},
			className
		} = props;

		
		return (
			null
		);
	},
} );
