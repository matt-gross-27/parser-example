module.exports = test => {
  // Numeric Literal
  test(`42; "hello";`, {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'NumericLiteral',
          value: 42,
        }
      },
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'StringLiteral',
          value: "hello",
        }
      }
    ]
  });
};