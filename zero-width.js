function encodeZeroWidthChars(str) {
  // define the zero width characters
  const ZERO_WIDTH_SPACE = "\u200B";
  const ZERO_WIDTH_NON_JOINER = "\u200C";

  // convert each character in the string to binary and replace with zero-width characters
  let encodedStr = str
    .split("")
    .map(char => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("") // get binary string
    .split("0")
    .join(ZERO_WIDTH_SPACE) // replace binary 0 with zero-width space
    .split("1")
    .join(ZERO_WIDTH_NON_JOINER); // replace binary 1 with zero-width non-joiner

  return encodedStr;
}

function decodeZeroWidthChars(str) {
  // define the zero width characters
  const ZERO_WIDTH_SPACE = "\u200B";
  const ZERO_WIDTH_NON_JOINER = "\u200C";

  // replace zero width characters with binary
  let binaryStr = str
    .split(ZERO_WIDTH_SPACE)
    .join("0")
    .split(ZERO_WIDTH_NON_JOINER)
    .join("1");

  // group by 8 bits
  let binaryArr = binaryStr.match(/.{1,8}/g);

  // decode binary to text
  let decodedStr = binaryArr
    .map(binary => String.fromCharCode(parseInt(binary, 2)))
    .join("");

  return decodedStr;
}

encodedMsg = encodeZeroWidthChars("I'm invisible!")
console.log("#" + encodedMsg + "#")
decodedMsg = decodeZeroWidthChars(encodedMsg)
console.log(decodedMsg)