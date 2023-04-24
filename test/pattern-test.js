const pattern = require("../src/pattern.js")
const test = require("../lib/testing.js");
const assertEquals = test.assertEquals;
const displayHeadline = test.displayHeadline;
const star = pattern.star;
const applyStyle = pattern.applyStyle;

const testStar = function() {
  displayHeadline("testStar");

  assertEquals(star(0), "", "Should show empty given zero as a width");
  assertEquals(star(1), "*", "Should show one star given one as a width");
  assertEquals(star([3]), "***", "Should show 3 stars given 3 as a width given in an array");
};

const testApplyStyle = function() {
  displayHeadline("testApplyStyle");

  assertEquals(applyStyle(star, 1), "*", "Should pass given one as a width");
  assertEquals(applyStyle(star, [3]), "***", "Should pass given 3 as a width given in an array");
};

testStar();
testApplyStyle();
