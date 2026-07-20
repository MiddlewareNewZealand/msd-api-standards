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
    favicon: '/standards-template/img/favicon.ico',

    // Set the production url of your site here
    url: 'https://middlewarenewzealand.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/standards-template/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'tewhatuora', // Usually your GitHub org/user name.
    projectName: 'standards-template', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',

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
            primaryColor: '#1890ff',
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
          disableSwitch: true,
          // MSD is light-only — ignore the visitor's OS dark preference
          respectPrefersColorScheme: false,
        },
        navbar: {
          title: 'API Standards',
          hideOnScroll: false,
          logo: {
            alt: 'Ministry of Social Development | Te Manatū Whakahiato Ora logo',
            src: '/standards-template/img/msd-logo-light.svg',
            srcDark: '/standards-template/img/msd-logo-dark.svg',
          },
          items: [
            {
              type: 'docsVersionDropdown',
              position: 'right',
            },
            {
              href: 'https://github.com/tewhatuora/standards-template/issues',
              label: 'Raise issue',
              position: 'right',
              target: '_blank',
              style: {'font-size': '0.9125rem'}
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
                  label: 'Example Contact',
                  href: '/contact',
                },
                {
                  label: 'Example Terms of use',
                  href: '/terms-of-use',
                },
                {
                  label: 'Legal and copyright',
                  href: 'https://www.msd.govt.nz/',
                },
                {
                  html: `
                      </br>
                      <a href="https://www.govt.nz" target="_blank" rel="noreferrer noopener" aria-label="New Zealand Government">
                        <img src="/standards-template/img/govt-nz.png" alt="Te Kāwanatanga o Aotearoa — New Zealand Government" style="float:left;width:7.5rem;height:auto;" />
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
                  href: 'https://github.com/tewhatuora/standards-template/issues',
                },
                {
                  label: 'Ministry of Social Development',
                  href: 'https://www.msd.govt.nz',
                },
                {
                  label: 'Contributors',
                  href: '/Examplecontributors'
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
  };
}
