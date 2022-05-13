<template>
	<tree-branch :curve="anim.curve" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TreeBranch from '@/components/TreeBranch.vue';

const animate = (k = 50) => {
	// curve math to y axis as y = a sin((x-h)/b) + k
	// @see https://www.desmos.com/calculator/litkgx7vkd
	return 0.5 * Math.sin(-k / 1) + 0.5;
};

export default defineComponent({
	name: 'App',

	components: { TreeBranch },

	created() {
		this.start();
	},

	unmounted() {
		this.stop();
	},

	data() {
		return {
			anim: {
				velocity: 0.1,
				frame: 0,
				curve: 0,
				id: null as null | number,
			},
		};
	},

	methods: {
		step() {
			this.anim.frame += this.anim.velocity;
			this.anim.curve = animate(this.anim.frame);

			requestAnimationFrame(this.step.bind(this));
		},

		start() {
			this.anim.id = requestAnimationFrame(this.step.bind(this));
		},

		stop() {
			if (!this.anim.id) return;

			cancelAnimationFrame(this.anim.id);
			this.anim.id = null;
		},

		velocity(v: number) {
			return (1 / 10) * (v / 100);
		},
	},
});
</script>