import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Icon,
  IconButton,
  Text,
  Spacer,
  HStack,
  Badge,
  Button,
  Image,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { FaPlay, FaPause, FaShare } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import ShareModal from "./ShareModal";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80";

export default function EpisodeCard({ userId, episode }) {
  const [audioFile, setAudioFile] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    setAudioFile(new Audio(episode.episodeUri));
  }, [episode]);

  console.log(episode);

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={episode.imageUrl ? episode.imageUrl : defaultImageUrl} height={200} width={400} objectFit="cover" />
      <HStack>
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge
              borderRadius="full"
              px="2"
              colorScheme={episode.isPublic === "public" ? "red" : "teal"}
            >
              {episode.isPublic === "public" ? "Public" : "Private"}
            </Badge>
          </Box>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {episode.name}
          </Box>
        </Box>
        <Spacer></Spacer>
        <Box padding={4}>
          <HStack>
            <IconButton
              variant="outline"
              colorScheme="red"
              aria-label="Send email"
              icon={<Icon as={GrPowerReset} />}
              onClick={() => {
                audioFile.currentTime = 0;
              }}
            />
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
          </HStack>
        </Box>
      </HStack>
      <Box
        as="span"
        color="gray.600"
        fontSize="sm"
        className="note-creation"
        padding={6}
      >
        Created on:{" "}
        {new Date(episode.timeCreated * 1000).toLocaleDateString("en-US")}
      </Box>
      <Center padding={8}>
        <HStack>
          <Button
            leftIcon={<DownloadIcon />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={() => window.open(episode.episodeUri)}
          >
            Download
          </Button>
          <Button
            leftIcon={<Icon as={FaShare} />}
            colorScheme="red"
            variant="solid"
            size="sm"
            onClick={() => setShowShareModal(true)}
          >
            Share
          </Button>
          <ShareModal
            isOpen={showShareModal}
            userId={userId}
            episodeUri={episode.episodeUri}
            onClose={() => setShowShareModal(false)}
          ></ShareModal>
        </HStack>
      </Center>
    </Box>
  );
}
