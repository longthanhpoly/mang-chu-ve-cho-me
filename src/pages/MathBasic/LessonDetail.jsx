import React, { useState } from 'react';
import { ChevronRight, Volume2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { speak } from '../../utils/textToSpeech';

const LessonDetail = ({ lesson, onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = lesson.content;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete();
    }
  };

  const renderSection = (section) => {
    switch (section.type) {
      case 'visual_counting':
        return <VisualCounting data={section.data} />;
      case 'concept':
        return <ConceptSection data={section.data} />;
      case 'example':
        return <ExampleSection data={section.data} />;
      case 'symbol':
        return <SymbolSection data={section.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="lesson-detail">
      <div className="lesson-header">
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-progress">
          {currentSection + 1} / {sections.length}
        </div>
      </div>

      <div className="lesson-content-area">
        {renderSection(sections[currentSection])}
      </div>

      <div className="lesson-navigation">
        <Button
          variant="primary"
          size="large"
          onClick={handleNext}
          className="lesson-next-btn"
        >
          {currentSection < sections.length - 1 ? (
            <>Tiếp theo <ChevronRight /></>
          ) : (
            'Làm bài kiểm tra'
          )}
        </Button>
      </div>
    </div>
  );
};

// Visual Counting Component
const VisualCounting = ({ data }) => {
  const handleSpeak = (number, item) => {
    speak(`${number}. ${item}`);
  };

  return (
    <div className="visual-counting">
      <h2 className="section-title">Nhìn và đếm</h2>
      <div className="counting-grid">
        {data.items.map((item, index) => (
          <button
            key={index}
            className="counting-item"
            onClick={() => handleSpeak(item.number, item.item)}
          >
            <div className="counting-number">{item.count}</div>
            <div className="counting-text">{item.item}</div>
            <div className="counting-word">{item.number}</div>
            <Volume2 className="counting-audio-icon" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Concept Section Component
const ConceptSection = ({ data }) => {
  if (data.steps) {
    return (
      <div className="concept-section">
        <h2 className="section-title">{data.title}</h2>
        <div className="concept-steps">
          {data.steps.map((step, index) => (
            <div key={index} className="concept-step">
              <div className="step-stage">{step.stage}</div>
              {step.visual && (
                <div className="step-visual">
                  <div className="step-count">{step.visual.count}</div>
                  <div className="step-item">{step.visual.item}</div>
                </div>
              )}
              {step.action && (
                <div className="step-action">{step.action}</div>
              )}
              {step.read && (
                <button
                  className="step-read"
                  onClick={() => speak(step.read)}
                >
                  <Volume2 /> {step.read}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Match number example
  if (data.example) {
    return (
      <div className="concept-section">
        <h2 className="section-title">{data.title}</h2>
        <div className="match-example">
          <div className="match-visual">
            <div className="match-count">{data.example.visual.count}</div>
            <div className="match-item">{data.example.visual.item}</div>
          </div>
          <div className="match-options">
            {data.example.options.map((opt, i) => (
              <button
                key={i}
                className={`match-option ${i === data.example.correctIndex ? 'correct' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Example Section Component
const ExampleSection = ({ data }) => {
  return (
    <div className="example-section">
      <h2 className="section-title">{data.title}</h2>
      <div className="example-list">
        {data.examples.map((example, index) => (
          <div key={index} className="example-item">
            {example.scenario && (
              <div className="example-scenario">{example.scenario}</div>
            )}
            {example.operation && (
              <div className="example-operation">
                <span className="op-num">{example.operation.a}</span>
                <span className="op-item">{example.operation.item}</span>
                <span className="op-sign">+</span>
                <span className="op-num">{example.operation.b}</span>
                <span className="op-item">{example.operation.item}</span>
                <span className="op-equals">=</span>
                <span className="op-result">{example.operation.result}</span>
                <span className="op-item">{example.operation.item}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Symbol Section Component
const SymbolSection = ({ data }) => {
  return (
    <div className="symbol-section">
      <h2 className="section-title">{data.title}</h2>
      <button
        className="symbol-formula"
        onClick={() => speak(data.read || data.formula)}
      >
        <div className="formula-text">{data.formula}</div>
        <Volume2 className="formula-audio" />
      </button>
      {data.read && (
        <div className="formula-read">Đọc: "{data.read}"</div>
      )}
      {data.note && (
        <div className="formula-note">{data.note}</div>
      )}
    </div>
  );
};

export default LessonDetail;
