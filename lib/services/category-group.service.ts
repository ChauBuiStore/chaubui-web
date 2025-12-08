import { ENDPOINTS, fetcher } from "@/lib/configs";
import { ApiResponse, TransformedCategoryGroup } from "@/lib/types";
import { transformLocaleFields } from "@/lib/utils/locale.utils";
import { getLocale } from "next-intl/server";

interface CategoryGroupParams extends Record<string, unknown> {
  isAll?: boolean;
}

export const categoryGroupService = {
  async getCategoryGroups(
    params?: CategoryGroupParams,
    locale?: string
  ): Promise<ApiResponse<TransformedCategoryGroup[]>> {
    const currentLocale = locale || (await getLocale());
    const response = await fetcher.get<TransformedCategoryGroup[]>(
      ENDPOINTS.CATEGORY_GROUP.GET_ALL,
      {
        params: params || {},
      }
    );

    if (response.data && Array.isArray(response.data)) {
      response.data = transformLocaleFields(
        response.data,
        currentLocale
      ) as TransformedCategoryGroup[];
    } else {
      response.data = [];
    }

    return response;
  },
};