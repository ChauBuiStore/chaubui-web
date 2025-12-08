import { ApiErrorResponse, ApiResponse } from "@/lib/types/response.type";
import { authCookies } from "@/lib/utils/cookies.utils";

const isClient = typeof window !== "undefined";
const DEFAULT_TIMEOUT = 10000;
const DEFAULT_BASE_URL = "http://localhost:3000";

export interface FetcherConfig {
  baseURL: string;
  headers?: Record<string, string>;
  onTokenExpired?: () => void;
  timeout?: number;
}

export interface FetcherOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  token?: string | null;
}

export interface FetcherInstance {
  get: <T>(endpoint: string, options?: FetcherOptions) => Promise<ApiResponse<T>>;
  post: <T>(endpoint: string, body?: unknown, options?: FetcherOptions) => Promise<ApiResponse<T>>;
  postFormData: <T>(endpoint: string, formData: FormData, options?: FetcherOptions) => Promise<ApiResponse<T>>;
  put: <T>(endpoint: string, body?: unknown, options?: FetcherOptions) => Promise<ApiResponse<T>>;
  patch: <T>(endpoint: string, body?: unknown, options?: FetcherOptions) => Promise<ApiResponse<T>>;
  delete: <T>(endpoint: string, body?: unknown, options?: FetcherOptions) => Promise<ApiResponse<T>>;
  setOnTokenExpired: (callback: () => void) => void;
  clearOnTokenExpired: () => void;
}

function buildUrl(baseURL: string, endpoint: string, params?: Record<string, unknown>): string {
  let url = `${baseURL}${endpoint}`;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
}

function getToken(): string | null {
  return isClient ? authCookies.get() : null;
}

function buildAuthHeaders(
  configHeaders?: Record<string, string>,
  customToken?: string | null,
): Record<string, string> {
  const token = customToken !== undefined ? customToken : getToken();

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...configHeaders,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

function buildFormDataHeaders(
  configHeaders?: Record<string, string>,
  customToken?: string | null,
): Record<string, string> {
  const token = customToken !== undefined ? customToken : getToken();

  return {
    Accept: "application/json",
    ...configHeaders,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

async function parseErrorFromResponse(response: Response): Promise<ApiErrorResponse> {
  let text: string | null = null;

  try {
    text = await response.text();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to read error response text:", error);
    }
  }

  if (text) {
    try {
      return JSON.parse(text) as ApiErrorResponse;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to parse error response as JSON:", error);
      }
    }
  }

  return {
    message: `HTTP ${response.status}: ${response.statusText}`,
    status: "error" as const,
    statusCode: response.status,
  };
}

async function parseSuccessResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (response.status === 204 || response.status === 205) {
    return {
      message: "Success",
      status: "success",
      statusCode: response.status,
      data: null as T,
    };
  }

  const text = await response.text();
  if (!text) {
    return {
      message: "Success",
      status: "success",
      statusCode: response.status,
      data: null as T,
    };
  }

  try {
    const parsedData = JSON.parse(text);
    return parsedData as ApiResponse<T>;
  } catch {
    throw new Error("Invalid JSON response from server");
  }
}

function handleUnauthorized(config: FetcherConfig): void {
  if (isClient) {
    authCookies.remove();
  }

  if (config.onTokenExpired) {
    config.onTokenExpired();
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      const errorMessage = error.message.toLowerCase();
      if (errorMessage.includes("fetch failed") ||
        errorMessage.includes("econnrefused") ||
        errorMessage.includes("enotfound") ||
        errorMessage.includes("etimedout") ||
        errorMessage.includes("networkerror") ||
        errorMessage.includes("failed to fetch")) {
        throw new Error(`Network error: Unable to connect to ${url}. Please check your API server is running and NEXT_PUBLIC_API_BASE_URL is configured correctly.`);
      }
    }
    throw error;
  }
}

