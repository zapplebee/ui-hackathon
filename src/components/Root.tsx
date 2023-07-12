import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppNavigation } from "./AppNavigation";
import { Helmet } from "react-helmet-async";

type VelaJwt = {
  build_id: number;
  is_active: boolean;
  is_admin: boolean;
  repo: string;
  token_type: string;
  sub: string;
  exp: number;
  iat: number;
};

export function Root() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("vela-access-token");
  useEffect(() => {
    if (!token) {
      console.info(`🔴 no vela-access-token detected`);
      navigate("/account/login");
      return;
    }

    try {
      const decoded = jwtDecode<VelaJwt>(token);
      const exp = decoded.exp;
      if (exp <= Math.floor(Date.now() / 1000)) {
        console.info(`🔴 vela-access-token detected but it is expired`);
        navigate("/account/login");
        return;
      }
    } catch (err) {
      console.error(err);
      console.info(`🔴 vela-access-token detected but could not be decoded`);
      navigate("/account/login");
      return;
    }
  }, [token, navigate]);

  return (
    <>
      <Favicon />
      <AppHeader />
      <AppNavigation />

      <div className="px-4 pb-16 md:px-12">
        <Outlet />
      </div>
    </>
  );
}

function Favicon() {
  const location = useLocation();
  const [counter, setCounter] = useState(0);
  const ref = useRef("");

  useEffect(() => {
    if (location.key !== ref.current) {
      ref.current = location.key;

      setTimeout(() => {
        setCounter((p) => p + 1);
      }, 1000);
    }
  }, [location]);

  console.log("location ----", location.key);
  console.log("counter ----", counter);
  return (
    <>
      {/* <Helmet>
        <link rel="icon" type="image/ico" href="/favicons/favicon.ico" />
      </Helmet> */}
    </>
  );
}
