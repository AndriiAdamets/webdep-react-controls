/**
 * Check is node a child of parent
 * @param {*} parent
 * @param {*} child
 */
export default function isDescendant(parent, child) {
  let node = child.parentNode;
  while (node != null) {
      if (node == parent) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}