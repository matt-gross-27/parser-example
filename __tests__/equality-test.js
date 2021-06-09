module.exports = (test) => {
  test('x > 0 == true;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: '==',
          left: {
            type: 'BinaryExpression',
            operator: '>',
            left: {
              type: 'Identifier',
              name: 'x',
            },
            right: {
              type: 'NumericLiteral',
              value: 0,
            },
          },
          right: {
            type: 'BooleanLiteral',
            value: true,
          },
        },
      },
    ],
  });

  test('y <= 2 != false;', {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'BinaryExpression',
          operator: '!=',
          left: {
            type: 'BinaryExpression',
            operator: '<=',
            left: {
              type: 'Identifier',
              name: 'y',
            },
            right: {
              type: 'NumericLiteral',
              value: 2,
            },
          },
          right: {
            type: 'BooleanLiteral',
            value: false,
          },
        },
      },
    ],
  });
};