export function LandingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Housix. All rights reserved.</p>
        <p>Built for modern real estate experiences.</p>
      </div>
    </footer>
  );
}
