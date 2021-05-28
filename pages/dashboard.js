import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

import { useCookies } from "react-cookie";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../utils/state";
import { useRouter } from "next/router";
import "react-user-onboarding/dist/index.css";
import { CircleLoader } from "react-spinners";

import fire from "../utils/fire";

import NotesDashboard from "../components/NotesDashboard";
import PodcastDashboard from "../components/PodcastDashboard";

const notesOnboardingCookie = "seenNotesOnboarding";
const podcastsOnboardingCookie = "seenPodcastsOnboarding";

export default function Dashboard() {
  const { userId } = useContext(UserContext);
  const router = useRouter();

  const [notesData, setNotesData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    notesOnboardingCookie,
    podcastsOnboardingCookie,
  ]);

  useEffect(() => {
    if (userId) {
      fetch(
        `https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev/users/${userId}`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setNotesData(data);
        });
    } else {
      router.push("/signin");
    }
  }, [userId]);

  const onSignOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        console.log("Successful sign out");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.code);
        router.push("/");
        console.log("Problems with sign out");
      });
  };

  if (!notesData) {
    console.log("Could not load any data..");
    return (
      <Box bg="#212529" minHeight={1500}>
        <Center paddingTop={300}>
          <CircleLoader color="#E53E3E" size={500}></CircleLoader>
        </Center>
      </Box>
    );
  }

  return (
    <Box
      bg="#212529"
      color="white"
      className="dashboard-outer"
      minHeight={1500}
      padding={4}
    >
      <Flex padding={3}>
        <QuestionIcon
          color="#E53E3E"
          boxSize="40px"
          cursor="pointer"
          onClick={() => {
            console.log("Help me please...");
            removeCookie(notesOnboardingCookie);
            removeCookie(podcastsOnboardingCookie);
          }}
          className="bringOnboarding"
        ></QuestionIcon>
        <Spacer></Spacer>
        <Button
          colorScheme="red"
          variant="outline"
          size="xs"
          onClick={onSignOut}
          className="sign-out"
        >
          Sign Out
        </Button>
      </Flex>
      <Tabs isLazy variant="unstyled">
        <Center>
          <TabList>
            <HStack spacing={16} className="mainTabs">
              <Tab _selected={{ color: "white", bg: "red.500" }}>
                <Heading>Notes</Heading>
              </Tab>
              <Tab _selected={{ color: "white", bg: "red.500" }}>
                <Heading className="podcastsTab">Podcast</Heading>
              </Tab>
            </HStack>
          </TabList>
        </Center>

        <TabPanels>
          <TabPanel>
            <NotesDashboard
              notesData={notesData}
              setNotesData={setNotesData}
              userId={userId}
            ></NotesDashboard>
          </TabPanel>
          <TabPanel>
            <PodcastDashboard
              userId={userId}
              podcastUrl={notesData["podcastUrl"]}
            ></PodcastDashboard>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
