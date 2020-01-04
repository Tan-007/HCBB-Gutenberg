<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package hcbb-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for block 'section-title' for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function hcbb_section_title_block_assets() {
	// Register block styles for both frontend + backend.
	wp_register_style(
		'section-title-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'section-title-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'section-title-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'section-title-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**	
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.0.0
	 */
	register_block_type(
		'hcbb-blocks/section-title', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'section-title-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'section-title-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'section-title-block-editor-css',
		)
	);

	/**	
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.1.0
	 */
	register_block_type(
		'hcbb-blocks/cover', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'section-title-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'section-title-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'section-title-block-editor-css',
		)
	);
	
	/**	
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.2.0
	 */
	register_block_type(
		'hcbb-blocks/posts-slider', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'           => 'section-title-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script'   => 'section-title-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'    => 'section-title-block-editor-css',
			// render functino for displaying posts
			'render_callback' => 'hcbb_render_posts_slider',
		)
	);
	

}


/**
 * The function registers a custom block category named 'HCBB Blocks'
 * which will contain all the blocks for this plugin.
 * 
 * @param categories {array} contains all the in-built categories
 * @param post       {array} contains post related data on which the
 * 							 block is being used.
 * 
 * @return {array} including our new custom category.
 * @since 1.1.0
 */
function hcbb_register_category( $categories, $post ) {
	return array_merge(
		$categories, 
		array(
			array(
				'slug'  => 'hcbb-blocks',
				'title' => __( 'HCBB Blocks', 'hcbb-blocks' ),
			)
		)
	);
}

/**
 * function to register front-end script for the block 'section title'
 * 
 * @since 1.1.0
 */

function hcbb_section_title_register_fscript() {

	// Register block script for front-end.
	wp_enqueue_script(
		'section-title-front-block-js', // Handle.
		plugins_url( '/dist/blocks-front.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'jquery' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

}


// Hook: Block assets for block 'section-title'
add_action( 'init', 'hcbb_section_title_block_assets' );

// Hook: Custom category.
add_filter( 'block_categories', 'hcbb_register_category', 10, 2 );

// Hook: front-end scripts
add_action( 'wp_enqueue_scripts', 'hcbb_section_title_register_fscript' );

function hcbb_render_posts_slider( $attributes, $content ) {
	
	$html = '';
	$args = array(
		'post_type' 	 => 'post',
	);
	
	$query = new wp_query( $args );
	
	$html .= '<div class="wp-block-hcbb-blocks-posts-slider">';
	
	if ( $query -> have_posts() ):
		while ( $query -> have_posts() ):
			$query -> the_post();

			$html .= get_the_post_thumbnail();

		endwhile;
	endif;

	$html .= '</div>';

	return ( $html );

}