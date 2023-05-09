import Banner from "@/components/Banner";
import ProductFeed from "@/components/ProductFeed";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="bg-gray-100">
        <main className="max-w-screen-2xl mx-auto  ">
          {/* Banner */}
          <Banner />

          {/* production feed */}
          <ProductFeed  />
        </main>
      </div>
    </>
  );
}



