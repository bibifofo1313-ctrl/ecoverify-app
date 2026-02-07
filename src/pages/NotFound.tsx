import { ButtonLink } from "../components/common/ButtonLink";

export const NotFoundPage = () => (
  <div className="app-shell flex min-h-screen items-center justify-center px-6">
    <div className="card flex max-w-lg flex-col gap-4 p-8 text-center">
      <p className="eyebrow">404</p>
      <h1 className="heading-2">We lost that page</h1>
      <p className="text-sm text-slate-400">
        The page you are looking for does not exist. Head back to the homepage.
      </p>
      <ButtonLink to="/" variant="primary">
        Return home
      </ButtonLink>
    </div>
  </div>
);
