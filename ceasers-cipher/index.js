function rot13(str) {
  return str.split('').map(function(char) {
    if (char.match(/[A-Za-z]/)) {
      const charCode = char.charCodeAt(0);
      const isUpperCase = charCode < 97;
      const rotated = (charCode - (isUpperCase ? 65 : 97) + 13) % 26 + (isUpperCase ? 65 : 97);
      return String.fromCharCode(rotated);
    } else {
      return char;
    }
  }).join('');
}
