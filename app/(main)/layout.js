import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
