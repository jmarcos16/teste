import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { API_URL } from '../lib/eden';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadResponse {
  success: boolean;
  fileName?: string;
  size?: number;
  uploadedAt?: string;
  error?: string;
}

export function UploadDropzone() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setStatus('idle');
      setUploadResult(null);
      setProgress(0);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mpeg', '.mov', '.avi', '.webm'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStatus('uploading');
    setProgress(0);
    setUploadResult(null);

    try {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      });

      const uploadPromise = new Promise<UploadResponse>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch {
              reject(new Error('Invalid response'));
            }
          } else {
            reject(new Error(`HTTP ${xhr.status}`));
          }
        });

        xhr.addEventListener('error', () => reject(new Error('Network error')));
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')));
      });

      xhr.open('POST', `${API_URL}/upload/stream`);
      xhr.setRequestHeader('Content-Type', selectedFile.type || 'application/octet-stream');
      xhr.setRequestHeader('X-File-Name', selectedFile.name);
      xhr.send(selectedFile);

      const result = await uploadPromise;

      if (result.success) {
        setStatus('success');
        setUploadResult(result);
      } else {
        setStatus('error');
        setUploadResult(result);
      }
    } catch (error) {
      setStatus('error');
      setUploadResult({
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          rounded-xl border-2 border-dashed p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive 
            ? 'border-primary bg-primary/10 scale-[1.02]' 
            : 'border-base-300 bg-base-200/50 hover:border-primary/50 hover:bg-base-200'
          }
          ${status === 'uploading' ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-3">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDragActive ? 'bg-primary/20' : 'bg-base-300'
          }`}>
            <svg className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-base-content/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          {selectedFile ? (
            <div className="space-y-1">
              <p className="font-semibold text-base-content">{selectedFile.name}</p>
              <p className="text-sm text-base-content/60">
                {formatFileSize(selectedFile.size)} • {selectedFile.type || 'unknown type'}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="font-semibold text-base-content">
                {isDragActive ? 'Solte o arquivo aqui' : 'Arraste um vídeo ou imagem'}
              </p>
              <p className="text-sm text-base-content/60">
                ou clique para selecionar
              </p>
            </div>
          )}
          
          <p className="text-xs text-base-content/50">
            Formatos suportados: MP4, MPEG, MOV, AVI, WebM, JPG, PNG, GIF
          </p>
        </div>
      </div>

      {selectedFile && status === 'idle' && (
        <button
          onClick={handleUpload}
          className="btn btn-primary btn-block gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Fazer Upload
        </button>
      )}

      {status === 'uploading' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-base-content/70">Enviando...</span>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status === 'success' && uploadResult && (
        <div className="rounded-xl bg-success/10 border border-success/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-success font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Upload concluído!
          </div>
          <div className="text-sm text-base-content/80 space-y-1 font-mono bg-base-100/50 p-3 rounded">
            <p><span className="text-base-content/60">Arquivo:</span> {uploadResult.fileName}</p>
            <p><span className="text-base-content/60">Tamanho:</span> {uploadResult.size ? formatFileSize(uploadResult.size) : 'N/A'}</p>
            <p><span className="text-base-content/60">Data:</span> {uploadResult.uploadedAt ? new Date(uploadResult.uploadedAt).toLocaleString('pt-BR') : 'N/A'}</p>
          </div>
          <button
            onClick={() => {
              setSelectedFile(null);
              setStatus('idle');
              setUploadResult(null);
              setProgress(0);
            }}
            className="btn btn-sm btn-ghost w-full"
          >
            Enviar outro arquivo
          </button>
        </div>
      )}

      {status === 'error' && uploadResult && (
        <div className="rounded-xl bg-error/10 border border-error/30 p-4 space-y-2">
          <div className="flex items-center gap-2 text-error font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Erro no upload
          </div>
          <p className="text-sm text-base-content/80">
            {uploadResult.error || 'Ocorreu um erro. Verifique se a API está rodando.'}
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setUploadResult(null);
              setProgress(0);
            }}
            className="btn btn-sm btn-ghost w-full"
          >
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  );
}
