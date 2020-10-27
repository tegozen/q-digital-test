import Pages from "./pages";

export const ROUTES = {
  main: { path: '/', component: Pages.main, exact: true },
  slider: { path: '/slider', component: Pages.Slider, },
  error404: { path: '*', component: Pages.error404 },
}

export default ROUTES;