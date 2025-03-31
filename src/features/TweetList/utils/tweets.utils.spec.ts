import { mockTweets } from "../state/tweets.mock";
import { getVisibleTweets } from "./tweets.utils";

describe('getVisibleTweets', () => {
	it('should return first N tweets', () => {
		const visible = getVisibleTweets({tweets: mockTweets, count: 1});
		expect(visible.length).toBe(1);
		expect(visible[0]).toEqual(mockTweets[0]);
	});

	it('should return all if count exceeds length', () => {
		const visible = getVisibleTweets({tweets: mockTweets, count: 20});
		expect(visible.length).toBe(mockTweets.length);
	});

	it('should return empty array if list is empty', () => {
		const visible = getVisibleTweets({tweets: [], count: 5});
		expect(visible).toEqual([]);
	});
});
