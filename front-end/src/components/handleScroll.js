// export const handleScroll = (e) => {
//   e.preventDefault();
//   const target = e.target.getAttribute("href");
//   const offsetTop = document.querySelector(target).offsetTop;
//   window.scroll({
//     top: offsetTop - 50,
//     behavior: "smooth",
//   });
// };

// export const handleScroll = (e) => {
//   e.preventDefault();
//   const target = document.querySelector(e.target.getAttribute("href"));
//   if (target) {
//     const scrollTop = target.offsetTop;
//     window.scrollTo({ top: scrollTop, behavior: "smooth" });
//   }
// };

// export const handleScroll = (e) => {
//   e.preventDefault();
//   const targetId = e.target.getAttribute("href");
//   const targetElement = document.querySelector(targetId);
//   console.log(targetElement);
//   const scrollTop = targetElement.offsetTop;
//   console.log(scrollTop);
//   window.scrollTo({ top: scrollTop, behavior: "smooth" });
// };

export const handleScroll = (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute("href");
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const scrollTop = targetElement.offsetTop;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });
  }
};
