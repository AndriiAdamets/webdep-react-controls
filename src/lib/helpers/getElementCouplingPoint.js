/**
 * Return middle of one of element borders
 * @param {*} element
 * @param {string} [pointPosition='bottom'] Middle of which border should be return
 */
export default function getElementCouplingPoint (element, pointPosition = 'bottom') {
  if (!pointPosition) {
    return {};
  }

  const rect = element.getBoundingClientRect();
  let left, top;
  if (pointPosition === 'top') {
    left = rect.left + rect.width / 2;
    top = window.scrollY + rect.top;
  }
  if (pointPosition === 'bottom') {
    left = rect.left + rect.width / 2;
    top = window.scrollY + rect.top + rect.height;
  }
  if (pointPosition === 'right') {
    left = rect.left + rect.width;
    top = window.scrollY + rect.top + rect.height;
  }
  if (pointPosition === 'left') {
    left = rect.left;
    top = window.scrollY + rect.top + rect.height;
  }
  return { left, top, width: rect.width };
}
