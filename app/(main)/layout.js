import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SignupModal from "@/components/auth/signup-modal";
import ModalsContextProvider from "@/store/modals-context";

// REFACTOR: Move modals into the thumbnail interactions components
export default function MainLayout({ children }) {
  return (
    <>
      <ModalsContextProvider>
        <Navbar />
        <main className="relative">
          <div className="absolute inset-0 -z-30 h-2/5 w-full bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 -z-20 h-2/5 w-full bg-gradient-to-t from-white to-transparent to-50%"></div>
          {children}
        </main>
        <Footer />
        <SignupModal />
      </ModalsContextProvider>
    </>
  );
}
