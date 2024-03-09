import React from "react";
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack, Box, Text } from "@chakra-ui/react";

const ChatHistorySidebar = ({ isOpen, onClose, messages }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Chat History</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="stretch">
            {messages.map((message) => (
              <Box key={message.id} p={3} bg={message.sender === "ChatGPT" ? "blue.100" : "green.100"} borderRadius="md">
                <Text fontWeight="bold">{message.sender}</Text>
                <Text>{message.text}</Text>
                <Text fontSize="xs" color="gray.500">
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </Box>
            ))}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatHistorySidebar;
