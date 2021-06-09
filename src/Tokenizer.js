/**
 * Tokenizer specification
 */
const Spec = [
  // -----------------------------------------------
  // Whitespace:
  [/^\s+/, null],

  // -----------------------------------------------
  // Symbols, delimiters:
  [/^;/, ';'],
  [/^{/, '{'],
  [/^}/, '}'],
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^,/, ','],

  // -----------------------------------------------
  // Keywords: 
  [/^\blet\b/, 'let'],

  // -----------------------------------------------
  // Numbers:
  [/^\d+/, 'NUMBER'],

  // -----------------------------------------------
  // Identifiers:
  [/^\w+/, 'IDENTIFIER'],

  // -----------------------------------------------
  // Assignment operators: =, *=, /=, +=, -=,
  [/^=/, 'SIMPLE_ASSIGN'],
  [/^[\*\/\+\-]=/, 'COMPLEX_ASSIGN'],

  // -----------------------------------------------
  // Math operators: +, -, *, /
  [/^[+\-]/, 'ADDITIVE_OPERATOR'],
  [/^[*\/]/, 'MULTIPLICATIVE_OPERATOR'],

  // -----------------------------------------------
  // Strings:
  [/^"[^"]*"/, 'STRING'],
  [/^'[^']*'/, 'STRING'],

  // -----------------------------------------------
  // Variables:
  // [/^{{[^{}\[\]<>]*}}/, 'VARIABLE' ]
];

/**
 * Tokenizer class.
 * 
 * Lazily pulls a token from a stream.
 */
class Tokenizer {
  /**
   * Initializes the string
   */
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Weather the tokenizer reached end of file
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

  /**
   * 
   * Weather we still have more tokens.
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Obtain next token.
   */
  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    for (const [regexp, tokenType] of Spec) {
      const tokenValue = this._match(regexp, string);

      // Can't find match continue
      if (tokenValue === null) {
        continue;
      }

      // Skip token, e.g. whitespace.
      if (tokenType === null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: tokenValue,
      };
    }

    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  /**
   * Matches a token for a regular expression.
   */
  _match(regexp, string) {
    const matched = regexp.exec(string);
    if (matched === null) {
      return null;
    }
    this._cursor += matched[0].length;
    return matched[0];
  }
}

module.exports = {
  Tokenizer,
};