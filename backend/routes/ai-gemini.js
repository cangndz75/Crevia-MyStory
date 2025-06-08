const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/generate-story", async (req, res) => {
  try {
    const { character, venue, ageRange } = req.body;

    const prompt = `
Sen bir çocuk hikayesi yazma uzmanısın. Aşağıdaki bilgilerle yaş aralığına uygun, eğlenceli ve pozitif bir masal üret.

Karakter:
- İsim: ${character.name || "Bir sevimli karakter"}
- Açıklama: ${character.description || "Neşeli, meraklı ve maceracı bir karakter."}
- Tarz: ${character.ai_style_hint || "pozitif, eğlenceli, neşeli"}
- Olumsuz Temalar: ${character.ai_negative_prompt || "korku yok, karanlık yok, tehlike yok"}
- Giriş Cümlesi: ${character.default_story_opening || "Bir varmış bir yokmuş, sevimli bir karakter büyük bir maceraya çıkmış..."}

Mekan:
- İsim: ${venue.name || "Büyülü bir diyar"}
- Açıklama: ${venue.description || "Harikalarla dolu, güvenli ve renkli bir yer."}
- Tarz: ${venue.ai_style_hint || "sıcacık, hayal dolu, masalsı"}
- Olumsuz Temalar: ${venue.ai_negative_prompt || "karanlık yok, korkutucu şeyler yok, tehlike yok"}
- Giriş Cümlesi: ${venue.default_story_opening || "Bir zamanlar harikalarla dolu bir yerde çok güzel bir macera yaşanmış..."}

Yaş Aralığı: ${ageRange || "3-5"}

Şimdi bu bilgilerle, bu yaş grubuna uygun bir masal üret.
Masalın giriş cümlesini yaz, ardından 5-6 kısa paragraf şeklinde devam et.
Sonunda mutlaka mutlu bir son yaz.

Masal:
`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const story = response.text();

    res.json({ story });
  } catch (error) {
    console.error("AI GEMINI generate-story error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