function createFetcher(config: FetcherConfig): FetcherInstance {
  const fetcherConfig: FetcherConfig = { ...config };

  async function request<T>(
    endpoint: string,
    options: FetcherOptions = {},
  ): Promise<ApiResponse<T>> {
    const url = buildUrl(fetcherConfig.baseURL, endpoint, options.params);
    const headers = {
      ...buildAuthHeaders(fetcherConfig.headers, options.token),
      ...options.headers,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { params: _params, token: _token, ...fetchOptions } = options;
    const timeout = fetcherConfig.timeout ?? DEFAULT_TIMEOUT;

    try {
      const response = await fetchWithTimeout(url, { ...fetchOptions, headers }, timeout);

      if (!response.ok) {
        const errorData = await parseErrorFromResponse(response);

        if (response.status === 401) {
          handleUnauthorized(fetcherConfig);
          throw new Error(errorData.message || "Unauthorized");
        }

        throw new Error(errorData.message || "Request failed");
      }

      return parseSuccessResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes("network error") ||
          errorMessage.includes("fetch failed") ||
          errorMessage.includes("econnrefused") ||
          errorMessage.includes("enotfound") ||
          errorMessage.includes("etimedout") ||
          errorMessage.includes("networkerror") ||
          errorMessage.includes("failed to fetch") ||
          errorMessage.includes("request timeout")
        ) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Network error for ${url}:`, error.message);
          }
          return {
            message: "Network error",
            status: "error" as const,
            statusCode: 0,
            data: undefined as T,
          };
        }
      }
      throw error;
    }
  }

  async function get<T>(
    endpoint: string,
    options?: FetcherOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>(endpoint, { ...options, method: "GET" });
  }

  async function post<T>(
    endpoint: string,
    body?: unknown,
    options?: FetcherOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async function postFormData<T>(
    endpoint: string,
    formData: FormData,
    options?: FetcherOptions,
  ): Promise<ApiResponse<T>> {
    const url = buildUrl(fetcherConfig.baseURL, endpoint, options?.params);
    const headers = {
      ...buildFormDataHeaders(fetcherConfig.headers, options?.token),
      ...options?.headers,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { params: _params, token: _token, ...fetchOptions } = options || {};
    const timeout = fetcherConfig.timeout ?? DEFAULT_TIMEOUT;

    try {
      const response = await fetchWithTimeout(
        url,
        {
          ...fetchOptions,
          method: "POST",
          body: formData,
          headers,
        },
        timeout,
      );

      if (!response.ok) {
        const errorData = await parseErrorFromResponse(response);

        if (response.status === 401) {
          handleUnauthorized(fetcherConfig);
          throw new Error(errorData.message || "Unauthorized");
        }

        throw new Error(errorData.message || "Request failed");
      }

      return parseSuccessResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes("network error") ||
          errorMessage.includes("fetch failed") ||
          errorMessage.includes("econnrefused") ||
          errorMessage.includes("enotfound") ||
          errorMessage.includes("etimedout") ||
          errorMessage.includes("networkerror") ||
          errorMessage.includes("failed to fetch") ||
          errorMessage.includes("request timeout")
        ) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Network error for ${url}:`, error.message);
          }
          return {
            message: "Network error",
            status: "error" as const,
            statusCode: 0,
            data: undefined as T,
          };
        }
      }
      throw error;
    }
  }

  async function put<T>(
    endpoint: string,
    body?: unknown,
    options?: FetcherOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async function patch<T>(
    endpoint: string,
    body?: unknown,
    options?: FetcherOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async function del<T>(
    endpoint: string,
    body?: unknown,
    options?: FetcherOptions,
  ): Promise<ApiResponse<T>> {
    return request<T>(endpoint, {
      ...options,
      method: "DELETE",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  return {
    get,
    post,
    postFormData,
    put,
    patch,
    delete: del,
    setOnTokenExpired: (callback: () => void) => {
      fetcherConfig.onTokenExpired = callback;
    },
    clearOnTokenExpired: () => {
      fetcherConfig.onTokenExpired = undefined;
    },
  };
}

export const fetcher = createFetcher({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL,
});
