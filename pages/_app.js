import React, { useEffect } from "react";
import Head from "next/head";

// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// plugins styles downloaded
import "asset/vendor/nucleo/css/nucleo.css";
// core styles
import "asset/scss/nextjs-argon-dashboard-pro.scss?v1.1.0";

import Footer from "components/Frontend/Footer";
import "asset/scss/user-defined.scss";

import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: true });

export function App({ Component, pageProps }) {
  const router = useRouter();
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>MBC Media Group</title>
      </Head>
      <Layout>
        <div className="container-min-h">
          <Component {...pageProps} />
          <Footer></Footer>
        </div>
      </Layout>
    </React.Fragment>
  );
}

export default App;
