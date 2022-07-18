import React from "react";
import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { Next, Previous } from "chakra-paginator";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useRouter } from "next/router";

function Pagination({ maxPage }) {
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page as string) : 1;

  return (
    <VStack bg="var(--table)" py={10}>
      <Box>
        <Flex p={2}>
          <Spacer />
          <Previous bg="none" border="none" cursor="pointer" mr="20px">
            <ChevronLeft />
          </Previous>

          <Button
            mx={2}
            color={page == 1 ? "var(--text-primary)" : "var(--text-grey)"}
            d="flex"
            border="none"
            justifyContent="center"
            alignItems="center"
            borderRadius={8}
            cursor="pointer"
            onClick={() => {
              router.push("/?page=1");
            }}
          >
            <Text>1</Text>
          </Button>

          {page >= 5 && (
            <Button mx={2} bg="none" border="none" type="button" disabled>
              ...
            </Button>
          )}

          {Math.max(Math.min(page - 2, maxPage - 5), 2) < maxPage && (
            <Button
              mx={2}
              color={Math.max(Math.min(page - 2, maxPage - 5), 2) == page ? "var(--text-primary)" : "var(--text-grey)"}
              d="flex"
              border="none"
              justifyContent="center"
              alignItems="center"
              p={0}
              w="5px"
              borderRadius={8}
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${Math.max(Math.min(page - 2, maxPage - 5), 2)}`);
              }}
            >
              <Text>{Math.max(Math.min(page - 2, maxPage - 5), 2)}</Text>
            </Button>
          )}

          {Math.max(Math.min(page - 1, maxPage - 4), 3) < maxPage && (
            <Button
              mx={2}
              d="flex"
              color={Math.max(Math.min(page - 1, maxPage - 4), 3) == page ? "var(--text-primary)" : "var(--text-grey)"}
              border="none"
              justifyContent="center"
              alignItems="center"
              p={0}
              w="5px"
              borderRadius={8}
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${Math.max(Math.min(page - 1, maxPage - 4), 3)}`);
              }}
            >
              <Text>{Math.max(Math.min(page - 1, maxPage - 4), 3)}</Text>
            </Button>
          )}

          {Math.max(Math.min(page + 2, maxPage - 3), 4) < maxPage && (
            <Button
              mx={2}
              d="flex"
              color={Math.max(Math.min(page, maxPage - 3), 4) == page ? "var(--text-primary)" : "var(--text-grey)"}
              border="none"
              justifyContent="center"
              alignItems="center"
              p={0}
              w="5px"
              borderRadius={8}
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${Math.max(Math.min(page, maxPage - 3), 4)}`);
              }}
            >
              <Text>{Math.max(Math.min(page, maxPage - 3), 4)}</Text>
            </Button>
          )}

          {Math.max(Math.min(page + 1, maxPage - 2), 5) < maxPage && (
            <Button
              mx={2}
              d="flex"
              color={Math.max(Math.min(page + 1, maxPage - 2), 5) == page ? "var(--text-primary)" : "var(--text-grey)"}
              border="none"
              justifyContent="center"
              alignItems="center"
              p={0}
              w="5px"
              borderRadius={8}
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${Math.max(Math.min(page + 1, maxPage - 2), 5)}`);
              }}
            >
              <Text>{Math.max(Math.min(page + 1, maxPage - 2), 5)}</Text>
            </Button>
          )}

          {Math.max(Math.min(page + 2, maxPage - 1), 6) < maxPage && (
            <Button
              mx={2}
              d="flex"
              color={Math.max(Math.min(page + 2, maxPage - 1), 6) == page ? "var(--text-primary)" : "var(--text-grey)"}
              border="none"
              justifyContent="center"
              alignItems="center"
              p={0}
              w="5px"
              borderRadius={8}
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${Math.max(Math.min(page + 2, maxPage - 1), 6)}`);
              }}
            >
              <Text>{Math.max(Math.min(page + 2, maxPage - 1), 6)}</Text>
            </Button>
          )}

          {page < maxPage - 5 && (
            <Button mx={2} bg="none" color="" border="none" type="button" disabled>
              ...
            </Button>
          )}

          {maxPage > 1 && (
            <Button
              mx={2}
              d="flex"
              color={maxPage == page ? "var(--text-primary)" : "var(--text-grey)"}
              border="none"
              justifyContent="center"
              alignItems="center"
              p={0}
              w="5px"
              borderRadius={8}
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${maxPage}`);
              }}
            >
              <Text>{maxPage}</Text>
            </Button>
          )}
          <Next bg="none" border="none" ml="20px">
            <ChevronRight
              cursor="pointer"
              onClick={() => {
                router.push(`/?page=${page + 1}`);
              }}
            />
          </Next>
        </Flex>
      </Box>
    </VStack>
  );
}

export default Pagination;
