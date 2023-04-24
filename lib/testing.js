const style = require("./utils.js");
const boldUnderline = style.boldUnderline;
const highlighterBlue = style.highlighterBlue;
const highlighterYellow = style.highlighterYellow;
let totalAssertions = 0;
let failedAssertions = 0;

const formatExpectationMismatch = function(actual, expected) {
  let message = "";
  message += "\tExpected: " + expected;
  message += "\n";
  message += "\t  Actual: " + actual;

  return message;
};

const displayHeadline = function(line) {
  const displayLine = "\n" + "\t" + line;
  console.log(boldUnderline(highlighterBlue(displayLine)));
};

const formatTestResult = function(result, actual, expected, message) {
  const icon = result ? "✅" : "❌";
  const expectationMismatchedMessage = formatExpectationMismatch(actual, expected);
  const line1 = "\t" + icon + " " + message;
  const line2 = result ? "" : "\n" + expectationMismatchedMessage;

  return line1 + line2;
};

const updateAssertionCount = function(result) {
  totalAssertions += 1;
  failedAssertions += result ? 0 : 1;
};

const getTotalAssertions = function() {
  return totalAssertions;
};

const getPassedAssertions = function() {
  return totalAssertions - failedAssertions;
};

const assertEquals = function(actual, expected, message) {
  const result = expected === actual;
  updateAssertionCount(result);
  console.log(formatTestResult(result, actual, expected, message));
};

const assertAlmostEquals = function(actual, expected, message) {
  const result = Math.abs(actual - expected) < 0.01;
  updateAssertionCount(result);
  console.log(formatTestResult(result, actual, expected, message));
};

const assertArray = function(actual, expected, message) {
  const result = areArraysEqual(actual, expected);
  updateAssertionCount(result);
  console.log(formatTestResult(result, actual, expected, message));
};

const areArraysEqual = function(array1, array2) {
  if(Array.isArray(array1) !==  Array.isArray(array2)) {
    return false;
  }

  if(array1.length !== array2.length) {
    return false;
  }

  for( let index = 0; index < array1.length; index++) {
    if(array1[index] !== array2[index]) {
      return false;
    }
  }

  return true;
};

const assertNestedArray = function(actual, expected, message) {
  const result = areNestedArraysEqual(actual, expected);
  updateAssertionCount(result);
  console.log(formatTestResult(result, actual, expected, message));
};

const areNestedArraysEqual = function(array1, array2) {
  if(Array.isArray(array1) !==  Array.isArray(array2)) {
    return false;
  }

  if(array1.length !== array2.length) {
    return false;
  }

  for(let index = 0; index < array1.length; index++) {
    if(!areArraysEqual(array1[index], array2[index])) { 
      return false;
    }
  }

  return true;
};

const assertObject = function(actual, expected, message) {
  const result = areObjectsEqual(actual, expected);
  updateAssertionCount(result);
  console.log(formatTestResult(result, actual, expected, message));
};

const areObjectsEqual = function(object1, object2) {
  if(typeof object1 !== typeof object2) {
    return false;
  }

  if(Object.keys(object1).length !== Object.keys(object2).length) {
    return false;
  }

  for(const key in object1) {
    if(object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

const assertsBy = function(datatype) {
  const asserts = {
    string: assertEquals,
    number: assertEquals,
    object: assertObject,
    array: assertArray
  };

  return asserts[datatype];
};

const assertDatatype = function(actual, expected, message) {
  if(typeof actual !== typeof expected) {
    return false;
  }
  let datatype = "";

  if(Array.isArray(actual)) {
    datatype = 'array';
  }

  if(!datatype) {
    datatype = typeof actual;  
  }

  return assertsBy(datatype)(actual, expected, message); 
}

const displaySummary = function() {
  let summary = "";
  summary += "\n";
  summary += "Summary: ";
  summary += getPassedAssertions() + " / " + getTotalAssertions();
  summary += " passed ";
  console.log(highlighterYellow(summary));
};

exports.boldUnderline = boldUnderline;
exports.highlighterBlue = highlighterBlue;
exports.highlighterYellow = highlighterYellow;
exports.assertEquals = assertEquals; 
exports.assertAlmostEqual = assertAlmostEquals; 
exports.assertArray = assertArray; 
exports.assertNestedArray = assertNestedArray;
exports.areArraysEqual = areArraysEqual;
exports.assertObject = assertObject;
exports.displayHeadline = displayHeadline;
exports.displaySummary = displaySummary;
