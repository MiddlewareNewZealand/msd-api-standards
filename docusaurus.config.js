// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
module.exports = async function createConfig() {
  const { remarkKroki } = await import('remark-kroki');
  return {
    title: 'Ministry of Social Development | API Standards',
    favicon: '/msd-api-standards/img/favicon.ico',

    // Set the production url of your site here
    url: 'https://middlewarenewzealand.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/msd-api-standards/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'MiddlewareNewZealand', // Usually your GitHub org/user name.
    projectName: 'msd-api-standards', // Usually your repo name.

    onBrokenLinks: 'throw',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
      defaultLocale: 'en-nz',
      locales: ['en-nz'],
    },
    presets: [
      [
        'redocusaurus',
        {
          specs: [
            {
              spec: 'docs/api-development/api-specifications/example-agency-spec.yaml',
              route: '/api-specifications/example-agency-specification',
            },
          ],
          theme: {
            primaryColor: '#121f6b',
            theme: {
              typography: {
                code: {
                  wrap: true,
                },
              },
              rightPanel: {
                width: '44%',
              },
            },
          },
        },
      ],
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: '/',
            sidebarPath: require.resolve('./sidebars.js'),
            remarkPlugins: [
              [
                remarkKroki,
                {
                  alias: ['plantuml'],
                  server: 'https://kroki.io',
                }
              ]
            ],
            versions: {
              current: {
                label: 'Draft',
                path: 'draft',
              },
            },
          },
          theme: {
            customCss: [require.resolve('./src/css/custom.css'), require.resolve('@asyncapi/react-component/styles/default.min.css')],
          },
        }),
      ],
    ],
    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        colorMode: {
          defaultMode: 'light',
          disableSwitch: false,
          respectPrefersColorScheme: false,
        },
        navbar: {
          title: '',
          hideOnScroll: false,
          logo: {
            alt: 'Ministry of Social Development | Te Manatū Whakahiato Ora logo',
            src: '/msd-api-standards/img/msd-logo-light.svg',
            srcDark: '/msd-api-standards/img/msd-logo-dark.svg',
            href: '/draft/',
          },
          items: [
            {
              type: 'docsVersionDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/MiddlewareNewZealand/msd-api-standards/issues',
              label: 'Raise issue',
              position: 'right',
              target: '_blank',
              style: {fontSize: '0.9125rem'}
            }
          ]
        },
        footer: {
          links: [
            {
              title: 'About',
              items: [
                {
                  label: 'Accessibility',
                  href: 'https://www.msd.govt.nz/',
                },
                {
                  label: 'Privacy & security',
                  href: 'https://www.msd.govt.nz/',
                },
                {
                  label: 'Legal and copyright',
                  href: 'https://www.msd.govt.nz/',
                },
                {
                  html: `
                      </br>
                      <a href="https://www.govt.nz" target="_blank" rel="noreferrer noopener" aria-label="New Zealand Government">
                        <img src="/msd-api-standards/img/govt-nz.png" alt="Te Kāwanatanga o Aotearoa — New Zealand Government" style="float:left;width:7.5rem;height:auto;" />
                      </a>
                    `,
                },
              ],
            },
            {
              title: 'Community',
              items: [
                {
                  label: 'Raise issue',
                  href: 'https://github.com/MiddlewareNewZealand/msd-api-standards/issues',
                },
                {
                  label: 'Ministry of Social Development',
                  href: 'https://www.msd.govt.nz',
                },
              ],
            },
          ],
        },
        prism: {
          theme: lightTheme,
          darkTheme: darkTheme,
          additionalLanguages: ['bash', 'diff', 'json'],
        },
      }),
      markdown: {
        mermaid: true,
        hooks: {
          onBrokenMarkdownLinks: 'throw',
        },
      },
      themes: [
        '@docusaurus/theme-mermaid',
        [
          require.resolve('@easyops-cn/docusaurus-search-local'),
          /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
          ({
            hashed: true,
            indexBlog: false,
            docsRouteBasePath: '/',
          }),
        ],
      ],
      plugins: [
        [
          '@docusaurus/plugin-client-redirects',
          /** @type {import('@docusaurus/plugin-client-redirects').Options} */
          ({
            redirects: [
              {
                from: '/',
                to: '/draft',
              },
            ],
          }),
        ],
      ],
  };
}
