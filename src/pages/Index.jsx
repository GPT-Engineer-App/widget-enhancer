import React, { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Text, Textarea, Image, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [widgets, setWidgets] = useState([]);
  const [widgetTitle, setWidgetTitle] = useState("");
  const [widgetShape, setWidgetShape] = useState("textbox");
  const [widgetAction, setWidgetAction] = useState("");
  const toast = useToast();

  const handleAddWidget = () => {
    if (widgetTitle && widgetShape && widgetAction) {
      const newWidget = {
        id: Date.now(),
        title: widgetTitle,
        shape: widgetShape,
        action: widgetAction,
      };
      setWidgets([...widgets, newWidget]);
      setWidgetTitle("");
      setWidgetShape("textbox");
      setWidgetAction("");
      toast({
        title: "Widget Added",
        description: "Your widget has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Incomplete Fields",
        description: "Please fill in all the fields to add a widget.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const renderWidget = (widget) => {
    switch (widget.shape) {
      case "textbox":
        return <Textarea key={widget.id} placeholder={widget.action} />;
      case "rectangular":
        return (
          <Button key={widget.id} onClick={() => handleWidgetAction(widget)}>
            {widget.title}
          </Button>
        );
      case "circular":
        return (
          <Button key={widget.id} onClick={() => handleWidgetAction(widget)} borderRadius="50%" width="100px" height="100px">
            {widget.title}
          </Button>
        );
      case "image":
        return <Image key={widget.id} src="https://images.unsplash.com/photo-1484589065579-248aad0d8b13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHdpZGdldHxlbnwwfHx8fDE3MTExNzEzNTF8MA&ixlib=rb-4.0.3&q=80&w=1080" alt={widget.title} onClick={() => handleWidgetAction(widget)} cursor="pointer" />;
      default:
        return null;
    }
  };

  const handleWidgetAction = (widget) => {
    // TODO: Send widget.action to GPT Engineer for processing
    toast({
      title: "Widget Action",
      description: `Action "${widget.action}" triggered for widget "${widget.title}".`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Widget Creator
      </Heading>
      <Flex mb={4}>
        <FormControl mr={4}>
          <FormLabel>Widget Title</FormLabel>
          <Input value={widgetTitle} onChange={(e) => setWidgetTitle(e.target.value)} placeholder="Enter widget title" />
        </FormControl>
        <FormControl mr={4}>
          <FormLabel>Widget Shape</FormLabel>
          <Select value={widgetShape} onChange={(e) => setWidgetShape(e.target.value)}>
            <option value="textbox">Textbox</option>
            <option value="rectangular">Rectangular Button</option>
            <option value="circular">Circular Button</option>
            <option value="image">Image</option>
          </Select>
        </FormControl>
        <FormControl mr={4}>
          <FormLabel>Widget Action</FormLabel>
          <Input value={widgetAction} onChange={(e) => setWidgetAction(e.target.value)} placeholder="Enter widget action" />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddWidget}>
          Add Widget
        </Button>
      </Flex>
      <Box>
        {widgets.length === 0 ? (
          <Text>No widgets added yet.</Text>
        ) : (
          <Flex wrap="wrap">
            {widgets.map((widget) => (
              <Box key={widget.id} m={2}>
                <Heading as="h3" size="md" mb={2}>
                  {widget.title}
                </Heading>
                {renderWidget(widget)}
              </Box>
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Index;
