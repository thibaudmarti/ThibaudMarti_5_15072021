//  Objet Kanap

// export const variableTest = 15892;

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

  getHtmlKanaps() {
    let htmlKanaps = "";
    htmlKanaps += `<a href="./product.html?id=${this.id}">
        <article>
        <img src="${this.img}" alt="${this.altTxt}">
        <h3 class="productName">${this.name}</h3>
        <p class="productDescription">${this.desc}</p>
        </article>
        </a>`;
    // console.log(htmlKanaps);
    return htmlKanaps;
  }
}

// exemple de valeur
// const Kanap = new ModelKanap(
//   "some kanap",
//   0,
//   1000,
//   "exemple altTxt",
//   "exemple desc",
//   "exemple imgUrl",
//   ["ex color", "red", "white"]
// );

// console.log(Kanap);
