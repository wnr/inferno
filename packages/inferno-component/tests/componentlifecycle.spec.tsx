import { render } from 'inferno';
import Component from 'inferno-component';
import { innerHTML } from 'inferno-utils';

describe('Component lifecycle', () => {
	let container;

	beforeEach(function() {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(function() {
		render(null, container);
		container.innerHTML = '';
		document.body.removeChild(container);
	});

	it('componentWillUpdate Should have nextProp in params and old variants in instance', () => {
		let callCount = 0;
		class Com extends Component<any, any> {
			public componentWillUpdate(nextProps, nextState) {
				callCount++;
				expect(this.props.value).toEqual(1);
				expect(nextProps.value).toEqual(2);
			}

			public render() {
				return (
					<div>{this.props.value}</div>
				);
			}
		}

		render(<Com value={1}/>, container);
		expect(innerHTML(container.innerHTML)).toEqual(innerHTML('<div>1</div>'));

		render(<Com value={2}/>, container);

		expect(callCount).toEqual(1);
		expect(innerHTML(container.innerHTML)).toEqual(innerHTML('<div>2</div>'));
	});

	it('shouldComponentUpdate Should have nextProp in params and old variants in instance', () => {
		let callCount = 0;
		class Com extends Component<any, any> {
			public shouldComponentUpdate(nextProps, nextState) {
				callCount++;
				expect(this.props.value).toEqual(1);
				expect(nextProps.value).toEqual(2);

				return true;
			}

			public render() {
				return (
					<div>{this.props.value}</div>
				);
			}
		}

		render(<Com value={1}/>, container);

		expect(innerHTML(container.innerHTML)).toEqual(innerHTML('<div>1</div>'));

		render(<Com value={2}/>, container);

		expect(callCount).toEqual(1);
		expect(innerHTML(container.innerHTML)).toEqual(innerHTML('<div>2</div>'));
	});

	it('Should not fail if componentDidUpdate is undefined #922', () => {
		let callCount = 0;
		let c: any = null;

		class Com extends Component<any, any> {
			public componentDidUpdate(nextProps, nextState) {
				callCount++;
				expect(this.props.value).toEqual(1);
				expect(nextProps.value).toEqual(2);

				return true;
			}

			public render() {
				return (
					<div>{this.props.value}</div>
				);
			}
		}

		// eslint-disable-next-line no-return-assign
		render(<Com ref={(inst) => c = inst} value={1}/>, container);

		c.componentDidUpdate = undefined;

		// eslint-disable-next-line no-return-assign
		render(<Com ref={(inst) => c = inst} value={2}/>, container);
	});
});
