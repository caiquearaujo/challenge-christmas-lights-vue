<template>
	<div class="tree">
		<tree-light
			v-for="(node, idx) of getLights"
			:index="idx"
			:key="idx"
			:on="!off" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import store, {
	availableColors,
	TLightColor,
	TLightNode,
} from '@/store';

import TreeLight from './TreeLight.vue';

export default defineComponent({
	name: 'TreeBranch',

	components: {
		TreeLight,
	},

	created() {
		const colors = Object.keys(availableColors) as TLightColor[];
		let colorFlag = 0;

		for (let i = 0; i < this.lights; i++) {
			this.pushLight({
				color: colors[colorFlag],
				size: 24,
				direction: (i + 1) % 2 === 0 ? -1 : 1,
			});

			colorFlag++;
			if (colorFlag >= colors.length) colorFlag = 0;
		}
	},

	props: {
		lights: {
			type: Number,
			default: 7,
		},

		off: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		getLights(): readonly TLightNode[] {
			return store.getters.GET_LIGHTS;
		},
	},

	methods: {
		pushLight(light: Partial<TLightNode>) {
			store.commit.PUSH_LIGHT(light);
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/tree.scss';
@import '@/styles/controllers/light-controller.scss';
</style>
