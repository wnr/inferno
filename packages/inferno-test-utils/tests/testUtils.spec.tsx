import { render } from 'inferno';
import Component from 'inferno-component';
import createClass from 'inferno-create-class';
import createElement from 'inferno-create-element';
import {
	findAllInRenderedTree,
	findAllInVNodeTree,
	findRenderedDOMElementWithClass,
	findRenderedDOMElementWithTag,
	findRenderedVNodeWithType,
	findVNodeWithType,
	isClassVNode,
	isClassVNodeOfType,
	isDOMElement,
	isDOMElementOfType,
	isDOMVNode,
	isDOMVNodeOfType,
	isFunctionalVNode,
	isFunctionalVNodeOfType,
	isRenderedClassComponent,
	isRenderedClassComponentOfType,
	isVNode,
	isVNodeOfType,
	renderIntoDocument,
	scryRenderedDOMElementsWithClass,
	scryRenderedDOMElementsWithTag,
	scryRenderedVNodesWithType,
	scryVNodesWithType
} from 'inferno-test-utils';


const checkVNodeKeys = (result) => {
	[
		'children',
		'className',
		'dom',
		'flags',
		'key',
		'ref',
		'props',
		'type'
	].forEach((key) => {
		expect(result).toHaveProperty(key);
	});
}

const createDOMElement = (tagName) => document.createElement(tagName);

const FunctionalComponent = function (props) {
	return createElement('div', props);
};

const AnotherFunctionalComponent = function (props) {
	return createElement('div', props);
};

const CreateClassComponent = createClass({
	render() {
		return createElement('div', this.props);
	}
});

const AnotherCreateClassComponent = createClass({
	render() {
		return createElement('div', this.props);
	}
});

class ExtendClassComponent extends Component<any, any> {
	render() {
		return createElement('div', this.props);
	}
}

class AnotherExtendClassComponent extends Component<any, any> {
	render() {
		return createElement('div', this.props);
	}
}

