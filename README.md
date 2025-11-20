# Livin N Decoration - E-commerce Website

Website thương mại điện tử bán đồ nội thất và trang trí nhà cửa, được xây dựng với Next.js 14+ (App Router), TypeScript, và Tailwind CSS.

## 📋 Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [SEO Implementation](#seo-implementation)
- [API Documentation](#api-documentation)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt và chạy](#cài-đặt-và-chạy)

---

## Tổng quan

**Livin N Decoration** là một website thương mại điện tử hiện đại với các tính năng:

- 🛍️ **E-commerce**: Quản lý sản phẩm, giỏ hàng, đơn hàng
- 🌍 **Đa ngôn ngữ**: Hỗ trợ Tiếng Việt (vi), English (en), Khmer (km)
- 📱 **Responsive**: Tối ưu cho mọi thiết bị
- ⚡ **Performance**: Tối ưu tốc độ và Core Web Vitals
- 🔍 **SEO**: Tối ưu hóa công cụ tìm kiếm toàn diện

---

## Tính năng

### Core Features
- ✅ Quản lý sản phẩm và danh mục
- ✅ Giỏ hàng và thanh toán
- ✅ Quản lý đơn hàng
- ✅ Xác thực người dùng (đăng nhập/đăng ký)
- ✅ Tìm kiếm sản phẩm
- ✅ Phân trang và lọc sản phẩm

### Technical Features
- ✅ Next.js 14+ App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ next-intl (i18n)
- ✅ React Query
- ✅ Server Components & Client Components
- ✅ Static Site Generation (SSG)
- ✅ Image Optimization

---

## SEO Implementation

Website được tối ưu hóa SEO toàn diện với điểm số **96/100**. Xem chi tiết tại [SEO-AUDIT-REPORT.md](./SEO-AUDIT-REPORT.md).

### ✅ Đã implement

1. **Technical SEO (100/100)**
   - Metadata với `generateMetadata` API
   - Canonical URLs
   - Hreflang tags (tự động từ `alternates.languages`)
   - Robots meta tags
   - Sitemap.xml (dynamic generation)
   - Robots.txt

2. **On-Page SEO (95/100)**
   - Dynamic title tags (truncate 60 ký tự)
   - Meta descriptions (truncate 160 ký tự)
   - Keywords optimization
   - Heading structure (H1, H2, H3)
   - Image alt text với fallback logic

3. **Structured Data (95/100)**
   - Organization Schema
   - Website Schema với SearchAction
   - Product Schema
   - Breadcrumb Schema
   - Collection Schema

4. **Internationalization (100/100)**
   - Multi-language support (vi, en, km)
   - Language alternates
   - Content localization
   - Hreflang tags

5. **Performance (85/100)**
   - Image optimization (AVIF, WebP)
   - Compression
   - Preconnect links
   - Font optimization

6. **Mobile Optimization (90/100)**
   - Responsive design
   - PWA manifest
   - Touch icons

7. **Social Media (95/100)**
   - Open Graph tags
   - Twitter Cards

### 📁 SEO Files

- `app/sitemap.ts` - Dynamic sitemap generation
- `app/robots.ts` - Robots.txt configuration
- `app/manifest.ts` - PWA manifest
- `components/seo/structured-data.tsx` - Schema.org structured data
- `components/seo/preconnect-links.tsx` - Performance optimization
- `lib/utils/seo.utils.ts` - SEO utility functions

### 🔧 SEO Configuration

Metadata được cấu hình trong:
- `app/[locale]/layout.tsx` - Root layout metadata
- `app/[locale]/page.tsx` - Home page metadata
- `app/[locale]/collections/page.tsx` - Collections page metadata
- `app/[locale]/collections/[collectionSlug]/page.tsx` - Collection detail metadata
- `app/[locale]/collections/[collectionSlug]/[productSlug]/page.tsx` - Product detail metadata
- `app/[locale]/search/page.tsx` - Search page metadata

---

## API Documentation

Tài liệu này mô tả tất cả các API endpoints, services và types hiện có trong dự án.

## Mục lục

- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Menu](#menu)
  - [Product](#product)
  - [Category Group](#category-group)
  - [Order](#order)
- [Services](#services)
  - [Auth Service](#auth-service)
  - [Product Service](#product-service)
  - [Cart Service](#cart-service)
  - [Category Group Service](#category-group-service)
  - [Order Service](#order-service)
- [Types](#types)
  - [Response Types](#response-types)
  - [Auth Types](#auth-types)
  - [User Types](#user-types)
  - [Product Types](#product-types)
  - [Order Types](#order-types)
  - [Cart Types](#cart-types)
  - [Category Types](#category-types)
  - [Checkout Types](#checkout-types)
  - [Other Types](#other-types)

---

## API Endpoints

### Authentication

#### POST `/auth/login`
Đăng nhập người dùng.

**Request Body:**
```typescript
{
  email: string;
  password: string;
}
```

**Response:**
```typescript
ApiResponse<AuthResponse>
```

---

#### POST `/auth/register`
Đăng ký tài khoản mới.

**Request Body:**
```typescript
{
  userName: string;
  fullName?: string | null;
  gender: "male" | "female";
  email: string;
  dateOfBirth?: string;
  password: string;
}
```

**Response:**
```typescript
ApiResponse<AuthResponse>
```

---

#### POST `/auth/logout`
Đăng xuất người dùng.

**Request Body:**
```typescript
{
  refreshToken: string;
}
```

**Response:**
```typescript
ApiResponse<LogoutResponse>
```

---

### Menu

#### GET `/menu`
Lấy danh sách menu.

**Response:**
```typescript
ApiResponse<MenuItem[]>
```

---

### Product

#### GET `/product`
Lấy danh sách sản phẩm.

**Query Parameters:**
- `search?: string` - Tìm kiếm sản phẩm
- `page?: number` - Số trang
- `limit?: number` - Số lượng sản phẩm mỗi trang
- `locale?: string` - Ngôn ngữ (mặc định: "vi")

**Response:**
```typescript
ApiResponse<Product[]>
```

---

#### GET `/product/:id`
Lấy thông tin chi tiết sản phẩm theo ID.

**Path Parameters:**
- `id: string` - ID của sản phẩm

**Response:**
```typescript
ApiResponse<Product>
```

---

### Category Group

#### GET `/category-group`
Lấy danh sách nhóm danh mục.

**Query Parameters:**
- `isAll?: boolean` - Lấy tất cả nhóm danh mục
- `locale?: string` - Ngôn ngữ

**Response:**
```typescript
ApiResponse<TransformedCategoryGroup[]>
```

---

### Order

#### POST `/order`
Tạo đơn hàng mới.

**Request Body:**
```typescript
{
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{
    productId: string;
    variantId: string;
    quantity: number;
  }>;
}
```

**Response:**
```typescript
ApiResponse<Order>
```

---

## Services

Dự án sử dụng các services để tương tác với API. Tất cả các services đều được export từ `lib/services/index.ts`.

### Auth Service

Quản lý xác thực người dùng (đăng nhập, đăng ký, đăng xuất).

**File:** `lib/services/auth.service.ts`

**Methods:**

#### `login(data: LoginRequest): Promise<ApiResponse<AuthResponse>>`
Đăng nhập người dùng.

**Ví dụ:**
```typescript
import { authService } from "@/lib/services";

const response = await authService.login({
  email: "user@example.com",
  password: "password123"
});
```

#### `register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>>`
Đăng ký tài khoản mới.

**Ví dụ:**
```typescript
const response = await authService.register({
  userName: "username",
  email: "user@example.com",
  password: "password123",
  gender: "male",
  fullName: "Full Name"
});
```

#### `logout(refreshToken: string): Promise<ApiResponse<LogoutResponse>>`
Đăng xuất người dùng.

**Ví dụ:**
```typescript
const response = await authService.logout(refreshToken);
```

---

### Product Service

Quản lý sản phẩm (lấy danh sách, lấy chi tiết).

**File:** `lib/services/product.service.ts`

**Methods:**

#### `getProducts(params?: ProductParams): Promise<ApiResponse<Product[]>>`
Lấy danh sách sản phẩm với hỗ trợ locale transformation.

**Parameters:**
- `params.search?: string` - Tìm kiếm sản phẩm
- `params.page?: number` - Số trang
- `params.limit?: number` - Số lượng sản phẩm mỗi trang
- `params.locale?: string` - Ngôn ngữ (mặc định: "vi")

**Ví dụ:**
```typescript
import { productService } from "@/lib/services";

const response = await productService.getProducts();

const searchResponse = await productService.getProducts({
  search: "sofa",
  page: 1,
  limit: 20,
  locale: "vi"
});
```

#### `getProductById(id: string, locale?: string): Promise<ApiResponse<Product>>`
Lấy thông tin chi tiết sản phẩm theo ID với hỗ trợ locale transformation.

**Parameters:**
- `id: string` - ID của sản phẩm
- `locale?: string` - Ngôn ngữ (mặc định: "vi")

**Ví dụ:**
```typescript
const product = await productService.getProductById("product-id", "vi");
```

---

### Cart Service

Quản lý giỏ hàng (localStorage-based, không gọi API).

**File:** `lib/services/cart.service.ts`

**Methods:**

#### `getCart(): Cart`
Lấy giỏ hàng hiện tại từ localStorage.

**Ví dụ:**
```typescript
import { cartService } from "@/lib/services";

const cart = cartService.getCart();
```

#### `saveCart(cart: Cart): void`
Lưu giỏ hàng vào localStorage.

#### `addItem(input: AddToCartInput): Cart`
Thêm sản phẩm vào giỏ hàng.

**Ví dụ:**
```typescript
const updatedCart = cartService.addItem({
  productId: "product-id",
  productSlug: "product-slug",
  name: "Product Name",
  price: 100000,
  quantity: 1,
  image: "https://example.com/image.jpg",
  variantId: "variant-id"
});
```

#### `updateItem(itemId: string, input: UpdateCartItemInput): Cart`
Cập nhật số lượng sản phẩm trong giỏ hàng.

**Ví dụ:**
```typescript
const updatedCart = cartService.updateItem("item-id", {
  quantity: 2
});
```

#### `removeItem(itemId: string): Cart`
Xóa sản phẩm khỏi giỏ hàng.

**Ví dụ:**
```typescript
const updatedCart = cartService.removeItem("item-id");
```

#### `clearCart(): Cart`
Xóa toàn bộ giỏ hàng.

**Ví dụ:**
```typescript
const emptyCart = cartService.clearCart();
```

**Lưu ý:** Cart service sử dụng localStorage với key `chaubui-cart` và version `2.0`.

---

### Category Group Service

Quản lý nhóm danh mục.

**File:** `lib/services/category-group.service.ts`

**Methods:**

#### `getCategoryGroups(params?: CategoryGroupParams, locale?: string): Promise<ApiResponse<TransformedCategoryGroup[]>>`
Lấy danh sách nhóm danh mục với hỗ trợ locale transformation.

**Parameters:**
- `params.isAll?: boolean` - Lấy tất cả nhóm danh mục
- `locale?: string` - Ngôn ngữ

**Ví dụ:**
```typescript
import { categoryGroupService } from "@/lib/services";

const response = await categoryGroupService.getCategoryGroups(
  { isAll: true },
  "vi"
);
```

---

### Order Service

Quản lý đơn hàng.

**File:** `lib/services/order.service.ts`

**Methods:**

#### `createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>>`
Tạo đơn hàng mới.

**Ví dụ:**
```typescript
import { orderService } from "@/lib/services";

const response = await orderService.createOrder({
  fullName: "Nguyễn Văn A",
  email: "user@example.com",
  phone: "0123456789",
  address: "123 Đường ABC, Quận 1, TP.HCM",
  items: [
    {
      productId: "product-id",
      variantId: "variant-id",
      quantity: 2
    }
  ]
});
```

---

## Types

### Response Types

#### `ApiResponse<T>`
Response chuẩn từ API.

```typescript
interface ApiResponse<T = unknown> {
  message: string;
  status: "success" | "error";
  statusCode: number;
  data?: T;
  meta?: PaginationMeta;
}
```

#### `PaginationMeta`
Thông tin phân trang.

```typescript
interface PaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
```

#### `ApiErrorResponse`
Response khi có lỗi.

```typescript
interface ApiErrorResponse {
  message: string;
  status: "error";
  statusCode: number;
  errors?: Record<string, string[]>;
}
```

---

### Auth Types

#### `LoginRequest`
```typescript
interface LoginRequest {
  email: string;
  password: string;
}
```

#### `RegisterRequest`
```typescript
interface RegisterRequest {
  userName: string;
  fullName?: string | null;
  gender: "male" | "female";
  email: string;
  dateOfBirth?: string;
  password: string;
}
```

#### `AuthResponse`
```typescript
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    role: string;
  };
}
```

#### `LogoutResponse`
```typescript
interface LogoutResponse {
  message: string;
}
```

---

### User Types

#### `User`
```typescript
interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  fullName: string;
  gender?: Gender;
  phone?: string;
  address?: string;
  birthday?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### `Gender`
```typescript
enum Gender {
  MALE = "male",
  FEMALE = "female",
}
```

---

### Product Types

#### `Product`
```typescript
interface Product {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  slug: string;
  description: string;
  stock: number;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  category: Category;
  variantType: VariantType;
  variants: ProductVariant[];
  thumbnailUrl?: string;
  thumbnailId?: string;
  images: ProductImage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
```

#### `ProductVariant`
```typescript
interface ProductVariant {
  id: string;
  size: Size;
  color: Color;
  stock: number;
  originalPrice: number;
  discountPercent?: number;
  salePrice?: number;
  variantType?: string;
}
```

#### `VariantType`
```typescript
enum VariantType {
  COLOR = "COLOR",
  SIZE = "SIZE",
  COMBO = "COMBO",
  NONE = "NONE",
}
```

#### `ProductImage`
```typescript
interface ProductImage {
  id: string;
  file: FileUpload;
  alt: string;
  sortOrder: number;
  isThumbnail: boolean;
}
```

---

### Order Types

#### `CreateOrderRequest`
```typescript
interface CreateOrderRequest {
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  items: CreateOrderItem[];
}
```

#### `CreateOrderItem`
```typescript
interface CreateOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
}
```

#### `Order`
```typescript
interface Order {
  id: string;
  orderId: string;
  userId?: string;
  user: User | null;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  paidAmount: number;
  refundAmount: number;
  status: OrderStatus | string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
```

#### `OrderItem`
```typescript
interface OrderItem {
  id: string;
  product: OrderItemProduct;
  variant: OrderItemVariant;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
```

#### `OrderItemProduct`
```typescript
interface OrderItemProduct {
  id: string;
  nameVi: string;
  nameEn: string;
  thumbnailUrl?: string;
}
```

#### `OrderItemVariant`
```typescript
interface OrderItemVariant {
  id: string;
  color: {
    id: string;
    nameVi: string;
    code: string;
  };
  originalPrice: number;
  salePrice: number;
}
```

#### `OrderStatus`
```typescript
enum OrderStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}
```

---

### Cart Types

#### `Cart`
```typescript
interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt?: string;
}
```

#### `CartItem`
```typescript
interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  price: number;
  quantity: number;
  image?: string;
  size?: Size;
  color?: Color;
  variantId?: string;
}
```

#### `AddToCartInput`
```typescript
interface AddToCartInput {
  productId: string;
  productSlug: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  price: number;
  quantity?: number;
  image?: string;
  size?: Size;
  color?: Color;
  variantId?: string;
}
```

#### `UpdateCartItemInput`
```typescript
interface UpdateCartItemInput {
  quantity: number;
}
```

#### `CartStorage`
```typescript
interface CartStorage {
  version: string;
  cart: Cart;
}
```

---

### Category Types

#### `CategoryGroup`
```typescript
interface CategoryGroup {
  id: string;
  nameVi: string;
  nameEn: string;
  nameKm?: string;
  slug: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  categories: Category[];
}
```

#### `Category`
```typescript
interface Category {
  id: string;
  nameVi: string;
  nameEn: string;
  nameKm?: string;
  slug: string;
  description: string;
  group: CategoryGroup;
  createdAt: Date | string;
  updatedAt: Date | string;
}
```

#### `TransformedCategoryGroup`
```typescript
type TransformedCategoryGroup = Omit<CategoryGroup, "nameVi" | "nameEn" | "nameKm" | "categories"> & {
  name: string;
  categories: TransformCategory[];
};
```

#### `TransformCategory`
```typescript
type TransformCategory = Omit<Category, "nameVi" | "nameEn" | "nameKm"> & {
  name: string;
};
```

---

### Checkout Types

#### `CheckoutContact`
```typescript
interface CheckoutContact {
  email: string;
  phone: string;
  fullName: string;
}
```

#### `CheckoutAddress`
```typescript
interface CheckoutAddress {
  address: string;
  note?: string;
}
```

#### `ShippingMethod`
```typescript
interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays?: string;
  description?: string;
}
```

#### `CheckoutData`
```typescript
interface CheckoutData {
  contact: CheckoutContact;
  shippingAddress: CheckoutAddress;
  note?: string;
}
```

#### `OrderFormData`
```typescript
interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}
```

#### `OrderData`
```typescript
interface OrderData {
  contact: CheckoutContact;
  address: CheckoutAddress;
  orderCode: string;
}
```

**Lưu ý:** Type `Order` trong checkout module khác với `Order` trong account module. Checkout `Order` bao gồm shipping method và các thông tin checkout khác.

---

### Other Types

#### `Color`
```typescript
interface Color {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  code: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
```

#### `Size`
```typescript
interface Size {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
```

#### `FileUpload`
```typescript
interface FileUpload {
  alt: string;
  createdAt: string;
  fileName: string;
  id: string;
  key: string;
  mimeType: string;
  size: string;
  sortOrder: number;
  updatedAt: string;
  url: string;
}
```

#### `Address`
```typescript
interface Address {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  isDefault: boolean;
}
```

#### `BreadcrumbItem`
```typescript
interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}
```

#### `MenuItem`
```typescript
interface MenuItem {
  title: string;
  href?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}
```

---

## HTTP Client (Fetcher)

Dự án sử dụng một HTTP Client tùy chỉnh với các phương thức:

**File:** `lib/configs/fetcher.ts`

### Methods

- `get<T>(endpoint, options?)` - GET request
- `post<T>(endpoint, body?, options?)` - POST request
- `postFormData<T>(endpoint, formData, options?)` - POST FormData request
- `put<T>(endpoint, body?, options?)` - PUT request
- `patch<T>(endpoint, body?, options?)` - PATCH request
- `delete<T>(endpoint, body?, options?)` - DELETE request
- `setOnTokenExpired(callback)` - Set callback khi token hết hạn
- `clearOnTokenExpired()` - Clear callback

### Features

- **Tự động thêm Authorization header:** Tất cả các request đều tự động thêm Bearer token vào header nếu có token trong cookies
- **Timeout:** Mặc định 10 giây, có thể cấu hình
- **Error handling:** Tự động xử lý lỗi 401 (Unauthorized) và clear token
- **Query parameters:** Hỗ trợ thêm query parameters qua `options.params`
- **Custom headers:** Hỗ trợ thêm custom headers qua `options.headers`

### Ví dụ sử dụng trực tiếp

```typescript
import { fetcher } from "@/lib/configs/fetcher";

const response = await fetcher.get<Product[]>("/product", {
  params: { page: 1, limit: 20 }
});

const createResponse = await fetcher.post<Order>("/order", {
  fullName: "Nguyễn Văn A",
  email: "user@example.com"
});

const formData = new FormData();
formData.append("file", file);
const uploadResponse = await fetcher.postFormData<FileUpload>("/upload", formData);
```

### Configuration

**Base URL:** Được cấu hình qua biến môi trường `NEXT_PUBLIC_API_BASE_URL` (mặc định: `http://localhost:3000`)

**Timeout:** Mặc định 10000ms, có thể cấu hình qua `FetcherConfig`

### FetcherOptions

```typescript
interface FetcherOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  token?: string | null;
}
```

---

## Endpoints Configuration

**File:** `lib/configs/endpoints.ts`

Tất cả các API endpoints được định nghĩa tập trung:

```typescript
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
  },
  MENU: {
    GET_ALL: "/menu",
  },
  PRODUCT: {
    GET_ALL: "/product",
    GET_BY_ID: (id: string) => `/product/${id}`,
  },
  CATEGORY_GROUP: {
    GET_ALL: "/category-group",
  },
  ORDER: {
    CREATE: "/order",
  },
};
```

---

## Ghi chú

- Tất cả các API endpoints đều trả về `ApiResponse<T>` với cấu trúc chuẩn
- Các request cần authentication sẽ tự động thêm Bearer token vào header từ cookies
- Các response có thể chứa `meta` cho phân trang
- Locale được hỗ trợ cho các trường đa ngôn ngữ (nameVi, nameEn, nameKm)
- Cart service hoạt động độc lập với localStorage, không gọi API
- Các service có hỗ trợ locale transformation tự động cho Product và Category Group

---

## Cấu trúc dự án

```
/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots.txt
│   └── manifest.ts        # PWA manifest
├── components/            # React components
│   ├── common/           # Common UI components
│   ├── layout/           # Layout components
│   ├── seo/              # SEO components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities & helpers
│   ├── configs/          # App configuration
│   ├── constants/        # Constants
│   ├── helpers/          # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── i18n/             # Internationalization
│   ├── providers/        # React providers
│   ├── services/         # API services
│   ├── stores/           # State management
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── modules/               # Feature modules
│   ├── account/          # User account
│   ├── auth/             # Authentication
│   ├── cart/             # Shopping cart
│   ├── checkout/         # Checkout process
│   ├── collections/      # Product collections
│   ├── home/             # Home page
│   ├── products/         # Products
│   └── search/           # Search functionality
└── messages/              # i18n translation files
```

---

## Cài đặt và chạy

### Yêu cầu

- Node.js 18+
- pnpm (hoặc npm/yarn)

### Cài đặt

```bash
# Clone repository
git clone <repository-url>

# Cài đặt dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Cấu hình environment variables
# NEXT_PUBLIC_API_BASE_URL=your-api-url
# NEXT_PUBLIC_BASE_URL=your-base-url
# GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Chạy development server

```bash
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

### Build production

```bash
pnpm build
pnpm start
```

### Linting & Formatting

```bash
pnpm lint
pnpm format
```

---

## Tài liệu thêm

- [SEO Audit Report](./SEO-AUDIT-REPORT.md) - Báo cáo đánh giá SEO chi tiết
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
