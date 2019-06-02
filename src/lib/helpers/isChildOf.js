export default function isChildOf(child, parent) {
  if(child.parentNode === parent) {
    return true;
  }
  if(child.parentNode === document.body) {
    return false;
  }

  return isChildOf(child.parentNode, parent);
}