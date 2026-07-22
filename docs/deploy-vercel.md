# Deploy en Vercel — acerosymetalesurgentes.com

Guía para publicar el sitio (Next.js 16) en Vercel. El proyecto ya compila
en producción (`next build` ✓) y funciona en **modo demo** sin configurar
ninguna variable, así que el primer deploy es directo.

---

## 1. Prerrequisitos

- Repo en GitHub: **`Chikawaztla-Ai/aceros-y-metales`** (rama `main`, ya pusheado).
- Una cuenta en [vercel.com](https://vercel.com) (el plan gratuito alcanza).
  Conviene entrar con la misma cuenta de GitHub del proyecto (Chikawaztla-Ai).

## 2. Importar el proyecto

1. En Vercel: **Add New → Project**.
2. **Import Git Repository** → conecta tu GitHub si es la primera vez → elige
   **`aceros-y-metales`**.
3. Vercel detecta **Next.js** automáticamente. No cambies nada:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command / Output: los que trae por defecto.
4. **Deploy**. En ~1–2 min tendrás una URL tipo
   `https://aceros-y-metales.vercel.app`.

> Modo demo: mientras Supabase no esté configurado, el middleware abre
> `/admin`, `/portal` y `/checkout` sin login, con datos de ejemplo. Ideal
> para que el cliente revise. El índice para revisión es **`/demo`**.

## 3. Variables de entorno

**Para el primer deploy (demo): ninguna es obligatoria.** Todo tiene valores
por defecto o degrada a modo demo.

Recomendado tras el primer deploy: en **Settings → Environment Variables**
agrega solo esta y vuelve a desplegar (**Deployments → ⋯ → Redeploy**):

| Variable | Valor | Nota |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | la URL de Vercel (ej. `https://aceros-y-metales.vercel.app`) | Para metadatos y enlaces correctos |

### Para producción real (más adelante)

Cuando se conecten catálogo, cotizaciones y pagos, agregar (ver `.env.example`):

| Grupo | Variables |
|---|---|
| Supabase | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| Mercado Pago | `MP_ACCESS_TOKEN`, `MP_WEBHOOK_SECRET`, `NEXT_PUBLIC_MP_PUBLIC_KEY` |
| Emails (Resend) | `RESEND_API_KEY`, `EMAIL_FROM`, `ADMIN_EMAIL` |
| Transferencia | `BANK_NAME`, `BANK_BENEFICIARY`, `BANK_CLABE`, `BANK_ACCOUNT` |
| Otros | `NEXT_PUBLIC_WA_NUMBER`, `NEXT_PUBLIC_DEMO_PREVIEW=0` (para forzar login) |

> Al configurar Supabase, el login se activa solo. Poner
> `NEXT_PUBLIC_DEMO_PREVIEW=0` fuerza el login aun sin Supabase.

## 4. Después del deploy

- Comparte con el cliente: `https://<tu-deploy>.vercel.app/demo`
- **Auto-deploy:** cada `git push` a `main` genera un nuevo deploy automático.
  Cada rama/PR genera un *Preview* con su propia URL.

## 5. Dominio propio (cuando esté listo)

1. Vercel → **Settings → Domains** → agrega `acerosymetalesurgentes.com`.
2. Apunta el DNS en el registrador (Hostinger) según las instrucciones que
   Vercel muestra (registro `A`/`CNAME`).
3. Actualiza `NEXT_PUBLIC_SITE_URL` al dominio final y redeploy.

---

## Notas técnicas

- Warnings inofensivos en el build (no bloquean nada):
  - `middleware` deprecado → renombrar a `proxy` es una mejora futura de Next 16.
  - Aviso de tipo de módulo de `tailwind.config.ts` (solo performance).
- El build genera 49 páginas estáticas + rutas API dinámicas (`/api/pagos/*`).
