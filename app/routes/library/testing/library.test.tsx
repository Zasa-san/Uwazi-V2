import React from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { RemixBrowser } from '@remix-run/react';
import Library from '../index';

function render(ui: React.ReactElement, options?: RenderOptions) {
  function RootComponent() {
    return ui;
  }

  window.__remixManifest = {
    routes: {
      root: {
        hasAction: false,
        hasCatchBoundary: false,
        hasErrorBoundary: false,
        hasLoader: false,
        id: 'root',
        imports: [],
        module: '',
        path: '',
      },
    },
    entry: { imports: [], module: '' },
    url: '',
    version: '',
  };
  window.__remixRouteModules = { root: { default: RootComponent } };
  window.__remixContext = {
    matches: [],
    manifest: window.__remixManifest,
    routeModules: window.__remixRouteModules,
    routeData: {},
    appState: {
      catchBoundaryRouteId: null,
      loaderBoundaryRouteId: null,
      renderBoundaryRouteId: 'root',
      trackBoundaries: false,
      trackCatchBoundaries: false,
    },
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <RemixBrowser>{children}</RemixBrowser>
  );

  return rtlRender(ui, {
    wrapper: Wrapper,
  });
}

describe('library route', () => {
  beforeEach(() => {
    render(<Library />);
  });
  it('should render', () => {});
});
