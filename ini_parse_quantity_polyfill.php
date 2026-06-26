<?php
if(!function_exists('ini_parse_quantity')) {
	/**
	 * Very basic polyfill for ini_parse_quantity
	 *
	 * @param string $shorthand The quantity string to parse. It may include unit suffixes or numerical prefixes used for bases (e.g., hex, binary).
	 * @return int The parsed quantity in bytes as an integer value.
	 * @author Jack Dunn <https://github.com/JackDunnCodes>
	 * @license MPL-2.0
	 */
	function ini_parse_quantity($shorthand) {
		$regex = '/^(0?[xXbBoO]?)([0-9A-Fa-f]*)([kKmMgG]?)$/';
		preg_match($regex, $shorthand, $matches);
		if(empty($matches)) {
			trigger_error('Can\'t parse '.$shorthand.' :(', E_USER_WARNING);
			return 0;
		}
		[ $full, $binOctHex, $value, $unit ] = $matches;
		switch ($binOctHex) {
			case '0b':
			case '0B':
				$base = 2;
				break;
			case '0o':
			case '0O':
			case '0':
				$base = 8;
				break;
			case '0x':
			case '0X':
				$base = 16;
				break;
			default:
				$base = 10;
				break;
		}
		$value = intval($value, $base);

		switch ($unit) {
			case 'g':
			case 'G':
				$value *= 1024;
			case 'm':
			case 'M':
				$value *= 1024;
			case 'k':
			case 'K':
				$value *= 1024;
			default:
				break;
		}
		return $value;
	}
}