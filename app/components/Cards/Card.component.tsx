import * as React from 'react';
import { EntityType } from '../../domain/entity.type';

//similar problem, the card might have some tags,
//more or less metadata properties, etc.
//Loops would be necesary here.

const Card = ({ entity }: { entity: EntityType }) => (
  <div className="max-w-sm overflow-hidden rounded shadow-lg">
    <div className="px-6 py-4">
      <div className="mb-2 text-xl font-bold">{entity.title}</div>
      <p className="text-base text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
        et perferendis eaque, exercitationem praesentium nihil.
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
        #case
      </span>
      <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
        #violation
      </span>
    </div>
    <div className="text-white bg-green-600 border-2 ">{entity.template.name}</div>
  </div>
);

export { Card };
