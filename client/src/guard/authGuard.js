import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
//
import { useAuthContext } from "../context/useAuthContext";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const navigate = useNavigate();

  const { authenticated } = useAuthContext();

  const [checked, setChecked] = useState(false);

  console.log(authenticated);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.href,
      }).toString();

      const href = `/login?${searchParams}`;

      navigate(href, { replace: true });
    } else {
      setChecked(true);
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
