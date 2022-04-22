import { Key } from 'react';
import { TemplateType } from './template.type';

type EntityResponseType = {
  _id: Key;
  title: String;
  template: string;
};

type EntityType = {
  _id: Key;
  title: String;
  template: TemplateType;
};

export { EntityResponseType, EntityType };
