export async function getCafe() {
  try {
    const response = await fetch("http://192.168.0.36:8000/cafe/cafe_p");
    const ip_text = await response.text();
    const myIP = ip_text === "" ? {} : JSON.parse(ip_text);
    return myIP;
  } catch (error) {
    return "....";
  }
}
