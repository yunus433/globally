window.onload = () => {
  const product = JSON.parse(document.getElementById("product").value);
  const categoryInputs = document.querySelectorAll(".category-input");
  const typeInputs = document.querySelectorAll(".type-input");

  categoryInputs.forEach(input => {
    if (input.value == product.category)
      input.checked = true;
  });

  typeInputs.forEach(input => {
    if (input.value == product.type)
      input.checked = true;
  });
}
