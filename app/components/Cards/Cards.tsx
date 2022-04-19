import * as React from 'react';
import { EntityType } from '../../domain/entity.type';
import { Card } from './Card.component';

const Cards = ({ entities }: { entities: EntityType[] }) =>
  entities ? (
    // The map should not go on the 'Card' component, since its logic. But the divs have to wrap
    // the return of the map, and that is presentational.
    // How do we separate this?
    <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {entities.map((entity: EntityType) => (
        //'Card' could be a common component that could be reused somewhere else.
        <div key={entity._id}>
          <Card entity={entity} />
        </div>
      ))}
    </div>
  ) : (
    <p>Some component that renders that there are no cards maybe?</p>
  );

export { Cards };
