<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package hcbb
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'hcbb' ); ?></a>

	<header id="masthead" class="site-header">

		<!-- Navigation bar starts here -->

		<div class="container-fluid">
			<nav class="navbar navbar-expand-lg navbar-light">
			
				<?php 
					if ( has_custom_logo() ) :
						the_custom_logo();
					else :  
				?>
					<a href=" <?php echo esc_url( get_site_url() ); ?> " class="logo">
						<b class="logo__text"><?php _e( 'HCBB Industries', 'hcbb' ) ?></b>
					</a>
				<?php endif; ?>	
		
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav mr-auto">
						<?php
						wp_nav_menu( array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'menu_class'     => 'nav-menu',
						) );
						?>
					</ul>
				</div> <!-- .collapse -->
			</nav><!-- .navbar -->
		</div> <!-- .container -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
