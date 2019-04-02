=== ACF: +SVG(+sprite) ===
Contributors: alex10041972
Tags: ACF, SVG, sprire, svg sprite
Donate link: https://github.com/AlexJakovlev/advanced-custom-fields-svg
Requires at least: 5.1.1
Tested up to: 5.1.1
Requires PHP: 7.2.15-0
Stable tag: 1.0.0
License: GNU GPL
License URI: https://www.gnu.org/licenses/old-licenses/gpl-2.0.ru.html

extension for ACF, adding image_svg field


== Description ==
The extension for ACF, the addition of the image_svg field, includes the ability to load SVG files WP-uploader. renders SVG sprites created in  mode

== Installation ==
Install and activate the WordPress plugin.
Automatically expands the list of fields in AСF

== Frequently Asked Questions ==
------------
ATTENTION:
Mandatory requirement of having the first ':' character in the id field
------------

You can create swg sprites using:
https://uk.wordpress.org/plugins/svg-spritemap
https://www.npmjs.com/package/gulp-svg-sprites

Or any other resource
having a file of the form:

<svg xmlns="http://www.w3.org/2000/svg">
	<symbol viewBox="0 0 32 32" id=":arrows_for_phone">
	....
	<symbol viewBox="0 0 20.7 26" id=":cabinet">
	.....
	<symbol viewBox="0 0 21 15" id=":mail">
	</symbol>
	....
	....
	....
	<symbol viewBox="0 0 11 21" id=":phone">
	....
	</symbol>
</svg>

== Screenshots ==
1. this field

== Changelog ==
added image-svg field to ACF and visualization to
includes the ability to load SVG files WP-uploader

== Upgrade Notice ==
Upgrade Notice