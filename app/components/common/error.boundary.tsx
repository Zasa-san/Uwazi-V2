import React from 'react';
import { ErrorBoundaryComponent } from 'remix';

const ErrorBoundary: ErrorBoundaryComponent = ({ error }: { error: Error }) => (
  <div className="error-boundary" role="alert">
    <strong className="font-bold">Something went wrong</strong>
    <span className="block sm:inline">{error.message}</span>
  </div>
);

export { ErrorBoundary };
