import * as React from 'react';
import { EntityType } from '../../domain/entity.type';
import { Card } from './Card.component';

const Cards = ({ entities }: { entities: EntityType[] }) =>
  entities ? (
    // The map should not go on the 'Card' component, since its logic. But the divs have to wrap
    // the return of the map, and that is presentational.
    // How do we separate this?
    <div className="flex mb-4 -mx-2">
      {entities.map((entity: EntityType) => (
        //'Card' could be a common component that could be reused somewhere else.
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 px-2">
          <Card entity={entity} />
        </div>
      ))}
    </div>
  ) : (
    <p>Some component that renders that there are no cards maybe?</p>
  );

export { Cards };
