import React from "react";
import {
  Text,
  Stack,
  Badge,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";

export default function AddPodcast({ podcastUrl }) {
  const linkCopied = useToast();
  return (
    <Stack direction="row" padding={10} spacing={4} className="addPodcast">
      <Text fontSize="xl" fontWeight="bold">
        <Badge mr="3" fontSize="0.8em" colorScheme="red">
          Add to Podcast Player
        </Badge>
        Copy and Import this URL into your favorite podcast player for the best
        listening experience.
      </Text>
      <IconButton
        variant="solid"
        colorScheme="red"
        size="sm"
        icon={<Icon as={CopyIcon} size={"sm"} />}
        onClick={() => {
          navigator.clipboard.writeText(podcastUrl);
          linkCopied({
            title: "Copied Successfully",
            description: "Import this URL into your favorite podcast app",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }}
      />
    </Stack>
  );
}
