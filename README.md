This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Variáveis de ambientes locais 

Adicione um arquivo .env.local na raiz desse projeto, no mesmo path em que se encontra esse readme e insira as variáveis:

NEXT_PUBLIC_API_USUARIOS_URL=http://localhost:8080
NEXT_PUBLIC_API_ANUNCIOS_URL=http://localhost:8081
NEXT_PUBLIC_API_USUARIO=/api/usuarios
NEXT_PUBLIC_API_VENDEDORES=/api/vendedores
NEXT_PUBLIC_API_USUARIO_RESEND_EMAIL=/api/usuarios/resend_confirmation
NEXT_PUBLIC_API_AUTH_LOGIN=/api/auth/login
NEXT_PUBLIC_API_CONFIRM_EMAIL_TOKEN=/confirmacao_email
NEXT_PUBLIC_API_RECUPERAR_SENHA_EMAIL=/api/auth/reset_password
NEXT_PUBLIC_API_RECUPERAR_SENHA=/api/auth/confirm_reset_password
NEXT_PUBLIC_API_ENDERECO_VIACEP=https://viacep.com.br/ws
NEXT_PUBLIC_API_ANUNCIO=/api/anuncios
NEXT_PUBLIC_API_FRONTEND=http://localhost:3000
NEXT_PUBLIC_API_AUTH=/api/auth/token
NEXT_PUBLIC_API_CHAT=/api/chats

