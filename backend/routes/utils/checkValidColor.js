function isValidHexColor(hex) {
    const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexRegex.test(hex);
  }
export default isValidHexColor  