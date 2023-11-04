const { lazy, Suspense } = require("react");
const { createBrowserRouter } = require("react-router-dom");
// 路由懒加载
const AuthRoute = lazy(() => import("@/pages/AuthRoute/index"));
const Login = lazy(() => import("@/pages/Login/index"));
const Register = lazy(() => import("@/pages/Register/index"));
const Home = lazy(() => import("@/pages/Home/index"));
const Weatherforecast = lazy(() => import("@/pages/Weatherforecast/index"));
const Airquality = lazy(() => import("@/pages/Airquality/index"));
const Qualityforecast = lazy(() => import("@/pages/Qualityforecast/index"));
const NotFound = lazy(() => import("@/pages/NotFound/index"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={"加载中"}>
        <AuthRoute>
          <Home />
        </AuthRoute>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={"加载中"}>
            <Weatherforecast />
          </Suspense>
        ),
      },
      {
        path: "airquality",
        element: (
          <Suspense fallback={"加载中"}>
            <Airquality />
          </Suspense>
        ),
      },
      {
        path: "qualityforecast",
        element: (
          <Suspense fallback={"加载中"}>
            <Qualityforecast />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={"加载中"}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={"加载中"}>
        <Register />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={"加载中"}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
