import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";

export default function Home() {
  return (
      <div className="bg-gray-100">
        <main className="max-w-screen-2xl mx-auto  ">
          {/* Banner */}
          <Banner />

          {/* production feed */}
          <ProductFeed  />
        </main>
      </div>
  );
}



