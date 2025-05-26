import EnhancedError from "../lib/EnhancedError";

export async function safeSdkCall(fn, context = {}) {
  try {
    return await fn();
  } catch (error) {
    console.error("SDK Operation Failed:", error);

    throw new EnhancedError(error, {
      operation: context.operationName,
      userAddress: context.walletAddress,
      // Additional relevant context
      ...context,
    });
  }
}
