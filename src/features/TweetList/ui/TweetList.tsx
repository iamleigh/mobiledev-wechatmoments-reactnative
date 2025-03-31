import React, {ReactElement, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';

import {BasicStyle, ITweet, RootState} from './../../../types';
import {Tweet} from './../../../features/Tweet/ui/Tweet';
import {useAppDispatch} from './../../../hooks';
import {fetchUserTweets} from './../../../features/TweetList/state/tweets.thunk';
import { getVisibleTweets } from '../utils/tweets.utils';

interface ITweetListProps {
  tweets: Array<ITweet>;
}

function TweetListComponent({tweets}: ITweetListProps): ReactElement {
  const dispatch = useAppDispatch();
  const tweetsCount = 5;
  const [visibleCount, setVisibleCount] = useState(tweetsCount);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserTweets('jsmith'));
  }, [dispatch]);

  const visibleTweets = getVisibleTweets({tweets: tweets, count: visibleCount});

  const onRefresh = () => {
	setRefreshing(true);
	console.log('freshh!!!');

	setTimeout(() => {
		console.log('refreshing the list');
		setVisibleCount(tweetsCount);
		setRefreshing(false)
	}, 2000);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleTweets}
		initialNumToRender={tweetsCount}
        renderItem={tweet => <Tweet tweet={tweet.item} />}
		keyExtractor={(_, index) => `tweet-${index}`}
		onEndReached={() => {
			if (visibleCount < tweets.length) {
				setVisibleCount(prev => prev + tweetsCount);
			}
		}}
		onEndReachedThreshold={0.3}
		refreshing={refreshing}
		onRefresh={onRefresh}
		ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
}

const mapStateToProps = (state: RootState) =>
  ({
    tweets: state.tweets.data,
  } as ITweetListProps);

export const TweetList = connect(mapStateToProps)(TweetListComponent);

const styles: Partial<BasicStyle> = StyleSheet.create<Partial<BasicStyle>>({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
