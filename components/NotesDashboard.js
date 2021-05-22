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

import AllTags from "./AllTags";
import NewNoteCTA from "./NewNoteCTA";
import NoteCard from "./NoteCard";

export default function NotesDashboard({ notesData, setNotesData, userId }) {
  const [selectedTag, setSelectedTag] = useState(null);
  return (
    <Grid templateColumns="repeat(5, 1fr)">
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
