export default function sortByTimestampDescending(orders) {
    // Ensure the array is not empty and each element has a timestamp property
    if (orders.length === 0 || !orders.every(order => order.hasOwnProperty('time'))) {
        console.error('Invalid array format. Each element must have a timestamp property.');
        return [];
    }

    // Use the sort function to compare timestamps in descending order
    orders.sort((a, b) => a.time - b.time);

    return orders;
}