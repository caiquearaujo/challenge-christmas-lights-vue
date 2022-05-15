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
import store, { TLightNode } from '@/store';
import { createNodes } from '@/tools';

import TreeLight from './TreeLight.vue';

export default defineComponent({
	name: 'TreeBranch',

	components: {
		TreeLight,
	},

	created() {
		if (this.getLights.length === this.lights) return;
		createNodes(this.lights, this.pushLight);
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
