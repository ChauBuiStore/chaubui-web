import Link from "next/link";
import { MapPinIcon, PhoneIcon } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="bg-white"
      aria-label="Footer Studio by ChauBui"
    >
      <section className="bg-gray-100 py-3" aria-labelledby="support-section">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
            <div className="flex py-4 space-x-2">
              <PhoneIcon aria-hidden="true" />
              <span className="font-medium">Hỗ trợ / Mua hàng:</span>
              <a
                href="tel:0934581544"
                className="text-phone hover:text-red-500 hover:text-beige transition-colors duration-200 cursor-pointer"
                aria-label="Gọi điện thoại hỗ trợ: 0934581544"
              >
                0934581544
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8" aria-labelledby="footer-links">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 id="footer-links" className="font-medium text-xl">
                Thông tin liên hệ
              </h3>
              <address className="not-italic space-y-2">
                <div className="flex items-start space-x-2">
                  <MapPinIcon aria-hidden="true" />
                  <p className="text-sm">
                    ChauBui Store - Số 22 đường 21, Phường 4, Quận 4, TPHCM
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">0934581544</span>
                </div>
              </address>
            </div>

            <nav className="space-y-3" aria-labelledby="product-links">
              <h3 id="product-links" className="font-medium text-xl">
                Liên kết
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Tất cả sản phẩm
                  </Link>
                </li>
              </ul>
            </nav>

            <nav className="space-y-3" aria-labelledby="support-links">
              <h3 id="support-links" className="font-medium text-xl">
                Hỗ trợ
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Tìm kiếm
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Chính sách đổi trả
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Điều khoản dịch vụ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm hover:text-red-500 transition-colors duration-200"
                  >
                    Địa chỉ & Liên hệ
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="space-y-3">
              <h3 className="font-medium text-xl">Fanpage Facebook</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-lg border-l-[5px] border-l-gray-200 py-2 px-5 block hover:text-red-500 hover:border-l-red-500 transition-all duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Truy cập Fanpage Facebook Chau Bui (mở trong tab mới)"
                  >
                    ChauBui Store
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="border-t border-gray-200 py-5"
        aria-labelledby="copyright"
      >
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="text-center">
            <p id="copyright" className="text-sm">
              Copyright © 2025 ChauBui Store
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
