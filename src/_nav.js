


export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },

    {
      name: 'Documents',
      url: '/',
      icon: 'icon-folder',
      children: [
        {
          name: 'Recherche Simple',
          url: '/SimpleSearch',
          icon: 'icon-docs',
        },
        {
          name: 'Recherche Avancée',
          url: '/RechercheCiblee',
          icon: 'icon-magnifier',
        }]
    },
    {
      name: 'Administration',
      url: '/',
      icon: 'icon-settings',
      children: [
        {
          name: 'Gestion des profils',
          url: '/profil',
          icon: 'icon-puzzle',
        },
        {
          name: 'Gestion des Habilitations',
          url: '/GestionHabilitation',
          icon: 'icon-wrench',
        },
        {
          name: 'Gestion des Structures',
          url: '/GestionStructure',
          icon: 'icon-puzzle',
        },

        {
          name: 'Gestion des délégations',
          url: '/GestionDelegation',
          icon: 'icon-puzzle',
        }
      ]
    }
  ],
};
