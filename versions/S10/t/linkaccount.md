---
title: Pripojení účtů
titleTemplate: Season 10
description: Návod jak propojit Java a Bedrock Edition účty
head:
  - [link, { rel: "icon", href: "/icon/s10.png" }]
  - [meta, { name: "og:site_name", content: "SuroCraft Wiki" }]
  - [meta, { name: "theme-color", content: "#3a00ad" }]
  - [meta, { name: "og:image", content: "/icon/s10.png" }]
  - [link, { rel: "stylesheet", href: "/style/s10.css" }]
---

# Propojení účtů

Jak už všichni víme, SuroCraft podporuje hráče na edici Java i Bedrock.\
Někteří z nás hrají pouze na mobilu, někteří jen na pc.\
Ale co když hraješ na pc a někdy si zahraješ i na mobilu?\
**Je lepší si propojit účty k synchronizaci předmětů, bloků, brnění v inventáři nebo třeba rank atd.**

::: danger
**Mohou se vám ztratit věci z inventáře! Zálohujte si je i s ender bednou!**
:::

::: warning
SuroCraft už nepodporuje **Geyser global linking**! Propojení se dělá lokálně.
:::

### Propojení

1. Připoj se na server přes **Java účet**.
   1. Použij příkaz **`/unlinkaccount`**, pokud si ho dřív zkoušel.\
      Je to pro jistotu, krok ale můžeš zkusit přeskočit.
   2. Použij příkaz **`/linkaccount`**` ``<jméno>`.\
      A místo `<jméno>` doplň **přezdívku tvého Bedrock účtu**.\
      Z příkazu **získáš kód**, který si **zapiš**, nebo **zapamatuj**.
   3. **Odpoj se** z Java účtu ze serveru.
2. Připoj se na server přes **Bedock účet**.
   1. Použij příkaz **`/linkaccount`**` ``<jméno> <kód>`.\
      Místo `<jméno>` doplň **Java přezdívku**.\
      A místo `<kód>` dej **kód**, který si získal v předešlých krocích.
   2. Při úspěchu tě **server vyhodí**.
3. Účty by měly být **propojeny**.
