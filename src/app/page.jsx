import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Banner from "@/components/home/Banner";
import CategoryList from "@/components/home/CategoryList";
import OffersSection from "@/components/home/OffersSection";
import ProductCarousel from "@/components/home/ProductCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#eaeded]">
      <Header />
      <Navbar />

      <main>
        <Banner />
        <CategoryList />
        <OffersSection />
        <ProductCarousel />
      </main>

      <Footer />
    </div>
  );
}