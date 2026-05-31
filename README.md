# Maneki Sushi

This repository contains a monorepo with a Vite React app in `apps/web`.

## Local development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000` in your browser.

## Vercel deployment

To deploy on Vercel:

1. Create a new Vercel project and connect the GitHub repository.
2. Set the root directory to `/`.
3. Set the build command to:

   ```bash
   npm run build
   ```

4. Set the output directory to:

   ```text
   dist/apps/web
   ```

5. Set the install command to:

   ```bash
   npm install
   ```

6. Choose `Other` as the framework preset if prompted.

If deployment is successful, Vercel will provide a public URL that you can share with your friend.
