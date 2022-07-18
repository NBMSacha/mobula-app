import React, { useRef, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import styles from "./History.module.scss";
import HistoryBox from "./HistoryBox";

function Historys({ proposal }) {
  console.log(proposal);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const overflowRef = useRef();
  const handleToggle = () => setShow(!show);
  const [bshow, setBShow] = useState(false);

  return (
    <Flex direction="column" mt="30px" h="545px" overflowY="scroll" className={styles.scroll}>
      <Text mb="20px" fontSize={["13px", "13px", "15px", "18px"]}>
        History
      </Text>
      {/* BOX */}
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
      <HistoryBox text=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!" />
    </Flex>
    // bg={`linear-gradient(180deg,hsla(0,0%,100%,0) 0,${gradient} 100%,#f5f5f5 100%,#f5f5f5)`}
  );
}

export default Historys;
