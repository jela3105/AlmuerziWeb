window.onload = () => {
  handleForm();
  getInitialData();
};

const handleForm = () => {
  const orderForm = document.getElementById("order");
  orderForm.onsubmit = (event) => {
    event.preventDefault();
    const mealsIdValue = document.getElementById("meals-id").value;
    if (!mealsIdValue) {
      alert("You must select a meal");
      return;
    }
    const order = {
      meal_id: mealsIdValue,
      user_id: "Chanchito feliz",
    };
    fetch("https://serverless.jela3105.vercel.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/josn",
      },
      body: JSON.stringify(order),
    }).then((x) => console.log(x));
  };
};

const getInitialData = () => {
  fetch("https://serverless.jela3105.vercel.app/api/meals")
    .then((response) => response.json())
    .then((data) => {
      const mealsList = document.getElementById("meals-list");
      const submit = document.getElementById("submit");
      const itemList = data.map(renderMeal);
      mealsList.removeChild(mealsList.firstElementChild); //remove loading text
      itemList.forEach((element) => mealsList.appendChild(element));
      submit.removeAttribute("disabled");
      fetch("https://serverless.jela3105.vercel.app/api/meals")
        .then((response) => response.json())
        .then((ordersData) => {});
    });
};

const renderMeal = (item) => {
  const element = stringToHTML(`<li data_id="${item._id}">${item.name}</li>`);
  element.addEventListener("click", () => {
    const mealsList = document.getElementById("meals-list");
    Array.from(mealsList.children).forEach((x) =>
      x.classList.remove("selected")
    );
    element.classList.add("selected");
    const mealsIdInput = document.getElementById("meals-id");
    mealsIdInput.value = item._id;
  });
  return element;
};

const renderOrder = (order, meals) => {};

const stringToHTML = (stringText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(stringText, "text/html");
  return doc.body.firstChild;
};
