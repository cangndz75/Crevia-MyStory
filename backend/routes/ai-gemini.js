const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Eğer yoksa: npm install node-fetch

router.post("/generate-story", async (req, res) => {
  try {
    const { character, venue, ageRange } = req.body;

    const prompt = `
Sen bir çocuk hikayesi yazma uzmanısın. Aşağıdaki bilgilerle yaş aralığına uygun, eğlenceli ve pozitif bir masal üret. 

Her cümlen pozitif, yaş grubuna göre basit ve akıcı olsun. Olumsuz temalardan kaçın. 

---

Karakter:

- İsim: ${character.name || "Bir sevimli karakter"}
- Açıklama: ${character.description || "Neşeli, meraklı ve maceracı bir karakter."}
- Tarz: ${character.ai_style_hint || "pozitif, eğlenceli, neşeli"}
- Olumsuz Temalar: ${character.ai_negative_prompt || "korku yok, karanlık yok, tehlike yok"}
- Giriş Cümlesi: ${character.default_story_opening || "Bir varmış bir yokmuş, sevimli bir karakter büyük bir maceraya çıkmış..."}

---

Mekan:

- İsim: ${venue.name || "Büyülü bir diyar"}
- Açıklama: ${venue.description || "Harikalarla dolu, güvenli ve renkli bir yer."}
- Tarz: ${venue.ai_style_hint || "sıcacık, hayal dolu, masalsı"}
- Olumsuz Temalar: ${venue.ai_negative_prompt || "karanlık yok, korkutucu şeyler yok, tehlike yok"}
- Giriş Cümlesi: ${venue.default_story_opening || "Bir zamanlar harikalarla dolu bir yerde çok güzel bir macera yaşanmış..."}

---

Yaş Aralığı: ${ageRange || "3-5"}

---

Şimdi bu bilgilerle, bu yaş grubuna uygun bir masal üret. 

Masalın giriş cümlesini yaz, ardından 5-6 kısa paragraf şeklinde devam et. 

Sonunda mutlaka mutlu bir son yaz.

Masal:
`;

    const geminiApiKey = process.env.GEMINI_API_KEY || "";

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    const story = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!story) {
      return res.status(500).json({ error: "AI did not return a story.", fullResponse: data });
    }

    res.json({ story });
  } catch (error) {
    console.error("AI GEMINI generate-story error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
