# Uber — Projeto Figma Turbo

Implementação do projeto **Uber** do curso Figma Turbo usando **HTML5, CSS3, JavaScript, Vue 3 e Tailwind CSS** (Vite).

## Telas

| Rota | Tela do Figma | O que dá pra fazer |
|------|---------------|--------------------|
| `#/` | TELA 01 – Home | Abas Rides/Delivery, busca, lugares recentes, sugestões, carrosséis, barra inferior |
| `#/` + "Now" | TELA 06 – Schedule a trip | Escolher dia e janela de horário (bottom sheet) |
| `#/search` | TELA 03 – Busca | Filtrar destinos digitando, escolher um resultado |
| `#/stops` | TELA 04 – Paradas | Adicionar/remover até 5 paradas |
| `#/ride` | TELA 02 – Opções de corrida | Selecionar UberX / Share / Connect, botão muda o nome |
| `#/pickup` | TELA 05 – Local de embarque | Trocar zona de embarque, editar local, confirmar |
| `#/trips` | TELA 07 – My Trips | Filtrar All / Personal / Work (aba "Activity" da barra) |

## Rodar localmente

```bash
npm install
npm run dev
```

## Publicar no GitHub Pages

> A URL precisa ter **nome e sobrenome** do aluno, então crie o repositório com um nome tipo
> `uber-nome-sobrenome` → o link fica `https://SEU-USUARIO.github.io/uber-nome-sobrenome/`.

**Opção 1 — automática (recomendada):**
1. Crie o repositório `uber-nome-sobrenome` no GitHub e envie estes arquivos para a branch `main`.
2. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. O workflow `.github/workflows/deploy.yml` faz o build e publica sozinho (aba **Actions**).

**Opção 2 — sem build:**
A pasta `dist/` já vem compilada. Basta subir **o conteúdo** de `dist/` para um repositório e, em
**Settings → Pages**, escolher **Deploy from a branch → main → / (root)**.

Depois de publicar, teste o link numa **janela anônima**.
