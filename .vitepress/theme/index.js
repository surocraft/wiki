// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import VersionSwitcher from '../components/VersionSwitcher.vue';
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client';
import './style.css';

/** @type {import('vitepress').Theme} */
export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/guide/extending-default-theme#layout-slots
		});
	},
	enhanceApp({ app }) {
		app.component('VersionSwitcher', VersionSwitcher);
		enhanceAppWithTabs(app);
	},
};
