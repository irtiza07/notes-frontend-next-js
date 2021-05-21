import {
  Box,
  Button,
  Container,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import Link from "next/link";

import NewsFeed from "../components/NewsFeed";

export default function Home() {
  return (
    <Box bg="#212529" color="white" minHeight={1600} padding={24}>
      <Center paddingTop={24}>
        <Heading size="4xl">The Future of Note Taking</Heading>
      </Center>
      <Center paddingTop={12}>
        <Text fontSize="2xl" align="center">
          Create podcasts from your notes. Listen to them whenever you want.
          Share them with the world.
        </Text>
      </Center>
      <Center paddingTop={12}>
        <HStack spacing="24px">
          <Link href="/signup">
            <Button colorScheme="red" variant="solid" size="lg">
              Sign Up
            </Button>
          </Link>
          <Link href="/signin">
            <Button colorScheme="red" variant="outline" size="lg">
              Sign In
            </Button>
          </Link>
        </HStack>
      </Center>
      <Center marginTop="220px">
        <Stack direction={["column", "row"]} spacing="60px">
          <VStack spacing={8}>
            <WarningIcon w={8} h={8} color="red.500" />
            <Heading size="lg">Create Tags</Heading>
            <Container>
              <Text textAlign="center" fontSize="lg">
                Create unlimited number of tags to organize and group your notes
                together. You want to get very specifc and precise with your
                tags.
              </Text>
            </Container>
          </VStack>
          <VStack spacing={8}>
            <PhoneIcon w={8} h={8} color="red.500" />
            <Heading size="lg">Add Notes</Heading>
            <Container>
              <Text textAlign="center" fontSize="lg">
                Add notes to your created tags. All the notes you add to a tag
                should be related.
              </Text>
            </Container>
          </VStack>
          <VStack spacing={8}>
            <AddIcon w={8} h={8} color="red.500" />
            <Heading size="lg">Generate Podcasts</Heading>
            <Container>
              <Text textAlign="center" fontSize="lg">
                We automatically create podcast episodes for every tag. Whenever
                you add a new tag, we create a new podcast episode. Whenever you
                add some new notes to an existing tag, we update the episode for
                you instantly.
              </Text>
            </Container>
          </VStack>
        </Stack>
      </Center>
      <Center marginTop={32} marginBottom={32}>
        <Heading>-- Trending Now --</Heading>
      </Center>
      <Center>
        <NewsFeed></NewsFeed>
      </Center>
    </Box>
  );
}
