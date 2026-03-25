import React from "react";

/**
 * Error Boundary Component
 * Catches errors in child components and displays graceful fallback UI
 * Prevents entire app crash when a component encounters an error
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Error boundary caught the error - component will display graceful fallback UI
    // In production, errors could be sent to a monitoring service like Sentry
    // For now, errors are silently captured and handled gracefully

    // Send error to monitoring service (optional - can be Sentry, LogRocket, etc.)
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error tracking service
      // trackError({ error, errorInfo, timestamp: new Date().toISOString() });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "#f8fafc",
            borderRadius: "0.5rem",
            margin: "2rem",
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "#1e293b", marginBottom: "1rem" }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
            We encountered an unexpected error. Please try refreshing the page
            or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#6e45e2",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === "development" && (
            <details
              style={{
                marginTop: "2rem",
                padding: "1rem",
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                textAlign: "left",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "600" }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  backgroundColor: "#f1f5f9",
                  borderRadius: "0.25rem",
                  fontSize: "0.85rem",
                  overflow: "auto",
                }}
              >
                {this.state.error?.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
