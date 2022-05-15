import { defaultState, getters, mutations, TLightColor } from '@/store';

describe('Store Getters', () => {
	it('can get max luminance', () => {
		const state = { ...defaultState };
		expect(getters.MAX_LUMINANCE(state)).toBe(60);
	});

	it('can get animation data', () => {
		const state = { ...defaultState };
		expect(getters.ANIMATION(state)).toStrictEqual(state.anim);
	});

	it('can get dropdown', () => {
		const state = { ...defaultState };
		expect(getters.DROPDOWN(state)).toStrictEqual(null);
		expect(
			getters.DROPDOWN({ ...state, dropdown: 'drop' })
		).toStrictEqual('drop');
	});

	it('can get lights', () => {
		let state = { ...defaultState };

		expect(getters.GET_LIGHTS(state)).toStrictEqual([]);
		expect(getters.GET_LIGHTS(state).length).toBe(0);

		const lights = [
			{
				color: 'red' as TLightColor,
				size: 24,
				direction: 1,
				controlling: {
					main: false,
					color: false,
				},
			},
			{
				color: 'blue' as TLightColor,
				size: 24,
				direction: -1,
				controlling: {
					main: false,
					color: false,
				},
			},
		];

		state = {
			...defaultState,
			lights,
		};

		expect(getters.GET_LIGHTS(state)).toStrictEqual(lights);
		expect(getters.GET_LIGHTS(state).length).toBe(2);
		expect(getters.GET_LIGHTS(state)[0].color).toBe('red');
		expect(getters.GET_LIGHTS(state)[1].color).toBe('blue');
	});

	it('can get one light', () => {
		const lights = [
			{
				color: 'red' as TLightColor,
				size: 24,
				direction: 1,
				controlling: {
					main: false,
					color: false,
				},
			},
			{
				color: 'blue' as TLightColor,
				size: 24,
				direction: -1,
				controlling: {
					main: false,
					color: false,
				},
			},
		];

		const state = { ...defaultState, lights };
		expect(getters.GET_LIGHT(state, { idx: 0 })).toStrictEqual(
			lights[0]
		);
	});

	it('cannot get an unknown light', () => {
		const lights = [
			{
				color: 'red' as TLightColor,
				size: 24,
				direction: 1,
				controlling: {
					main: false,
					color: false,
				},
			},
			{
				color: 'blue' as TLightColor,
				size: 24,
				direction: -1,
				controlling: {
					main: false,
					color: false,
				},
			},
		];

		const state = { ...defaultState, lights };
		expect(getters.GET_LIGHT(state, { idx: 5 })).toBeNull();
	});
});