describe('Test Utils', () => {

	describe('isVNode', () => {

		it('should return true for VNodes', () => {
			expect(isVNode(createElement('div'))).toBeTruthy();
			expect(isVNode(createElement(CreateClassComponent))).toBeTruthy();
			expect(isVNode(createElement(ExtendClassComponent))).toBeTruthy();
			expect(isVNode(createElement(FunctionalComponent))).toBeTruthy();
			expect(isVNode(<CreateClassComponent/>)).toBeTruthy();
			expect(isVNode(<ExtendClassComponent/>)).toBeTruthy();
			expect(isVNode(<FunctionalComponent/>)).toBeTruthy();
			expect(isVNode(<div/>)).toBeTruthy();
		});

		it('should return false for non-VNodes', () => {
			expect(isVNode(CreateClassComponent)).toBeFalsy();
			expect(isVNode(ExtendClassComponent)).toBeFalsy();
			expect(isVNode(FunctionalComponent)).toBeFalsy();
			expect(isVNode(createDOMElement('div'))).toBeFalsy();
			expect(isVNode('foo')).toBeFalsy();
			expect(isVNode({})).toBeFalsy();
			expect(isVNode([])).toBeFalsy();
			expect(isVNode(10)).toBeFalsy();
			expect(isVNode(undefined)).toBeFalsy();
			expect(isVNode(null)).toBeFalsy();
		});
	});

	describe('isVNodeOfType', () => {

		it('should return true for VNodes with a specified type', () => {
			expect(isVNodeOfType(createElement('div'), 'div')).toBeTruthy();
			expect(isVNodeOfType(createElement(FunctionalComponent), FunctionalComponent)).toBeTruthy();
			expect(isVNodeOfType(createElement(CreateClassComponent), CreateClassComponent)).toBeTruthy();
			expect(isVNodeOfType(createElement(ExtendClassComponent), ExtendClassComponent)).toBeTruthy();
		});

		it('should return false for VNodes with a specified type', () => {
			expect(isVNodeOfType(createElement('div'), 'h1')).toBeFalsy();
			expect(isVNodeOfType(createElement(FunctionalComponent), CreateClassComponent)).toBeFalsy();
			expect(isVNodeOfType(createElement(CreateClassComponent), ExtendClassComponent)).toBeFalsy();
			expect(isVNodeOfType(createElement(ExtendClassComponent), FunctionalComponent)).toBeFalsy();
		});
	});

	describe('isDOMVNode', () => {

		it('should return true for VNodes of type string', () => {
			expect(isDOMVNode(createElement('div'))).toBeTruthy();
			expect(isDOMVNode(createElement('h1'))).toBeTruthy();
			expect(isDOMVNode(createElement('p'))).toBeTruthy();
		});

		it('should return false for VNodes of type function or class', () => {
			expect(isDOMVNode(createElement(CreateClassComponent))).toBeFalsy();
			expect(isDOMVNode(createElement(ExtendClassComponent))).toBeFalsy();
			expect(isDOMVNode(createElement(FunctionalComponent))).toBeFalsy();
		});
	});

	describe('isDOMVNodeOfType', () => {

		it('should return true for VNodes of specific string type', () => {
			expect(isDOMVNodeOfType(createElement('div'), 'div')).toBeTruthy();
			expect(isDOMVNodeOfType(createElement('h1'), 'h1')).toBeTruthy();
			expect(isDOMVNodeOfType(createElement('p'), 'p')).toBeTruthy();
		});

		it('should return false for VNodes of incorrect type', () => {
			expect(isDOMVNodeOfType(createElement('div'), 'foo')).toBeFalsy();
			expect(isDOMVNodeOfType(createElement('div'), {})).toBeFalsy();
			expect(isDOMVNodeOfType(createElement('div'), [])).toBeFalsy();
			expect(isDOMVNodeOfType(createElement('div'), 10)).toBeFalsy();
			expect(isDOMVNodeOfType(createElement('div'), undefined)).toBeFalsy();
			expect(isDOMVNodeOfType(createElement('div'), null)).toBeFalsy();
		});
	});

	describe('isFunctionalVNode', () => {

		it('should return true for VNodes of stateless function type', () => {
			expect(isFunctionalVNode(createElement(FunctionalComponent))).toBeTruthy();
		});

		it('should return false for VNodes of incorrect type', () => {
			expect(isFunctionalVNode(createElement(CreateClassComponent))).toBeFalsy();
			expect(isFunctionalVNode(createElement(ExtendClassComponent))).toBeFalsy();
			expect(isFunctionalVNode(createElement('div'))).toBeFalsy();
		});
	});

	describe('isFunctionalVNodeOfType', () => {

		it('should return true for VNodes of specific stateless function type', () => {
			expect(isFunctionalVNodeOfType(createElement(FunctionalComponent), FunctionalComponent)).toBeTruthy();
		});

		it('should return false for VNodes of incorrect type', () => {
			expect(isFunctionalVNodeOfType(createElement(FunctionalComponent), AnotherFunctionalComponent)).toBeFalsy();
			expect(isFunctionalVNodeOfType(createElement(FunctionalComponent), CreateClassComponent)).toBeFalsy();
			expect(isFunctionalVNodeOfType(createElement(FunctionalComponent), ExtendClassComponent)).toBeFalsy();
		});
	});

	describe('isClassVNode', () => {

		it('should return true for VNodes of class type', () => {
			expect(isClassVNode(createElement(CreateClassComponent))).toBeTruthy();
			expect(isClassVNode(createElement(ExtendClassComponent))).toBeTruthy();
		});

		it('should return false for VNodes of incorrect type', () => {
			expect(isClassVNode(createElement(FunctionalComponent))).toBeFalsy();
			expect(isClassVNode(createElement('div'))).toBeFalsy();
		});
	});

	describe('isClassVNodeOfType', () => {

		it('should return true for VNodes of specific class type', () => {
			expect(isClassVNodeOfType(createElement(CreateClassComponent), CreateClassComponent)).toBeTruthy();
			expect(isClassVNodeOfType(createElement(ExtendClassComponent), ExtendClassComponent)).toBeTruthy();
		});

		it('should return false for VNodes of incorrect type', () => {
			expect(isClassVNodeOfType(createElement(CreateClassComponent), AnotherCreateClassComponent)).toBeFalsy();
			expect(isClassVNodeOfType(createElement(CreateClassComponent), AnotherExtendClassComponent)).toBeFalsy();
			expect(isClassVNodeOfType(createElement(CreateClassComponent), FunctionalComponent)).toBeFalsy();

			expect(isClassVNodeOfType(createElement(ExtendClassComponent), AnotherCreateClassComponent)).toBeFalsy();
			expect(isClassVNodeOfType(createElement(ExtendClassComponent), AnotherExtendClassComponent)).toBeFalsy();
			expect(isClassVNodeOfType(createElement(ExtendClassComponent), FunctionalComponent)).toBeFalsy();
		});
	});

	describe('isDOMElement', () => {

		it('should return true for DOMElements', () => {
			expect(isDOMElement(createDOMElement('div'))).toBeTruthy();
			expect(isDOMElement(createDOMElement('h1'))).toBeTruthy();
			expect(isDOMElement(createDOMElement('p'))).toBeTruthy();
		});

		it('should return false for non-DOMElements', () => {
			expect(isDOMElement(createElement(CreateClassComponent))).toBeFalsy();
			expect(isDOMElement(createElement(ExtendClassComponent))).toBeFalsy();
			expect(isDOMElement(createElement(FunctionalComponent))).toBeFalsy();
			expect(isDOMElement(createElement('div'))).toBeFalsy();
			expect(isDOMElement(CreateClassComponent)).toBeFalsy();
			expect(isDOMElement(ExtendClassComponent)).toBeFalsy();
			expect(isDOMElement(FunctionalComponent)).toBeFalsy();
			expect(isDOMElement('div')).toBeFalsy();
			expect(isDOMElement(undefined)).toBeFalsy();
			expect(isDOMElement(null)).toBeFalsy();
			expect(isDOMElement({})).toBeFalsy();
			expect(isDOMElement([])).toBeFalsy();
			expect(isDOMElement(10)).toBeFalsy();
		});
	});

	describe('isDOMElementOfType', () => {

		it('should return true for DOMElements of specific type', () => {
			expect(isDOMElementOfType(createDOMElement('div'), 'div')).toBeTruthy();
			expect(isDOMElementOfType(createDOMElement('div'), 'DIV')).toBeTruthy();
			expect(isDOMElementOfType(createDOMElement('h1'), 'h1')).toBeTruthy();
			expect(isDOMElementOfType(createDOMElement('h1'), 'H1')).toBeTruthy();
			expect(isDOMElementOfType(createDOMElement('p'), 'p')).toBeTruthy();
			expect(isDOMElementOfType(createDOMElement('p'), 'P')).toBeTruthy();
		});

		it('should return false for DOMElements of incorrect type', () => {
			expect(isDOMElementOfType(createDOMElement('div'), 'foo')).toBeFalsy();
			expect(isDOMElementOfType(createDOMElement('div'), {})).toBeFalsy();
			expect(isDOMElementOfType(createDOMElement('div'), [])).toBeFalsy();
			expect(isDOMElementOfType(createDOMElement('div'), 10)).toBeFalsy();
			expect(isDOMElementOfType(createDOMElement('div'), undefined)).toBeFalsy();
			expect(isDOMElementOfType(createDOMElement('div'), null)).toBeFalsy();
		});
	});

	describe('isRenderedClassComponent', () => {

		const DOMVNode = createElement('div');
		const functionalVNode = createElement(FunctionalComponent);
		const createClassVNode = createElement(CreateClassComponent);
		const extendClassVNode = createElement(ExtendClassComponent);

		it('should return true for rendered Class Components', () => {
			expect(isRenderedClassComponent(
				render(createClassVNode, createDOMElement('div'))
			)).toBeTruthy();
			expect(isRenderedClassComponent(
				render(extendClassVNode, createDOMElement('div'))
			)).toBeTruthy();
		});

		it('should return false for non-rendered Class Components', () => {
			expect(isRenderedClassComponent(createClassVNode)).toBeFalsy();
			expect(isRenderedClassComponent(extendClassVNode)).toBeFalsy();
			expect(isRenderedClassComponent(
				render(functionalVNode, createDOMElement('div'))
			)).toBeFalsy();
			expect(isRenderedClassComponent(
				render(DOMVNode, createDOMElement('div'))
			)).toBeFalsy();
		});
	});

	describe('isRenderedClassComponentOfType', () => {

		const createClassVNode = createElement(CreateClassComponent);
		const extendClassVNode = createElement(ExtendClassComponent);

		it('should return true for rendered Class Components of specific type', () => {
			expect(isRenderedClassComponentOfType(
				render(createClassVNode, createDOMElement('div')),
				CreateClassComponent)).toBeTruthy();
			expect(isRenderedClassComponentOfType(
				render(extendClassVNode, createDOMElement('div')),
				ExtendClassComponent)).toBeTruthy();
		});

		it('should return false for rendered Class Components of incorrect type', () => {
			expect(isRenderedClassComponentOfType(
				render(createClassVNode, createDOMElement('div')),
				AnotherCreateClassComponent)).toBeFalsy();
			expect(isRenderedClassComponentOfType(
				render(createClassVNode, createDOMElement('div')),
				ExtendClassComponent)).toBeFalsy();
			expect(isRenderedClassComponentOfType(
				render(createClassVNode, createDOMElement('div')),
				FunctionalComponent)).toBeFalsy();
			expect(isRenderedClassComponentOfType(
				render(createClassVNode, createDOMElement('div')),
				'div')).toBeFalsy();

			expect(isRenderedClassComponentOfType(
				render(extendClassVNode, createDOMElement('div')),
				AnotherExtendClassComponent)).toBeFalsy();
			expect(isRenderedClassComponentOfType(
				render(extendClassVNode, createDOMElement('div')),
				CreateClassComponent)).toBeFalsy();
			expect(isRenderedClassComponentOfType(
				render(extendClassVNode, createDOMElement('div')),
				FunctionalComponent)).toBeFalsy();
			expect(isRenderedClassComponentOfType(
				render(extendClassVNode, createDOMElement('div')),
				'div')).toBeFalsy();
		});
	});

	describe('renderIntoDocument', () => {

		it('should return a rendered class component', () => {
			expect(isRenderedClassComponent(
				renderIntoDocument(createElement('div'))
			)).toBeTruthy();
			expect(isRenderedClassComponent(
				renderIntoDocument(createElement(FunctionalComponent))
			)).toBeTruthy();
			expect(isRenderedClassComponent(
				renderIntoDocument(createElement(CreateClassComponent))
			)).toBeTruthy();
			expect(isRenderedClassComponent(
				renderIntoDocument(createElement(ExtendClassComponent))
			)).toBeTruthy();
		});
	});

	describe('findAllInRenderedTree', () => {

		const tree = renderIntoDocument(
			<section className="outer">
				<FunctionalComponent/>
			</section>
		);

		it('should throw an error when not passed a rendered class component', () => {
			const errorRegex = /findAllInRenderedTree/;
			const predicate = (vNode) => {
				return true;
			};
			const testValue = (value) => {
				expect(() => {
					findAllInRenderedTree(value, predicate);
				}).toThrow(errorRegex);
			};
			testValue(createElement(CreateClassComponent));
			testValue(createElement(ExtendClassComponent));
			testValue(createElement(FunctionalComponent));
			testValue(createElement('div'));
			testValue(CreateClassComponent);
			testValue(ExtendClassComponent);
			testValue(FunctionalComponent);
			testValue(createDOMElement('div'));
			testValue(undefined);
			testValue(null);
			testValue('foo');
			testValue({});
			testValue([]);
			testValue(10);
		});

		it('should call predicate for each VNode instance in a rendered tree', () => {
			const predicate = jest.fn();
			expect(predicate).not.toHaveBeenCalled();
			
			findAllInRenderedTree(tree, predicate);
			// 0: section
			// 1: FunctionalComponent
			// 2: div
			expect(predicate).toHaveBeenCalledTimes(3);
		});

		it('should call predicate in the correct order', () => {
			const types: any[] = [];
			findAllInRenderedTree(tree, ({ type }) => {
				types.push(type)
				return true;
			});
			expect(types).toEqual([ 'section', FunctionalComponent, 'div' ]);
		});

		it('should work with interpolated text', () => {
			const predicate = jest.fn();

			const Hello = ({ who }) => (<div>Hello, {who}!</div>);

			const treeWithText = renderIntoDocument(<Hello who="world"/>);
			expect(predicate).not.toHaveBeenCalled();
			
			findAllInRenderedTree(treeWithText, predicate);
			
			expect(predicate).toHaveBeenCalledTimes(5);
		});
	});

	describe('findAllInVNodeTree', () => {

		const tree = (
			<section className="outer">
				<FunctionalComponent/>
			</section>
		);

		it('should throw an error when not passed a VNode', () => {
			const errorRegex = /findAllInVNodeTree/;
			const predicate = (vNode) => {
				return true;
			};
			const testValue = (value) => {
				expect(() => {
					findAllInVNodeTree(value, predicate);
				}).toThrow(errorRegex);
			};
			testValue(renderIntoDocument(<div/>));
			testValue(CreateClassComponent);
			testValue(ExtendClassComponent);
			testValue(FunctionalComponent);
			testValue(createDOMElement('div'));
			testValue(undefined);
			testValue(null);
			testValue('foo');
			testValue({});
			testValue([]);
			testValue(10);
		});

		it('should call predicate in the correct order', () => {
			const types: any[] = [];
			findAllInVNodeTree(tree, ({ type }) => {
				types.push(type);
				return !!type;
			});
			expect(types).toEqual([ 'section', FunctionalComponent ]);
		});
	});

	describe('scryRenderedDOMElementsWithClass', () => {

		const tree = renderIntoDocument(
			<div className="level-1 one">
				<div className="level-2 one">
					<div className="level-3 one"/>
				</div>
				<div className="level-2 two">
					<span className="level-3 two"/>
				</div>
			</div>
		);

		it('should return an array of matched DOM elements', () => {
			const result1 = scryRenderedDOMElementsWithClass(tree, 'one');
			expect(result1).toBeInstanceOf(Array);
			expect(result1).toHaveLength(3);
			result1.forEach((result) => {
				expect(result).toBeInstanceOf(window.HTMLDivElement);
			});

			const result2 = scryRenderedDOMElementsWithClass(tree, 'two');
			expect(result2).toBeInstanceOf(Array);
			expect(result2).toHaveLength(2);
			expect(result2[ 0 ]).toBeInstanceOf(window.HTMLDivElement);
			expect(result2[ 1 ]).toBeInstanceOf(window.HTMLSpanElement);

			const result3 = scryRenderedDOMElementsWithClass(tree, 'three');
			expect(result3).toBeInstanceOf(Array);
			expect(result3).toHaveLength(0);
		});

		it('should accept a space separated string of class names', () => {
			const result1 = scryRenderedDOMElementsWithClass(tree, 'level-2');
			expect(result1).toBeInstanceOf(Array);
			expect(result1).toHaveLength(2);

			const result2 = scryRenderedDOMElementsWithClass(tree, 'level-2 one');
			expect(result2).toBeInstanceOf(Array);
			expect(result2).toHaveLength(1);
		});

		it('should accept an array of class names', () => {
			const result = scryRenderedDOMElementsWithClass(tree, [ 'level-2', 'one' ]);
			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
		});
	});

	describe('scryRenderedDOMElementsWithTag', () => {

		const tree = renderIntoDocument(
			<div>
				<header>
					<h1>Hello</h1>
				</header>
				<section>
					<h1>Hello Again</h1>
					<p>Paragraph 1</p>
					<p>Paragraph 2</p>
					<p>Paragraph 3</p>
				</section>
			</div>
		);

		it('should return an array of matched DOM elements', () => {
			const testValue = (tagName, length, instance) => {
				const result = scryRenderedDOMElementsWithTag(tree, tagName);
				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(length);
				result.forEach((item) => {
					expect(item).toBeInstanceOf(instance);
				});
			};
			testValue('div', 1, window.HTMLDivElement);
			testValue('h1', 2, window.HTMLHeadingElement);
			testValue('p', 3, window.HTMLParagraphElement);
			testValue('span', 0, window.HTMLSpanElement);
		});
	});

	describe('scryRenderedVNodesWithType', () => {

		const tree = renderIntoDocument(
			<div>
				<FunctionalComponent/>
				<FunctionalComponent/>
				<CreateClassComponent/>
				<CreateClassComponent/>
				<ExtendClassComponent/>
				<ExtendClassComponent/>
			</div>
		);

		it('should return an array of matched VNodes', () => {
			const testValue = (type, length) => {
				const result = scryRenderedVNodesWithType(tree, type);
				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(length);
				result.forEach((item) => {
					expect(item).toBeInstanceOf(Object);
					checkVNodeKeys(item);
					expect(isVNode(item)).toBeTruthy();
				});
			};
			testValue('p', 0);
			testValue('div', 7); // Outer div + each rendered component div
			testValue(FunctionalComponent, 2);
			testValue(CreateClassComponent, 2);
			testValue(ExtendClassComponent, 2);
			testValue(AnotherFunctionalComponent, 0);
		});
	});

	describe('scryVNodesWithType', () => {

		const tree = (
			<div>
				<FunctionalComponent/>
				<FunctionalComponent/>
				<CreateClassComponent/>
				<CreateClassComponent/>
				<ExtendClassComponent/>
				<ExtendClassComponent/>
			</div>
		);

		it('should return an array of matched VNodes', () => {
			const testValue = (type, length) => {
				const result = scryVNodesWithType(tree, type);
				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(length);
				result.forEach((item) => {
					expect(item).toBeInstanceOf(Object);
					checkVNodeKeys(item);
					expect(isVNode(item)).toBeTruthy();
				});
			};
			testValue('p', 0);
			testValue('div', 1); // Just the outer div
			testValue(FunctionalComponent, 2);
			testValue(CreateClassComponent, 2);
			testValue(ExtendClassComponent, 2);
			testValue(AnotherFunctionalComponent, 0);
		});
	});

	describe('findRenderedDOMElementWithClass', () => {

		const tree = renderIntoDocument(
			<div className="level-1 one">
				<div className="level-2 one">
					<div className="level-3 one"/>
				</div>
				<div className="level-2 two">
					<span className="level-3 two"/>
				</div>
			</div>
		);

		it('should throw an error when more than one result is found #1', () => {
			const errorRegex = /Did not find exactly one match/;
			const testValue = (classNames) => {
				expect(() => {
					findRenderedDOMElementWithClass(tree, classNames);
				}).toThrow(errorRegex);
			};
			testValue('level-2');
			testValue('level-3');
		});

		it('should return a matched DOM element', () => {
			const testValue = (classNames, instance) => {
				const result = findRenderedDOMElementWithClass(tree, classNames);
				expect(result).toBeInstanceOf(instance);
			};
			testValue('level-1', window.HTMLDivElement);
			testValue('level-2 one', window.HTMLDivElement);
			testValue('level-3 two', window.HTMLSpanElement);
		});
	});

	describe('findRenderedDOMElementWithTag', () => {

		const tree = renderIntoDocument(
			<div>
				<header>
					<h1>Head1</h1>
					<span>Hello</span>
				</header>
				<section>
					<h1>Hello Again</h1>
					<p>Paragraph 1</p>
					<p>Paragraph 2</p>
					<p>Paragraph 3</p>
					<a>test</a>
				</section>
			</div>
		);

		it('should throw an error when more than one result is found #2', () => {
			const errorRegex = /Did not find exactly one match/;
			const testValue = (tagName) => {
				expect(() => {
					findRenderedDOMElementWithTag(tree, tagName);
				}).toThrow(errorRegex);
			};
			testValue('h1');
			testValue('p');
		});

		it('should return a matched DOM element', () => {
			const testValue = (tagName, instance) => {
				const result = findRenderedDOMElementWithTag(tree, tagName);
				expect(result).toBeInstanceOf(instance);
			};
			testValue('div', window.HTMLDivElement);
			testValue('span', window.HTMLSpanElement);
			testValue('a', window.HTMLAnchorElement);
		});
	});

	describe('findRenderedVNodeWithType', () => {

		const tree = renderIntoDocument(
			<div>
				<h1>Hello</h1>
				<FunctionalComponent/>
				<FunctionalComponent/>
				<CreateClassComponent/>
				<ExtendClassComponent/>
			</div>
		);

		it('should throw an error when more than one result is found #3', () => {
			const errorRegex = /Did not find exactly one match/;
			const testValue = (type) => {
				expect(() => {
					findRenderedVNodeWithType(tree, type);
				}).toThrow(errorRegex);
			};
			testValue('div');
			testValue(FunctionalComponent);
		});

		it('should return a matched VNode #1', () => {
			const testValue = (type) => {
				const result = findRenderedVNodeWithType(tree, type);
				expect(result).toBeInstanceOf(Object);
				checkVNodeKeys(result);
				expect(isVNode(result)).toBeTruthy();
				expect(result.type).toEqual(type);
			};
			testValue('h1');
			testValue(CreateClassComponent);
			testValue(ExtendClassComponent);
		});
	});

	describe('findVNodeWithType', () => {

		const tree = (
			<div>
				<div>
					<h1>Hello</h1>
				</div>
				<FunctionalComponent/>
				<FunctionalComponent/>
				<CreateClassComponent/>
				<ExtendClassComponent/>
			</div>
		);

		it('should throw an error when more than one result is found #4', () => {
			const errorRegex = /Did not find exactly one match/;
			const testValue = (type) => {
				expect(() => {
					findVNodeWithType(tree, type);
				}).toThrow(errorRegex);
			};
			testValue('div');
			testValue(FunctionalComponent);
		});

		it('should return a matched VNode #2', () => {
			const testValue = (type) => {
				const result = findVNodeWithType(tree, type);
				expect(result).toBeInstanceOf(Object);
				checkVNodeKeys(result);
				expect(isVNode(result)).toBeTruthy();
				expect(result.type).toEqual(type);
			};
			testValue('h1');
			testValue(CreateClassComponent);
			testValue(ExtendClassComponent);
		});
	});
});
