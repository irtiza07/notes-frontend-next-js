import React from "react";
import { BiNotepad } from "react-icons/bi";
import {
  Button,
  Heading,
  HStack,
  Text,
  Flex,
  Icon,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function TopNav({ showCta }) {
  const router = useRouter();

  return (
    <Flex padding={8} mb={12}>
      <HStack spacing={8} cursor="pointer" onClick={() => router.push("/")}>
        <IconButton
          variant="outline"
          colorScheme="red"
          aria-label="Send email"
          icon={<Icon as={BiNotepad} />}
        />
        <Heading>Aviva</Heading>
      </HStack>
      <Spacer></Spacer>
      <HStack spacing={12}>
        <Text
          fontSize={22}
          onClick={() => router.push("/help")}
          cursor="pointer"
        >
          Help
        </Text>
        {showCta && (
          <Button
            colorScheme="red"
            variant="outline"
            size="lg"
            fontSize={22}
            onClick={() => router.push("/signup")}
          >
            Get Started
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