describe('Store Mutators', () => {
	it('can change max luminance', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [],
		};

		mutations.CHANGE_MAX_LUMINANCE(state, 20);
		expect(state.lum.max).toBe(20);
	});

	it('can update animation data', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [],
		};

		mutations.UPDATE_ANIMATION(state, { frame: 30 });
		expect(state.anim.frame).toBe(30);
	});

	it('can push a new light', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [],
		};

		const light = {
			color: 'red' as TLightColor,
			size: 24,
			direction: 1,
		};

		mutations.PUSH_LIGHT(state, {
			color: 'red' as TLightColor,
			size: 24,
			direction: 1,
		});

		expect(state.lights.length).toBe(1);
		expect(state.lights[0]).toStrictEqual({
			...light,
			controlling: {
				main: false,
				color: false,
			},
		});
	});

	it('can update a light', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [],
		};

		const light = {
			color: 'red' as TLightColor,
			size: 24,
			direction: 1,
		};

		mutations.PUSH_LIGHT(state, {
			color: 'red' as TLightColor,
			size: 24,
			direction: 1,
		});

		mutations.UPDATE_LIGHT(state, {
			idx: 0,
			light: { color: 'blue' as TLightColor },
		});

		expect(state.lights[0]).toStrictEqual({
			...light,
			color: 'blue',
			controlling: {
				main: false,
				color: false,
			},
		});
	});

	it('can pop a light', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [],
		};

		mutations.PUSH_LIGHT(state, {
			color: 'red' as TLightColor,
			size: 24,
			direction: 1,
		});

		mutations.POP_LIGHT(state);

		expect(state.lights.length).toBe(0);
	});

	it('should close all lights controllers', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [
				{
					color: 'red' as TLightColor,
					size: 24,
					direction: 1,
					controlling: {
						main: true,
						color: true,
					},
				},
				{
					color: 'blue' as TLightColor,
					size: 24,
					direction: -1,
					controlling: {
						main: true,
						color: true,
					},
				},
			],
		};

		mutations.CLOSE_ALL_LIGHT_CONTROLLERS(state);

		state.lights.forEach(l => {
			expect(l.controlling).toStrictEqual({
				main: false,
				color: false,
			});
		});

		// Ignore when empty
		state.lights = [];
		mutations.CLOSE_ALL_LIGHT_CONTROLLERS(state);

		expect(state.lights.length).toBe(0);
	});

	it('should toggle controller to light', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: null,
			lights: [
				{
					color: 'red' as TLightColor,
					size: 24,
					direction: 1,
					controlling: {
						main: false,
						color: false,
					},
				},
				{
					color: 'blue' as TLightColor,
					size: 24,
					direction: -1,
					controlling: {
						main: true,
						color: true,
					},
				},
			],
		};

		// open
		mutations.TOGGLE_CONTROLLER_TO_LIGHT(state, {
			idx: 0,
			controller: 'red-color',
		});

		expect(state.lights[0].controlling).toStrictEqual({
			main: true,
			color: false,
		});
		expect(state.lights[1].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.dropdown).toBe('red-color');

		// close
		mutations.TOGGLE_CONTROLLER_TO_LIGHT(state, {
			idx: 0,
			controller: 'red-color',
		});

		expect(state.lights[0].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.lights[1].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.dropdown).toBeNull();

		// Ignore when unknown index
		mutations.TOGGLE_CONTROLLER_TO_LIGHT(state, {
			idx: 5,
			controller: 'unknown',
		});

		expect(state.lights[0].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.lights[1].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.dropdown).toBeNull();

		// Ignore when empty
		state.lights = [];
		mutations.TOGGLE_CONTROLLER_TO_LIGHT(state, {
			idx: 0,
			controller: 'red-color',
		});

		expect(state.lights).toStrictEqual([]);
		expect(state.dropdown).toBeNull();
	});

	it('should color toggle controller to light', () => {
		const state = {
			anim: {
				velocity: 100,
				frame: 0,
				curve: 0,
				id: null as null | number,
				playing: false,
			},
			lum: {
				max: 60,
			},
			dropdown: 'blue-color',
			lights: [
				{
					color: 'red' as TLightColor,
					size: 24,
					direction: 1,
					controlling: {
						main: false,
						color: false,
					},
				},
				{
					color: 'blue' as TLightColor,
					size: 24,
					direction: -1,
					controlling: {
						main: true,
						color: false,
					},
				},
			],
		};

		// open
		mutations.TOGGLE_COLOR_CONTROLLER_TO_LIGHT(state, 1);

		expect(state.lights[0].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.lights[1].controlling).toStrictEqual({
			main: true,
			color: true,
		});

		// close
		mutations.TOGGLE_COLOR_CONTROLLER_TO_LIGHT(state, 1);

		expect(state.lights[0].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.lights[1].controlling).toStrictEqual({
			main: true,
			color: false,
		});

		// Ignore when unknown index
		mutations.TOGGLE_COLOR_CONTROLLER_TO_LIGHT(state, 5);

		expect(state.lights[0].controlling).toStrictEqual({
			main: false,
			color: false,
		});
		expect(state.lights[1].controlling).toStrictEqual({
			main: true,
			color: false,
		});

		// Ignore when empty
		state.lights = [];
		mutations.TOGGLE_COLOR_CONTROLLER_TO_LIGHT(state, 0);

		expect(state.lights).toStrictEqual([]);
	});
});
