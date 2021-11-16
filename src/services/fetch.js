export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error('Algo salio mal');
  }

  return data;
}
