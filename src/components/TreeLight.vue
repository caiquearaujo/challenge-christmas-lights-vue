<template>
	<div :class="['light', { 'is-off': !on }]">
		<div class="circle" :style="getStyles"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';

export const availableColors = {
	blue: { h: 178, s: 100, l: 60 },
	green: { h: 122, s: 100, l: 60 },
	red: { h: 0, s: 100, l: 60 },
	yellow: { h: 49, s: 100, l: 60 },
};

export type TTreeLightColor = keyof typeof availableColors;

export default defineComponent({
	name: 'TreeLight',

	data() {
		return {
			currentColor: availableColors[this.color],
			fixedSize: ((i: number) => (i >= 0 && i <= 48 ? i : 24))(
				this.size
			),
		};
	},

	props: {
		color: {
			type: String as PropType<TTreeLightColor>,
			default: 'red',
			validator: (i: TTreeLightColor) =>
				Object.keys(availableColors).includes(i),
		},

		intensity: {
			type: Number,
			default: 1,
		},

		velocity: {
			type: Number,
			default: 1,
		},

		size: {
			type: Number,
			default: 24,
			validator: (i: number) => i >= 0 && i <= 48,
		},

		on: {
			type: Boolean,
			default: true,
		},
	},

	computed: {
		getStyles() {
			const styles: Record<string, string> = {};
			const intensity = this.intensity;

			styles.backgroundColor = `hsl(${this.currentColor.h}, ${this.currentColor.s}%, ${intensity}%)`;

			styles.width = `${this.fixedSize / 2}px`;
			styles.height = `${this.fixedSize}px`;

			styles.boxShadow = `0px 0px ${20 * intensity}px ${
				styles.backgroundColor
			}`;

			return styles;
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/tree-light.scss';
</style>