"use client";

import { ComponentType } from "react";
import ProtectedRoute from "./ProtectedRoute";

interface WithAuthOptions {
  requireSubscription?: boolean;
  redirectTo?: string;
}

export function withAuth<P extends object>(
  Component: ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const WrappedComponent = (props: P) => {
    return (
      <ProtectedRoute
        requireSubscription={options.requireSubscription}
        redirectTo={options.redirectTo}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  WrappedComponent.displayName = `withAuth(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
}




