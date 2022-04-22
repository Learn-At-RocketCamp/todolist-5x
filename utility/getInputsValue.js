export const getInputsValue = (inputs) => {
  // const getInputValue = (inputs) => {
  return inputs.reduce((target, item) => {
    target[item.name] = item.value.trim();
    return target;
  }, {});
};
