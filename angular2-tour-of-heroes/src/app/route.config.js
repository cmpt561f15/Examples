var heroes_component_1 = require('./heroes.component');
var hero_detail_component_1 = require('./hero-detail.component');
var dashboard_component_1 = require('./dashboard.component');
exports.Routes = {
    dashboard: {
        path: '/',
        as: 'Dashboard',
        component: dashboard_component_1.DashboardComponent,
        link: ['/Dashboard']
    },
    heroes: {
        path: '/heroes',
        as: 'Heroes',
        component: heroes_component_1.HeroesComponent,
        link: ['/Heroes']
    },
    detail: {
        path: '/detail/:id',
        as: 'Detail',
        component: hero_detail_component_1.HeroDetailComponent,
        link: ['/Detail']
    }
};
exports.APP_ROUTES = Object.keys(exports.Routes).map(function (name) { return exports.Routes[name]; });
//# sourceMappingURL=route.config.js.map