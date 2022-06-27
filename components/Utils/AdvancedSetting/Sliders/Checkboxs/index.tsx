import { Checkbox, CheckboxGroup, Stack, Text, Flex } from '@chakra-ui/react'

export default function Checkboxs({condition}) {

    return (
        <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
            <Stack fontSize="14px !important"  spacing={[2]} direction={['column', 'column']}>
                {condition === "two" ? (
                    <>
                        <Flex align="center" justify="space-between">
                            <Text>Only assets with EVM-compatible pegs</Text>
                            <Checkbox mt="10.5px !important" value='sasuke'></Checkbox>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Text>Only assets with EVM-compatible pegs</Text>
                            <Checkbox mt="10px !important" value='kakashi'></Checkbox>
                        </Flex>
                    </>
                ) : (
                    <>
                        <Flex align="center" justify="space-between"  mt="8px">
                            <Text >Only audited assets</Text>
                            <Checkbox mb="0px" value='naruto'></Checkbox>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Text>Only assets with a kyc</Text>
                            <Checkbox mt="0px !important" value='sasuke'></Checkbox>
                        </Flex>
                        <Flex align="center" justify="space-between">
                            <Text>Only tradable assets</Text>
                            <Checkbox mt="0px !important" value='sasuke'></Checkbox>
                        </Flex>
                    </>
                )}
            </Stack>
        </CheckboxGroup>
    )
}
