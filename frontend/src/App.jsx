import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import axios from "axios";
import Markdowm from "react-markdown"

const App = () => {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState(``);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3000/ai/get-response", { code })
      setReview(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 md:p-8 font-sans">
      {/* Main Container */}
      <div className="w-full h-[90vh] flex flex-col lg:flex-row gap-6 lg:gap-8">

        {/* LEFT DIV: Highlighting Editor */}
        <div className="flex-1 relative group rounded-xl overflow-hidden p-0.5">
          {/* Animated Border */}
          <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1e293b_0%,#3b82f6_25%,#1e293b_50%,#3b82f6_75%,#1e293b_100%)]" />

          <div className="relative h-full w-full bg-slate-900 rounded-xl flex flex-col overflow-hidden">
            {/* Header bar from the UI you liked */}
            <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-xs font-mono ml-2 uppercase tracking-widest">Paste your code here</span>
              </div>
            </div>

            {/* Editor Area with proper Scrolling and Selection */}
            <div className="flex-1 overflow-auto scrollbar-custom relative">
              <Editor
                name='code'
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.js)}
                padding={20}
                className="font-mono text-sm min-h-full editor-content"
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: 14,
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                }}
              />
            </div>

            {/* Submit Button (Bottom Right) */}
            <button
              onClick={handleSubmit}
              className={`
                absolute bottom-6 right-6 
                px-6 py-2.5 rounded-lg font-bold text-sm
                transition-all duration-300 ease-in-out
                flex items-center gap-2 z-20
                ${isSubmitting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/40 hover:shadow-blue-500/50'
                }
              `}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
              ) : "Review Code"}
            </button>
          </div>
        </div>
        {/* RIGHT DIV: Output Preview */}
        <div className="flex-1 relative group rounded-xl overflow-hidden p-0.5">
          <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] bg-[conic-gradient(from_90deg_at_50%_50%,#1e293b_0%,#8b5cf6_25%,#1e293b_50%,#8b5cf6_75%,#1e293b_100%)]" />

          <div className="relative h-full w-full bg-slate-900 rounded-xl flex flex-col">
            <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
              <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Review of code</span>
            </div>
            <div className="flex-1 p-6 overflow-auto scrollbar-custom font-mono text-sm text-emerald-500">
              {review ? (
                <pre className="whitespace-pre-wrap leading-relaxed">
                  <Markdowm>{review}</Markdowm>
                </pre>
              ) : (
                <span className="text-slate-600 italic">No review to display...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;