const urlAllKanaps = "http://localhost:3000/api/products";

/*
 * Request an url and return data as json
 *
 */
async function getJsonFromApi(url) {
  let jsonKanaps = await fetch(url).then((res) => res.json());
  return jsonKanaps;
}

/*
 * Convert a kanaps json array into html representation
 */
async function getHtmlKanaps(jsonKanaps) {
  htmlKanaps = "";

  jsonKanaps.forEach((kanap) => {
    htmlKanaps += `<a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}</p>
        </article>
      </a>`;
  });

  return htmlKanaps;
}

async function insertHtmlInPage(htmlToInsert, idParent) {
  document.getElementById(idParent).innerHTML = htmlToInsert;
}

async function DisplayKanaps() {
  getJsonFromApi(urlAllKanaps)
    .then((jsonKanaps) => {
      return getHtmlKanaps(jsonKanaps);
    })
    .then((htmlKanaps) => {
      insertHtmlInPage(htmlKanaps, "items");
    });
}

DisplayKanaps();
