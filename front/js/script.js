const urlAllKanaps = "http://localhost:3000/api/products";

import { ModelKanap } from "./object.js";

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

function insertHtmlInPage(htmlToInsert, idParent) {
  document.getElementById(idParent).innerHTML = htmlToInsert;
}

async function DisplayKanaps() {
  getJsonFromApi(urlAllKanaps)
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

DisplayKanaps();
