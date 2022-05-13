export function formatName(name: string, chars: number): string {
    return name.substr(0, chars) + '...';
}

export function formatAmount(amount: number | string) {
    return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTokenPrice(status: any) {

    if (status) {

        if (Math.abs(status) >= 1000) {
            return status.toFixed(0)
        }
        if (Math.abs(status) >= 1) {
            return status.toFixed(2);
        }
        if (Math.abs(status) < 0.0001) {
            return status.toFixed(10);
        }
        return status.toFixed(4);
    } else {
        return '--'
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

    for (const data of dataset) {
        if (Math.abs(timestamp - data[0]) < Math.abs(timestamp - bestTimestamp)) {
            bestTimestamp = data[0]
            bestPrice = data[1]
        }
    }
    return bestPrice
}