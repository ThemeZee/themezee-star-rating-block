<?php
/**
 * Plugin Name:       ThemeZee Star Rating Block
 * Description:       Rate something with one to five stars.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.0.1
 * Author:            ThemeZee
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       themezee-star-rating-block
 *
 * @package           ThemeZee Star Rating Block
 * 
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function register_themezee_star_rating_block() {

	// Load translation for PHP files.
	load_plugin_textdomain( 'themezee-star-rating-block', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	// Register Block.
	register_block_type( __DIR__ . '/build', [
		'title'       => _x( 'Star Rating', 'block title', 'themezee-star-rating-block' ),
		'description' => _x( 'Rate something with one to five stars.', 'block description', 'themezee-star-rating-block' ),
	] );

	// Load translation for JS files.
	wp_set_script_translations( 'themezee-star-rating-editor-script', 'themezee-star-rating-block', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action( 'init', 'register_themezee_star_rating_block' );


if ( ! function_exists( 'register_themezee_blocks_block_category' ) ) :
	/**
	 * Add ThemeZee Blocks category to Block Inserter.
	 */
	function register_themezee_blocks_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'themezee-blocks',
					'title' => __( 'ThemeZee Blocks', 'themezee-star-rating-block' ),
				),
			)
		);
	}
	add_filter( 'block_categories_all', 'register_themezee_blocks_block_category', 10, 2 );
endif;


/**
 * Set up the Plugin Updater Constants.
 */
define( 'THEMEZEE_STAR_RATING_BLOCK_VERSION', '1.0.1' );
define( 'THEMEZEE_STAR_RATING_BLOCK_NAME', 'ThemeZee Star Rating Block' );
define( 'THEMEZEE_STAR_RATING_BLOCK_ID', 256134 );
define( 'THEMEZEE_STAR_RATING_BLOCK_STORE_URL', 'https://themezee.com' );


/**
 * Include License Settings and Plugin Updater.
 */
include dirname( __FILE__ ) . '/includes/class-themezee-blocks-admin-page.php';
include dirname( __FILE__ ) . '/includes/class-themezee-star-rating-block-license-settings.php';
include dirname( __FILE__ ) . '/includes/class-themezee-star-rating-block-updater.php';


/**
 * Initialize the updater. Hooked into `init` to work with the
 * wp_version_check cron job, which allows auto-updates.
 */
function update_themezee_star_rating_block() {

	// To support auto-updates, this needs to run during the wp_version_check cron job for privileged users.
	$doing_cron = defined( 'DOING_CRON' ) && DOING_CRON;
	if ( ! current_user_can( 'manage_options' ) && ! $doing_cron ) {
		return;
	}

	// Retrieve our license key from the DB.
	$options     = get_option( 'themezee_blocks_settings', array() );
	$license_key = ! empty( $options['star_rating_block_license_key'] ) ? trim( $options['star_rating_block_license_key'] ) : false;

	// Setup the updater.
	$edd_updater = new ThemeZee_Star_Rating_Block_Updater(
		THEMEZEE_STAR_RATING_BLOCK_STORE_URL,
		__FILE__,
		array(
			'version' => THEMEZEE_STAR_RATING_BLOCK_VERSION,
			'license' => $license_key,
			'item_id' => THEMEZEE_STAR_RATING_BLOCK_ID,
			'author'  => 'ThemeZee',
			'beta'    => false,
		)
	);
}
add_action( 'init', 'update_themezee_star_rating_block' );
