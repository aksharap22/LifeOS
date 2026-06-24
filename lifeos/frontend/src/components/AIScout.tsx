import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Send, X } from 'lucide-react';
import { challengeTemplates } from '../data/challengeTemplates';

const AIScout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();

  const questions = [
    "What is your biggest struggle right now? (e.g., Focus, Anxiety, Sleep, Social)",
    "Do you prefer short, intense challenges (3-7 days) or longer ones (14+ days)?",
    "On a scale of 1-10, how much free time do you have daily?"
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      recommendChallenge(newAnswers);
    }
  };

  const recommendChallenge = (finalAnswers: string[]) => {
    const focusKeyword = finalAnswers[0].toLowerCase();
    let recommendation = challengeTemplates[0];

    if (focusKeyword.includes('focus') || focusKeyword.includes('attention')) {
      recommendation = challengeTemplates.find(t => t.id === 'digital-shadow-box') || recommendation;
    } else if (focusKeyword.includes('sleep')) {
      recommendation = challengeTemplates.find(t => t.id === 'deep-sleep-protocol') || recommendation;
    } else if (focusKeyword.includes('anxiety') || focusKeyword.includes('emotional')) {
      recommendation = challengeTemplates.find(t => t.id === 'ninety-second-rule') || recommendation;
    }
    
    setIsOpen(false);
    navigate(`/accept/${recommendation.id}`);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-cyan-500 p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Bot size={24} className="text-black" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-[100] border border-white/10 bg-[#0a0a0a] p-6 w-80 shadow-2xl animate-in slide-in-from-bottom-10">
      <div className="flex items-center justify-between mb-6 text-cyan-400">
        <div className="flex items-center gap-3">
          <Bot size={24} />
          <h2 className="text-sm font-black uppercase tracking-widest">AI Scout</h2>
        </div>
        <button onClick={() => setIsOpen(false)}><X size={18} /></button>
      </div>
      <p className="text-white mb-6 leading-relaxed text-sm">{questions[step]}</p>
      <div className="space-y-3">
        <input 
          type="text" 
          placeholder="Type your answer..." 
          className="w-full bg-black border border-white/10 p-3 text-white text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              handleAnswer(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <button 
          className="w-full bg-cyan-500 p-3 font-bold text-black hover:bg-cyan-400 flex items-center justify-center gap-2 text-sm"
          onClick={(e) => {
            const input = e.currentTarget.parentElement?.querySelector('input');
            if (input && input.value.trim()) {
              handleAnswer(input.value);
              input.value = '';
            }
          }}
        >
          Send <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default AIScout;
