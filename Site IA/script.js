const apiKey = "INSIRA_SUA_CHAVE"; // Substitua pela sua chave IA

const chatBox = document.getElementById("chat")
const form = document.getElementById("formulario")
const input = document.getElementById("mensagem")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const pergunta = input.value.trim()
  if (!pergunta) return

  adicionarMensagem("user", pergunta)
  input.value = ""

  const resposta = await enviarParaIA(pergunta)
  adicionarMensagem("ia", resposta)
})

function adicionarMensagem(tipo, texto) {
  const div = document.createElement("div")
  div.classList.add("mensagem", tipo)
  div.textContent = texto
  chatBox.appendChild(div)
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll automático
}

async function enviarParaIA(mensagem) {
  try {
    const body = {
      model: "llama3-8b-8192", // ou outro modelo suportado
      messages: [
        { role: "system", content: "Você é um assistente útil." },
        { role: "user", content: mensagem }
      ],
      temperature: 0.6
    }

    const response = await fetch("INSIRA_A_HTTP_IA", {  // Insira a http POST da IA
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    return data.choices?.[0]?.message?.content || "Erro ao gerar resposta."

  } catch (err) {
    console.error("Erro na requisição:", err)
    return "Erro ao conectar com a IA."
  }
}