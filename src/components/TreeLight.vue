<template>
	<div
		:class="['light', { 'is-off': !on }]"
		:data-direction="direction">
		<div
			:class="`circle ${color}`"
			:style="getStyles"
			@click="e => toggleController()"></div>
		<slot v-if="controlling" />
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
			controlling: false,
			lum: {
				min: 10,
				max: 60,
				dir: this.direction > 0 ? 0 : 1,
			},
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

		direction: {
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
			const intensity =
				this.intensity * this.direction + this.lum.dir;

			styles.backgroundColor = `hsla(${
				availableColors[this.color].h
			}, ${availableColors[this.color].s}%, ${
				this.lum.min + this.lum.max * intensity
			}%, ${intensity})`;

			styles.width = `${this.size / 2}px`;
			styles.height = `${this.size}px`;

			styles.boxShadow = `0px 0px ${20 * intensity}px ${
				styles.backgroundColor
			}`;

			return styles;
		},
	},

	methods: {
		toggleController() {
			this.controlling = !this.controlling;
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/components/tree-light.scss';
</style>