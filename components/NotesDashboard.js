import {
  Box,
  Center,
  HStack,
  Heading,
  Text,
  Spacer,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { useState } from "react";
import { useCookies } from "react-cookie";

import AllTags from "./AllTags";
import NewNoteCTA from "./NewNoteCTA";
import NoteCard from "./NoteCard";

import "intro.js/introjs.css";
import { Steps } from "intro.js-react";

const steps = [
  {
    element: ".mainTabs",
    intro:
      "Your dashboard is divided into two panels. Notes contain all your individual notes which you can filter by tags. Podcast contains all your podcast episodes, one episode per tag. Each episode consists of all notes belonging to a particular tag.",
    position: "bottom",
  },
  {
    element: ".newNoteBtn",
    intro:
      "Create new notes by clicking this button. You can use multiple tags to group related notes together. All your notes are private and only you can see them.",
  },
  {
    element: ".noteTags",
    intro: "You can filter your notes by tags.",
  },
  {
    element: ".podcastsTab",
    intro: "Go to the Podcast tab and see how it works.",
  },
  {
    element: ".bringOnboarding",
    intro: "Whenever you are stuck, click here for help.",
  },
];

const notesOnboardingCookie = "seenNotesOnboarding";

export default function NotesDashboard({ notesData, setNotesData, userId }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    notesOnboardingCookie,
  ]);

  const [selectedTag, setSelectedTag] = useState(null);
  return (
    <Grid templateColumns="repeat(5, 1fr)">
      <Steps
        enabled={!(notesOnboardingCookie in cookies)}
        steps={steps}
        initialStep={0}
        onExit={() => console.log("Exit early")}
        onComplete={() => setCookie(notesOnboardingCookie, 1)}
        options={{
          doneLabel: "Finish",
          showStepNumbers: true,
          overlayOpacity: 0.95,
        }}
      />
      <GridItem colSpan={1}>
        <AllTags
          tags={notesData.tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        ></AllTags>
      </GridItem>
      <GridItem colSpan={4}>
        <Box paddingTop={12}>
          <HStack marginBottom={16}>
            <Flex flexDirection="column">
              <Heading fontSize="5xl" align="left">
                My Notes
              </Heading>
              <Text fontSize="2xl">{notesData.notes.length} Total Notes</Text>
            </Flex>
            <Spacer></Spacer>
            <NewNoteCTA
              existingTags={notesData.tags}
              setNotesData={setNotesData}
            ></NewNoteCTA>
          </HStack>
          <Box>
            {notesData && notesData.notes.length !== 0 ? (
              <Grid templateColumns="repeat(3, 1fr)" gap={8}>
                {notesData.notes
                  .sort(
                    (firstElement, secondElement) =>
                      secondElement.timeCreated - firstElement.timeCreated
                  )
                  .map((note) => {
                    if (selectedTag && !note.tags.includes(selectedTag)) {
                      return;
                    } else {
                      return (
                        <NoteCard
                          individualNote={note}
                          userId={userId}
                          setNotesData={setNotesData}
                        ></NoteCard>
                      );
                    }
                  })}
              </Grid>
            ) : (
              <Center paddingTop={36}>
                <Text fontSize="3xl">
                  👻 You don't have any notes yet. Click "New Note" to create
                  your first note.
                </Text>
              </Center>
            )}
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
}
