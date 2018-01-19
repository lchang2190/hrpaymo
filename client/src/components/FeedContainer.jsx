import React from 'react';
import Feed from './Feed.jsx'
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';

const FeedContainer = (props) => {
  
  let orderedFeeds = [
    {
      displayLabel: 'mine',
      urlParam: 'mine',
      feedType: 'userFeed',
      data: props.userFeed
    },
    {
      displayLabel: 'public',
      urlParam: 'public',
      feedType: 'globalFeed',
      data: props.globalFeed
    }
  ];
  let buttons = [];
  let feedComponent;
  let viewToDisplay = props.view || orderedFeeds[0].urlParam 

  orderedFeeds.forEach((feed) => {
    
    buttons.push(
      <Link to={`${props.base || '/'}?view=${feed.urlParam}`} key={feed.urlParam}>
        <button className={viewToDisplay === feed.urlParam ? 'feed-buttons selected' : 'feed-buttons'} >
          {feed.displayLabel}
        </button>
      </Link>
    );

    if (viewToDisplay === feed.urlParam) {
      feedComponent = <Feed type={feed.feedType} transactions={feed.data} loadMoreFeed={props.loadMoreFeed} />
    }
  });

  return (
    <Paper className='feed-container'>
      <div className='feed-selections'>
        {buttons}
      </div>
      {feedComponent}
    </Paper>
  );
  
}

const mapStateToProps = state => {
  return {
    userId: state.userInfo.userId,
    globalFeed: state.globalFeed,
    userFeed: state.userFeed
  }
}

export default connect(mapStateToProps)(FeedContainer);

