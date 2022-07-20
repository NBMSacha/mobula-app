import React from "react"
import styles from "./History.module.scss";
import { Flex, Text } from "@chakra-ui/react"
import HistoryBox from "./HistoryBox"

function Historys({ proposal }) {
    return (
        <Flex direction="column" mt="30px" h="545px" overflowY="scroll" className={styles["scroll"]}>
            <Text mb="20px" fontSize={["13px", "13px", "15px", "18px"]}>History</Text>
            {/* BOX */}
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
            <HistoryBox text={" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum veritatis in libero porro tempora? Deserunt soluta est rerum adipisci! Suscipit maiores totam libero molestias. Aperiam reprehenderit, ad harum laudantium fugiat ut veritatis eius quibusdam sapiente vero sit. Nemo, optio consequatur. Neque corrupti consequuntur dignissimos hic assumenda dolor aspernatur itaque cum!"}/>
        </Flex>
    )
}

export default Historys
