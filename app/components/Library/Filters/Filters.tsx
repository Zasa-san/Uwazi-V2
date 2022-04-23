import { Form } from '@remix-run/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryParameters } from '../../common/Hooks/useQueryParameters';

const Filters = () => {
  const { t } = useTranslation('home');
  const { search, meta } = useQueryParameters(['includeUnpublished']);

  return (
    <div>
      <h2 className="text-xl font-semibold">{t('Filters')}</h2>
      <div className="mb-4 text-gray-500">General</div>
      <Form className="border-2 border-solid" action={search}>
        <label htmlFor="includeUnpublished">Include Unpublished</label>
        <input
          name="includeUnpublished"
          type="checkbox"
          defaultChecked={meta.filters.includeUnpublished}
        />
        <button type="submit">Filter!</button>
      </Form>
    </div>
  );
};

export { Filters };
