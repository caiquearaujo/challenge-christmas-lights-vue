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
import { calcVelocity, getCurve } from './tools';

import TreeBranch from '@/components/TreeBranch.vue';
import RangeSliderInput from '@/controllers/RangeSliderInput.vue';

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

			anim.frame += calcVelocity(anim.velocity);
			anim.curve = getCurve(anim.frame);

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

		closeAll() {
			store.commit.CLOSE_ALL_LIGHT_CONTROLLERS();
		},
	},
});
</script>

<style lang="scss">
@import '@/styles/controllers/animation-control.scss';
</style>