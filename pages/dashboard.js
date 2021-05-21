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
import Joyride, { STATUS } from "react-joyride";

import { useCookies } from "react-cookie";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../utils/state";
import { useRouter } from "next/router";

import fire from "../utils/fire";

import NotesDashboard from "../components/NotesDashboard";
import PodcastDashboard from "../components/PodcastDashboard";

const onboardingCookie = "seenOnboarding";
const steps = [
  {
    target: ".parent-tags-container",
    content:
      "Here are all your tags associated with notes. You can filter the notes by clicking on the tags.",
    disableBeacon: true,
  },
  {
    target: ".individual-note",
    content: "You can see a preview of your individual notes in these cards",
    disableBeacon: true,
  },
  {
    target: ".note-headline",
    content: "Here is the title of your note",
    ixFixed: true,
    disableBeacon: true,
  },
  {
    target: ".note-tags",
    content: "One note can be associated with many tags",
    ixFixed: true,
    disableBeacon: true,
  },
  {
    target: ".note-cta",
    content: "Click on the button to get the details of your note",
    ixFixed: true,
    disableBeacon: true,
  },
  {
    target: ".note-creation",
    content: "Date when your note was created",
    ixFixed: true,
    disableBeacon: true,
  },
  {
    target: ".sign-out",
    content: "You can sign out here when you are done",
    disableBeacon: true,
  },
];

export default function Dashboard() {
  const { userId } = useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies([onboardingCookie]);
  const router = useRouter();

  const [notesData, setNotesData] = useState(null);

  useEffect(() => {
    if (!userId) {
      router.push("/signin");
    } else {
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

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setCookie(onboardingCookie, true, { path: "/" });
    }
  };

  if (notesData && steps.length < 8) {
    steps.unshift({
      target: ".dashboard-text",
      content: `This is your dashboard containing all your tags, notes and podcasts. Import this URL into your Apple Podcast app to get the best experience. ${notesData["podcastUrl"]}`,
      disableBeacon: true,
    });
  }

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
      {notesData && !(onboardingCookie in cookies) && (
        <Joyride
          callback={handleJoyrideCallback}
          steps={steps}
          continuous={true}
          styles={{
            options: {
              overlayColor: "rgba(0, 0, 0, 0.9)",
              beaconSize: 199,
              backgroundColor: "white",
              primaryColor: "#E53E3E",
            },
          }}
          showProgress={true}
          showSkipButton={true}
          scrollToFirstStep={true}
        ></Joyride>
      )}
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
