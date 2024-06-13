

function validateSize(size) {
    const sizePattern = /^(XS|S|M|L|XL|XXL|\d{1,2})$/i;
  return sizePattern.test(size)
}
export default validateSize