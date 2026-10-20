const QUEDA_MINIMA = 0.15; 
const INTERVALO_MIN = 60;  

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("checarPrecos", { periodInMinutes: INTERVALO_MIN });
});

chrome.alarms.onAlarm.addListener((alarme) => {
  if (alarme.name === "checarPrecos") checarTodos();
});

async function checarTodos() {
  const { produtos = {} } = await chrome.storage.local.get("produtos");

  for (const url of Object.keys(produtos)) {
    try {
      const preco = await buscarPreco(url);
      if (preco == null) continue;

      const p = produtos[url];
      const precoBase = p.precoInicial || p.precoAtual;
      const queda = (precoBase - preco) / precoBase;

      if (queda >= QUEDA_MINIMA) {
        notificar(p, precoBase, preco, queda);
        p.precoInicial = preco; 
      }

      p.precoAtual = preco;
      p.menorPreco = Math.min(p.menorPreco, preco);
    } catch (e) {
      console.error("Erro ao checar", url, e);
    }
  }

  await chrome.storage.local.set({ produtos });
}

async function buscarPreco(url) {
  const resp = await fetch(url);
  const html = await resp.text();
  const match = html.match(/a-offscreen"[^>]*>\s*R\$\s*([\d.,]+)/i);
  if (!match) return null;

  return parseFloat(match[1].replace(/\./g, "").replace(",", "."));
}

function notificar(produto, antes, agora, queda) {
  chrome.notifications.create("queda_" + Date.now(), {
    type: "basic",
    iconUrl: chrome.runtime.getURL("icon.png"),
    title: `Queda de ${(queda * 100).toFixed(0)}% no preço!`,
    message: `${produto.titulo.slice(0, 60)}\nDe R$ ${antes.toFixed(2)} para R$ ${agora.toFixed(2)}`
  });
}