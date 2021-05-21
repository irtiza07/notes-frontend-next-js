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
  SimpleGrid,
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
    <SimpleGrid
      minChildWidth="440px"
      spacing="100px"
      bg="#212529"
      minWidth="1600px"
      maxWidth="1500px"
      marginBottom={60}
    >
      {feedEpisodes.map((item) => {
        return <FeedItem item={item}></FeedItem>;
      })}
    </SimpleGrid>
  );
}
