/**
 * Const
 */
const itemsDataCart = JSON.parse(localStorage.getItem("cart"));
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
/**
 * Display kanap in HTML cart page
 */
function itemCartInfo(item) {
  // Article
  const itemArticle = document.createElement("article");
  itemArticle.classList.add("cart__item");
  itemArticle.setAttribute("data-id", item.itemDataId);
  itemArticle.setAttribute("data-color", item.itemDataColor);

  // Image
  const itemImageDiv = document.createElement("div");
  itemImageDiv.classList.add("cart__item__img");
  const itemImage = document.createElement("img");
  itemImage.setAttribute("src", item.itemDataImage);
  itemImage.setAttribute("alt", item.itemDataImageAltTxt);
  itemImageDiv.appendChild(itemImage);

  // Div
  const itemInfoDiv = document.createElement("div");
  itemInfoDiv.classList.add("cart__item__content");

  const itemDescriptionDiv = document.createElement("div");
  itemDescriptionDiv.classList.add("cart__item__content__description");
  const itemH2 = document.createElement("h2");
  itemH2.textContent = item.itemDataName;
  const itemColorParagraph = document.createElement("p");
  itemColorParagraph.textContent = item.itemDataColor;
  const itemPriceParagraph = document.createElement("p");
  itemPriceParagraph.textContent = item.itemDataPrice + " €";
  itemDescriptionDiv.appendChild(itemH2);
  itemDescriptionDiv.appendChild(itemColorParagraph);
  itemDescriptionDiv.appendChild(itemPriceParagraph);

  const itemSettingsDiv = document.createElement("div");
  itemSettingsDiv.classList.add("cart__item__content__settings");

  const itemQuantitySettingsDiv = document.createElement("div");
  itemQuantitySettingsDiv.classList.add(
    "cart__item__content__settings__quantity"
  );
  const itemQuantityParagraph = document.createElement("p");
  itemQuantityParagraph.textContent = "Qté : ";
  const itemQuantityInput = document.createElement("input");
  itemQuantityInput.setAttribute("type", "number");
  itemQuantityInput.classList.add("itemQuantity");
  itemQuantityInput.setAttribute("name", "itemQuantity");
  itemQuantityInput.setAttribute("min", "1");
  itemQuantityInput.setAttribute("max", "100");
  itemQuantityInput.setAttribute("value", item.itemDataQuantity);
  itemQuantitySettingsDiv.appendChild(itemQuantityParagraph);
  itemQuantitySettingsDiv.appendChild(itemQuantityInput);

  const itemDeleteSettingsDiv = document.createElement("div");
  itemDeleteSettingsDiv.classList.add("cart__item__content__settings__delete");
  const itemDeleteButton = document.createElement("p");
  itemDeleteButton.classList.add("deleteItem");
  itemDeleteButton.textContent = "Supprimer";
  itemDeleteSettingsDiv.appendChild(itemDeleteButton);

  itemSettingsDiv.appendChild(itemQuantitySettingsDiv);
  itemSettingsDiv.appendChild(itemDeleteSettingsDiv);

  itemInfoDiv.appendChild(itemDescriptionDiv);
  itemInfoDiv.appendChild(itemSettingsDiv);

  itemArticle.appendChild(itemImageDiv);
  itemArticle.appendChild(itemInfoDiv);

  return itemArticle;
}

/**
 * Display kanaps in HTML cart page for each kanap in local storage
 */
function cartPagination(product) {
  const cartList = document.getElementById("cart__items");
  for (let i = 0; i < product.length; i++) {
    cartList.appendChild(itemCartInfo(product[i]));
  }
}

/**
 * Function for quantity, if quantity selected is 0 the product is deleted, if quantity is above 100 the quantity value changes to 100
 * and then change the total quantity article and the total price.
 */
let allQuantityInput = document.getElementsByClassName("itemQuantity");

function changeQuantity() {
  for (let input of allQuantityInput) {
    let itemToModify = input.closest("article");

    input.addEventListener("change", async function (e) {
      let itemTargetId = itemToModify.getAttribute("data-id");
      let itemTargetColor = itemToModify.getAttribute("data-color");
      let searchItem = itemsDataCart.find(
        (array) =>
          array.itemDataId == itemTargetId &&
          array.itemDataColor == itemTargetColor
      );
      if (input.value > 100) {
        input.value = 100;
        alert(
          "Attention, votre quantité pour cet article dépasse le maximum. Elle passe donc à 100 unités."
        );
      }
      Object.defineProperty(searchItem, "itemDataQuantity", {
        value: input.value,
      });
      localStorage.setItem("cart", JSON.stringify(itemsDataCart));

      if (input.value == 0) {
        itemToModify.remove();
        deleteItemInLocalStorage(itemToModify);
      }

      totalQuantity();
      calculTotalPrice(itemsDataCart);
    });
  }
}

/**
 * Remove item in cart page
 */
let allDeleteButton = document.getElementsByClassName("deleteItem");

function deleteItem() {
  for (let button of allDeleteButton) {
    let itemToDelete = button.closest("article");

    button.addEventListener("click", function (e) {
      deleteItemInLocalStorage(itemToDelete);
      itemToDelete.remove();
      totalQuantity();
      calculTotalPrice(itemsDataCart);
    });
  }
}

/**
 * Remove item in local storage
 */
function deleteItemInLocalStorage(targetItem) {
  let itemToDeleteId = targetItem.getAttribute("data-id");
  let itemToDeleteColor = targetItem.getAttribute("data-color");

  let searchItem = itemsDataCart.find(
    (array) =>
      array.itemDataId == itemToDeleteId &&
      array.itemDataColor == itemToDeleteColor
  );

  let targetItemIndex = itemsDataCart.indexOf(searchItem);

  let removedItem = itemsDataCart.splice(targetItemIndex, 1);

  localStorage.setItem("cart", JSON.stringify(itemsDataCart));
}

