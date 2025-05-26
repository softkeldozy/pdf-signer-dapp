import ErrorBoundary from "../../../components/ErrorBoundary";

export default function SignForm() {
  return (
    <ErrorBoundary
      fallback={
        <p className="custom-fallback">Signature failed - please refresh</p>
      }
    >
      {/* Call viem method here */}
      <button>Sign Document</button>
    </ErrorBoundary>
  );
}
