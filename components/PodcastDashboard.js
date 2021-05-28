import React, { useEffect, useState } from "react";
import { Box, Center, Text, Grid, GridItem, Spinner } from "@chakra-ui/react";
import EpisodeCard from "./EpisodeCard";
import AllTags from "./AllTags";
import AddPodcast from "./AddPodcast";
import { useCookies } from "react-cookie";

import "intro.js/introjs.css";
import { Steps, Hints } from "intro.js-react";

const steps = [
  {
    element: ".mainTabs",
    intro:
      "We will automatically create podcast episodes from your notes. Each episode contains all the notes associated with a given tag. So you will have one episode per tag over here.",
    position: "bottom",
  },
  {
    element: ".addPodcast",
    intro:
      "Click the copy icon to import this to your favorite podcast player.",
    position: "bottom",
  },
  {
    element: ".noteTags",
    intro:
      "Your podcast episodes can be private or public. By default all your episodes are private and only you can listen to them. When you share an episode, it becomes public and the rest of the world can listen to it in their newsfeed.",
  },
  {
    element: ".bringOnboarding",
    intro: "Whenever you are stuck, click here for help.",
  },
];

const podcastsOnboardingCookie = "seenPodcastsOnboarding";

export default function PodcastDashboard({ userId, podcastUrl }) {
  const [episodes, setEpisodes] = useState(null);
  const [selectedEpisodeTag, setSelectedEpisodeTag] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    podcastsOnboardingCookie,
  ]);

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

  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <Steps
        enabled={!(podcastsOnboardingCookie in cookies)}
        steps={steps}
        initialStep={0}
        onExit={() => console.log("Exit early..")}
        onComplete={() => setCookie(podcastsOnboardingCookie, 1)}
        options={{
          doneLabel: "Finish",
          showStepNumbers: true,
          overlayOpacity: 0.95,
        }}
      />
      <GridItem colSpan={1}>
        <AllTags
          tags={["private", "public"]}
          selectedTag={selectedEpisodeTag}
          setSelectedTag={setSelectedEpisodeTag}
        ></AllTags>
      </GridItem>
      <GridItem colSpan={4}>
        <Box paddingTop={12}>
          <AddPodcast podcastUrl={podcastUrl}></AddPodcast>
          {episodes && episodes.length !== 0 && (
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
          )}
          {episodes && episodes.length === 0 && (
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
