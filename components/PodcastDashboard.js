import React, { useEffect, useState } from "react";
import { Box, Center, Flex, SimpleGrid, Text, Spacer } from "@chakra-ui/react";
import EpisodeCard from "./EpisodeCard";
import AllTags from "./AllTags";

export default function PodcastDashboard({ userId }) {
  const [episodes, setEpisodes] = useState(null);
  const [selectedEpisodeTag, setSelectedEpisodeTag] = useState(null);
  useEffect(() => {
    console.log("Going to get data now...");
    fetch(
      `https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev/episodes/${userId}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Here is your data..Take it.");
        setEpisodes(data["episodes"]);
      });
  }, [userId]);

  if (!episodes) {
    return null;
  }

  return (
    <Flex padding={16} minHeight={1200}>
      <AllTags
        tags={["private", "public"]}
        selectedTag={selectedEpisodeTag}
        setSelectedTag={setSelectedEpisodeTag}
      ></AllTags>
      <Spacer></Spacer>
      <Box paddingTop={12} minWidth={1200}>
        {episodes.length !== 0 ? (
          <SimpleGrid
            minChildWidth="480px"
            spacing={4}
            bg="#212529"
            minWidth="1600px"
            maxWidth="1500px"
          >
            {episodes &&
              episodes.map((episode) => {
                if (!selectedEpisodeTag) {
                  return (
                    <EpisodeCard
                      userId={userId}
                      episode={episode}
                    ></EpisodeCard>
                  );
                } else {
                  if (selectedEpisodeTag == "public") {
                    return (
                      episode.isPublic === "public" && (
                        <EpisodeCard
                          userId={userId}
                          episode={episode}
                        ></EpisodeCard>
                      )
                    );
                  } else {
                    return (
                      episode.isPublic !== "public" && (
                        <EpisodeCard
                          userId={userId}
                          episode={episode}
                        ></EpisodeCard>
                      )
                    );
                  }
                }
              })}
          </SimpleGrid>
        ) : (
          <Center paddingTop={36}>
            <Text fontSize="3xl">
              😜 You don't have any episodes. Create notes to automatically
              generate podcast episodes.
            </Text>
          </Center>
        )}
      </Box>
    </Flex>
  );
}
