var
	assert = require('assert'),
	cook = require('../lib'),
	fs = require('fs');

var fixtureData = {
	isFalse: false,
	isTrue: true,
	username: "johndoe@acme.com",
	firstname: "John",
	lastname: "Doe",
	not: function not(exp) {return !exp;},
	uppercase: function uppercase(a) {
		return a.toUpperCase();
	},
	lowercase: function lowercase(a) {
		return a.toLowerCase();
	},
	joinFullname: function joinFullname(a, b) {
		return a + " " + b;
	},
	keywords: ["hoopla", "thingamabob", "whoopy", "dingus", "wooompff", "tagada!"],
	dog: {
		weight: 10,
		legs: 4,
		color: "blue",
		name: "spot"
	},
	friends: [
		{
			name: "Tom Thomson",
			email: "tom@gmail.com"
		},
		{
			name: "Jack Jackson",
			email: "jackjackson@gmail.com"
		},
		{
			name: "Will Williamson",
			email: "bigwill69@gmail.com"
		}
	],
	html: "<div>This is <blink>html</blink>!</div>",
	colors: {
		label: "Colors: ",
		red: "#FF0000",
		white: "#000000",
		blue: "#0000FF"
	},
	loopElements: {
		a: "a1",
		b: "b2",
		c: "c3",
		d: "d4",
		e: "e5",
		f: "f6",
		g: "g7",
		h: "h8"
	}
};

/**
 * Render a template in the "/fixtures/templates" and compare to the expected output
 * @param name
 */
function cookTestFile(name) {
	var split,
		input,
		output,
		file = './fixtures/templates/' + name + '.html';
	fs.readFile(file, function (err, data) {
		console.log("Test: " + name);
		split = data.toString().split("\n========================================\n");
		input = split[0];
		output = split[1];
		var result = cook(input)(fixtureData);
//		console.log(result);
//		console.log("=======================================================================");
//		console.log(output);
		assert.equal(result, output);
	});
}

console.time("tests");

cookTestFile("if");
cookTestFile("if-else");
cookTestFile("if-multiple-else");
cookTestFile("if-else-if");
cookTestFile("if-filtered");

cookTestFile("apply-decodeURIComponent");
cookTestFile("apply-encodeURIComponent");
cookTestFile("apply-usingSingleFunction");
cookTestFile("apply-withoutChaining");
cookTestFile("apply-encodeURI");
cookTestFile("apply-decodeURI");
cookTestFile("chaining-forward");
cookTestFile("print");
cookTestFile("print-withoutTag");
cookTestFile("print-filtered");
cookTestFile("partials-useAsFunction");
cookTestFile("partials-useAsTag");
cookTestFile("partials-chainedWithEach");
cookTestFile("partials-renderTag");
cookTestFile("comment-poundSign");
cookTestFile("comment-poundSignBlock");
cookTestFile("comment-poundSignOnOpenTag");
cookTestFile("each-array");
cookTestFile("each-array-namedValue");
cookTestFile("each-object");
cookTestFile("each-object-namedValue");
cookTestFile("tagless-apply");
cookTestFile("var");
cookTestFile("with");
cookTestFile("log");
cookTestFile("whitespace-remove");
cookTestFile("defaultTag");
cookTestFile("defaultTag-withPartials");
cookTestFile("binding-each");

console.timeEnd("tests");
