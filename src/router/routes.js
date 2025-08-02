const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/ExperiencePage.vue') },
      { path: 'test', component: () => import('src/pages/TestPage.vue') },
      { path: 'projects-page', component: () => import('src/pages/ProjectsPage.vue') },
      { path: 'illustrations-page', component: () => import('src/pages/IllustrationsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
