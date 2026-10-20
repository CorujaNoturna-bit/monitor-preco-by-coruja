const status = document.getElementById("status");
const lista = document.getElementById("lista");

document.getElementById("monitorar").addEventListener("click", async () => {
  const [aba] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(aba.id, { tipo: "LER_PRODUTO" }, async (produto) => {
    if (chrome.runtime.lastError || !produto || !produto.preco) {
      status.textContent = "Abra uma página de produto da Amazon (e recarregue a página).";
      return;
    }

    const { produtos = {} } = await chrome.storage.local.get("produtos");
    produtos[produto.url] = {
      titulo: produto.titulo,
      url: produto.url,
      precoInicial: produto.preco,
      precoAtual: produto.preco,
      menorPreco: produto.preco
    };
    await chrome.storage.local.set({ produtos });

    status.textContent = `Monitorando: R$ ${produto.preco.toFixed(2)}`;
    renderLista();
  });
});

async function renderLista() {
  const { produtos = {} } = await chrome.storage.local.get("produtos");
  lista.innerHTML = "";
  for (const p of Object.values(produtos)) {
    const div = document.createElement("div");
    div.textContent = `${p.titulo.slice(0, 40)}... R$ ${p.precoAtual.toFixed(2)}`;
    lista.appendChild(div);
  }
}

renderLista();