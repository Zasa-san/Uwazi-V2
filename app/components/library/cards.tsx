import * as React from 'react';
import { Key } from 'react';

type EntityType = {
  _id: Key;
  title: String;
};

const Cards = ({ entities }: { entities: EntityType[] }) => (
  <ul>
    {entities && entities.map((entity: EntityType) => <li key={entity._id}>{entity.title}</li>)}
  </ul>
);

export { Cards };
