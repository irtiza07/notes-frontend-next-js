import { Button, Center, Heading, Input } from "@chakra-ui/react";

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

import { useState } from "react";

export default function ShareModal({ isOpen, onClose, userId, episodeUri }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const shareSuccessful = useToast();
  const shareError = useToast();

  const onShare = () => {
    if (!name || !category) {
      shareError({
        title: "Could not Share",
        description: "You must have a name and category to share.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetch(`https://aziiqfussc.execute-api.us-east-1.amazonaws.com/dev/share`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        category: category,
        episodeUri: episodeUri,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        shareSuccessful({
          title: "Shared With The World!",
          description: "Your episode is on its way to the news feed!",
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
              <Heading>Share Episode</Heading>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <VStack spacing={8} marginTop={7}>
                <Input
                  placeholder="Name"
                  width="740px"
                  focusBorderColor="none"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Category"
                  width="740px"
                  focusBorderColor="none"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Button onClick={onShare} colorScheme="red" size="lg">
                  Share
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
