import { useEffect, useRef } from "react";
import { refreshToken } from "~/services/api/auth/refreshToken.service";
import { parseJwt } from "~/utils/jwt";
import { useNavigate } from "react-router";

const REFRESH_THRESHOLD_SECONDS = Number(
  import.meta.env.VITE_REFRESH_THRESHOLD_SECONDS || 300
);

export const useTokenRefresher = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const scheduleRefresh = (token: string) => {
    const decoded = parseJwt(token);
    if (!decoded?.exp) return;

    const now = Date.now() / 1000;
    const exp = decoded.exp;

    if (exp <= now) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const refreshIn = (exp - now - REFRESH_THRESHOLD_SECONDS) * 1000;

    if (refreshIn > 0) {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(async () => {
        try {
          const newAccessToken = await refreshToken();
          localStorage.setItem("token", newAccessToken);
          scheduleRefresh(newAccessToken); // reset timer
        } catch (err) {
          console.error("Auto refresh failed", err);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }, refreshIn);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      scheduleRefresh(token);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [navigate]);
};
