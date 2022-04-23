import * as React from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { useTranslation } from 'react-i18next';

const loader: LoaderFunction = async () =>
  json({
    lngs: {
      en: { nativeName: 'English' },
      es: { nativeName: 'Español' },
    },
  });

const Index = () => {
  const { lngs } = useLoaderData();
  const { i18n, t } = useTranslation('index');
  return (
    <main>
      <div>
        {Object.keys(lngs).map(lng => (
          <Link
            key={lng}
            style={{
              marginRight: 5,
              fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
            }}
            to={`/?lng=${lng}`}
          >
            {lngs[lng].nativeName}
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-16 text-center max-w-7xl">
        <Link to="/library" className="text-xl text-blue-600 underline">
          {t('Enter Library')}
        </Link>
      </div>
    </main>
  );
};

export { loader };
export default Index;
