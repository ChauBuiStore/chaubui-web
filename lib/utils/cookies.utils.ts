import { User } from "@/modules/account/types";

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
} as const;

export const COOKIE_CONFIG = {
  path: "/",
  ACCESS_TOKEN_MAX_AGE: 60 * 60,
  REFRESH_TOKEN_MAX_AGE: 7 * 24 * 60 * 60,
} as const;

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!raw) return null;

  const valuePart = raw.substring(name.length + 1);
  try {
    return decodeURIComponent(valuePart);
  } catch {
    return valuePart || null;
  }
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    domain?: string;
    sameSite?: "strict" | "lax" | "none";
  } = {}
): void {
  if (typeof document === "undefined") return;

  const {
    maxAge,
    path = COOKIE_CONFIG.path,
    secure = process.env.NODE_ENV === "production",
    domain,
    sameSite = "lax",
  } = options;

  const encodedValue = encodeURIComponent(value);

  const isSecure = sameSite === "none" ? true : secure;

  let cookieString = `${name}=${encodedValue}; Path=${path}`;
  if (maxAge !== undefined) cookieString += `; Max-Age=${maxAge}`;

  if (domain) cookieString += `; Domain=${domain}`;
  if (isSecure) cookieString += "; Secure";
  if (sameSite)
    cookieString += `; SameSite=${sameSite
      .charAt(0)
      .toUpperCase()}${sameSite.slice(1)}`;
  document.cookie = cookieString;
}

export function removeCookie(
  name: string,
  options: { path?: string; domain?: string } = {}
): void {
  if (typeof document === "undefined") return;

  const path = options.path ?? COOKIE_CONFIG.path;
  const domain = options.domain;
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

  let base = `${name}=; Path=${path}; ${expire}`;
  if (domain) base += `; Domain=${domain}`;
  document.cookie = base;

  document.cookie = `${name}=; Path=/; ${expire}`;
  if (!domain && typeof window !== "undefined") {
    const host = window.location.hostname;
    document.cookie = `${name}=; Path=/; Domain=${host}; ${expire}`;
    document.cookie = `${name}=; Path=/; Domain=.${host}; ${expire}`;
  }
}

export const authCookies = {
  getAccessToken: () => getCookie(COOKIE_NAMES.ACCESS_TOKEN),
  getRefreshToken: () => getCookie(COOKIE_NAMES.REFRESH_TOKEN),
  get: () => getCookie(COOKIE_NAMES.ACCESS_TOKEN),
  setTokens: (accessToken: string, refreshToken: string) => {
    setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      maxAge: COOKIE_CONFIG.ACCESS_TOKEN_MAX_AGE,
    });
    setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      maxAge: COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE,
    });
  },
  set: (token: string) => setCookie(COOKIE_NAMES.ACCESS_TOKEN, token, {
    maxAge: COOKIE_CONFIG.ACCESS_TOKEN_MAX_AGE,
  }),
  remove: () => {
    removeCookie(COOKIE_NAMES.ACCESS_TOKEN);
    removeCookie(COOKIE_NAMES.REFRESH_TOKEN);
    removeCookie(COOKIE_NAMES.USER);
  },
  getUser: (): User | null => {
    const userStr = getCookie(COOKIE_NAMES.USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
  setUser: (user: User) => {
    setCookie(COOKIE_NAMES.USER, JSON.stringify(user), {
      maxAge: COOKIE_CONFIG.REFRESH_TOKEN_MAX_AGE,
    });
  },
};
