<?php
// https://onlinephp.io/c/b4351
// Limitations:
// Max 512 keys
// Practical max 63KB stored
// Max key length 256

/**
 * Convert into a hyper-efficient, bit-level storage medium for JSON-like data.
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */

/**
 * Convert into a hyper-efficient, bit-level storage medium for JSON-like data.
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */

function dessicate($array) {
	$count = 0;
	$data = null;
	$header = null;
	foreach ($array as $key => $value) {
		if(is_null($header)) {
			if(strlen($data ?? '') !== 0) {
				$header = pack('S', strlen($data ?? ''));
			}
		} else {
			$header .= pack('S', strlen($data));
		}
		$keylen = strlen($key);
		$type = 'Z';
		$shipthis = null;
		if(is_int($value)) {
			$size = 0;
			$sizeCheck = $value;
			while($sizeCheck != 0) {
				$sizeCheck = $sizeCheck >> 8;
				$size += 1;
			}
			$size *= ($value < 0) ? -1 : 1;
			$type = match ($size) {
				1 => 'c',
				-1 => 'C',
				2 => 's',
				-2 => 'S',
				3, 4 => 'l',
				-3, -4 => 'L',
				5, 6, 7, 8 => 'q',
				-5, -6, -7, -8 => 'Q'
			};
			$packFormat = match ($type) {
				'c', 'C' => 'C',
				's', 'S' => 'n',
				'l', 'L' => 'N',
				'q', 'Q' => 'J'
			};
			$shipthis = pack($packFormat, abs($value));
		} elseif(is_float($value)) {
			$type = 'f';
			$shipthis = pack('G', $value);
		} elseif(is_array($value)) {
			$type = 'D';
			$shipthis = pack("Z*", dessicate($value));
		}
		if(is_bool($value)) {
			$type = $value ? 'T':'F';
			$shipthis = '';
		}
		if(is_null($shipthis)) {
			$shipthis = pack("Z*", $value);
		}
		$pack = pack("CCa" . $keylen, $keylen, ord($type), $key).$shipthis;
		
		if(is_null($data)) {
			$data = $pack;
		} else {
			$data .= $pack;
		}
	}
	$return = pack('S', strlen($header??""));
	if(!empty($header)) {
		$return .= $header;
	}
	$return .= rtrim($data, '\0');
	return $return;
}

/**
 * Retrieve from hyper-efficient, bit-level storage medium for JSON-like data.
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */
function resurrect($data) {
	$unpack1 = unpack('Slen', $data);
	$headerlen = $unpack1['len'];
	if($headerlen>0){
		$unpack2 = unpack('a'.$headerlen.'header', $data, 2);
		$header= "\0\0".$unpack2['header'];
		$pointers=array_values(unpack('S*', $header));
	}else{
		$header="\0\0";
		$pointers=[0];
	}
	
	
	$array = [];
	for($i=0;$i<count($pointers);$i++) {
		$pointer = $pointers[$i];
		$nextPointer = $pointers[$i+1] ?? null;
		$fieldLength = is_null($nextPointer) ? null : $nextPointer-$pointer;
		
		$unpack3 = unpack('Clen/Ctype', $data, 2+$headerlen+$pointer);
		$type = chr($unpack3['type']);
		$keyLength = $unpack3['len'];
		$dataLength = is_null($nextPointer) ? '*' : ($fieldLength - $keyLength -1-1);
		switch($type) {
			case 'c':
			case 'C':
			case 's':
			case 'S':
			case 'l':
			case 'L':
			case 'q':
			case 'Q':
				$packFormat = match ($type) {
					'c', 'C' => 'C',
					's', 'S' => 'n',
					'l', 'L' => 'N',
					'q', 'Q' => 'J'
				};
				$isNegative = match ($type) {
					'c','s','l','q' => 1,
					'C','S','L','Q' => -1
				};
				$unpack4 =unpack('a'.$unpack3['len'].'key/'.$packFormat.'value', $data, 2+$headerlen+$pointer+1+1);
				$key = $unpack4['key'];
				$value = $unpack4['value'];
				break;
			case 'f':
				$unpack4 = unpack('a'.$unpack3['len'].'key/Gvalue', $data, 2+$headerlen+$pointer+1+1);
				$key = $unpack4['key'];
				$value = $unpack4['value'];
				break;
			case 'T':
			case 'F':
				$unpack4 = unpack('a'.$unpack3['len'].'key', $data, 2+$headerlen+$pointer+1+1);
				$key = $unpack4['key'];
				$value = match ($type) {
					'T' => true,
					'F' => false
				};
				break;
			case 'D':
				$unpack4 = unpack('a'.$unpack3['len'].'key/a'.$dataLength.'value', $data, 2+$headerlen+$pointer+1+1);
				$key = $unpack4['key'];
				$value = resurrect($unpack4['value']);
				break;
			case 'Z':
			default:
				$unpack4 = unpack('a'.$unpack3['len'].'key/Z'.$dataLength.'value', $data, 2+$headerlen+$pointer+1+1);
				$key = $unpack4['key'];
				$value = $unpack4['value'];
		}
		$array[$key] = $value;
	}
	return $array;
}
