export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyNLpot_atP8zzlKoxZTwNFTWmIESo5IoibKhqeECdRj2sEOU1YNj0GTHImf1v8lx0HZw/exec",
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
