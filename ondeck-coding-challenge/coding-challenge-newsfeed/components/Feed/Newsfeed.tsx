import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { perPage } from '../../config';
import Feed from './Feed';

const ALL_EVENTS_QUERY = gql`
  query events($filter: String!, $limit: Int!, $offset: Int!) {
    events(filter: $filter, limit: $limit, offset: $offset) {
      id
      ... on User {
        name
        bio
        fellowship
        avatar_url
        projects {
          id
          name
          icon_url
        }
      }
      ... on Project {
        name
        description
        icon_url
        users {
          id
          name
          avatar_url
        }
      }
      ... on Announcement {
        fellowship
        title
        body
      }
    }
  }
`;

export default function Newsfeed({
  fellowship,
  page,
  pagination,
  setFeedData,
  feedData,
}) {
  const { data, error, loading } = useQuery(ALL_EVENTS_QUERY, {
    variables: {
      filter: fellowship,
      offset: page * perPage - perPage,
      limit: perPage,
    },
  });
  useEffect(() => {
    if (pagination) {
      // If we are using pagination, set completely replace the old data
      setFeedData({ data: data?.events, newData: true });
    } else {
      if (data?.events.length > 0) {
        // If we are using infinite scrolling, concatenate the old data with the new data
        const newFeedData = [...feedData.data, ...data?.events];
        setFeedData({ data: newFeedData, newData: true });
      } else {
        // If there is no new data, we set "newData" to false
        // This is so that the page number does not continue incrementing every time we hit the bottom
        setFeedData({ data: feedData.data, newData: false });
      }
    }
  }, [data?.events]);

  useEffect(() => {
    if (!pagination) {
      // Empty the data when changing feeds
      setFeedData({
        data: [],
        newData: data?.events ? true : false,
      });
    }
  }, [fellowship]);
  return <Feed events={feedData.data} />;
}
