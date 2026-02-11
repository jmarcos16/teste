import { useState } from 'react';
import { Button } from './ui/button';

export function HomeStudio() {
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

  return (
    <div className="flex-1 relative z-10">
      <section className="relative pt-24 pb-20 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Create your video
          </h1>
          <p className="text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
            Upload your media and write a script to get started. Your generated video will appear here.
          </p>
          <div className="flex items-center justify-center gap-4">
            <p className="text-xs text-white/50 font-mono bg-zinc-900/50 px-3 py-1 rounded-md border border-zinc-800/50">
              Project: Untitled_Project_01
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Upload Media Card */}
          <div className="bg-zinc-900/40 border border-border-stealth rounded-xl p-6 transition-all hover:border-zinc-700 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-background-dark text-[10px] font-bold">
                1
              </span>
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
                Upload Media
              </h3>
            </div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-8 transition-all group cursor-pointer ${
                isDragging
                  ? 'border-zinc-600 bg-black/40'
                  : 'border-border-stealth bg-black/20 hover:border-zinc-600'
              }`}
            >
              <svg className="w-8 h-8 text-zinc-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div className="flex flex-col items-center gap-1">
                <p className="text-white text-base font-medium text-center">
                  Drag & Drop Media
                </p>
                <p className="text-text-secondary text-sm text-center">
                  Videos, images, or audio
                </p>
              </div>
              <label className="mt-4 cursor-pointer">
                <Button asChild className="min-w-[120px]">
                  <div className="min-w-[120px]"><span className="truncate">Browse Files</span></div>
                </Button>
                <input
                  type="file"
                  multiple
                  accept="video/*,image/*,audio/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-black/20 rounded text-sm border border-border-stealth"
                  >
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate flex-1 text-white">{file.name}</span>
                    <span className="text-xs text-text-secondary">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enter Script Card */}
          <div className="bg-zinc-900/40 border border-border-stealth rounded-xl p-6 transition-all hover:border-zinc-700 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-background-dark text-[10px] font-bold">
                2
              </span>
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
                Enter Script
              </h3>
            </div>
            <div className="flex-1 flex flex-col">
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                className="flex w-full flex-1 resize-none rounded-xl text-white focus:outline-0 focus:ring-1 focus:ring-zinc-500 border border-border-stealth bg-black/20 min-h-[160px] placeholder:text-zinc-600 p-4 text-base font-normal transition-all"
                placeholder="Tell your story here. The AI will match your media to the script."
              />
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-zinc-900/40 border border-border-stealth rounded-xl p-6 transition-all hover:border-zinc-700 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-white text-background-dark text-[10px] font-bold">
                3
              </span>
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
                Settings
              </h3>
            </div>
            <div className="flex flex-col gap-3 flex-1 justify-center">
              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-border-stealth justify-between">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p className="text-white text-sm font-medium truncate">AI Voiceover</p>
                </div>
                <label className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full border-none p-0.5 ${aiVoiceover ? 'bg-zinc-100' : 'bg-zinc-800'}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={aiVoiceover}
                    onChange={(e) => setAiVoiceover(e.target.checked)}
                  />
                  <div className={`h-full w-[20px] rounded-full transition-all duration-200 ease-in-out ${aiVoiceover ? 'translate-x-[20px] bg-black' : 'translate-x-0 bg-zinc-400'}`}></div>
                </label>
              </div>

              <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-border-stealth justify-between">
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-white text-sm font-medium truncate">Auto-subtitles</p>
                </div>
                <label className={`relative flex h-[24px] w-[44px] cursor-pointer items-center rounded-full border-none p-0.5 ${autoSubtitles ? 'bg-zinc-100' : 'bg-zinc-800'}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={autoSubtitles}
                    onChange={(e) => setAutoSubtitles(e.target.checked)}
                  />
                  <div className={`h-full w-[20px] rounded-full transition-all duration-200 ease-in-out ${autoSubtitles ? 'translate-x-[20px] bg-black' : 'translate-x-0 bg-zinc-400'}`}></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 max-w-md mx-auto">
          <Button variant="default" size="lg" className="w-full" onClick={handleGenerate}>
            <span className="truncate">Generate Video</span>
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-text-secondary text-sm font-medium px-4 py-2" onClick={handleReset}>
              Reset all settings
            </Button>
            <span className="w-px h-4 bg-border-stealth"></span>
            <Button variant="ghost" className="text-text-secondary text-sm font-medium px-4 py-2">
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
