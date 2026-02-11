# API (Elysia)

Backend para upload de arquivos via streaming.

## Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API info (`name`, `version`) |
| POST | `/upload/stream` | Upload via streaming de dados binários |

## Testes com Insomnia/Postman

📦 **Collections prontas:**
- `collections/insomnia-collection.json` - Importe no Insomnia
- `collections/postman-collection.json` - Importe no Postman

📖 **Guia completo:** Veja [UPLOAD_GUIDE.md](./UPLOAD_GUIDE.md) para instruções detalhadas de como testar cada endpoint.

### Quick Start

1. Inicie o servidor da raiz do projeto:
```bash
bun run dev:api
```

2. Teste o upload:
```bash
curl -X POST http://localhost:3000/upload/stream \
  -H "Content-Type: video/mp4" \
  --data-binary "@/caminho/para/video.mp4"
```

## Como Funciona

O endpoint `/upload/stream` recebe dados binários raw e salva diretamente no servidor.

**Vantagens:**
- Eficiente para arquivos grandes
- Menos overhead que multipart/form-data
- Processa o arquivo enquanto recebe (streaming real)
- Detecta automaticamente a extensão pelo Content-Type

**Headers opcionais:**
- `Content-Type`: tipo MIME do arquivo (ex: `video/mp4`, `image/jpeg`)
- `X-File-Name`: nome customizado do arquivo (ex: `meu-video.mp4`)

Se não especificar a extensão no `X-File-Name`, ela será detectada automaticamente pelo `Content-Type`.

## Arquivos Enviados

Os uploads são salvos em `apps/api/uploads/` com nomenclatura:
```
{timestamp}-{nome-original}
```

## Run

Para rodar o servidor, execute da raiz do projeto:

```bash
bun run dev:api
```

Ou diretamente da pasta da API:

```bash
cd apps/api
bun run dev
```

O servidor estará disponível em `http://localhost:3000`

## Tipos de Arquivo Suportados

A API detecta automaticamente a extensão correta baseada no `Content-Type`:

- Vídeos: `.mp4`, `.mpeg`, `.mov`, `.avi`, `.webm`
- Imagens: `.jpg`, `.png`, `.gif`
- Documentos: `.pdf`, `.zip`
- Outros tipos são aceitos com extensão genérica

## Próximos Passos

- [ ] Adicionar autenticação
- [ ] Validação de tipos permitidos
- [ ] Limite de tamanho configurável
- [ ] Armazenamento em cloud (S3, etc.)
- [ ] Progress tracking
