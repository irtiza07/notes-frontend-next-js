import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Flex,
  SimpleGrid,
  Text,
  Tag,
  Spacer,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import NewNoteModal from "../components/NewNoteModal";

export default function NewNoteCTA({ existingTags, setNotesData }) {
  const {
    isOpen: isNewOpen,
    onOpen: onNewOpen,
    onClose: onNewClose,
  } = useDisclosure();

  return (
    <Box>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="red"
        variant="solid"
        size="lg"
        onClick={() => onNewOpen()}
      >
        New Note
      </Button>
      <NewNoteModal
        existingTags={existingTags}
        setNotesData={setNotesData}
        isOpen={isNewOpen}
        onClose={onNewClose}
      ></NewNoteModal>
    </Box>
  );
}
