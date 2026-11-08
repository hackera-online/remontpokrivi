# РЕМОНТ НА ПОКРИВИ: remontpokrivibg.com

Статичен сайт за GitHub Pages. Домейн: https://www.remontpokrivibg.com/

## Качване в GitHub
1. Качете съдържанието на тази папка в корена на repo (включително CNAME и .nojekyll).
2. Settings > Pages > Source: Deploy from a branch > main / (root).
3. Custom domain: www.remontpokrivibg.com, после включете Enforce HTTPS.

## DNS при регистратора
- CNAME: host `www` > `<github-user>.github.io`
- A записи за `@` (apex): 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- По избор AAAA за `@`: 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153

## След публикуване
1. Google Search Console: добавете свойство "Domain" (remontpokrivibg.com), потвърдете с DNS TXT запис.
2. Sitemaps: подайте https://www.remontpokrivibg.com/sitemap.xml
3. URL Inspection > Request indexing за началната страница и страниците на услугите.
4. Създайте и потвърдете Google Business Profile (Google Maps).

## Структура
- `/` начална страница
- `/<услуга>/` 8 страници за услуги
- `/remont-na-pokrivi-<град>/` 32 страници за градове
- `sitemap.xml`, `robots.txt`, `404.html`, `site.webmanifest`
