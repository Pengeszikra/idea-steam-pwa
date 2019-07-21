export default call => event => {
  event.stopPropagation();
  call(event);
};