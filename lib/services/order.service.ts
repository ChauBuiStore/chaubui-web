import { fetcher } from "@/lib/configs/fetcher";
import { ENDPOINTS } from "@/lib/configs/endpoints";
import { ApiResponse } from "@/lib/types/response.type";
import { CreateOrderRequest, Order } from "@/modules/account/types";

export const orderService = {
  async createOrder(data: CreateOrderRequest): Promise<ApiResponse<Order>> {
    return fetcher.post<Order>(ENDPOINTS.ORDER.CREATE, data);
  },
};

