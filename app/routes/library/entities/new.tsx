import { ActionFunction, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import React from 'react';
import { createEntity } from '../../../services/entities';

const inputClassName = 'w-full rounded border border-gray-500 px-2 py-1 text-lg';

const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get('title');

  let formData1 = new FormData();
  formData1.append('title', title);

  await createEntity(formData1);
  return redirect('/library/');
};

const NewEntity = () => {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Title
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create
        </button>
      </p>
    </Form>
  );
};

export { action };
export default NewEntity;
