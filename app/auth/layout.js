export default function AuthLayout({ children }) {
  return (
    <main>
      <div className="flex min-h-screen flex-col justify-between py-8">
        <div className="mb-8 flex justify-center">LOGO</div>
        {children}
        <div>Public Beta</div>
      </div>
    </main>
  );
}
