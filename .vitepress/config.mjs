import { loadEnv } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import defineVersionedConfig from 'vitepress-versioning-plugin';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';
import sidebarJson from './sidebars/S11.json';

export default async () => {
	const env = loadEnv("", process.cwd());

	// https://vitepress.dev/reference/site-config
	return defineVersionedConfig({
		title: "SuroCraft Wiki",
		description: "Wiki dokumentace a návody pro SuroCraft",
		base: "/",

		cleanUrls: true,
		lastUpdated: true,
		ignoreDeadLinks: true,

		sitemap: {
			hostname: env.VITE_hostname
		},

		head: [
			['link', { rel: 'icon', href: '/icon/surocraft.png' }],

			//Discord embeds (OpenGraph)
			['meta', { name: 'og:site_name', content: 'SuroCraft' }],
			['meta', { name: 'twitter:card', content: 'summary' }],
			['meta', { name: 'theme-color', content: '#962c49' }],

			//Google Analytics
			['meta', { name: 'google-site-verification', content: env.VITE_GVerify }],
			['script',
				{ async: true, src: 'https://www.googletagmanager.com/gtag/js?id=' + env.VITE_GTAG }
			],
			['script', {},
				`window.dataLayer = window.dataLayer || [];`
				+ `\nfunction gtag(){dataLayer.push(arguments);}`
				+ `\ngtag('js', new Date());`
				+ `\nconst cookiesAccepted = localStorage.getItem("cookiesAccepted");`
				+ `\n\nif (cookiesAccepted !== null) {`
				+ `\n    gtag('consent', 'default', {`
				+ `\n        'ad_storage': 'granted',`
				+ `\n        'ad_user_data': 'granted',`
				+ `\n        'ad_personalization': 'granted',`
				+ `\n        'analytics_storage': 'granted'`
				+ `\n    });`
				+ `\n} else {`
				+ `\n    gtag('consent', 'default', {`
				+ `\n        'ad_storage': 'denied',`
				+ `\n        'ad_user_data': 'denied',`
				+ `\n        'ad_personalization': 'denied',`
				+ `\n        'analytics_storage': 'denied'`
				+ `\n    });`
				+ `\n}`
				+ `\n\ngtag('config', '${env.VITE_GTAG}');`
			],
		],

		markdown: {
			config(md) {
				md.use(tabsMarkdownPlugin);
			},
		},

		versioning: {
			latestVersion: "S11",
			sidebars: {
				processSidebarURLs: true,
				sidebarPathResolver: (version) => `.vitepress/sidebars/${version}.json`,
				sidebarUrlProcessor: (url, version) => url.startsWith("http") ? url : `/${version}${url}`
			},
		},

		vite: {
			resolve: {
				alias: [
					{
						find: /^.*\/NotFound\.vue$/,
						replacement: fileURLToPath(
							new URL('./components/NotFound.vue', import.meta.url)
						)
					}
				]
			}
		},

		themeConfig: {
			// https://vitepress.dev/reference/default-theme-config

			logo: "/icon/surocraft2.png",

			siteTitle: "SuroCraft",

			lastUpdated: {
				text: 'Aktualizováno',
				formatOptions: {
					dateStyle: 'long',
					timeStyle: 'short'
				}
			},

			outline: {
				label: "Obsah stránky"
			},

			search: {
				provider: 'local',
				options: {
					miniSearch: {
						searchOptions: {
							filter: (result) => {
								const versions = ['S8', 'S9', 'S10', 'S11', 'GX'];

								if (typeof window === 'undefined') return true;

								const parts = window.location.pathname.split('/').filter(Boolean);
								const current = (parts.length > 0 && versions.includes(parts[0])) ? parts[0] : 'S11';

								const link = result.id || '';

								if (current === 'S11') {
									return !versions.filter(v => v !== 'S11').some(v => link.startsWith(`/${v}/`));
								}

								return link.startsWith(`/${current}/`);
							}
						}
					},
					locales: {
						root: {
							translations: {
								button: {
									buttonText: 'Hledat',
								},
								modal: {
									displayDetails: 'Zobrazení',
									resetButtonTitle: 'Smazat',
									backButtonTitle: 'Zpět',
									noResultsText: 'Žádné výsledky pro',
									footer: {
										selectText: 'Přejít na',
										navigateText: 'Výběr',
										closeText: 'Zavřít'
									}
								}
							}
						}
					}
				}
			},

			versionSwitcher: false,

			nav: [
				{ text: 'Web', link: 'https://surocraft.eu/' },
				{ text: 'Discord', link: 'https://dsc.gg/surocraft' },
				{ text: 'Donate', link: 'https://opencollective.com/surocraft' },
				{ text: 'Dynmap', link: 'http://map.surocraft.eu:25554/' },
				{ component: 'VersionSwitcher' }
			],

			sidebar: {
				'/': sidebarJson,
			},

			socialLinks: [
				{ icon: 'reddit', link: 'https://www.reddit.com/r/surocraft/' },
				{ icon: 'discord', link: 'https://dsc.gg/surocraft' },
			],

			footer: {
				copyright: '© 2025 SuroCraft | vytvořil PetyXbron',
			}
		},

		locales: {
			root: {
				label: 'English',
				lang: 'en'
			}
		},

	}, __dirname);
};