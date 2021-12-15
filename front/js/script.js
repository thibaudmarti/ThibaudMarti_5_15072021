const urlAllKanaps = "http://localhost:3000/api/products";

import { ModelKanap } from "./object.js";

/*
 * Request an url and return data as json
 */
async function getJsonFromApi(url, idParent) {
  let jsonKanaps = await fetch(url).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return (document.getElementById(idParent).textContent =
        "Un problème est survenue dans la requête de l'API !");
    }
  });
  return jsonKanaps;
}

/*
 * Convert a kanaps json array into html representation
 */
function insertHtmlInPage(htmlToInsert, idParent) {
  document.getElementById(idParent).innerHTML = htmlToInsert;
}

/*
 * Main function of the index page
 */
async function displayKanaps() {
  getJsonFromApi(urlAllKanaps, "items")
    .then((jsonKanaps) =>
      jsonKanaps.map((jsonKanap) => new ModelKanap(jsonKanap))
    )
    .then((arrayKanaps) =>
      arrayKanaps.map((modelKanap) => modelKanap.getHtmlKanaps())
    )
    .then((arrayHtmlKanaps) =>
      insertHtmlInPage(arrayHtmlKanaps.join(""), "items")
    );
}

displayKanaps();

// let arrayTest = [1, 2, 3, 4];

// console.log(arrayTest.map(number));
