import { useState } from 'react';

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

  return (
    <div className="flex h-[calc(100vh-3rem)] overflow-hidden">
      <aside className="w-96 flex flex-col border-r border-base-300 bg-base-100">
        <div className="p-6 border-b border-base-300">
          <h1 className="text-base font-medium">Video Project</h1>
          <p className="text-sm text-base-content/60">Untitled_Project_01</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h3 className="text-xs font-medium text-base-content/60 mb-3 uppercase tracking-wider">
              1. Upload Media
            </h3>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex flex-col items-center gap-4 rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : 'border-base-300 bg-base-200/50'
              }`}
            >
              <svg
                className="w-12 h-12 text-base-content/40"
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
                <p className="text-base font-semibold mb-1">Drag & Drop Media</p>
                <p className="text-sm text-base-content/60">
                  Upload videos, images, or audio
                </p>
              </div>
              <label className="btn btn-primary btn-sm">
                <span>Browse Files</span>
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
                    className="flex items-center gap-2 p-2 bg-base-200 rounded text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="truncate flex-1">{file.name}</span>
                    <span className="text-xs text-base-content/50">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-medium text-base-content/60 mb-3 uppercase tracking-wider">
              2. Enter Script
            </h3>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="textarea textarea-bordered w-full min-h-36 text-sm"
              placeholder="Tell your story here. The AI will match your media to the script."
            />
          </div>

          <div>
            <h3 className="text-xs font-medium text-base-content/60 mb-3 uppercase tracking-wider">
              3. Settings
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
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
                  <span className="text-sm font-medium">AI Voiceover</span>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={aiVoiceover}
                  onChange={(e) => setAiVoiceover(e.target.checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-base-200/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
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
                  <span className="text-sm font-medium">Auto-subtitles</span>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={autoSubtitles}
                  onChange={(e) => setAutoSubtitles(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-base-300 space-y-3 shrink-0">
          <button onClick={handleGenerate} className="btn btn-primary w-full">
            Generate Video
          </button>
          <button
            onClick={handleReset}
            className="btn btn-ghost btn-sm w-full text-base-content/60 hover:text-base-content"
          >
            Reset
          </button>
        </div>
      </aside>

      <section className="flex flex-1 items-center justify-center p-10 overflow-y-auto bg-base-100">
        <div className="text-center max-w-sm">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-base-200 ring-1 ring-base-300">
            <svg
              className="w-14 h-14 text-base-content/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Create your video</h2>
          <p className="text-base-content/60">
            Upload your media and write a script to get started. Your generated
            video will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}
