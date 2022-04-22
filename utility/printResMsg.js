export const printResMsg = (msg) => {
  // const { data } = error.response;
  // const motto = document.querySelector('.motto');
  const motto = [...document.querySelectorAll('.motto')];
  // console.log(motto);
  // console.log(msg);

  motto[0].innerHTML = msg;
  motto[1].innerHTML = msg;
};
