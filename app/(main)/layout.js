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
        <main>{children}</main>
        <Footer />
        <SignupModal />
      </ModalsContextProvider>
    </>
  );
}
