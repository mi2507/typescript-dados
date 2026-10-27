export default async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=fetchData.js.map