import { createDirectStore } from 'direct-vuex';

export const availableColors = {
	blue: { h: 178, s: 100, l: 60 },
	green: { h: 122, s: 100, l: 60 },
	red: { h: 0, s: 100, l: 60 },
	yellow: { h: 49, s: 100, l: 60 },
};

export type TLightColor = keyof typeof availableColors;

export type TAnimationData = {
	velocity: number;
	frame: number;
	curve: number;
	id: number | null;
	playing: boolean;
};

export type TLightNode = {
	color: TLightColor;
	size: number;
	direction: number;
	controlling: {
		main: boolean;
		color: boolean;
	};
};

export type TLuminanceData = {
	max: number;
};

export interface IRootState {
	anim: TAnimationData;
	lum: TLuminanceData;
	dropdown: Element | null;
	lights: Array<TLightNode>;
}

const defaultState: IRootState = {
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

const { store, rootActionContext, rootGetterContext } =
	createDirectStore({
		state: defaultState,
		getters: {
			MAX_LUMINANCE: (state: IRootState): number => state.lum.max,
			ANIMATION: (state: IRootState): TAnimationData => state.anim,
			DROPDOWN: (state: IRootState): Element | null => state.dropdown,
			GET_LIGHTS: (state: IRootState): Array<TLightNode> =>
				state.lights,
		},
		mutations: {
			CHANGE_MAX_LUMINANCE: (
				state: IRootState,
				max: number
			): void => {
				state.lum.max = max;
			},
			UPDATE_ANIMATION: (
				state: IRootState,
				anim: Partial<TAnimationData>
			): void => {
				state.anim = { ...state.anim, ...anim };
			},
			UPDATE_DROPDOWN: (
				state: IRootState,
				dropdown: Element | null
			): void => {
				state.dropdown = dropdown;
			},
			PUSH_LIGHT: (
				state: IRootState,
				light: Partial<TLightNode>
			): void => {
				state.lights.push({
					color: 'blue',
					size: 24,
					direction: 1,
					controlling: {
						main: false,
						color: false,
					},
					...light,
				});
			},
			UPDATE_LIGHT: (
				state: IRootState,
				payload: { idx: number; light: Partial<TLightNode> }
			): void => {
				state.lights[payload.idx] = {
					...state.lights[payload.idx],
					...payload.light,
				};
			},
			POP_LIGHT: (state: IRootState): void => {
				state.lights.pop();
			},
			CLOSE_ALL_LIGHT_CONTROLLERS: (state: IRootState): void => {
				state.lights = state.lights.map(light => ({
					...light,
					controlling: { main: false, color: false },
				}));
			},
			TOGGLE_CONTROLLER_TO_LIGHT: (
				state: IRootState,
				idx: number
			): void => {
				const cnState = state.lights[idx].controlling.main;

				state.lights = state.lights.map(light => ({
					...light,
					controlling: { main: false, color: false },
				}));

				state.lights[idx].controlling.main = !cnState;
			},
			TOGGLE_COLOR_CONTROLLER_TO_LIGHT: (
				state: IRootState,
				idx: number
			): void => {
				const cnState = state.lights[idx].controlling.color;

				state.lights = state.lights.map(light => ({
					...light,
					controlling: { ...light.controlling, color: false },
				}));

				state.lights[idx].controlling.color = !cnState;
			},
		},
	});

export default store;
export { rootActionContext, rootGetterContext };
