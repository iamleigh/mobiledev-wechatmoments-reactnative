import { ITweet } from "../../../types";

interface getVisibleTweetsOptions {
	tweets: ITweet[],
	count: number
}

export const getVisibleTweets = ({tweets, count}: getVisibleTweetsOptions) => {
	return tweets.slice(0, count);
}
