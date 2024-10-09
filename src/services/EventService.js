export async function fetchEvents() {
    try {
        const response = await fetch("https://run.mocky.io/v3/b598fc5a-e124-43ea-b4a6-ffc5c61f7369");
        const body = await response.json();
        return body;
    } catch (e) {
        console.log(e);
        return [];
    }

}
