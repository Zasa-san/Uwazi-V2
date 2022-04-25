import React from 'react';
import { render } from '@testing-library/react';
import Library from '../index';

describe('library route', () => {
  beforeEach(() => {
    render(<Library />);
  });
  it('should render', () => {});
});
