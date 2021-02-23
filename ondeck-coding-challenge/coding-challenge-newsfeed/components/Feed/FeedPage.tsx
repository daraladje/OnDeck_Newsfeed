import Head from 'next/head';
import Layout from '../Layout';
import Newsfeed from './Newsfeed';
import Options from './Options';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import styled from 'styled-components';

// Global Variables to track in the scroll event listener
let pageNumber;
let newData;

export default function FeedPage() {
  // Used for SQL query limit and offset
  const [page, setPage] = useState(parseInt(1));
  const [fellowship, setFellowship] = useState('All');
  // Pagination vs. Infinite Scrolling
  const [pagination, setPagination] = useState(true);
  // Feed data and whether there is newData appended (only used in Infinite Scrolling)
  const [feedData, setFeedData] = useState({
    data: [],
    newData: true,
  });

  // Resets page #  when changing fellowship feeds
  useEffect(() => {
    pageNumber = 1;
    setPage(pageNumber);
  }, [fellowship]);

  useEffect(() => {
    // Detect when user has reached the bottom of the page, increment page counter
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        newData
      ) {
        pageNumber++;
        setPage(pageNumber);
      }
    };
    if (!pagination) {
      pageNumber = page;
      window.addEventListener('scroll', onScroll);
    } else {
      window.removeEventListener('scroll', onScroll);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [pagination]);
  newData = feedData.newData;

  return (
    <Layout setFellowship={setFellowship}>
      <Head>
        <title>The Feed</title>
      </Head>
      <Options setFellowship={setFellowship} />
      {(page == 1 || !pagination) && (
        <ControllerStyle>
          <FormControlLabel
            control={
              <Switch
                checked={pagination}
                onChange={(event) => {
                  setPagination(!pagination);
                  setPage(1);
                }}
                color="primary"
              />
            }
            label="Pagination"
          />
        </ControllerStyle>
      )}
      <Newsfeed
        fellowship={fellowship}
        page={page || 1}
        pagination={pagination}
        setFeedData={setFeedData}
        feedData={feedData}
      />
      {pagination && (
        <Pagination
          fellowship={fellowship}
          page={page || 1}
          setPage={setPage}
        />
      )}
    </Layout>
  );
}

const ControllerStyle = styled.div`
  margin-left: auto;
`;
