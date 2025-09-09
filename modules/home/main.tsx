import Image from "next/image";
import products from "../mockup/product.json";
import { Product } from "../product/types";
import { XProduct } from "@/components/common";
import Link from "next/link";

export function HomePage() {
  return (
    <main role="main" aria-label="Chau Bui Store" className="mt-[-56px]">
      <Image
        src="https://theme.hstatic.net/200000349469/1001214457/14/slideshow_1.jpg?v=359"
        alt="Trang chủ"
        width={1920}
        height={1000}
        className="w-full h-auto"
        priority
      />

      <section className="max-w-7xl mx-auto px-4 xl:px-0 py-8">
        <h3 className="text-2xl font-bold py-4">Sản phẩm mới</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <XProduct key={product.id} {...product} priority={index < 3} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        <div className="relative">
          <Image
            src="https://theme.hstatic.net/200000349469/1001214457/14/slideshow_1.jpg?v=500"
            alt="Trang chủ"
            width={1920}
            height={500}
            className="w-full h-[500px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-16 left-12 text-white">
            <span className="block text-sm font-medium mb-1">
              Thảm len lông cừu
            </span>
            <h3 className="text-xl font-bold mb-6">Chất lượng</h3>
            <Link
              className="inline-block bg-white px-8 py-2 text-sm font-medium border border-white hover:bg-transparent hover:text-white transition-colors uppercase"
              href="#"
            >
              Mua ngay
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="https://theme.hstatic.net/200000349469/1001214457/14/slideshow_1.jpg?v=500"
            alt="Trang chủ"
            width={1920}
            height={500}
            className="w-full h-[500px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-16 left-12 text-white">
            <span className="block text-sm font-medium mb-1">
              Thiết kế hiện đại
            </span>
            <h3 className="text-xl font-bold mb-6">100% Len</h3>
            <Link
              className="inline-block bg-white px-8 py-2 text-sm font-medium border border-white hover:bg-transparent hover:text-white transition-colors uppercase"
              href="#"
            >
              Xem thêm
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="https://theme.hstatic.net/200000349469/1001214457/14/slideshow_1.jpg?v=500"
            alt="Trang chủ"
            width={1920}
            height={500}
            className="w-full h-[500px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-16 left-12 text-white">
            <span className="block text-sm font-medium mb-1">
              Tông màu nhã nhặn
            </span>
            <h3 className="text-xl font-bold mb-6">Thảm lông</h3>
            <Link
              className="inline-block bg-white px-8 py-2 text-sm font-medium border border-white hover:bg-transparent hover:text-white transition-colors uppercase"
              href="#"
            >
              Xem thêm
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 xl:px-0 py-8">
        <h3 className="text-2xl font-bold py-4">Sản phẩm bán chạy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product: Product, index: number) => (
            <XProduct key={product.id} {...product} priority={index < 3} />
          ))}
        </div>
      </section>
    </main>
  );
}
