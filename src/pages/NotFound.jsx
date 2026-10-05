import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";

export default function NotFound() {
  useDocumentMeta("Page not found");
  return (
    <section className="page flex min-h-[80dvh] flex-col justify-center pb-16 pt-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-zinc-900 sm:text-5xl dark:text-zinc-50">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-[50ch] text-zinc-600 dark:text-zinc-400">
        The link may be old, or the address has a typo. Everything on the site starts from the home page.
      </p>
      <div className="mt-8">
        <Link to="/" className="btn-primary">
          <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
          Back home
        </Link>
      </div>
    </section>
  );
}
