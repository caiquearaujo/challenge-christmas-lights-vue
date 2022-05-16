import { mount } from '@vue/test-utils';
import TreeLight from '@/components/TreeLight.vue';
import store from '@/store';

describe('TreeLight component', () => {
	// emulates curve 75% of high curve point
	store.commit.UPDATE_ANIMATION({ curve: 0.75 });
	// add a light
	store.commit.PUSH_LIGHT({ color: 'red', size: 24, direction: 1 });
	store.commit.PUSH_LIGHT({ color: 'blue', size: 24, direction: -1 });

	it('should mounted element exists', () => {
		const mounted = mount(TreeLight, {
			props: {
				index: 0,
			},
		});

		expect(mounted.exists()).toBe(true);
	});

	it('should has defaults props', () => {
		const mounted = mount(TreeLight, {
			props: {
				index: 0,
			},
		});

		expect(mounted.props('index')).toBe(0);
		expect(mounted.props('on')).toBe(true);
	});

	const computed = [
		{ name: 'getIntensity', output: 0.75, index: 0 },
		{ name: 'calculateIntensity', output: 0.75, index: 0 },
		{ name: 'getLuminance', output: 60, index: 0 },
		{ name: 'getDirection', output: 1, index: 0 },
		{ name: 'getColor', output: 'red', index: 0 },
		{ name: 'getSize', output: 24, index: 0 },
		{ name: 'isControllerVisible', output: false, index: 0 },
		{ name: 'getIntensity', output: 0.75, index: 1 },
		{ name: 'calculateIntensity', output: 0.25, index: 1 },
		{ name: 'getLuminance', output: 60, index: 1 },
		{ name: 'getDirection', output: -1, index: 1 },
		{ name: 'getColor', output: 'blue', index: 1 },
		{ name: 'getSize', output: 24, index: 1 },
		{ name: 'isControllerVisible', output: false, index: 1 },
	];

	it.each(computed)(
		'should $name computed prop return $output at index $index',
		({ name, index, output }) => {
			// @ts-ignore TS will return each value as null
			expect(TreeLight.computed[name].call({ index })).toBe(output);
		}
	);

	it('should have styles at index 0', () => {
		const mounted = mount(TreeLight, {
			props: {
				index: 0,
			},
		});

		expect(mounted.find('div.circle').attributes().style).toBe(
			'background-color: rgba(230, 0, 0, 0.44999999999999996); width: 12px; height: 24px; box-shadow: 0px 0px 15px hsla(0, 100%, 45%, 0.44999999999999996);'
		);
	});

	it('should have styles at index 1', () => {
		const mounted = mount(TreeLight, {
			props: {
				index: 1,
			},
		});

		expect(mounted.find('div.circle').attributes().style).toBe(
			'background-color: rgba(0, 0, 0, 0.15); width: 12px; height: 24px; box-shadow: 0px 0px 5px hsla(178, 100%, 15%, 0.15);'
		);
	});

	it('should toggle controller', () => {
		const mounted = mount(TreeLight, {
			props: {
				index: 0,
			},
		});

		mounted.vm.toggleController();
		expect(store.state.lights[0].controlling.main).toBeTruthy();

		mounted.vm.toggleController();
		expect(store.state.lights[0].controlling.main).toBeFalsy();
	});
});
