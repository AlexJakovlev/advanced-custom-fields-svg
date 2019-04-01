<?php
/*
Plugin Name: ACF: +SVG(+sprite)
Plugin URI: https://github.com/AlexJakovlev/
Description: ACF add field image-SVG
Version: 0.0.1
Author: Alexey
Author URI: https://github.com/AlexJakovlev/
Copyright: Alexey Jakovlev
Text Domain: none
Domain Path: /none
*/
if (!defined('ABSPATH')) {
	/* Prevent Direct Access */
	die(-1);
}
class Acf_Svg
{
	
	function __construct() {
		add_action('acf/register_fields', array(&$this,
			'register_fields'
		));
		
		/* For ACF Pro 5+ */
		add_action('acf/include_fields', array(&$this,
			'register_fields'
		));
	}
	
	function register_fields() {
		include_once (dirname(__FILE__) . '/class-acf-field-image-svg.php');

	}
}
new Acf_Svg();

$mimes='svg';
function wp39550_disable_real_mime_check( $data, $file, $filename, $mimes ) {
	$wp_filetype = wp_check_filetype( $filename, $mimes );

	$ext = $wp_filetype['ext'];
	$type = $wp_filetype['type'];
	$proper_filename = $data['proper_filename'];
	return compact( 'ext', 'type', 'proper_filename' );
}
add_filter( 'wp_check_filetype_and_ext', 'wp39550_disable_real_mime_check', 10, 4 );


function acf_svg(){

	if( is_admin() ){
		wp_enqueue_script( 'acf-svg', plugins_url( 'js/acf-svg.js', __FILE__ ), array('acf-input'), '1.1' );
	}
}

add_action( 'init', 'acf_svg' );
