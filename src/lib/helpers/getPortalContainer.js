export default function getPortalContainer(id = 'portal-container') {
  let container = document.getElementById(id);
  if(!container) {
    container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.prepend(container);
  }
  return container;
}
