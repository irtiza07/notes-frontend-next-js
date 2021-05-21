import {
  Box,
  Center,
  SimpleGrid,
  HStack,
  Heading,
  Text,
  Spacer,
  Flex,
  VStack,
} from "@chakra-ui/react";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

import { useState } from "react";

import AllTags from "./AllTags";
import NewNoteCTA from "./NewNoteCTA";
import NoteCard from "./NoteCard";

export default function NotesDashboard({ notesData, setNotesData, userId }) {
  const [selectedTag, setSelectedTag] = useState(null);
  return (
    <Flex padding={16}>
      <AllTags
        tags={notesData.tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      ></AllTags>
      <Spacer></Spacer>
      <Box paddingTop={12} minWidth={1200}>
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
            <SimpleGrid
              minChildWidth="440px"
              spacing="100px"
              bg="#212529"
              minWidth="1600px"
              maxWidth="1500px"
            >
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
            </SimpleGrid>
          ) : (
            <Center paddingTop={36}>
              <Text fontSize="3xl">
                👻 You don't have any notes yet. Click "New Note" to create your
                first note.
              </Text>
            </Center>
          )}
        </Box>
      </Box>
    </Flex>
  );
}
