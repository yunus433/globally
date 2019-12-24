window.onload = () => {
  addEventListener(document);

  document.addEventListener("click", event => {
    if (event.target.classList.contains("remove-button") && event.target.parentNode.id.length > 0) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/basket/remove");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
          id: event.target.parentNode.id
      }));
      event.target.parentNode.id = "";
      event.target.parentNode.style.display = "none";
    }
  });
}
