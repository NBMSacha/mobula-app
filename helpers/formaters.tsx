import { Flex, Text } from '@chakra-ui/react';

export function formatName(name: string, chars: number): string {
    return name.substr(0, chars) + '...';
}

export function formatAmount(amount: number | string) {
    return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTokenPrice(price: any) {

    if (price) {
        //Making sure we're getting a number without e-7 etc..
        price = parseFloat(String(price)).toFixed(String(price).includes('-') ? parseInt(String(price).split('-')[1]) + 2 : String(price).split('.')[1].length);

        if (parseFloat(price) > 1000) {
            return formatAmount(parseInt(price)).slice(0, 6)
        } else if (parseFloat(price) < 0.0001) {
            const exp = price.match(/0\.0+[1-9]/)?.[0] || '';
            return price.split('.')[0] + '.0..0' + price.split(exp.slice(0, exp.length - 2))[1].slice(1, 8);
        } else {
            return price.slice(0, 6);
        }

    } else {
        return <>{'--'}</>
    }

}

export function getTokenFormattedPrice(price: string | number, addOn: string = '', { justify, marginTop }: { justify: string | null, marginTop: string | null }) {

    if (price) {
        //Making sure we're getting a number
        price = parseFloat(String(price)).toFixed(String(price).includes('-') ? parseInt(String(price).split('-')[1]) + 2 : String(price).split('.')[1].length);

        if (parseFloat(price) > 1000) {
            return <>{addOn + formatAmount(parseInt(price)).slice(0, 6)}</>
        } else if (parseFloat(price) < 0.0001) {
            const exp = price.match(/0\.0+[1-9]/)?.[0] || '';
            return <Flex mt={marginTop || "-45px"} justify={justify || "center"} align="center">{addOn + price.split('.')[0] + '.0'} <Text mt='2.5%' fontSize={["xx-small", "small"]}>{exp.length - 3}</Text> {price.split(exp.slice(0, exp.length - 2))[1].slice(1, 10)}</Flex>;
        } else {
            return <>{addOn + price.slice(0, 6)}</>;
        }

    } else {
        return <>{'--'}</>
    }

}
// console.log(token.price_change_24h.toFixed(0))
export function getTokenPercentage(status: any) {
    if (status == undefined) {
        try {
            document.getElementById("noColor").style.color = "rgb(185, 185, 185)";
        } catch (err) {

        }
        return "-- "
    }
    return status.toFixed(2);
}

export function getClosest(dataset: [[number, number]], timestamp: number) {
    let bestTimestamp = 0;
    let bestPrice = 0;


    for (let i = 0; i < dataset.length - 1; i++) {
        if (Math.abs(timestamp - dataset[i][0]) < Math.abs(timestamp - bestTimestamp)) {
            bestTimestamp = dataset[i][0]
            bestPrice = dataset[i][1]
        }
    }

    return bestPrice
}

export function getClosestUltimate(dataset: [[number, number]], timestamp: number) {
    let bestTimestamp = 0;
    let bestPrice = 0;
    let nextBestTimestamp = 0;
    let nextBestPrice = 0;

    for (let i = 0; i < dataset.length - 1; i++) {

        if (timestamp < dataset[i][0]) {
            break
        } else if (Math.abs(timestamp - dataset[i][0]) < Math.abs(timestamp - bestTimestamp)) {
            bestTimestamp = dataset[i][0]
            bestPrice = dataset[i][1]
            nextBestTimestamp = dataset[i + 1][0]
            nextBestPrice = dataset[i + 1][1]
        }
    }

    return [[bestTimestamp, bestPrice], [nextBestTimestamp, nextBestPrice]]
}

export function fromUrlToName(name: string) {
    return name.split('-').join(' ').toLowerCase();
}

export function getUrlFromName(name: string): string {
    return name.split(' ').join('-').toLowerCase();
}