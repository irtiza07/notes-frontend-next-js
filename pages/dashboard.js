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

import fire from "../utils/fire";

import NotesDashboard from "../components/NotesDashboard";
import PodcastDashboard from "../components/PodcastDashboard";

const onboardingCookie = "seenOnboarding";

export default function Dashboard() {
  const { userId } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies([onboardingCookie]);
  const router = useRouter();

  const [notesData, setNotesData] = useState(null);

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
    return null;
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
          onClick={() => removeCookie(onboardingCookie)}
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
            <HStack spacing={16}>
              <Tab _selected={{ color: "white", bg: "red.500" }}>
                <Heading>Notes</Heading>
              </Tab>
              <Tab _selected={{ color: "white", bg: "red.500" }}>
                <Heading>Podcast</Heading>
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
            <PodcastDashboard userId={userId}></PodcastDashboard>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
