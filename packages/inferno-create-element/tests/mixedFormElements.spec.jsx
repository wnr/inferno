
import { render } from 'inferno';
import { innerHTML } from 'inferno-utils';

describe('HTML Form Elements', () => {
	let container;

	beforeEach(function () {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(function () {
		render(null, container);
		container.innerHTML = '';
		document.body.removeChild(container);
	});

	describe('Textarea - defaultValue', () => {
		it('Should have value as defaultValue when actual value is null', () => {
			const expectedTextArea = document.createElement('textarea');
			expectedTextArea.value = 'Hey Inferno';

			render(<textarea defaultValue="Hey Inferno" value={null}/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('Hey Inferno');
		});

		it('Should have value as defaultValue when actual value is undefined', () => {
			const expectedTextArea = document.createElement('textarea');
			expectedTextArea.value = 'Hey Inferno';

			render(<textarea defaultValue="Hey Inferno"/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('Hey Inferno');
		});

		it('Should not use defaultValue when actual value is empty string', () => {
			const expectedTextArea = document.createElement('textarea');

			render(<textarea defaultValue="Hey Inferno" value=""/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('');
		});

		it('Should not use defaultValue when actual value is number', () => {
			const expectedTextArea = document.createElement('textarea');
			expectedTextArea.value = '1';

			render(<textarea defaultValue="Hey Inferno" value={1}/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('1');
		});

		it('Should not use defaultValue when actual value is object', () => {
			const expectedTextArea = document.createElement('textarea');
			expectedTextArea.value = '[object Object]';

			render(<textarea defaultValue="Hey Inferno" value={{ a: 1 }}/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('[object Object]');
		});

		it('Should have false as string when given as defaultValue', () => {
			const expectedTextArea = document.createElement('textarea');
			expectedTextArea.value = 'false';

			render(<textarea defaultValue={false}/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('false');
		});
	});

	describe('Input - defaultValue', () => {
		it('Should have value as defaultValue when actual value is null', () => {
			const expectedInput = document.createElement('input');
			expectedInput.defaultValue = 'Hey Inferno';

			render(<input defaultValue="Hey Inferno" value={null}/>, container);

			expect(container.innerHTML).toEqual(expectedInput.outerHTML);
			expect(container.firstChild.value).toEqual('Hey Inferno');
		});

		it('Should have value as defaultValue when actual value is undefined', () => {
			const expectedInput = document.createElement('input');
			expectedInput.defaultValue = 'Hey Inferno';

			render(<input defaultValue="Hey Inferno"/>, container);
			expect(container.innerHTML).toEqual(expectedInput.outerHTML);
			expect(container.firstChild.value).toEqual('Hey Inferno');
		});

		it('Should not use defaultValue when actual value is empty string', () => {
			const expectedInput = document.createElement('input');
			expectedInput.value = '';

			render(<input defaultValue="Hey Inferno" value=""/>, container);
			expect(container.innerHTML).toEqual(expectedInput.outerHTML);
			expect(container.firstChild.value).toEqual('');
		});

		it('Should not use defaultValue when actual value is number', () => {
			const expectedInput = document.createElement('input');
			expectedInput.value = '1';

			render(<input defaultValue="Hey Inferno" value={1}/>, container);
			expect(container.innerHTML).toEqual(expectedInput.outerHTML);
			expect(container.firstChild.value).toEqual('1');
		});

		it('Should not use defaultValue when actual value is object', () => {
			const expectedInput = document.createElement('input');
			expectedInput.value = '[object Object]';

			render(<input defaultValue="Hey Inferno" value={{ a: 1 }}/>, container);
			expect(container.innerHTML).toEqual(expectedInput.outerHTML);
			expect(container.firstChild.value).toEqual('[object Object]');
		});

		it('Should be possible to create input with type color', () => {
			render(<input type="color"/>, container);
			expect(container.firstChild.getAttribute('type')).toEqual('color');
		});

		it('Should be possible to create input with type range', () => {
			function change() {
			}

			render(
				<input
					min={0}
					max={255}
					value={75}
					onChange={change}
					type="range"
				/>, container);
			expect(container.firstChild.getAttribute('type')).toEqual('range');
			expect(container.firstChild.value).toEqual('75');

			render(
				<input
					min={0}
					max={255}
					value={11}
					onChange={change}
					type="range"
				/>, container);

			container.firstChild.oninput({}); // causes exception
			expect(container.firstChild.getAttribute('type')).toEqual('range');
			expect(container.firstChild.value).toEqual('11');
		});
	});

	describe('After external change', () => {
		it('Should update input check property', () => {
			render(<input type="checkbox" checked={true}/>, container);
			expect(container.innerHTML).toEqual(innerHTML('<input type="checkbox">'));
			expect(container.firstChild.checked).toEqual(true);

			//
			// Exernal change verification
			//

			const input = container.querySelector('input');
			input.checked = false;
			expect(container.innerHTML).toEqual(innerHTML('<input type="checkbox">'));
			expect(container.firstChild.checked).toEqual(false);

			//
			// New Render
			//

			render(<input type="checkbox" checked={true}/>, container);
			expect(container.innerHTML).toEqual(innerHTML('<input type="checkbox">'));
			expect(container.firstChild.checked).toEqual(true);
		});

		it('Should update textarea value', () => {
			const expectedTextArea = document.createElement('textarea');
			expectedTextArea.value = 'Hey People';

			render(<textarea value="Hey People"/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('Hey People');

			//
			// Exernal change verification
			//

			const input = container.querySelector('textarea');
			input.value = 'Inferno is cool';
			expect(container.innerHTML).toEqual(input.outerHTML);
			expect(container.firstChild.value).toEqual('Inferno is cool');

			//
			// New Render
			//

			render(<textarea value="Hey People"/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('Hey People');

			//
			// New Render, new value
			//

			expectedTextArea.value = 'Hey People again';

			render(<textarea value="Hey People again"/>, container);
			expect(container.innerHTML).toEqual(expectedTextArea.outerHTML);
			expect(container.firstChild.value).toEqual('Hey People again');
		});

		it('Should update text input value', () => {
			render(<input type="text" value="Hey People"/>, container);
			expect(container.innerHTML).toEqual(innerHTML('<input type="text">'));
			expect(container.firstChild.value).toEqual('Hey People');

			//
			// Exernal change verification
			//

			const input = container.querySelector('input');
			input.value = 'Inferno is cool';
			expect(container.innerHTML).toEqual(innerHTML('<input type="text">'));
			expect(container.firstChild.value).toEqual('Inferno is cool');

			//
			// New Render
			//

			render(<input type="text" value="Hey People"/>, container);
			expect(container.innerHTML).toEqual(innerHTML('<input type="text">'));
			expect(container.firstChild.value).toEqual('Hey People');

			//
			// New Render, new value
			//

			render(<input type="text" value="Hey People again"/>, container);
			expect(container.innerHTML).toEqual(innerHTML('<input type="text">'));
			expect(container.firstChild.value).toEqual('Hey People again');
		});

		it('Should update radio button', () => {
			render(
				<div>
					<input type="radio" name="gender" value="male" checked/> Male
					<input type="radio" name="gender" value="female"/> Female
					<input type="radio" name="gender" value="other"/> Other
				</div>, container);

			expect(container.firstChild.firstChild.value).toEqual('male');
			expect(container.firstChild.firstChild.checked).toEqual(true);

			//
			// Exernal change verification
			//

			const radiobutton = container.querySelector('input');
			radiobutton.checked = false;
			expect(container.firstChild.firstChild.checked).toEqual(false);

			//
			// New Render
			//

			render(
				<div>
					<input type="radio" name="gender" value="male" checked/> Male
					<input type="radio" name="gender" value="female"/> Female
					<input type="radio" name="gender" value="other"/> Other
				</div>, container);

			expect(container.firstChild.firstChild.value).toEqual('male');
			expect(container.firstChild.firstChild.checked).toEqual(true, 'this fails');

			//
			// New Render, new value
			//

			render(
				<div>
					<input type="radio" name="gender" value="male"/> Male
					<input type="radio" name="gender" checked value="female"/> Female
					<input type="radio" name="gender" value="other"/> Other
				</div>, container);

			expect(container.firstChild.firstChild.value).toEqual('male');
			expect(container.firstChild.firstChild.checked).toEqual(false);
			expect(container.firstChild.children[ 1 ].value).toEqual('female');
			expect(container.firstChild.children[ 1 ].checked).toEqual(true);
		});

		it('Should not trigger onClick twice when using synthetic onClick on radio', () => {
			const spy1 = sinon.spy();
			const spy2 = sinon.spy();
			const spy3 = sinon.spy();

			render(
				<div>
					<input onClick={spy1} type="radio" name="gender" value="male" checked={false}/>
					<input onClick={spy2} type="radio" name="gender" value="female" checked={true}/>
					<input onClick={spy3} type="radio" id="test" name="gender" value="other" checked={false}/>
				</div>, container);


			expect(container.firstChild.childNodes[ 1 ].checked).toEqual(true);

			//
			// Exernal change verification
			//

			let radiobutton = container.querySelector('#test');
			radiobutton.click();
			expect(radiobutton.checked).toEqual(true);

			expect(spy1.callCount).toEqual(0);
			expect(spy2.callCount).toEqual(0);
			expect(spy3.callCount).toEqual(1);

			let node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(false);
			expect(node.childNodes[ 1 ].checked).toEqual(false);
			expect(node.childNodes[ 2 ].checked).toEqual(true);

			//
			// New Render
			//

			render(
				<div>
					<input onClick={spy1} type="radio" name="gender" value="male" checked={true}/>
					<input onClick={spy2} type="radio" name="gender" value="female" checked={false}/>
					<input onClick={spy3} type="radio" name="gender" value="other" checked={false}/>
				</div>, container);

			expect(spy1.callCount).toEqual(0);
			expect(spy2.callCount).toEqual(0);
			expect(spy3.callCount).toEqual(1);

			node = container.firstChild;

			// Change to first being checked
			expect(node.childNodes[ 0 ].checked).toEqual(true);
			expect(node.childNodes[ 1 ].checked).toEqual(false);
			expect(node.childNodes[ 2 ].checked).toEqual(false);

			//
			// New Render, new value
			//

			render(
				<div>
					<input onClick={spy1} type="radio" name="gender" checked={false} value="male"/>
					<input onClick={spy2} type="radio" name="gender" checked={false} value="female"/>
					<input onClick={spy3} type="radio" name="gender" checked={false} value="other"/>
				</div>, container);

			expect(spy1.callCount).toEqual(0);
			expect(spy2.callCount).toEqual(0);
			expect(spy3.callCount).toEqual(1);

			node = container.firstChild;

			// Change to first being checked
			expect(node.childNodes[ 0 ].checked).toEqual(false);
			expect(node.childNodes[ 1 ].checked).toEqual(false);
			expect(node.childNodes[ 2 ].checked).toEqual(false);


			render(
				<div>
					<input onClick={spy1} type="radio" id="test" name="gender" checked={false} value="male"/>
					<input onClick={spy2} type="radio" name="gender" checked={false} value="female"/>
					<input onClick={spy3} type="radio" name="gender" checked={false} value="other"/>
				</div>, container);

			expect(spy1.callCount).toEqual(0);
			expect(spy2.callCount).toEqual(0);
			expect(spy3.callCount).toEqual(1);

			radiobutton = container.querySelector('#test');

			radiobutton.click();

			node = container.firstChild;

			// Change to first being checked
			expect(node.childNodes[ 0 ].checked).toEqual(true);
			expect(node.childNodes[ 1 ].checked).toEqual(false);
			expect(node.childNodes[ 2 ].checked).toEqual(false);

			expect(spy1.callCount).toEqual(1);
			expect(spy2.callCount).toEqual(0);
			expect(spy3.callCount).toEqual(1);

			render(
				<div>
					<input onClick={spy1} type="radio" id="test" name="gender" checked={true} value="male"/>
					<input onClick={spy2} type="radio" name="gender" checked={false} value="female"/>
					<input onClick={spy3} type="radio" name="gender" checked={false} value="other"/>
				</div>, container);

			expect(node.childNodes[ 0 ].checked).toEqual(true);
			expect(node.childNodes[ 1 ].checked).toEqual(false);
			expect(node.childNodes[ 2 ].checked).toEqual(false);
		});


		it('Should change others radio inputs should have single one checked', () => {
			render(
				<div>
					<input type="radio" name="gender" value="male" checked={false}/>
					<input type="radio" name="gender" value="female" checked={true}/>
					<input type="radio" id="test" name="gender" value="other" checked={false}/>
				</div>, container);

			let node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(false);
			expect(node.childNodes[ 1 ].checked).toEqual(true);
			expect(node.childNodes[ 2 ].checked).toEqual(false);

			render(
				<div>
					<input type="radio" name="gender" value="male" checked={true}/>
					<input type="radio" name="gender" value="female" checked={false}/>
					<input type="radio" id="test" name="gender" value="other" checked={false}/>
				</div>, container);

			node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(true);
			expect(node.childNodes[ 1 ].checked).toEqual(false);
			expect(node.childNodes[ 2 ].checked).toEqual(false);

			render(
				<div>
					<input type="radio" name="gender" value="female" checked={false}/>
					<input type="radio" id="test" name="gender" value="other" checked={false}/>
				</div>, container);

			node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(false);
			expect(node.childNodes[ 1 ].checked).toEqual(false);

			render(
				<div>
					<input type="radio" name="gender" value="female" checked={false}/>
					<input type="radio" id="test" name="gender" value="other" checked={true}/>
				</div>, container);

			node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(false);
			expect(node.childNodes[ 1 ].checked).toEqual(true);

			render(
				<div>
					<input type="radio" name="gender" value="female" checked={false}/>
					<input type="radio" id="test" name="gender" value="other" checked={true}/>
					<input type="radio" name="gender" value="female" checked={false}/>
					<input type="radio" name="gender" value="dqw" checked={false}/>
				</div>, container);

			node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(false);
			expect(node.childNodes[ 1 ].checked).toEqual(true);
			expect(node.childNodes[ 2 ].checked).toEqual(false);
			expect(node.childNodes[ 3 ].checked).toEqual(false);


			render(
				<div>
					<input type="radio" name="gender" value="female" checked={false}/>
				</div>, container);

			node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(false);

			render(
				<div>
					<input type="radio" name="gender" value="female" checked={true}/>
				</div>, container);

			node = container.firstChild;

			expect(node.childNodes[ 0 ].checked).toEqual(true);
		});
	});
});
