import { Box, Button, Flex, Heading, Input, Text, Image, useColorModeValue, Textarea } from "@chakra-ui/react";

const Vote = ({ promote, firstInput, secondInput, firstValue, setFirstInput }) => {
    const input = useColorModeValue("white", "dark_input_secondary");
    const shadow = useColorModeValue("shadow", "none");
    const submitBackground = useColorModeValue("#F5F5F5", "#313550");

    const title = promote ? 'Promotion' : 'Demotion';
    const action = promote ? 'promote' : 'demote';
    const firstPartTitle = promote ? 'Amount of Rank I seats available' : 'Amount of Rank I members';
    const secondPartTitle = promote ? 'Amount of Rank II seats available' : 'Amount of Rank II members';

    const MiniBox = ({ partTitle, input }) => {
        return <Box mb="15px">
            <Text variant="primary">{partTitle}</Text>
            <Text fontWeight="500" color={input > 0 ? 'green' : 'red'}>{input} seats</Text>
        </Box >
    };

    return <Flex direction="column" mb="50px">
        <Flex align="center" mb="30px">
            <Box mr="10px" h="30px" w="8px" rounded='xl' bg={promote ? 'green' : 'red'} />
            <Heading mr="10px" color={promote ? 'green' : 'red'} fontWeight="600">{title}</Heading>
            <Image src={`/thumbs${promote ? 'Up' : 'Down'}.png`} h="25px" />
        </Flex>

        <MiniBox partTitle={firstPartTitle} input={firstInput} />
        <MiniBox partTitle={secondPartTitle} input={secondInput} />
        <Text variant="primary">Address to {action}</Text>
        <Input
            pl="10px"
            mb="15px"
            h="40px"
            w={["20.25rem", "25.25rem"]}
            rounded="xl"
            boxShadow={`1px 2px 12px 3px ${shadow}`}
            variant="filled"
            _focus={{ 'bg': input }}
            required
            _placeholder={{ color: "gray.500" }}
            id="msg"
            name="name"
            bg={input}
            placeholder="0xbb663a119193cA68512c351b0fdfDEB9c22Dc416"
            value={firstValue}
            onChange={(e) => setFirstInput(e.target.value)}
        ></Input>

        <Text variant="primary">Why?</Text>
        <Textarea _placeholder={{ color: "gray.500" }} border="none" bg={input} mb="15px" placeholder={`Explain here why you want to ${action} this member.`} />
        <Button h="40px" w="40%" bg={submitBackground} variant="secondary">Submit</Button>
    </Flex >
}

export default Vote;