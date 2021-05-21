import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Text,
  Tag,
  Spacer,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import NoteModal from "../components/NoteModal";

export default function NoteCard({ individualNote, userId, setNotesData }) {
  const [selectedNote, setSelectedNote] = useState(null);

  const noteDeletion = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onNoteSelect = (note) => {
    setSelectedNote(note);
    onOpen();
  };
  const removeNote = (note) => {
    fetch(
      `https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev/delete_note`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          noteId: note["id"],
          userId: userId,
          tags: note["tags"],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setNotesData(data);
        noteDeletion({
          title: "Note Deleted",
          description:
            "Your podcast will be updated in a few seconds. Refresh your podcast feed to get fresh content.",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      });
  };
  return (
    <Box
      bg="white"
      color="#212529"
      borderRadius={8}
      padding={6}
      maxHeight={540}
      maxWidth={700}
      className="individual-note"
    >
      <HStack>
        <Spacer />
        <DeleteIcon
          color="#E53E3E"
          boxSize="24px"
          cursor="pointer"
          zIndex="999"
          onClick={() => removeNote(individualNote)}
        ></DeleteIcon>
      </HStack>

      <Text
        fontSize="2xl"
        textAlign="center"
        isTruncated
        className="note-headline"
      >
        {individualNote.title}
      </Text>

      <Center>
        <HStack spacing={4} padding={4} className="note-tags">
          {individualNote.tags.map((tag) => (
            <Tag
              size="sm"
              key={tag}
              variant="subtle"
              colorScheme="red"
              textAlign="center"
            >
              {tag}
            </Tag>
          ))}
        </HStack>
      </Center>

      <Text noOfLines={4}>{individualNote.text}</Text>
      <Center>
        <Box marginTop={6}>
          <Button
            colorScheme="red"
            variant="outline"
            size="md"
            onClick={() => onNoteSelect(individualNote)}
            className="note-cta"
          >
            Expand
          </Button>
        </Box>
      </Center>

      <Box as="span" color="gray.600" fontSize="sm" className="note-creation">
        Created on:{" "}
        {new Date(individualNote.timeCreated * 1000).toLocaleDateString(
          "en-US"
        )}
      </Box>
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          isOpen={isOpen}
          onClose={onClose}
        ></NoteModal>
      )}
    </Box>
  );
}
