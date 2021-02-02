const stringToHTML = (stringText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(stringText, "text/html");
  return doc.body.firstChild;
};

const renderItem = (item) => {
  const element = stringToHTML(`<li data_id="${item._id}">${item.name}</li>`);

  element.addEventListener("click", () => {
    const mealsList = document.getElementById("meals-list");
    Array.from(mealsList.children).forEach((x) =>
      x.classList.remove("selected")
    );
    element.classList.add("selected");
  });

  return element;
};

window.onload = () => {
  fetch("https://serverless.jela3105.vercel.app/api/meals")
    .then((response) => response.json())
    .then((data) => {
      const mealsList = document.getElementById("meals-list");
      const submit = document.getElementById("submit");
      const itemList = data.map(renderItem);

      mealsList.removeChild(mealsList.firstElementChild);
      itemList.forEach((element) => mealsList.appendChild(element));

      submit.removeAttribute("disabled");
    });
};
