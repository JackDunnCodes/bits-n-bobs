<?php
/**
 * A unique-er version of uniqid. More random, more precise time, only one more char.
 * https://onlinephp.io/c/a8b2d
 * @license MPL-2.0
 */
function moreuniqid($pfx='') {
	return $pfx.base64_encode(
		pack("J",hrtime(true))
		.random_bytes(10)
	);
}