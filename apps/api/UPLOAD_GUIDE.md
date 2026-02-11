# Guia de Upload - Testes com Insomnia/Postman

Este guia demonstra como testar o endpoint de upload via streaming.

## Iniciar o Servidor

```bash
cd apps/api
bun run dev
```

O servidor estará rodando em `http://localhost:3000`

---

## Upload via Streaming (Binary Raw)

**Endpoint:** `POST http://localhost:3000/upload/stream`

### No Postman/Insomnia:

1. Selecione método **POST**
2. URL: `http://localhost:3000/upload/stream`
3. Na aba **Headers** (opcional):
   - `X-File-Name`: `meu-video.mp4` (se quiser definir um nome específico)
4. Na aba **Body**, selecione **Binary File**
5. Selecione o arquivo que deseja enviar

### Resposta esperada:

```json
{
  "success": true,
  "fileName": "1707668400000-meu-video.mp4",
  "size": 2048576,
  "uploadedAt": "2026-02-11T12:05:00.000Z"
}
```

### Detecção Automática de Extensão

O servidor detecta automaticamente a extensão do arquivo baseado no `Content-Type`:

**Vídeos:**
- `video/mp4` → `.mp4`
- `video/mpeg` → `.mpeg`
- `video/quicktime` → `.mov`
- `video/x-msvideo` → `.avi`
- `video/webm` → `.webm`

**Imagens:**
- `image/jpeg` → `.jpg`
- `image/png` → `.png`
- `image/gif` → `.gif`

**Outros:**
- `application/pdf` → `.pdf`
- `application/zip` → `.zip`

---

## Arquivos Enviados

Todos os arquivos são salvos na pasta `apps/api/uploads/` com o formato:
```
{timestamp}-{nome-arquivo}
```

Exemplo: `1707668400000-meu-video.mp4`

---

## Script de Teste com cURL

### Upload de Vídeo:
```bash
curl -X POST http://localhost:3000/upload/stream \
  -H "Content-Type: video/mp4" \
  --data-binary "@/caminho/para/video.mp4"
```

### Upload de Imagem:
```bash
curl -X POST http://localhost:3000/upload/stream \
  -H "Content-Type: image/jpeg" \
  -H "X-File-Name: foto.jpg" \
  --data-binary "@/caminho/para/foto.jpg"
```

### Upload de PDF:
```bash
curl -X POST http://localhost:3000/upload/stream \
  -H "Content-Type: application/pdf" \
  --data-binary "@/caminho/para/documento.pdf"
```

---

## Notas Importantes

1. **Sem Autenticação:** Nenhum endpoint requer autenticação
2. **Streaming Real:** O arquivo é processado enquanto é recebido
3. **CORS:** Já configurado para permitir requisições do localhost
4. **Extensão Automática:** Se não especificar no header `X-File-Name`, a extensão é detectada pelo `Content-Type`

---

## Próximos Passos

- [ ] Adicionar autenticação
- [ ] Validação de tipos permitidos
- [ ] Limite de tamanho configurável  
- [ ] Armazenamento em cloud (S3, Azure Blob, etc.)
- [ ] Progress tracking em tempo real
