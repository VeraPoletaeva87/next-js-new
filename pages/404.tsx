import Link from "next/link";

export default function ErrorPage() {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <h3 data-testid="invalid-route">
          Sorry, an unexpected error has occurred.
        </h3>
        <Link href='/'>Go to main page</Link>
      </div>
    );
}