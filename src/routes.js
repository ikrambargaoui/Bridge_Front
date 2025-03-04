import React from 'react';
import DefaultLayout from './Components/containers/DefaultLayout';

const Rights = React.lazy(() => import('./Components/Right/Rights'));
const gestionRight = React.lazy(() => import('./Components/Right/gestionRight'));
const updateUser = React.lazy(() => import('./Components/User/UpdateUser'))
const updatePassword = React.lazy(() => import('./Components/User/UpdatePassword'))
const ActionLog = React.lazy(() => import('./Components/ActionLog/actionlog'));
const configcol = React.lazy(() => import('./Components/ConfigColonne/configcol'));
const profil = React.lazy(() => import('./Components/Profil/profil'));
const gestionProfil = React.lazy(() => import('./Components/Profil/gestionProfil'));
const userInfo = React.lazy(() => import('./Components/Common/UserInformation'));
const GestionDelegation = React.lazy(() => import('./Components/Delegation/GestionDelegation'));
const delegation = React.lazy(() => import('./Components/Delegation/delegation'));
const MesDelegations = React.lazy(() => import('./Components/Delegation/MesDelegations'));
const RechercheAvancee = React.lazy(() => import('./Components/rechercheAvancee/RechercheAvancee'));
const DocumentView = React.lazy(() => import('./Components/SimpleSearch/DocumentView'));
const GestionStructure = React.lazy(() => import('./Components/Structure/GestionStructure'));
const GestionHabilitation = React.lazy(() => import('./Components/Habilitation/GestionHabilitation'));
const GestionUser = React.lazy(() => import('./Components/User/GestionUsers'));
const Navbars = React.lazy(() => import('./Components/Navbars'));
const Navs = React.lazy(() => import('./Components/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./Components/Dashboard/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Acceuil = React.lazy(() => import('./Components/Dashboard/Acceuil'));
const SimpleSearch = React.lazy(() => import('./Components/SimpleSearch/SimpleSearch'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Accueil', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/SimpleSearch', exact: true, name: 'Documents', component: SimpleSearch },
  { path: '/DocumentView/:value', name: 'DocumentView', component: DocumentView },
  { path: '/GestionStructure', exact: true, name: 'Gestion des Structures', component: GestionStructure },
  { path: '/GestionHabilitation', exact: true, name: 'Gestion des Habilitations', component: GestionHabilitation },
  { path: '/GestionDelegation', exact: true, name: 'Gestion des Delegations', component: GestionDelegation },
  { path: '/GestionDelegation', exact: true, name: 'Délégation', component: GestionDelegation },
  { path: '/MesDelegations', exact: true, name: 'Délégation', component: MesDelegations },
  { path: '/delegation', exact: true, name: 'Documents', component: delegation },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  //{ path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/userInfo', name: 'userInfo', component: userInfo },
  { path: '/actionlog', name: 'ActionLog', component: ActionLog },
  { path: '/configcol', name: 'configcol', component: configcol },
  { path: '/profil', name: 'profil', component: profil },
  { path: '/gestionProfil', name: 'gestionProfil', component: gestionProfil },
  { path: '/rechercheCiblee', name: 'Recherche Ciblée', component: RechercheAvancee },
  { path: '/Rights', name: 'Rights', component: Rights },
  { path: '/gestionRight', name: 'gestionRight', component: gestionRight },
  { path: '/GestionUtilisateurAgence', name: 'Gestion des utilisateurs', component: GestionUser },
  { path: '/Acceuil', name: 'Acceuil', component: Acceuil },
  { path: '/updateUser', name: 'updateUser', component: updateUser },
  { path: '/updatePassword', name: 'updatePassword', component: updatePassword },
 
  






];

export default routes;
