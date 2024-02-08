import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* @ts-expect-error because the error type from react-router-dom is `unknown` */}
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
};
