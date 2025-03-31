import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";

// 🔧 Mocks para aislar el test
jest.mock('../../Header/ui/Header', () => ({
	Header: () => <></>,
}));

jest.mock('../../TweetList/ui/TweetList', () => ({
	TweetList: () => <></>,
}));


describe('Home', () => {
	it('Should render component', () => {
		const component = renderer.create(<Home />);
		const containerElement = component.root.findByProps({
			testID: 'home-container',
		});

		expect(containerElement).toBeTruthy();
	});
});
