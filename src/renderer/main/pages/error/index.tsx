import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError() as any
  return (
    <div className="text-center p-10">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={() => window.devAPI.toggleDevtools()}>devtools</button>
    </div>
  )
}