/**
 * Total quantity of all product in cart page
 */
function totalQuantity() {
  const itemsTotalQuantity = document.querySelectorAll(".itemQuantity");
  let itemsSum = 0;
  for (let item of itemsTotalQuantity) {
    itemsSum = itemsSum + parseInt(item.value, 10);
  }
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = itemsSum;
}

/**
 * Total price of all product in cart page
 */
function calculTotalPrice(items) {
  let itemsTotalPrice = 0;

  for (let item of items) {
    itemsTotalPrice =
      itemsTotalPrice +
      parseInt(item.itemDataQuantity, 10) * item.itemDataPrice;
  }
  const calculTotalPrice = document.getElementById("totalPrice");
  calculTotalPrice.textContent = itemsTotalPrice;
}

/**
 * Regex for form
 *
 */

let alphaRegex = /^[\sa-z\-]{1,}$/i;
let alphaNumberRegex = /^[0-9\sa-z\-]{1,}$/i;
let emailRegex = /^[\w_.-]+@[\w-_.]+\.[\w.]{2,}$/i;

/**
 * check the line first name
 */

const checkFirstName = () => {
  firstName.addEventListener("input", function (e) {
    if (alphaRegex.test(firstName.value)) {
      document.getElementById("firstNameErrorMsg").textContent = "";
      return true;
    } else {
      document.getElementById("firstNameErrorMsg").textContent =
        "Merci d'entrer un prénom valide, ex: Martin (lettres et - uniquement).";
      return false;
    }
  });
};

/**
 * check the line last name
 */

const checkLastName = () => {
  lastName.addEventListener("input", function (e) {
    if (alphaRegex.test(lastName.value)) {
      document.getElementById("lastNameErrorMsg").textContent = "";
      return true;
    } else {
      document.getElementById("lastNameErrorMsg").textContent =
        "Merci d'entrer un nom valide, ex: Dupont (lettres et - uniquement).";
      return false;
    }
  });
};

/**
 * check the line address
 */

const checkAddress = () => {
  address.addEventListener("input", function (e) {
    if (alphaNumberRegex.test(address.value)) {
      document.getElementById("addressErrorMsg").textContent = "";
      return true;
    } else {
      document.getElementById("addressErrorMsg").textContent =
        "Merci d'entrer une adresse valide, ex: 4 Rue du Lac (lettres, chiffres et - uniquement).";
      return false;
    }
  });
};

/**
 * check the line city
 */

const checkCity = () => {
  city.addEventListener("input", function (e) {
    if (alphaRegex.test(city.value)) {
      document.getElementById("cityErrorMsg").textContent = "";
      return true;
    } else {
      document.getElementById("cityErrorMsg").textContent =
        "Merci d'entrer une ville valide, ex: Paris (lettres et - uniquement).";
      return false;
    }
  });
};

/**
 * check the line email
 */

const checkEmail = () => {
  email.addEventListener("input", function (e) {
    if (emailRegex.test(email.value)) {
      document.getElementById("emailErrorMsg").textContent = "";
      return true;
    } else {
      document.getElementById("emailErrorMsg").textContent =
        "Merci d'entrer un e-mail valide, ex: email@valide.com.";
      return false;
    }
  });
};

/**
 * this function check all input of the form
 */

function checkInput() {
  checkFirstName();
  checkLastName();
  checkAddress();
  checkCity();
  checkEmail();
}

/**
 * Function createContact data for send data to the API
 */
let contact = {};
function createContact() {
  contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  return contact;
}

/**
 * Get id from all products in the cart then push it in an array
 */
let productsArray = [];
function getCartProductsId() {
  for (let item of itemsDataCart) {
    productsArray.push(item.itemDataId);
  }
}

/**
 * Check if form is right for all lines
 */
function formValidation() {
  if (
    alphaRegex.test(firstName.value) == true &&
    alphaRegex.test(lastName.value) == true &&
    alphaNumberRegex.test(address.value) == true &&
    alphaRegex.test(city.value) == true &&
    emailRegex.test(email.value) == true
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function for send data to API and show confirm page with the command number
 */
function validationForOrder() {
  let order = document.getElementById("order");
  order.addEventListener("click", function (e) {
    e.preventDefault();
    if (formValidation()) {
      createContact();
      getCartProductsId();
      createDataToSend();
      sendOrder(dataToSend);
    } else {
      alert("Merci de remplir correctement le formulaire de contact.");
    }
  });
}

/**
 * Object with data to send to API
 */
let dataToSend;
function createDataToSend() {
  dataToSend = {
    contact: contact,
    products: productsArray,
  };
  return dataToSend;
}

/**
 * Send POST request then open confirm page and clear local storage
 */
function sendOrder(dataToSend) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then(async function (res) {
      if (res.ok) {
        let responseData = await res.json();
        window.location.href =
          "../html/confirmation.html?orderId=" + responseData.orderId;
        localStorage.clear();
      }
    })
    .catch(function (err) {
      console.log(err);
      console.log("une erreur est survenu lors de l'envoi des données à l'API");
    });
}

/**
 * Main function of the cart page
 */

const mainFunctionCartPage = async () => {
  if (itemsDataCart != null) {
    cartPagination(itemsDataCart);

    totalQuantity();

    calculTotalPrice(itemsDataCart);

    changeQuantity();

    deleteItem();

    checkInput();

    validationForOrder();
  }
};

mainFunctionCartPage();
