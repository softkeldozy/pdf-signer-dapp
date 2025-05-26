/**
 * Custom error class for blockchain/SDK operations
 * Extends native Error with additional context
 */
export default class EnhancedError extends Error {
  constructor(originalError, context = {}) {
    super(originalError.message);

    // Standard Error properties
    this.name = "BlockchainError";
    this.stack = originalError.stack;

    // Enhanced diagnostics
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
    this.context = {
      operation: null, // e.g., 'signAttestation'
      contractAddress: null,
      userAddress: null,
      ...context, // Merge any provided context
    };

    // Preserve original error type
    if (originalError.name) this.originalErrorType = originalError.name;

    // Add SDK-specific codes
    if (originalError.code)
      this.errorCode = this._mapErrorCode(originalError.code);
  }

  /**
   * Maps provider-specific error codes to unified values
   */
  _mapErrorCode(code) {
    const codes = {
      // Ethereum Provider Errors
      ACTION_REJECTED: "USER_REJECTED",
      CALL_EXCEPTION: "CONTRACT_ERROR",
      INSUFFICIENT_FUNDS: "BALANCE_TOO_LOW",
      // Viem/SDK Errors
      TIMEOUT: "NETWORK_TIMEOUT",
    };
    return codes[code] || code;
  }

  /**
   * Serialize for logging/API responses
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.errorCode,
      timestamp: this.timestamp,
      context: this.context,
      stack: this.stack,
    };
  }

  /**
   * User-friendly error message
   */
  toUserMessage() {
    const messages = {
      USER_REJECTED: "You cancelled the transaction",
      NETWORK_TIMEOUT: "Network timeout - please try again",
      // Add other mappings as needed
    };
    return messages[this.errorCode] || this.message;
  }
}
