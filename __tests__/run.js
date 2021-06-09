/**
 * Main test runner
 */

const { Parser } = require('../src/Parser');
const assert = require('assert');

/**
 * List of tests.
 */
const tests = [
  require('./literals-test'),
  require('./statement-list-test'),
  require('./block-test'),
  require('./empty-statement-test'),
  require('./math-test'),
  require('./variable-test.js'),
  require('./if-test.js'),
  require('./relational-test.js'),
  require('./equality-test.js'),
  require('./logical-test.js'),
];

const parser = new Parser();

/**
 * For manual tests.
 */
function exec() {
  const program = `
    1 + 2;
  `;

  const ast = parser.parse(program);

  console.log(JSON.stringify(ast, null, 2));
}

// Run manual test.
exec();

/**
 * Test function.
 */
function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepEqual(ast, expected);
}

// Run all tests:
tests.forEach(testRun => testRun(test));

console.log('✓ All tests passed');