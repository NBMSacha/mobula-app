import React from 'react';
import styles from "../ListingForm.module.scss";
import { Input, Flex } from '@chakra-ui/react';

function Mid({
        input,
        website,
        setWebsite,
        twitter,
        setTwitter,
        discord,
        setDiscord,
        telegram,
        setTelegram,
        box,
        shadow
    }) {

        console.log(`this is website : ${website}`)

    return (
        <Flex className={styles["three-forms"]} p="20px" boxShadow={`1px 2px 12px 3px ${shadow}`}>
            <div className={styles["form-container-box"]}>
                <label >Website *</label>
                <Input
                    pl="10px"
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    variant="primary"
                    required
                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                    id="msg"
                    bg={box}
                    name="website"
                    placeholder="https:/app.mobula.finance"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div className={styles["form-container-box"]}>
                <label >Twitter *</label>
                <Input
                    pl="10px"
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    bg={box}
                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                    type="text"
                    id="name"
                    name="twitter"
                    placeholder="https://twitter.com/MobulaFi"
                    value={twitter}
                    required
                    onChange={(e) => setTwitter(e.target.value)}
                />
            </div>
            <div className={styles["form-container-box"]}>
                <label >Telegram *</label>
                <Input
                    pl="10px"
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    bg={box}
                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                    value={telegram}
                    required
                    onChange={(e) => setTelegram(e.target.value)}
                    type="text"
                    id="tlg"
                    name="telegram"
                    placeholder="https://t.me/MobulaFinance"
                />
            </div>
            <div className={styles["form-container-box"]} >
                <label >Discord *</label>
                <Input
                    pl="10px"
                    pr="10px"
                    _placeholder={{ color: "none" }}
                    bg={box}
                    boxShadow={`1px 2px 12px 3px ${shadow}`}
                    id="discord"
                    className={styles["inputs"]}
                    name="discord"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    placeholder="https://t.me/MobulaFi"
                    required
                ></Input>
            </div>
        </Flex>
    )
}

export default Mid;