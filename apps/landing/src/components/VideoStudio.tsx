import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export function VideoStudio() {
  const [script, setScript] = useState('');
  const [aiVoiceover, setAiVoiceover] = useState(true);
  const [autoSubtitles, setAutoSubtitles] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...files]);
    }
  };

  const handleGenerate = () => {
    console.log('Generating video with:', {
      files: uploadedFiles,
      script,
      aiVoiceover,
      autoSubtitles,
    });
  };

  const handleReset = () => {
    setScript('');
    setUploadedFiles([]);
    setAiVoiceover(true);
    setAutoSubtitles(true);
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (uploadedFiles.length === 0) {
      setPreviewUrl(null);
      return;
    }
    const file = uploadedFiles[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
      setPreviewUrl(null);
    };
  }, [uploadedFiles]);

  return (
    <div className="flex h-full overflow-hidden">
      <aside className="w-96 flex flex-col border-r border-border-stealth bg-zinc-900/40">
        <div className="p-6 border-b border-border-stealth">
          <h1 className="text-base font-medium text-white">Video Project</h1>
          <p className="text-sm text-text-secondary">Untitled_Project_01</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <div>
            <h3 className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wider">
              1. Upload Media
            </h3>
            <Card
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center gap-4 border-2 border-dashed bg-black/20 transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-border-stealth'
              }`}
            >
              <CardContent className="flex flex-col items-center gap-4 py-8">
              <svg
                className="w-12 h-12 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <div className="text-center">
                <p className="text-base font-semibold mb-1 text-white">Drag & Drop Media</p>
                <p className="text-sm text-text-secondary">
                  Upload videos, images, or audio
                </p>
              </div>
              <label className="cursor-pointer">
                <Button asChild className="min-w-[120px]">
                  <div className="min-w-[120px]">Browse Files</div>
                </Button>
                <input
                  type="file"
                  multiple
                  accept="video/*,image/*,audio/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
              </CardContent>
            </Card>
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, idx) => {
                  const fileType = file.type.startsWith('image')
                    ? 'Image'
                    : file.type.startsWith('video')
                    ? 'Video'
                    : file.type.startsWith('audio')
                    ? 'Audio'
                    : 'File';

                  const badgeVariant = file.type.startsWith('image')
                    ? 'default'
                    : file.type.startsWith('video')
                    ? 'secondary'
                    : 'outline';

                  return (
                    <Card
                      key={idx}
                      className="bg-black/20 border-border-stealth"
                    >
                      <CardContent className="flex items-center gap-2 p-3">
                        <Badge variant={badgeVariant} className="shrink-0">
                          {fileType}
                        </Badge>
                        <span className="truncate flex-1 text-white text-sm">{file.name}</span>
                        <span className="text-xs text-text-secondary shrink-0">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wider">
              2. Enter Script
            </h3>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full resize-none rounded-xl text-white focus:outline-0 focus:ring-1 focus:ring-zinc-500 border border-border-stealth bg-black/20 min-h-36 placeholder:text-zinc-600 p-4 text-sm font-normal transition-all"
              placeholder="Tell your story here. The AI will match your media to the script."
            />
          </div>

          <div>
            <h3 className="text-xs font-medium text-text-secondary mb-3 uppercase tracking-wider">
              3. Settings
            </h3>
            <div className="space-y-2">
              <Card className="bg-black/20 border-border-stealth">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                    <Label htmlFor="ai-voiceover" className="text-sm font-medium text-white cursor-pointer">
                      AI Voiceover
                    </Label>
                  </div>
                  <Switch
                    id="ai-voiceover"
                    checked={aiVoiceover}
                    onCheckedChange={setAiVoiceover}
                  />
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-border-stealth">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <Label htmlFor="auto-subtitles" className="text-sm font-medium text-white cursor-pointer">
                      Auto-subtitles
                    </Label>
                  </div>
                  <Switch
                    id="auto-subtitles"
                    checked={autoSubtitles}
                    onCheckedChange={setAutoSubtitles}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border-stealth space-y-3 shrink-0">
          <Button size="lg" className="w-full" onClick={handleGenerate}>
            Generate Video
          </Button>
          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </aside>

      <section className="flex flex-1 items-center justify-center p-10 overflow-y-auto bg-background-dark">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-border-stealth overflow-hidden">
              <svg className="w-14 h-14 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Create your video</h2>
          <p className="text-text-secondary">
            Upload your media and write a script to get started. Your generated
            video will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}
