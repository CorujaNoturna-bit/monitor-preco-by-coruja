function converterPreco(texto) {
    const limpo = texto.replace(/[^\d,]/g, "").replace(",", ".");
    const valor = parseFloat(limpo);
    return isNaN(valor) ? null : valor;
}

function lerPreco() {
    const seletores = [
        ".a-price .a-offscreen",
        "#corePrice_feature_div .a-offscreen",
        "#priceblock_ourprice",
        "#priceblock_dealprice"
    ];

    for (const sel of seletores) {
        const el = document.querySelector(sel);
        if (el && el.textContent.trim()) {
            return converterPreco(el.textContent);
        }
    }
    return null;
}

function lerTitulo() {
    const el = document.querySelector("#productTitle");
    return el ? el.textContent.trim() : document.title;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.tipo === "LER_PRODUTO") {
        sendResponse({
            titulo: lerTitulo(),
            preco: lerPreco(),
            url: location.href.split("?")[0]
        });
    }
});