import React, { useEffect, useState } from "react";
import { Box, Center, Text, Grid, GridItem, Spinner } from "@chakra-ui/react";
import EpisodeCard from "./EpisodeCard";
import AllTags from "./AllTags";

export default function PodcastDashboard({ userId }) {
  const [episodes, setEpisodes] = useState(null);
  const [selectedEpisodeTag, setSelectedEpisodeTag] = useState(null);
  useEffect(() => {
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
        setEpisodes(data["episodes"]);
      });
  }, [userId]);

  if (!episodes) {
    return null;
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <GridItem colSpan={1}>
        <AllTags
          tags={["private", "public"]}
          selectedTag={selectedEpisodeTag}
          setSelectedTag={setSelectedEpisodeTag}
        ></AllTags>
      </GridItem>
      <GridItem colSpan={4}>
        <Box paddingTop={12}>
          {episodes.length !== 0 ? (
            <Grid templateColumns="repeat(3, 1fr)" gap={10}>
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
            </Grid>
          ) : (
            <Center paddingTop={36}>
              <Text fontSize="3xl">
                😜 You don't have any episodes. Create notes to automatically
                generate podcast episodes.
              </Text>
            </Center>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
}
