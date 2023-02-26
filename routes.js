const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-chart-bar-32",
    layout: "/admin",
  },
  { header: "PAGES" },
  {
    path: "/pages-management/homepage",
    name: "Homepage",
    icon: "ni ni-shop",
    layout: "/admin",
  },
  { header: "SITE SETTINGS" },
  {
    collapse: true,
    name: "User Management",
    icon: "ni ni-badge text-default",
    state: "usersCollapse",
    views: [
      {
        path: "/site-settings/user-management/my-account",
        name: "My Account",
        miniName: "M",
        layout: "/admin",
      },
      {
        path: "/site-settings/user-management/pending-users",
        name: "Pending Users",
        miniName: "U",
        layout: "/admin",
      },
      {
        path: "/site-settings/user-management/manage-users",
        name: "Manage Users",
        miniName: "m",
        layout: "/admin",
      },
    ],
  },
  {
    path: "/site-settings/activity-monitor",
    name: "Activity Monitor",
    icon: "ni ni-user-run ",
    layout: "/admin",
  },
];

export default routes;
