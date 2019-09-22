window.onload = () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("all-header-responsive-menu-open-button")) {
      document.querySelector(".responsive-menu-wrapper").classList.remove("close-menu-animation-class");
      document.querySelector(".responsive-menu-wrapper").classList.add("open-menu-animation-class");
    } else if (event.target.classList.contains("all-header-responsive-menu-close-button")) {
      document.querySelector(".responsive-menu-wrapper").classList.remove("open-menu-animation-class");
      document.querySelector(".responsive-menu-wrapper").classList.add("close-menu-animation-class");
    }
  })
}
