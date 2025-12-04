import { ENDPOINTS, fetcher } from "@/lib/configs";
import { ApiResponse } from "@/lib/types";
import { transformLocaleFields } from "@/lib/utils/locale.utils";
import { Product, ProductDetail } from "@/modules/products/types";

interface ProductParams {
  search?: string;
  page?: number;
  limit?: number;
  locale?: string;
  categoryGroupSlug?: string;
  categorySlug?: string;
}

export const productService = {
  async getProducts(
    params?: ProductParams
  ): Promise<ApiResponse<Product[]>> {
    const { locale = "vi", ...restParams } = params || {};

    const response = await fetcher.get<Product[]>(
      ENDPOINTS.PRODUCT.GET_ALL,
      {
        params: restParams as Record<string, unknown>,
      }
    );

    const rawData = response.data;

    if (Array.isArray(rawData)) {
      response.data = transformLocaleFields(rawData, locale) as Product[];
    } else {
      response.data = [];
    }

    return response;
  },

  async getProductById(
    id: string,
    locale: string = "vi"
  ): Promise<ApiResponse<ProductDetail>> {
    const response = await fetcher.get<ProductDetail>(
      ENDPOINTS.PRODUCT.GET_BY_ID(id)
    );

    if (response.data) {
      response.data = transformLocaleFields(
        response.data,
        locale
      ) as ProductDetail;
    }

    return response;
  },
};
