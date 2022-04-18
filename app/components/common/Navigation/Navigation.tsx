import * as React from 'react';
import { Link } from '@remix-run/react';

const Navigation = () => (
  <nav className="flex items-center gap-2 flex-wrap p-1 border-solid border-b-2">
    <div className="flex items-center flex-shrink-0 mr-6">
      <span className="font-semibold text-xl tracking-tight">Uwazi v2</span>
    </div>

    <Link
      to="/library"
      className="inline-block text-sm px-4 py-2 leading-none hover:text-teal-500 hover:bg-blue mt-4 lg:mt-0"
    >
      Library
    </Link>

    <Link
      to="/dashboard"
      className="inline-block text-sm px-4 py-2 leading-none hover:text-teal-500 hover:bg-blue mt-4 lg:mt-0"
    >
      Dashboard
    </Link>
  </nav>
);

export { Navigation };
