const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "@/styles/global.scss";`,
			},
		},
	},
	pages: {
		index: {
			// entry for the page
			entry: 'src/main.ts',
			title: 'Christmas Lights App',
		},
	},
});
