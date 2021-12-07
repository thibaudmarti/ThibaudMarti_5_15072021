//  Objet Kanap

export class ModelKanap {
  constructor(json) {
    this.name = json.name;
    this.id = json._id;
    this.price = json.price;
    this.altTxt = json.altTxt;
    this.desc = json.description;
    this.img = json.imageUrl;
    this.colors = json.colors;
  }

  /**
   * Add items data in index page
   */
  getHtmlKanaps() {
    let htmlKanaps = "";
    htmlKanaps += `<a href="./product.html?id=${this.id}">
        <article>
        <img src="${this.img}" alt="${this.altTxt}">
        <h3 class="productName">${this.name}</h3>
        <p class="productDescription">${this.desc}</p>
        </article>
        </a>`;
    return htmlKanaps;
  }

  /**
   * Add item data in page product
   */
  bindDataToProductPage() {
    const pageTitle = document.querySelector("title");
    pageTitle.textContent = `${this.name}`;

    const itemImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImage);
    itemImage.setAttribute("src", `${this.img}`);
    itemImage.setAttribute("alt", `${this.altTxt}`);

    const itemName = document.getElementById("title");
    itemName.textContent = `${this.name}`;

    const itemPrice = document.getElementById("price");
    itemPrice.textContent = `${this.price}`;

    const itemDescription = document.getElementById("description");
    itemDescription.textContent = `${this.desc}`;

    const itemColors = document.getElementById("colors");
    const itemColorsTable = `${this.colors}`;
    const itemColorsWords = itemColorsTable.split(",");
    for (let i = 0; i <= itemColorsWords.length - 1; i++) {
      const itemColor = document.createElement("option");
      itemColor.setAttribute("value", itemColorsWords[i]);
      itemColor.textContent = itemColorsWords[i];
      itemColors.appendChild(itemColor);
    }
  }
}

export class KanapOrderLine {
  constructor(model, colorIndex, quantity) {
    this.model = model;
    this.color = colorIndex;
    this.quantity = quantity;
  }

  /**
   * Check if item already exist in local storage
   * and then export product in local storage for cart
   */
  exportToLocalStorage() {
    /*
     * Check if item exist in local storage and if the total quantity of item is not above 100
     */
    function checkItemsDataStorage(
      item,
      array,
      itemId,
      itemColor,
      itemQuantity
    ) {
      for (item of array) {
        if (item.itemDataId == itemId && item.itemDataColor == itemColor) {
          item.itemDataQuantity =
            parseInt(item.itemDataQuantity, 10) + parseInt(itemQuantity, 10);
          if (item.itemDataQuantity > 100) {
            item.itemDataQuantity = 100;
            alert(
              "Attention, votre quantité pour cet article dépasse le maximum. Elle passe donc à 100 unités."
            );
          }
          return true;
        }
      }
    }

    /**
     * Add product in local storage for cart
     *
     */
    const params = new URL(window.location.href);
    const itemId = params.searchParams.get("id");
    let itemsDataForStorage = [];
    const itemDataObject = {
      itemDataId: itemId,
      itemDataQuantity: this.quantity,
      itemDataColor: this.color,
      itemDataImage: this.model.img,
      itemDataImageAltTxt: this.model.altTxt,
      itemDataName: this.model.name,
      itemDataPrice: this.model.price,
    };

    if (localStorage.getItem("cart")) {
      itemsDataForStorage = JSON.parse(localStorage.getItem("cart"));
      if (
        checkItemsDataStorage(
          this.model,
          itemsDataForStorage,
          itemDataObject.itemDataId,
          itemDataObject.itemDataColor,
          itemDataObject.itemDataQuantity
        )
      ) {
        localStorage.setItem("cart", JSON.stringify(itemsDataForStorage));
      } else {
        itemsDataForStorage.push(itemDataObject);
        localStorage.setItem("cart", JSON.stringify(itemsDataForStorage));
      }
    } else {
      itemsDataForStorage.push(itemDataObject);
      localStorage.setItem("cart", JSON.stringify(itemsDataForStorage));
    }
  }
}
