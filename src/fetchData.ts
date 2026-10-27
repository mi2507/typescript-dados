export default async function fetchData<Interface>(url: string): Promise<Interface | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    return json;

  } catch (error) {
    return null
  }
}

