import { Button, Center, Text } from "@chakra-ui/react";
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tag,
  VStack,
} from "@chakra-ui/react";

export default function NoteModal({ note, isOpen, onClose }) {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="4xl"
      >
        <ModalOverlay background="rgba(0,0,0,0.9)" />
        <ModalContent>
          <ModalHeader>
            <Center>
              <VStack spacing={4}>
                <Text fontSize="3xl">{note.title}</Text>
                <Text color="gray.600" fontSize="sm">
                  Created on:{" "}
                  {new Date(note.timeCreated * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </Text>
                <HStack spacing={4} marginTop={4}>
                  {note.tags.map((tag) => (
                    <Tag
                      size="md"
                      key={tag}
                      variant="solid"
                      colorScheme="red"
                      cursor="pointer"
                      onClick={(e) => onTagSelect(e)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </HStack>
              </VStack>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {note.text.split("\n").map((paragraph) => {
              return <Text marginTop={4}>{paragraph}</Text>;
            })}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
