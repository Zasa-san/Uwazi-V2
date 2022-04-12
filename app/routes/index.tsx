import * as React from 'react';
import { Link } from '@remix-run/react';

const Index = () => (
  <main>
    <div className="mx-auto mt-16 max-w-7xl text-center">
      <Link to="/library" className="text-xl text-blue-600 underline">
        Enter Library
      </Link>
    </div>
  </main>
);

export default Index;
