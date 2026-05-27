import Banner from "@/components/home/Banner";
import CategoryList from "@/components/home/CategoryList";
import OffersSection from "@/components/home/OffersSection";
import ProductCarousel from "@/components/home/ProductCarousel";

export default function Home() {
  return (
    <main>
      <Banner />
      <CategoryList />
      <OffersSection />
      <ProductCarousel />
    </main>
  );
}