import * as React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';

const Toolbar = () => (
  <div className="flex flex-auto">
    {/* <SidepanelToggle /> */}
    <SearchBar />
  </div>
);

export { Toolbar };
