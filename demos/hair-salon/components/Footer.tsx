export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-bg-dark px-5 pb-28 pt-12 text-white md:pb-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="mb-1 font-serif text-2xl font-bold">
            Luna Hair Studio
          </p>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Luna Hair Studio. All rights
            reserved.
          </p>
        </div>
        <nav aria-label="Social media links" className="flex gap-5">
          <a
            href="#"
            aria-label="Follow us on Instagram"
            className="text-gray-400 transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
          </a>
          <a
            href="#"
            aria-label="Follow us on Facebook"
            className="text-gray-400 transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">public</span>
          </a>
          <a
            href="#"
            aria-label="Follow us on X / Twitter"
            className="text-gray-400 transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">alternate_email</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
