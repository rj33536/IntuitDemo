export async function fetchEvents() {
    try {
        const response = await fetch("https://run.mocky.io/v3/2b1cb819-76a8-4857-87fe-d80b40ebb7b1");
        const body = await response.json();
        return body;
    } catch(e) {
        console.log(e);
        return [];
    }
    
}
