# 📉 Monitor de Preços Amazon

Extensão para Google Chrome que monitora produtos na Amazon e envia notificações automáticas no navegador sempre que detectar uma queda expressiva de preço.

---

## 🚀 Funcionalidades

- **Monitoramento:** Adicione produtos à sua lista diretamente pela aba aberta na Amazon.
- **Checagem em segundo plano:** O script verifica os preços automaticamente a cada 60 minutos.
- **Histórico local:** Mantém o registro do preço inicial, atual e menor preço observado.
- **Notificação nativa:** Alertas no desktop sempre que o preço cair 15% ou mais em relação ao valor registrado.
- **100% Local:** Sem cadastro ou servidores externos; todos os dados ficam salvos localmente via `chrome.storage.local`.

---

## 🛠️ Como Instalar e Usar

Como este projeto ainda não está na Chrome Web Store, instale-o no modo de desenvolvedor:

### 1. Obtenha o código
- Baixe o código clicando em **Code > Download ZIP** 

### 2. Carregue no Chrome
1. Abra o Google Chrome e acesse: `chrome://extensions/`
2. Ative o botão **Modo do desenvolvedor** no canto superior direito.
3. Clique em **Carregar sem compactação** (ou *Load unpacked*).
4. Selecione a pasta onde estão os arquivos do projeto (a pasta que contém o `manifest.json`).

---

## 📖 Como Usar

1. Acesse qualquer página de produto na Amazon Brasil.
2. Clique no ícone da extensão na barra de ferramentas do Chrome.
3. Clique em **"Monitorar este produto"**.
4. Pronto! O produto aparecerá na sua lista e o navegador monitorará o valor em segundo plano.
5. Você será notificado quando houver uma mudança no preço.

---

## 🧰 Tecnologias Utilizadas

- **JS**
- **Chrome Extension API (Manifest V3)**:
  - `chrome.alarms`
  - `chrome.notifications`
  - `chrome.storage.local`
  - `chrome.tabs`

---

## Observações

- A extensão monitora apenas URLs da **Amazon**.
- A captura de preços depende da estrutura de classes HTML da Amazon. Mudanças estruturais no site da Amazon podem exigir atualização dos seletores no arquivo `content.js` e `background.js`.

## "A extensão não funciona"

- Certifique de que o seu sistema operacional não esteja bloqueando as notificações.

## Produto em versão Alfa.

- Erros são esperados 
- Novas lojas serão adicionadas futuramente 
