import React, { useState, useEffect } from "react";
import { Box, Center, Grid } from "@chakra-ui/react";
import { CircleLoader } from "react-spinners";

import FeedItem from "../components/FeedItem";

export default function NewsFeed() {
  const [feedEpisodes, setFeedEpisodes] = useState(null);

  useEffect(() => {
    fetch(`https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev//feed`, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedEpisodes(data["feed_episodes"]);
      });
  }, []);

  if (!feedEpisodes) {
    return (
      <Box bg="#212529" minHeight={1500}>
        <Center paddingTop={300}>
          <CircleLoader color="#E53E3E" size={500}></CircleLoader>
        </Center>
      </Box>
    );
  }
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={36}>
      {feedEpisodes.map((item) => {
        return <FeedItem item={item}></FeedItem>;
      })}
    </Grid>
  );
}
