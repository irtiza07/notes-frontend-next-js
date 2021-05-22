import { Button, Center, Heading, Input, Textarea } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  useToast,
} from "@chakra-ui/react";

import TagsInput from "react-tagsinput";
import { useState, useContext } from "react";
import { UserContext } from "../utils/state";

export default function NewNoteModal({
  isOpen,
  onClose,
  existingTags,
  setNotesData,
}) {
  const { userId } = useContext(UserContext);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const noteCreation = useToast();

  const onNoteCreate = () => {
    fetch(`https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        tags: tags,
        text: noteText,
        existingTags: existingTags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotesData(data);
        noteCreation({
          title: "New Note Added.",
          description:
            "Your podcast will be updated in a few seconds. Refresh your podcast feed to get fresh content.",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
        onClose();
      });
  };

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="6xl"
      >
        <ModalOverlay background="rgba(0,0,0,0.9)" />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Heading>New Note</Heading>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <VStack spacing={8} marginTop={7}>
                <Input
                  placeholder="Title"
                  width="740px"
                  focusBorderColor="none"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TagsInput
                  value={tags}
                  onChange={(tags) => setTags(tags)}
                  onlyUnique
                  focusedClassName="tags-input-focused"
                  className="react-tagsinput"
                  inputProps={{
                    placeholder: "Add multiple tags",
                    className: "react-tagsinput-input",
                  }}
                  tagProps={{ className: "react-tagsinput-tag" }}
                />
                <Textarea
                  focusBorderColor="none"
                  width={740}
                  height={400}
                  placeholder="Your Note"
                  onChange={(e) => setNoteText(e.target.value)}
                />
                <Button onClick={onNoteCreate} colorScheme="red" size="lg">
                  Create Note
                </Button>
              </VStack>
            </Center>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
