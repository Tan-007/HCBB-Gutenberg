<?php
/**
 * Plugin Name: HCBB Blocks
 * Plugin URI: https://rahicodes.wordpress.com
 * Description: The plugin registers gutenberg blocks for the theme 'HCBB Theme'
 * Author: rahidroid
 * Author URI: https://rahicodes.wordpress.com
 * Version: 1.1.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package hcbb-blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
