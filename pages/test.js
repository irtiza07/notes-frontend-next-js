import { Box, Button, Center, Text } from "@chakra-ui/react";
import Joyride from "react-joyride";

import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Lorem,
  ModalCloseButton,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import NoteModal from "../components/NoteModal";

const steps = [
  {
    target: ".text",
    content: "This is my awesome feature!",
  },
  {
    target: ".button",
    content: "This another awesome feature!",
  },
];
export default function Test() {
  return (
    <Box bg="purple" h="1300px" color="white" padding={500}>
      <Joyride steps={steps}></Joyride>
      <Text className="text">Hello World</Text>
      <Button className="button" colorScheme="red" marginTop={40}>
        {" "}
        Cool Button
      </Button>
    </Box>
  );
}
