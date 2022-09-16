const routes = [
  {
    path: "/general-settings",
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
  {
    path: "/pages-management/our-story",
    name: "Our Story",
    icon: "ni ni-single-copy-04",
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Our Company",
    icon: "ni ni-single-copy-04",
    state: "companyCollapse",
    views: [
      {
        path: "/pages-management/our-company/history",
        name: "History",
        miniName: "M",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-company/vision-culture",
        name: "Vision and Culture",
        miniName: "U",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-company/leadership",
        name: "Leadership",
        miniName: "m",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-company/our-teams",
        name: "Our Teams",
        miniName: "T",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-company/csr",
        name: "CSR",
        miniName: "m",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-company/investor-relations",
        name: "Investor Relations",
        miniName: "m",
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Our Business",
    icon: "ni ni-single-copy-04",
    state: "businessCollapse",
    views: [
      {
        path: "/pages-management/our-business/radio",
        name: "Radio",
        miniName: "M",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-business/tv",
        name: "TV",
        miniName: "U",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-business/digital",
        name: "Digital",
        miniName: "m",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-business/events",
        name: "Events",
        miniName: "m",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-business/promos",
        name: "Promos",
        miniName: "m",
        layout: "/admin",
      },
      {
        path: "/pages-management/our-business/talents",
        name: "Talents",
        miniName: "m",
        layout: "/admin",
      },
    ],
  },
  {
    path: "/pages-management/collaborate-with-us",
    name: "Collaborate with us",
    icon: "ni ni-single-copy-04",
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Work With Us",
    icon: "ni ni-single-copy-04",
    state: "workWithUsCollapse",
    views: [
      {
        path: "/pages-management/work-with-us/why-mbc",
        name: "Why MBC?",
        miniName: "W",
        layout: "/admin",
      },
      {
        path: "/pages-management/work-with-us/internship",
        name: "Internship Program",
        miniName: "U",
        layout: "/admin",
      },
      {
        path: "/pages-management/work-with-us/careers",
        name: "Career Opportunities",
        miniName: "U",
        layout: "/admin",
      },
    ],
  },
  {
    path: "/pages-management/contact-us",
    name: "Contact us",
    icon: "ni ni-single-copy-04",
    layout: "/admin",
  },
  { header: "SITE SETTINGS" },
  {
    path: "/site-settings",
    name: "Manage Settings",
    icon: "ni ni-settings-gear-65 ",
    layout: "/admin",
  },
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
