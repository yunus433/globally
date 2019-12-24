window.onload = () => {
  addEventListener(document);

  document.addEventListener("click", event => {
    if (event.target.className == "right-side-open-button" || event.target.parentNode.className == "right-side-open-button") {
      document.querySelector(".left-side-open-button").style.borderColor = "rgb(205, 204, 204)";
      document.querySelector(".main-wrapper-left-side").style.display = "none";
      document.querySelector(".right-side-open-button").style.borderColor = "rgb(136, 136, 136)";
      document.querySelector(".main-wrapper-right-side").style.display = "flex";
    } else if (event.target.className == "left-side-open-button" || event.target.parentNode.className == "left-side-open-button") {
      document.querySelector(".right-side-open-button").style.borderColor = "rgb(205, 204, 204)";
      document.querySelector(".main-wrapper-right-side").style.display = "none";
      document.querySelector(".left-side-open-button").style.borderColor = "rgb(136, 136, 136)";
      document.querySelector(".main-wrapper-left-side").style.display = "flex";
    }
  });
}
