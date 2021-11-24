/**
 * Import
 */
import { ModelKanap } from "./object.js";
import { KanapOrderLine } from "./object.js";

/**
 * Const
 */
const itemQuantity = document.getElementById("quantity");
const itemColors = document.getElementById("colors");
const addToCart = document.getElementById("addToCart");

/**
 * get id from url for API call
 */
const params = new URL(window.location.href);
const itemId = params.searchParams.get("id");
const apiUrlForAnItem = "http://localhost:3000/api/products/" + itemId;

/**
 * Call API for one item
 */
const getKanapDataItem = (url) =>
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (err) {
      console.log(err);
      console.log(
        "Une erreur est survenue lors de l'appel des données à l'API"
      );
    });

/**
 * Check if color is selected
 */
function checkItemColor() {
  let itemColor = document.getElementById("colors").value;
  if (itemColor != "") {
    return true;
  }
}

/**
 * Check if quantity is selected
 */
function checkItemQuantity() {
  let itemQuantity = document.getElementById("quantity").value;
  if (itemQuantity <= 100) {
    return true;
  }
}

/**
 * Check in page if color and quantity are selected and right
 *
 */
function checkCommandLine() {
  if (
    checkItemColor(itemColors) == true &&
    checkItemQuantity(itemQuantity) == true
  ) {
    return true;
  } else if (checkItemColor(itemColors) != true) {
    alert(
      "Pour poursuivre l'ajout de produit(s), merci de renseigner la couleur désirée."
    );
  } else if (checkItemQuantity(itemQuantity) != true) {
    alert(
      "La quantité maximale par produit est de 100 unités. Merci de choisir une quantité entre 1 et 100."
    );
  }
}

/**
 * Main function of the product page
 */
const mainFunctionProductPage = async () => {
  const itemData = await getKanapDataItem(apiUrlForAnItem);
  let modelKanap = new ModelKanap(itemData);
  modelKanap.bindDataToProductPage();

  addToCart.addEventListener("click", function (e) {
    if (checkCommandLine()) {
      let orderLine = new KanapOrderLine(
        modelKanap,
        itemColors.value,
        itemQuantity.value
      );
      orderLine.exportToLocalStorage();
    }
  });
};

mainFunctionProductPage();
// localStorage.clear();
