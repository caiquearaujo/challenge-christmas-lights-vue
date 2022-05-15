import { TLightNode } from '@/store';
import { calcVelocity, createNodes, getCurve } from '@/tools';

describe('Tools', () => {
	const curves = [
		{ input: 100, output: 0.7531828205548794 },
		{ input: 90, output: 0.053001668199721075 },
		{ input: 75, output: 0.6938908177047152 },
		{ input: 50, output: 0.6311874268519644 },
		{ input: 25, output: 0.5661758750488866 },
		{ input: 10, output: 0.7720105554446849 },
		{ input: 1, output: 0.07926450759605175 },
		{ input: -100, output: 0.2468171794451206 },
		{ input: -90, output: 0.9469983318002789 },
		{ input: -75, output: 0.3061091822952848 },
		{ input: -50, output: 0.3688125731480356 },
		{ input: -25, output: 0.4338241249511135 },
		{ input: -10, output: 0.2279894445553151 },
		{ input: -1, output: 0.9207354924039483 },
	];

	it.each(curves)(
		'should $input return $output curve',
		({ input, output }) => {
			expect(getCurve(input)).toBe(output);
		}
	);

	const velocities = [
		{ input: 100, max: 0.2, output: 0.2 },
		{ input: 75, max: 0.2, output: 0.15000000000000002 },
		{ input: 50, max: 0.2, output: 0.1 },
		{ input: 25, max: 0.2, output: 0.05 },
		{ input: 0, max: 0.2, output: 0 },
		{ input: 100, max: 0.5, output: 0.5 },
		{ input: 75, max: 0.5, output: 0.375 },
		{ input: 50, max: 0.5, output: 0.25 },
		{ input: 25, max: 0.5, output: 0.125 },
		{ input: 0, max: 0.5, output: 0 },
	];

	it.each(velocities)(
		'should $input return $output when max velocity is $max',
		({ input, max, output }) => {
			expect(calcVelocity(input, max)).toBe(output);
		}
	);

	it('should create light nodes', () => {
		const nodes: Array<Partial<TLightNode>> = [];
		const push = (l: Partial<TLightNode>): void => {
			nodes.push(l);
		};

		createNodes(7, push);

		expect(nodes.length).toBe(7);

		const colors = [
			'blue',
			'green',
			'red',
			'yellow',
			'blue',
			'green',
			'red',
		];

		const directions = [1, -1, 1, -1, 1, -1, 1];

		nodes.forEach((node, idx) => {
			expect(node.color).toBe(colors[idx]);
			expect(node.direction).toBe(directions[idx]);
		});
	});
});
