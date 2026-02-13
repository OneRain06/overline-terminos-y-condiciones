export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const response = await fetch(
      "https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbyrfgCh-L4t8aBAYzwKJhumx42P8d5v-ji9xQyk4GNbX7dbq8DHD3uy2hV398Fg_UYDLQ/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(req.body)
      }
    );

    const text = await response.text();

    if (!text.includes("OK")) {
      throw new Error(text);
    }

    return res.status(200).json({ status: "OK" });

  } catch (error) {

    return res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
}
