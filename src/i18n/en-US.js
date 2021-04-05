const app_classes = {
  operations: {
    label: 'Operations',
    title: 'Operations',
    description: "It's all about efficiency",
  },
  finance: {
    label: 'Finance',
    title: 'Finance',
    description: 'Financial apps',
  },
}

const apps = {
  accounting: {
    label: 'Accounting',
    class: 'finance',
    description: 'Record and monitor all your transaction here',
    thumbnail: '/images/spreadsheets.svg',
    links: {
      Features: 'features',
    },
  },
  inventory: {
    label: 'Inventory',
    class: 'operations',
    description: 'Organize and track all your goods',
    thumbnail: '/images/logistics.svg',
    links: {
      Features: 'features',
    },
  },
  sales: {
    label: 'Sales',
    class: 'operations',
    description: 'Manage sales, customers and invoices',
    thumbnail: '/images/add_to_cart.svg',
    links: {
      Features: 'features',
    },
  },
  purchase: {
    label: 'Purchase',
    class: 'operations',
    description: 'Manage your suppliers and purchases',
    thumbnail: '/images/payments.svg',
    links: {
      Features: 'features',
    },
  },
}

module.exports = {
  app_classes,
  apps,
  cta: 'Get Started Now',
  an_error_occurred: 'An error occurred',
  page_not_found: 'Page not found',
  iso: 'en',
  content: {
    docs: {
      accounting: {
        'get-started': 'Get Started',
        transactions: 'Transactions',
        preferences: 'Preferences',
      },
      inventory: {
        'get-started': 'Get Started',
        tracking: 'Tracking',
        preferences: 'Preferences',
      },
      purchase: {
        'get-started': 'Get Started',
        ordering: 'Ordering',
        preferences: 'Preferences',
      },
      sales: {
        'get-started': 'Get Started',
        ordering: 'Ordering',
        preferences: 'Preferences',
      },
    },
  },
  components: {
    navbar: {
      links: {
        account: 'My Account',
        apps: 'Apps',
        docs: 'Docs',
        sign_in: 'Sign in',
      },
    },
  },
  pages: {
    index: {
      hero: {
        slogan: 'Specialized solutions to enterprise problems.',
        description:
          'Discover apps like <b>Accounting</b>, <b>Inventory</b>, <b>Purchase</b>, and <b>Sales</b> used by entrepreneurs and employees to solve enterprise problems.',
        images: [
          '/images/hero/jessica-sysengrath-1uWTR1fcnI0-unsplash-min.jpg',
          '/images/hero/bench-accounting-C3V88BOoRoM-unsplash-min.jpg',
          // '/images/hero/adeolu-eletu-unRkg2jH1j0-unsplash-min.jpg'
        ],
      },
      start: {
        slogan: 'Tackle business challenges with specialized apps',
        description:
          'Find an app designed to solve a specific business need. Experience the business efficiency and cost-effectiveness a purpose-built app brings as you go along.',
        selectedApps: apps,
        moreApps: 'Explore apps',
      },
      useCases: {
        slogan: 'Found more than one app useful?',
        description:
          'Connect them. That way, your apps can seamlessly share information during operations.',
        useCases: 'Explore use cases',
      },
      integrate: {
        slogan: '"How about my existing tools?🤷🏽‍♂️"',
        description:
          'You may connect <b>Buss</b> with your frequently used applications, services, and even legacy systems.',
        exploreIntegration: 'Explore integrations',
        featuredApps: [
          'https://static.airtable.com/images/integrations_lazy_river_logos/facebook.png',
          'https://static.airtable.com/images/integrations_lazy_river_logos/gmail.png',
          'https://static.airtable.com/images/integrations_lazy_river_logos/jira.png',
          'https://static.airtable.com/images/integrations_lazy_river_logos/slack.png',
          'https://static.airtable.com/images/integrations_lazy_river_logos/twitter.png',
        ],
      },
    },
    apps: {
      hero: {
        slogan: 'An app for every problem',
        description: 'Make use of an arsenal of apps as you grow',
      },
    },
    docs: {
      toc_title: 'On this page',
      libraries: {
        'get-started': {
          label: 'Get started',
          title: 'Get started with buss',
          description: '',
        },
        ...Object.fromEntries(
          Object.entries(
            app_classes
          ).map(([key, { label, title, description }]) => [
            key,
            { label, title, description },
          ])
        ),
      },
      collections: {
        'get-started': {
          label: 'Get Started',
          description: 'Getting started description',
          library: 'get-started',
          title: 'Getting started',
        },
        ...Object.fromEntries(
          Object.entries(
            apps
          ).map(([key, { label, title, description, class: library }]) => [
            key,
            { label, title, description, library },
          ])
        ),
      },
    },
  },
}
