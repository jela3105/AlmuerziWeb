let measlState = [];

window.onload = () => {
  handleForm();
  getInitialData();
};

const handleForm = () => {
  const orderForm = document.getElementById("order");
  orderForm.onsubmit = (event) => {
    event.preventDefault();
    const submit = document.getElementById("submit");
    submit.setAttribute("disabled", true);
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((x) => x.json())
      .then((response) => {
        const renderedOrder = renderOrder(response, mealsState);
        const ordersList = document.getElementById("orders-list");
        ordersList.appendChild(renderedOrder);
        submit.removeAttribute("disabled");
      });
  };
};

const getInitialData = () => {
  fetch("https://serverless.jela3105.vercel.app/api/meals")
    .then((response) => response.json())
    .then((mealsData) => {
      mealsState = mealsData;
      const mealsList = document.getElementById("meals-list");
      const submit = document.getElementById("submit");
      const generatedMealsList = mealsData.map(renderMeal);
      mealsList.removeChild(mealsList.firstElementChild); //remove loading text
      generatedMealsList.forEach((meal) => mealsList.appendChild(meal));
      submit.removeAttribute("disabled");
      fetch("https://serverless.jela3105.vercel.app/api/orders")
        .then((response) => response.json())
        .then((ordersData) => {
          const ordersList = document.getElementById("orders-list");
          const generatedOrdersList = ordersData.map((orderData) =>
            renderOrder(orderData, mealsData)
          );
          console.log(generatedOrdersList);
          ordersList.removeChild(ordersList.firstElementChild);
          generatedOrdersList.forEach((element) =>
            ordersList.appendChild(element)
          );
        });
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

const renderOrder = (order, meals) => {
  const meal = meals.find((x) => x._id === order.meal_id);
  const element = stringToHTML(
    `<li data_id="${order._id}">${meal.name} - ${order.user_id}</li>`
  );
  return element;
};

const stringToHTML = (stringText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(stringText, "text/html");
  return doc.body.firstChild;
};
