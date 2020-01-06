<?php 

/**
 * The function renders out the content for the block 'Posts Slider'
 * on the front-end.
 * 
 * @param attributes {array} contains attributes
 * @param content    {array} contains content
 * 
 * @return {html} return html to render out
 * @since 1.3.0
 */
function hcbb_render_posts_slider( $attributes, $content ) {
	
	$html = '';
	$args = array(
		'post_type' 	 => 'post',
	);

	$query = new wp_query( $args );

	$number_posts = $query->post_count ;
	$number_loop = ( 0 === ($number_posts % 6 ) ) ? ( $number_posts / 6 ) : ( ( $number_posts / 6 ) + 1 );
	$number_loop = absint( $number_loop ); // decides how many slides we want to generate
	$count_loop = 0; // counter for loop

	$html .= '<div class="wp-block-hcbb-blocks-posts-slider container">';
	$html .= '	<div id="myCarousel" class="carousel slide" data-ride="carousel">';
	$html .= '		<div class="grid-wrapper carousel-inner">';

				if ( $number_posts > 0 && $query -> have_posts() ):
					while ( $count_loop < $number_loop ):
						$class_name = 'item';
						$inline_css = 'grid-template-columns: var(--block_width) var(--block_width) var(--block_width);
									   grid-template-rows: var(--block_height) var(--block_height);';
						
						if ( $count_loop === 0 ) { // first slide will be active
							$class_name = 'item active';
						}

	$html .= '			<div class="' . $class_name . '">';
	$html .= '				<div class="grid">';

						for ( $i=0; $i<6; $i++ ) :
							$query -> the_post();

								if ( has_post_thumbnail() ):
									$html .= '<a href="' . get_post_permalink() . '">';
									$html .= '	<div class="grid__item" style="background-image: url(' . get_the_post_thumbnail_url() . ');">';
									$html .= '	</div><!-- .grid__item -->';
									$html .= '</a>';
								endif;
						endfor;
	$html .= '				</div>';
	$html .= '			</div><!-- .grid .item -->';
					$count_loop++;	
					endwhile;
				endif;
				
	$html .= '		</div><!-- .grid-wrapper -->';
	$html .= '		<!-- Left and right controls -->';
	$html .= '		<a class="left carousel-control" href="#myCarousel" data-slide="prev">';
	$html .= '			<span class="glyphicon glyphicon-chevron-left"></span>';
	$html .= '			<span class="sr-only">Previous</span>';
	$html .= '		</a>';
	$html .= '		<a class="right carousel-control" href="#myCarousel" data-slide="next">';
	$html .= '			<span class="glyphicon glyphicon-chevron-right"></span>';
	$html .= '			<span class="sr-only">Next</span>';
	$html .= '		</a>';
	$html .= '	</div><!-- .carousel .slide -->';
	$html .= '</div><!-- .wp-block-hcbb-blocks-posts-slider -->';

	return ( $html );

}