import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import FeedItem from "../components/FeedItem";

export default function NewsFeed() {
  const [feedEpisodes, setFeedEpisodes] = useState([]);

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
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={36}>
      {feedEpisodes.map((item) => {
        return <FeedItem item={item}></FeedItem>;
      })}
    </Grid>
  );
}
