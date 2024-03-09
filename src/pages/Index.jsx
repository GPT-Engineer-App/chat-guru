import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Text, Input, Button, extendTheme, Container, Stack, HStack, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const sendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMessage = {
      id: messages.length,
      text: inputValue,
      sender: "User",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate a reply from ChatGPT
    setTimeout(() => {
      const replyMessage = {
        id: messages.length + 1,
        text: "I'm a simple chatbot, but I can't respond like ChatGPT. Type away!",
        sender: "ChatGPT",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    }, 1500);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" py={10}>
        <VStack spacing={4}>
          <Heading as="h1" size="xl">
            ChatGPT-like App
          </Heading>
          <Box w="full" bg="white" borderRadius="md" p={4} shadow="md" maxH="70vh" overflowY="auto">
            <Stack spacing={4}>
              {messages.map((message) => (
                <Box key={message.id} alignSelf={message.sender === "ChatGPT" ? "flex-start" : "flex-end"} bg={message.sender === "ChatGPT" ? "blue.100" : "green.100"} p={3} borderRadius="md">
                  <Text fontWeight="bold">{message.sender}</Text>
                  <Text>{message.text}</Text>
                  <Text fontSize="xs" color="gray.500">
                    {message.timestamp.toLocaleTimeString()}
                  </Text>
                </Box>
              ))}
            </Stack>
          </Box>
          <HStack w="full">
            <Input
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <Button leftIcon={<FaPaperPlane />} colorScheme="blue" onClick={sendMessage}>
              Send
            </Button>
          </HStack>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
