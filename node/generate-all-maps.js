import * as fs from "fs";
import * as ut from "./util.js";

import "../js/parser.js";
import "../js/utils.js";
import "../js/maps-util.js";

const out = {};

[
	{
		prop: "adventure",
		index: `./data/adventures.json`,
		dir: `./data/adventure`,
	},
	{
		prop: "book",
		index: `./data/books.json`,
		dir: `./data/book`,
	},
].forEach(({prop, index, dir}) => {
	ut.readJson(index)[prop].forEach(head => {
		console.log(`Generating map data for ${head.id}`);
		const body = ut.readJson(`${dir}/${prop}-${head.id.toLowerCase()}.json`).data;
		const imageData = MapsUtil.getImageData({prop, head, body});
		if (imageData) Object.assign(out, imageData);
	});
});

fs.writeFileSync("data/generated/gendata-maps.json", JSON.stringify(out), "utf8");
console.log("Updated maps.");
