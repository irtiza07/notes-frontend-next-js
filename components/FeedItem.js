import React, { useState, useEffect } from "react";
import {
  Badge,
  Box,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function FeedItem({ item }) {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setAudioFile(new Audio(item.episodeUri));
  }, []);

  return (
    <Box
      maxW="sm"
      maxH="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={item.imageUrl} />
      <HStack>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              Curated
            </Box>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {item.name}
          </Box>
        </Box>
        <Spacer></Spacer>
        <Box padding={4}>
          <IconButton
            variant="outline"
            colorScheme="red"
            aria-label="Send email"
            icon={<Icon as={isPlaying ? FaPause : FaPlay} />}
            onClick={() => {
              if (isPlaying) {
                setIsPlaying(false);
                audioFile.pause();
              } else {
                setIsPlaying(true);
                audioFile.play();
              }
            }}
          />
        </Box>
      </HStack>
    </Box>
  );
}
