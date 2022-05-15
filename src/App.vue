<template>
	<div class="wrapper">
		<h1 class="title">Christmas Light</h1>
		<tree-branch :off="!getAnimation.playing" />
		<div class="controllers-wrapper">
			<label>Animation</label>
			<div class="animation-control-container">
				<button
					class="control"
					@click="start"
					:disabled="getAnimation.playing">
					On
				</button>
				<button
					class="control"
					@click="stop"
					:disabled="!getAnimation.playing">
					Off
				</button>
			</div>
			<range-slider-input label="Velocity" v-model="velocity" />
			<range-slider-input label="Luminance" v-model="luminance" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store, { TAnimationData } from '@/store';

import TreeBranch from '@/components/TreeBranch.vue';
import RangeSliderInput from '@/controllers/RangeSliderInput.vue';

const animate = (k = 50) => {
	// curve math to y axis as y = a sin((x-h)/b) + k
	// @see https://www.desmos.com/calculator/litkgx7vkd
	return 0.5 * Math.sin(-k / 1) + 0.5;
};

export default defineComponent({
	name: 'App',

	components: { TreeBranch, RangeSliderInput },

	created() {
		this.start();
	},

	mounted() {
		document.addEventListener('click', (e: any) => {
			if (this.getDropdown) {
				if (
					!document
						.getElementById(this.getDropdown)
						?.contains(e.target)
				) {
					this.closeAll();
				}
			}
		});
	},

	unmounted() {
		this.stop();
	},

	computed: {
		getAnimation(): TAnimationData {
			return store.getters.ANIMATION;
		},

		velocity: {
			get() {
				return store.getters.ANIMATION.velocity;
			},

			set(v: number) {
				store.commit.UPDATE_ANIMATION({ velocity: v });
			},
		},

		luminance: {
			get() {
				return store.getters.MAX_LUMINANCE;
			},

			set(v: number) {
				store.commit.CHANGE_MAX_LUMINANCE(v);
			},
		},

		getDropdown(): string | null {
			return store.getters.DROPDOWN;
		},
	},

	methods: {
		step() {
			const anim = { ...this.getAnimation };

			anim.frame += this.calcVelocity(anim.velocity);
			anim.curve = animate(anim.frame);

			store.commit.UPDATE_ANIMATION({
				frame: anim.frame,
				curve: anim.curve,
				id: requestAnimationFrame(this.step.bind(this)),
			});
		},

		start() {
			const anim = { ...this.getAnimation };

			if (anim.playing) return;

			store.commit.UPDATE_ANIMATION({
				id: requestAnimationFrame(this.step.bind(this)),
				playing: true,
			});
		},

		stop() {
			const anim = { ...this.getAnimation };

			if (!anim.id || !anim.playing) return;

			cancelAnimationFrame(anim.id);
			store.commit.UPDATE_ANIMATION({ id: null, playing: false });
		},

		calcVelocity(v: number) {
			return (2 / 10) * (v / 100);
		},

		closeAll() {
			store.commit.CLOSE_ALL_LIGHT_CONTROLLERS();
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/controllers/animation-control.scss';
</style>