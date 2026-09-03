import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail, ExternalLink, ChevronDown,
  Cpu, Code2, Cloud, Terminal, GraduationCap, Award, Send,
  Brain, Users, Sparkles, Layers, Database, Globe, ArrowUp,
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';

function Github({ size = 20, className = '', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function Linkedin({ size = 20, className = '', ...props }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

// Smooth Animated Running Dinosaur (Chrome T-Rex runner) in continuous motion
function DinosaurRunner({ isScrollingDown }) {
  return (
    <div
      className={`transition-transform duration-200 ease-out select-none will-change-transform ${isScrollingDown ? 'scale-x-100' : '-scale-x-100'
        }`}
      style={{ transformOrigin: 'center bottom' }}
    >
      <div className="animate-dino-run relative flex items-center justify-center">
        {/* T-Rex SVG */}
        <svg
          viewBox="0 0 28 28"
          width="24"
          height="24"
          fill="currentColor"
          className="text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
        >
          {/* T-Rex Head, Eye cutout, Snout, Body, Arm, Tail */}
          <path d="M22 2h-9v2h-1v2h-2v2H8v2H6v2H4v2H2v6h2v-2h2v1h8v-1h2v-1h2v-1h1V8h4V4h-2V2h-3zm-3 4a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4zm4 6h-3v-1h3v1z" />

          {/* Left Leg (Animated Running Stride) */}
          <g className="animate-dino-leg-left">
            <path d="M10 17h2v6h3v1h-5v-7z" />
          </g>

          {/* Right Leg (Animated Alternating Stride) */}
          <g className="animate-dino-leg-right">
            <path d="M15 17h2v5h3v1h-5v-6z" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// 3D Interactive Skill Button with tactile hover and active press effect
function Skill3DButton({
  name,
  wide = false,
  accentGlow = 'rgba(255,255,255,0.15)',
  link = '#slide-4',
  isExternal = false,
  targetProject = null,
  onSelectProject = null
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = (e) => {
    if (targetProject && onSelectProject) {
      onSelectProject(targetProject);
    }
  };

  const buttonClasses = `relative group/btn select-none cursor-pointer py-1.5 sm:py-2 px-2 sm:px-2.5 rounded-lg font-semibold tracking-wide text-[11px] sm:text-xs flex items-center justify-center text-center transition-all duration-200 ease-out overflow-hidden ${wide ? 'col-span-2' : 'col-span-1'
    } ${isPressed
      ? 'translate-y-0.5 scale-[0.97] bg-zinc-800 text-white shadow-[0_1px_2px_rgba(0,0,0,0.8)] border-zinc-500'
      : isHovered
        ? '-translate-y-0.5 scale-[1.03] bg-gradient-to-b from-zinc-700/95 via-zinc-800/95 to-zinc-900/95 text-white border-zinc-300 shadow-[0_6px_14px_-2px_rgba(0,0,0,0.8),0_0_10px_rgba(255,255,255,0.12),inset_0_1px_0_rgba(255,255,255,0.3)]'
        : 'bg-gradient-to-b from-zinc-800/85 via-zinc-850/75 to-zinc-900/85 text-zinc-200 border-zinc-700/70 shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]'
    } border`;

  const buttonStyle = {
    transformStyle: 'preserve-3d',
    transform: isPressed
      ? 'translateZ(6px) translateY(1px) scale(0.97)'
      : isHovered
        ? 'translateZ(18px) translateY(-2px) scale(1.03)'
        : 'translateZ(0px) translateY(0px) scale(1)',
  };

  const buttonInner = (
    <>
      {/* 3D Top Bevel Highlight */}
      <div className="absolute inset-x-1.5 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none rounded-t-lg group-hover/btn:via-white/50 transition-all duration-200" />

      {/* Button Text */}
      <span className="relative z-10 font-semibold tracking-wide drop-shadow-sm group-hover/btn:drop-shadow-[0_1px_4px_rgba(255,255,255,0.3)] whitespace-normal sm:whitespace-nowrap">
        {name}
      </span>

      {/* Gloss reflection shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${accentGlow} 0%, transparent 75%)`
        }}
      />
    </>
  );

  return (
    <a
      href={link}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={buttonClasses}
      style={buttonStyle}
    >
      {buttonInner}
    </a>
  );
}

// 3D Interactive Table Container with responsive mouse tilt and depth lighting
function Skill3DTable({ category, onSelectProject }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const IconComponent = category.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate subtle 3D tilt
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      opacity: 1
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-xl bg-zinc-900/40 border p-3.5 sm:p-4 flex flex-col justify-start backdrop-blur-md transition-all duration-300 ease-out group cursor-default h-full ${isHovered
          ? 'border-zinc-500 bg-zinc-900/80 shadow-[0_18px_36px_-8px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.2)] z-20'
          : 'border-zinc-800/80 shadow-[0_6px_18px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] z-10'
        }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
      }}
    >
      {/* Glare spotlight layer following mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-20 overflow-hidden"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Top Ambient Glow Accent */}
      <div
        className={`absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-16 bg-gradient-to-b ${category.glowColor} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Table Header: Icon + Full Heading Name clearly visible */}
      <div
        className="mb-2.5 pb-2 border-b border-zinc-800/80 flex items-center gap-2.5 transition-transform duration-200"
        style={{ transform: isHovered ? 'translateZ(18px)' : 'translateZ(0px)' }}
      >
        <div className="p-1.5 rounded-lg bg-zinc-800/90 border border-zinc-700/70 text-zinc-200 group-hover:text-white group-hover:scale-105 group-hover:border-zinc-400 shadow-sm transition-all duration-200 shrink-0">
          <IconComponent size={16} />
        </div>
        <h3 className="text-xs sm:text-[13px] font-bold tracking-wide text-zinc-200 group-hover:text-white uppercase transition-colors drop-shadow-sm leading-snug">
          {category.title}
        </h3>
      </div>

      {/* 2 Buttons Per Row Grid with 3D Depth */}
      <div
        className="grid grid-cols-2 gap-2 flex-1 items-center content-start transition-transform duration-200"
        style={{ transform: isHovered ? 'translateZ(14px)' : 'translateZ(0px)' }}
      >
        {category.skills.map((skill, sIdx) => (
          <Skill3DButton
            key={sIdx}
            name={skill.name}
            wide={skill.wide}
            link={skill.link}
            isExternal={skill.isExternal}
            targetProject={skill.targetProject}
            onSelectProject={onSelectProject}
            accentGlow={category.accentHex}
          />
        ))}
      </div>
    </div>
  );
}


// Interactive Featured Project Card with high contrast, large readable typography, tactile tech buttons, Green Blinking LED Light, and GitHub link
function Project3DCard({ project, isHighlighted = false, onResetAndReturn = null }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleResetAction = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onResetAndReturn) {
      onResetAndReturn();
    }
  };

  return (
    <div
      id={project.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={isHighlighted ? handleResetAction : undefined}
      onContextMenu={isHighlighted ? handleResetAction : undefined}
      className={`relative rounded-2xl p-6 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-200 ease-out group cursor-default h-full min-h-[290px] scroll-mt-28 ${
        isHighlighted
          ? 'border-2 border-emerald-400 bg-zinc-900/95 ring-4 ring-emerald-500/25 shadow-[0_0_35px_rgba(16,185,129,0.35),0_20px_40px_rgba(0,0,0,0.9)] z-20'
          : isHovered
          ? 'border border-zinc-500 bg-zinc-900/95 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.15)] -translate-y-1.5 z-20'
          : 'border border-zinc-700/80 bg-zinc-900/90 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] z-10'
      }`}
    >
      {/* Top Ambient Glow Accent */}
      <div 
        className={`absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-20 bg-gradient-to-b ${
          isHighlighted ? 'from-emerald-500/40 to-teal-500/15 opacity-100' : project.glowColor
        } blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} 
      />

      {/* Header Area: Title, Category, Green Signal Light, GitHub Link */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-[21px] font-black text-white tracking-wide leading-snug drop-shadow-sm">
              {project.title}
            </h3>
            
            <div className="flex items-center gap-3 mt-2.5 flex-wrap">
              <span className="text-xs sm:text-sm font-mono font-semibold text-emerald-300 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 shadow-inner">
                {project.category}
              </span>

              {/* Green Blinking Light Indicator */}
              <button
                type="button"
                onClick={isHighlighted ? handleResetAction : undefined}
                onDoubleClick={isHighlighted ? handleResetAction : undefined}
                onContextMenu={isHighlighted ? handleResetAction : undefined}
                title={isHighlighted ? "Double-click or Right-click to reset signal and return to Slide 3" : "Linked signal"}
                className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all duration-300 select-none ${
                  isHighlighted 
                    ? 'bg-emerald-950/90 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] cursor-pointer hover:bg-emerald-900 hover:border-emerald-300 hover:scale-105 active:scale-95' 
                    : 'bg-emerald-950/50 border-emerald-500/40'
                }`}
              >
                <span className="relative flex h-2.5 w-2.5 pointer-events-none">
                  <span className={`absolute inline-flex h-full w-full rounded-full bg-emerald-400 ${
                    isHighlighted ? 'animate-ping opacity-90' : 'animate-ping opacity-60'
                  }`}></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                </span>
                <span className={`text-[11px] font-mono font-bold uppercase tracking-wider pointer-events-none ${
                  isHighlighted ? 'text-emerald-300 animate-pulse' : 'text-emerald-400'
                }`}>
                  {isHighlighted ? 'ACTIVE SIGNAL' : 'LINKED'}
                </span>
              </button>
            </div>
          </div>

          {/* GitHub Button at Right Corner */}
          <a
            href="https://github.com/tejovanth17"
            target="_blank"
            rel="noreferrer"
            title="View on GitHub (@tejovanth17)"
            className="p-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400 hover:bg-zinc-700 hover:scale-110 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-200 shrink-0 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} />
          </a>
        </div>
      </div>

      {/* Tech Badges/Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-5">
        {project.tech.map((tag, tIdx) => (
          <button
            key={tIdx}
            type="button"
            className="relative select-none py-1.5 px-3 sm:px-3.5 rounded-xl text-xs sm:text-[13px] font-mono font-semibold tracking-wider transition-all duration-150 ease-out bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] hover:text-white hover:border-zinc-400 hover:bg-zinc-700 hover:-translate-y-0.5 cursor-pointer"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Content Text */}
      <div className="pt-4 border-t border-zinc-800/90">
        <p className="text-sm sm:text-base md:text-[16px] text-zinc-100 leading-relaxed font-normal">
          {project.desc}
        </p>
      </div>
    </div>
  );
}

// 3D Interactive Certification & Publication Card
function Cert3DCard({ item, isHighlighted = false, onResetAndReturn = null }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
      opacity: 1
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const handleResetAction = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onResetAndReturn) {
      onResetAndReturn();
    }
  };

  return (
    <div
      id={item.id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={isHighlighted ? handleResetAction : undefined}
      onContextMenu={isHighlighted ? handleResetAction : undefined}
      className={`relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 ease-out group cursor-default h-full scroll-mt-28 ${
        isHighlighted
          ? 'border-2 border-emerald-400 bg-zinc-900/95 ring-4 ring-emerald-500/25 shadow-[0_0_35px_rgba(16,185,129,0.35),0_20px_40px_rgba(0,0,0,0.9)] z-20'
          : isHovered
          ? 'border-zinc-500 bg-zinc-900/90 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.2)] z-20'
          : 'border border-zinc-800/80 bg-zinc-900/80 shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] z-10'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered || isHighlighted ? 1.02 : 1}, ${isHovered || isHighlighted ? 1.02 : 1}, 1)`,
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
      }}
    >
      {/* Glare spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 overflow-hidden"
        style={{
          opacity: isHovered ? glare.opacity : 0,
          background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.12), transparent 70%)`,
        }}
      />

      {/* Top Meta Bar */}
      <div
        className="flex items-center justify-between gap-3 mb-2.5 transition-transform duration-200"
        style={{ transform: isHovered || isHighlighted ? 'translateZ(16px)' : 'translateZ(0px)' }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider border ${item.typeBadgeStyle}`}>
            {item.isPublication ? <Sparkles size={12} /> : <Award size={12} />}
            {item.type}
          </span>

          {isHighlighted && (
            <button
              type="button"
              onClick={handleResetAction}
              onDoubleClick={handleResetAction}
              onContextMenu={handleResetAction}
              title="Double-click or Right-click to reset signal and return to Slide 3"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border bg-emerald-950/90 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)] cursor-pointer hover:bg-emerald-900 hover:border-emerald-300 hover:scale-105 active:scale-95 transition-all select-none"
            >
              <span className="relative flex h-2 w-2 pointer-events-none">
                <span className="animate-ping opacity-90 absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300 animate-pulse pointer-events-none">
                ACTIVE SIGNAL
              </span>
            </button>
          )}
        </div>

        {item.date && (
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/60 shadow-inner">
            {item.date}
          </span>
        )}
      </div>

      {/* Heading & Below Passage Text */}
      <div
        className="mb-2 transition-transform duration-200"
        style={{ transform: isHovered ? 'translateZ(14px)' : 'translateZ(0px)' }}
      >
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="text-base sm:text-lg font-bold text-zinc-100 hover:text-white hover:underline transition-colors leading-snug inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{item.title}</span>
            <ExternalLink size={14} className="text-zinc-400 group-hover:text-white shrink-0" />
          </a>
        ) : (
          <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug">
            {item.title}
          </h3>
        )}
        <p className="text-xs font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5">
          {item.issuer}
        </p>
      </div>

      {/* Content Text */}
      <div
        className="mb-3 transition-transform duration-200"
        style={{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)' }}
      >
        <p className="text-xs sm:text-[12.5px] text-zinc-300 group-hover:text-zinc-200 leading-relaxed transition-colors">
          {item.desc}
        </p>
      </div>

      {/* Small Buttons below content text & Verify Link */}
      <div
        className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-zinc-800/70 transition-transform duration-200"
        style={{ transform: isHovered ? 'translateZ(12px)' : 'translateZ(0px)' }}
      >
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {(item.tags || []).map((tag, tIdx) => (
            <button
              key={tIdx}
              type="button"
              className="relative group/tag select-none cursor-pointer py-1 px-2.5 rounded-lg text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider transition-all duration-200 ease-out bg-gradient-to-b from-zinc-800/90 via-zinc-850/80 to-zinc-900/90 text-zinc-200 border border-zinc-700/70 shadow-[0_2px_6px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] hover:text-white hover:border-zinc-400 hover:bg-zinc-800 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] active:translate-y-0.5 active:scale-95"
            >
              {tag}
            </button>
          ))}
          {item.verifyPrompt && (
            <span className="text-xs font-mono text-zinc-400 italic">
              {item.verifyPrompt}
            </span>
          )}
        </div>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono font-semibold text-zinc-200 bg-zinc-800/90 border border-zinc-700 hover:border-zinc-400 hover:text-white hover:bg-zinc-700/90 shadow-[0_2px_6px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all ml-auto group/link cursor-pointer"
          >
            <span>{item.linkText || (item.isPublication ? 'View Paper' : 'Verify')}</span>
            <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}

// Interactive Education Card
function EducationCard({ item }) {
  return (
    <div className="relative rounded-2xl p-6 sm:p-7 md:p-8 bg-zinc-900/90 border border-zinc-700/80 shadow-[0_10px_28px_-8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-zinc-500 hover:-translate-y-1 transition-all duration-200 group">
      {/* Top Corner Buttons */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {/* Top Left Corner: Year Button */}
        <button
          type="button"
          className="select-none py-1.5 px-3.5 rounded-lg text-xs sm:text-[13px] font-mono font-bold tracking-wider bg-zinc-800 border border-zinc-700 text-zinc-200 shadow-sm hover:border-zinc-500 hover:text-white transition-colors"
        >
          {item.year}
        </button>

        {/* Top Right Corner: Completed Button */}
        <button
          type="button"
          className="select-none flex items-center gap-2 py-1.5 px-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.3)] hover:bg-emerald-900 hover:border-emerald-400 transition-all"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          </span>
          <span>{item.status}</span>
        </button>
      </div>

      {/* Heading */}
      <h3 className="text-lg sm:text-xl md:text-[22px] font-black text-white tracking-wide leading-snug drop-shadow-sm mb-2">
        {item.title}
      </h3>

      {/* Below Heading Passage Text */}
      <p className="text-xs sm:text-sm font-medium text-zinc-400 mb-3.5">
        {item.passageText}
      </p>

      {/* Score Button & Institution Text */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          type="button"
          className="select-none py-1.5 px-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold bg-zinc-800 text-emerald-300 border border-emerald-500/40 shadow-inner hover:bg-zinc-750 transition-colors"
        >
          {item.score}
        </button>
        {item.institution && (
          <span className="text-xs sm:text-sm font-medium text-zinc-300 font-sans">
            {item.institution}
          </span>
        )}
      </div>

      {/* Content Text Lines */}
      <div className="pt-4 border-t border-zinc-800/90 space-y-2">
        {item.contentLines.map((line, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm md:text-[14.5px] text-zinc-200 leading-relaxed font-normal">
            <span className="text-emerald-400 shrink-0 mt-1 font-mono text-xs">▹</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Rotating Subtitle with 7 distinct developer font aesthetics, changing every 3 seconds (one at a time)
const SUBTITLE_STYLES = [
  {
    id: 'original',
    render: () => (
      <span className="text-lg md:text-2xl font-medium text-zinc-300 tracking-normal font-sans">
        Computer Science Student , Full Stack Developer
      </span>
    )
  },
  {
    id: 'code-tags',
    render: () => (
      <span className="font-mono text-sm sm:text-base md:text-xl tracking-tight leading-relaxed">
        <span className="text-zinc-500">&lt;</span>
        <span className="text-pink-400 font-semibold">student</span>
        <span className="text-zinc-500">&gt;</span>
        <span className="text-zinc-100 font-medium">Computer Science  Student</span>
        <span className="text-zinc-500">&lt;/</span>
        <span className="text-pink-400 font-semibold">student</span>
        <span className="text-zinc-500">&gt;</span>
        {' '}
        <span className="text-zinc-500">&lt;</span>
        <span className="text-cyan-400 font-semibold">developer</span>
        <span className="text-zinc-500">&gt;</span>
        <span className="text-zinc-100 font-medium">Full Stack Developer</span>
        <span className="text-zinc-500">&lt;/</span>
        <span className="text-cyan-400 font-semibold">developer</span>
        <span className="text-zinc-500">&gt;</span>
      </span>
    )
  },
  {
    id: 'executables',
    render: () => (
      <div className="font-mono text-sm sm:text-base md:text-lg tracking-wide flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 leading-snug">
        <span className="text-amber-300 inline-flex items-center gap-1.5 font-semibold">
          <span className="text-emerald-400 font-bold">&gt;</span>
          <span>computer_science_student.exe</span>
        </span>
        <span className="text-sky-300 inline-flex items-center gap-1.5 font-semibold">
          <span className="text-emerald-400 font-bold">&gt;</span>
          <span>full_stack_developer.sh</span>
        </span>
      </div>
    )
  },
  {
    id: 'leet',
    render: () => (
      <div className="font-mono font-black text-sm sm:text-base md:text-lg tracking-widest text-emerald-400 uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.35)] leading-snug">
        <div>C0MPUT3R SCI3NC3 STUD3NT</div>
        <div className="text-teal-300">FULL 5T4CK D3V3L0P3R</div>
      </div>
    )
  },
  {
    id: 'binary',
    render: () => (
      <div className="font-mono font-bold text-sm sm:text-base md:text-xl tracking-wider text-teal-300 drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]">
        <span className="text-emerald-400 font-mono">01000011 01010011</span>
        <span className="mx-2 text-zinc-400">→</span>
        <span className="text-white uppercase tracking-widest font-black">FULL STACK DEV</span>
      </div>
    )
  },
  {
    id: 'cli-whoami',
    render: () => (
      <div className="font-mono text-xs sm:text-sm md:text-base tracking-wide flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 leading-snug">
        <div className="inline-flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">$ whoami</span>
          <span className="text-zinc-500">→</span>
          <span className="text-zinc-100 font-semibold">computer_science_student</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="text-emerald-400 font-bold">$ role</span>
          <span className="text-zinc-500">→</span>
          <span className="text-zinc-100 font-semibold">full_stack_developer</span>
        </div>
      </div>
    )
  },
  {
    id: 'minimal-dot',
    render: () => (
      <span className="font-mono lowercase text-sm sm:text-base md:text-xl tracking-wider text-zinc-300 font-medium">
        cs student <span className="text-emerald-400 font-bold mx-2">·</span> full stack developer
      </span>
    )
  }
];

function RotatingSubtitle() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % SUBTITLE_STYLES.length);
        setFade(true);
      }, 250);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const current = SUBTITLE_STYLES[index];

  return (
    <div className="min-h-[56px] sm:min-h-[52px] flex items-center mb-5 select-none overflow-hidden">
      <div
        className={`transition-all duration-300 ease-out transform ${
          fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1.5 scale-95'
        }`}
      >
        {current.render()}
      </div>
    </div>
  );
}

// Collapsible FAQ Card with smooth expanding chevron and readable high-contrast styling
function FAQCard({ item, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ease-out overflow-hidden ${
        isOpen
          ? 'bg-zinc-900/95 border-zinc-500 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]'
          : 'bg-zinc-900/80 border-zinc-800/90 shadow-[0_6px_18px_-4px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-zinc-600 hover:bg-zinc-900/90'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
      >
        <span className="text-base sm:text-lg md:text-[18.5px] font-bold text-zinc-100 group-hover:text-white transition-colors leading-snug">
          {item.question}
        </span>
        <div
          className={`p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 group-hover:text-white group-hover:border-zinc-500 shrink-0 transition-all duration-300 transform ${
            isOpen ? 'rotate-180 bg-zinc-700/80 text-white shadow-sm' : 'rotate-0'
          }`}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-zinc-800/80">
          <p className="text-sm sm:text-base md:text-[16px] text-zinc-300 leading-relaxed font-normal">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}


export default function App() {
  const containerRef = useRef(null);
  const lastScrollTop = useRef(0);
  const rafId = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [formFeedback, setFormFeedback] = useState('');
  const [highlightedProject, setHighlightedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [openFaqIndices, setOpenFaqIndices] = useState([0]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setFormFeedback('Please fill in your name, email, and message.');
      return;
    }

    setFormStatus('sending');
    setFormFeedback('Sending message to tejovanth16@gmail.com...');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_yk8my4g';
    const notificationTemplateId = import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID || 'template_2hjga2u';
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID || 'template_aj518l9';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '8_FzZL87L8oDYmfhN';

    const templateParams = {
      title: `New Portfolio Message from ${formData.name}`,
      subject: `New Portfolio Message from ${formData.name}`,
      from_name: formData.name,
      name: formData.name,
      user_name: formData.name,
      from_email: formData.email,
      email: formData.email,
      user_email: formData.email,
      reply_to: formData.email,
      to_name: 'Thomala Tejovanth',
      to_email: 'tejovanth16@gmail.com',
      message: formData.message,
    };

    try {
      // 1. Send incoming message directly to your inbox
      const sendNotification = emailjs.send(serviceId, notificationTemplateId, templateParams, publicKey);

      // 2. Send auto-reply confirmation to the visitor
      const sendAutoReply = emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);

      await Promise.all([sendNotification, sendAutoReply]);

      setFormStatus('success');
      setFormFeedback('Thank you! Your message has been sent directly to tejovanth16@gmail.com.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS send error:', err);
      // Fallback to mailto so no message is ever lost
      const mailtoUrl = `mailto:tejovanth16@gmail.com?subject=${encodeURIComponent(
        `Portfolio Contact from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      setFormStatus('error');
      setFormFeedback('Connecting via email client to deliver to tejovanth16@gmail.com.');
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const handleScroll = (e) => {
    const target = e.currentTarget;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const currentScrollTop = target.scrollTop;
      const totalScroll = target.scrollHeight - target.clientHeight;

      if (currentScrollTop > lastScrollTop.current + 1) {
        setIsScrollingDown(true); // scrolling down (top to bottom -> dinosaur faces forward)
      } else if (currentScrollTop < lastScrollTop.current - 1) {
        setIsScrollingDown(false); // scrolling up (bottom to top -> dinosaur faces opposite)
      }
      lastScrollTop.current = currentScrollTop;

      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollTop / totalScroll) * 100));
        setScrollProgress(progress);
      }
    });
  };

  const handleSelectProject = (projectId) => {
    setHighlightedProject(projectId);
    setTimeout(() => {
      const el = document.getElementById(projectId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  const handleResetAndReturn = () => {
    setHighlightedProject(null);
    const slide3 = document.getElementById('slide-3');
    if (slide3) {
      slide3.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#slide-3';
    }
  };

  const skillTables = [
    {
      title: 'PROGRAMMING LANGUAGES',
      icon: Terminal,
      glowColor: 'from-amber-500/20 to-orange-500/5',
      accentHex: 'rgba(245, 158, 11, 0.25)',
      skills: [
        { name: 'Java', wide: false, link: '#project-oil-spill', targetProject: 'project-oil-spill' },
        { name: 'JavaScript', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: 'Python', wide: false, link: '#project-brain-tumor', targetProject: 'project-brain-tumor' },
        { name: 'SQL', wide: false, link: '#project-aws-autoscaling', targetProject: 'project-aws-autoscaling' },
        { name: 'HTML', wide: false, link: '#project-oil-spill', targetProject: 'project-oil-spill' },
        { name: 'CSS', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: 'R Programming', wide: true, link: '#project-brain-tumor', targetProject: 'project-brain-tumor' }
      ]
    },
    {
      title: 'TOOLS & TECHNOLOGIES',
      icon: Cpu,
      glowColor: 'from-blue-500/20 to-cyan-500/5',
      accentHex: 'rgba(59, 130, 246, 0.25)',
      skills: [
        { name: 'Git', wide: false, link: 'https://github.com/tejovanth17', isExternal: true },
        { name: 'GitHub', wide: false, link: 'https://github.com/tejovanth17', isExternal: true },
        { name: 'Linux', wide: false, link: '#project-aws-autoscaling', targetProject: 'project-aws-autoscaling' },
        { name: 'MongoDB', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: 'Cloud Computing', wide: true, link: '#project-aws-autoscaling', targetProject: 'project-aws-autoscaling' }
      ]
    },
    {
      title: 'WEB DEVELOPMENT',
      icon: Code2,
      glowColor: 'from-emerald-500/20 to-teal-500/5',
      accentHex: 'rgba(16, 185, 129, 0.25)',
      skills: [
        { name: 'React', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: 'Node.JS', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: 'Express', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: 'MongoDB', wide: false, link: '#project-music-genre', targetProject: 'project-music-genre' },
        { name: "REST-API's", wide: true, link: '#project-music-genre', targetProject: 'project-music-genre' }
      ]
    },
    {
      title: 'AI & ML',
      icon: Brain,
      glowColor: 'from-purple-500/20 to-violet-500/5',
      accentHex: 'rgba(168, 85, 247, 0.25)',
      skills: [
        { name: "LLM's", wide: false, link: '#project-oil-spill', targetProject: 'project-oil-spill' },
        { name: 'DL', wide: false, link: '#project-brain-tumor', targetProject: 'project-brain-tumor' },
        { name: 'NLP', wide: true, link: '#project-oil-spill', targetProject: 'project-oil-spill' }
      ]
    },
    {
      title: 'SOFT SKILLS',
      icon: Users,
      glowColor: 'from-rose-500/20 to-pink-500/5',
      accentHex: 'rgba(244, 63, 94, 0.25)',
      skills: [
        { name: 'Communication', wide: false, link: '#pub-2', targetProject: 'pub-2' },
        { name: 'Teamwork', wide: false, link: '#pub-2', targetProject: 'pub-2' },
        { name: 'Problem Solving', wide: false, link: '#pub-2', targetProject: 'pub-2' },
        { name: 'Leadership', wide: false, link: '#pub-2', targetProject: 'pub-2' }
      ]
    }
  ];

  const featuredProjects = [
    {
      id: 'project-oil-spill',
      title: 'OIL SPILL DETECTION USING DEEP LEARNING',
      category: 'Machine Learning',
      tech: ['DiNOV2', 'DL', 'PY', 'CV', 'SARiM', 'PYTOKEN'],
      desc: 'Built a DiNOV2 large SAR image classifier achieving 98.24% accuracy for detecting oil spills in satellite images.',
      glowColor: 'from-teal-500/20 to-emerald-500/5'
    },
    {
      id: 'project-brain-tumor',
      title: 'BRAIN TUMOR CLASSIFICATION SYSTEMS',
      category: 'Machine Learning',
      tech: ['PY', 'TF', 'XCEPTION', 'GradCam', 'Flask'],
      desc: 'Achieved 98.85% of test accuracy which built with deep learning models, classifiers of tumors into 4 classes using Transfer Learning on 7000+ MRI images.',
      glowColor: 'from-purple-500/20 to-indigo-500/5'
    },
    {
      id: 'project-music-genre',
      title: 'MUSIC GENRE CLASSIFIER',
      category: 'ML & DL',
      tech: ['FLASK', 'LightGBM', 'ScikitLearn', 'Pandas & NumPy', 'MatPlotLib'],
      desc: 'Achieved 98.5% of classification accuracy of music into genres, represented by respective sound waves. Built using ML & DL frameworks.',
      glowColor: 'from-amber-500/20 to-orange-500/5'
    },
    {
      id: 'project-aws-autoscaling',
      title: 'AWS AUTOSCALING WITH EC2',
      category: 'Cloud Computing',
      tech: ['CloudWatch', 'LoadBalancer', 'PredictiveScaleEngine', 'Launch & AMI'],
      desc: 'Got 50-70% of target threshold across the AutoScaling Groups and resulted up to 99.99% of target availability maintained during peak traffic transition.',
      glowColor: 'from-sky-500/20 to-blue-500/5'
    }
  ];

  const certificationsData = [
    {
      id: 'cert-1',
      type: 'INTERNSHIP & CERTIFICATION',
      isPublication: false,
      typeBadgeStyle: 'text-teal-300 border-teal-500/30 bg-teal-500/10',
      title: 'Gen AI INTERN',
      issuer: 'issued by neubAItics',
      date: 'Verified Certificate',
      desc: 'tuned model based on Gen ai & AI-ML domains.',
      tags: ["LLM's", 'RAG', 'AI', 'DL', 'ML'],
      link: 'https://drive.google.com/file/d/1oNBzL_80L0ss1ZTpxAu9rxLM4ZgyUsuD/view?usp=sharing',
      linkText: 'View Certificate'
    },
    {
      id: 'cert-2',
      type: 'Certification',
      isPublication: false,
      typeBadgeStyle: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
      title: 'AWS certification',
      issuer: 'issued by Think Desk Technologies',
      date: 'Verified Certificate',
      desc: 'designed and deployed scalable web service models by using BedRock, EC2, Lambda, S3',
      tags: ['IaaS', 'PaaS', 'SaaS'],
      link: 'https://drive.google.com/file/d/1lN99INmv8JM9_0A6XMdWXUY2jUBXFOc3/view?usp=sharing',
      linkText: 'View Certificate'
    }
  ];

  const publicationsData = [
    {
      id: 'pub-1',
      type: 'RESEARCH PUBLICATION',
      isPublication: true,
      typeBadgeStyle: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
      title: 'Brain Tumor Classification using Xceptional Model',
      issuer: "TQCEBT'26",
      date: 'Conference Paper',
      desc: 'fine tuned Xceptional model by optimizing L2 regularization , Networking layers to avoid overfitting , resulted 98.89% of accuracy of classifying tumors from MRI images.',
      tags: ['ML', 'DL', 'Xceptional', 'Regularization'],
      link: 'https://drive.google.com/file/d/1C8zYcq3dZpylPRKjw-scRjdOPwk8vq6x/view?usp=sharing',
      linkText: 'View Paper'
    },
    {
      id: 'pub-2',
      type: 'RESEARCH PUBLICATION',
      isPublication: true,
      typeBadgeStyle: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
      title: 'Published paper',
      issuer: 'Status: In Progress',
      date: 'Final Review Stage',
      desc: 'publishing is still in progress',
      tags: ['Publication in progress'],
      verifyPrompt: 'to view final reviewed paper to verify this:',
      link: 'https://drive.google.com/file/d/11bN_ixVfaknKb38gNC2go_3MsFwg6BpZ/view?usp=sharing',
      linkText: 'View Final Reviewed Paper'
    }
  ];

  const educationList = [
    {
      id: 'edu-1',
      year: '2022-2026',
      status: 'completed',
      title: 'B.E in Computer Science and Engineering specialized in Artificial Intelligence',
      passageText: 'Sathyabama Institue of Science and Technology .',
      score: 'CGPA : 7.18',
      institution: '',
      contentLines: [
        'major in computer science and engineering',
        'Specialized in Artificial intelligence',
        'worked extensively on Machine Learning , Full stack Development .',
        'Published a peer reviewed paper, took primary ownership of the project , paper , leading its development to  deployment.'
      ]
    },
    {
      id: 'edu-2',
      year: '2020-2022',
      status: 'completed',
      title: 'Higher Secondary Certifiacte (HSC)',
      passageText: 'STATE BOARD OF ANDHRA PRADESH',
      score: 'PERCENTAGE : 74%',
      institution: 'from Sri Chaitanya Educational Institute',
      contentLines: [
        'developed analytical and problem solving skills',
        'Specialized in Maths , Physics and Chemistry .'
      ]
    },
    {
      id: 'edu-3',
      year: '2020',
      status: 'completed',
      title: 'Secondary School Certificate (SSC)',
      passageText: 'STATE BOARD OF ANDHRA PRADESH',
      score: 'PERCENTAGE : 92%',
      institution: 'from Sri Chaitanya School',
      contentLines: [
        'built core academic foundations.',
        'Excellent perfomance in core subjects.'
      ]
    }
  ];

  const faqList = [
    {
      id: 'faq-1',
      question: 'You have worked on different domains which one is your are familiar with?',
      answer: 'I see my self as an Full Stack Developer which is relevent to my intersts and familiar with the concepts of it.'
    },
    {
      id: 'faq-2',
      question: 'What other technical domains do you have expertise in, apart from Full-Stack Development?',
      answer: 'I have a strong foundations in AI & ML . And better understanding of Cloud Computing.'
    },
    {
      id: 'faq-3',
      question: 'What kind of roles are you looking for?',
      answer: "I'm looking for SDE and AI/ML  enginner roles where i can work on sclable systems.  AS Full time and Intern im lntersted in."
    },
    {
      id: 'faq-4',
      question: 'Are you open to remote work?',
      answer: "Yes ,  im open to both remote and on site roles. I've worked independently on complex projects like CortexRAG and SpillVision, so I'm comfortable with async collaboration."
    },
    {
      id: 'faq-5',
      question: 'How do you approach Problem Solving?',
      answer: 'As a systematic approach , understanding the nature of  the probelm followed by its cause and effects , break it into smaller components, research best practices, prototype solutions, test thoroughly, and iterate based on feedback. I prioritize clean code, maintainability, and user experience.'
    },
    {
      id: 'faq-6',
      question: 'Do you have any experience as Development and DevOps?',
      answer: "Yes, I have hands-on experience deploying applications on Vercel, GitHub Pages, and cloud platforms. I'm familiar with CI/CD concepts, version control with Git/GitHub, and environment configuration management."
    }
  ];

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-zinc-950 text-zinc-100 font-sans scroll-smooth selection:bg-zinc-100 selection:text-zinc-900"
    >

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 sm:px-10 py-4 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 shadow-lg shadow-black/20">
        <a href="#slide-1" className="font-semibold text-zinc-200 tracking-wider text-sm hover:text-white transition-all transform hover:scale-105">
          THOMALA TEJOVANTH
        </a>
        <a
          href="mailto:tejovanth16@gmail.com"
          className="text-xs uppercase tracking-widest px-4 py-2 bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:border-zinc-300 hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-0.5 transition-all duration-200"
        >
          Contact
        </a>

        {/* Scroll Progress White Line with Animated Dinosaur in Motion */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-zinc-900/90 overflow-visible pointer-events-none">
          {/* Base track subtle line */}
          <div className="absolute inset-0 bg-zinc-800/40" />

          {/* White Progress fill line with luminous glow and smooth tracking */}
          <div
            className="h-full bg-white relative will-change-[width] transition-[width] duration-75 ease-linear shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_18px_rgba(255,255,255,0.4)]"
            style={{ width: `${scrollProgress}%` }}
          >
            {/* Animated Dinosaur in Continuous Motion at the active head */}
            <div
              className="absolute right-0 bottom-[-2px] translate-x-1/2 flex items-center justify-center pointer-events-none z-30"
            >
              <DinosaurRunner isScrollingDown={isScrollingDown} />
            </div>
          </div>

          {/* Ambient white light diffusion beneath the header line */}
          <div
            className="absolute -bottom-1 left-0 h-2.5 bg-white/20 blur-sm pointer-events-none transition-[width] duration-75 ease-linear"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* Slide 1: Introduction */}
      <section id="slide-1" className="h-screen w-full snap-start flex flex-col justify-center items-center px-8 md:px-16 relative border-b border-zinc-900">
        <div className="max-w-5xl w-full flex flex-col items-start text-left">
          <span className="text-base md:text-xl font-mono font-medium tracking-widest text-zinc-400 uppercase mb-2">
            HELLO I'M
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-100 mb-3 uppercase whitespace-nowrap drop-shadow-sm">
            Teja
          </h1>
          <RotatingSubtitle />
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Passionate about building intelligent, scalable solutions using full-stack development, AI/ML, and deep learning. Currently exploring Generative AI, Large Language Models, and NLP-driven systems.
          </p>

          {/* 3D Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <a
              href="#slide-8"
              className="px-6 py-3 bg-zinc-100 text-zinc-950 font-semibold text-xs tracking-wider uppercase rounded-xl shadow-[0_5px_15px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(255,255,255,0.25)] hover:bg-white active:translate-y-0.5 transition-all duration-200"
            >
              Get In Touch
            </a>
            <a
              href="#slide-4"
              className="px-6 py-3 bg-zinc-900 border border-zinc-700/80 text-zinc-200 font-semibold text-xs tracking-wider uppercase rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-1 hover:border-zinc-400 hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-0.5 transition-all duration-200"
            >
              Projects
            </a>
          </div>

          {/* 3D Social Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-zinc-400">
            <a
              href="https://github.com/tejovanth17"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-800 text-zinc-300 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-0.5 text-xs font-medium transition-all duration-200"
            >
              <Github size={15} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/tejovanth-thomala-009196354/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 border border-zinc-800 text-zinc-300 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white hover:shadow-[0_8px_18px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-0.5 text-xs font-medium transition-all duration-200"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm font-mono text-zinc-400/90 tracking-tight mb-8 select-none">
            #To return to the previous page, right click if you navigated here using the buttons
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* Slide 2: About Me */}
      <section id="slide-2" className="h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-b border-zinc-900">
        <div className="mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">02 / About Me</span>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 drop-shadow-sm">About Me</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Table 1 (Left): Professional Background - Expanded Size */}
          <div className="md:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-1.5 hover:border-zinc-600 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2 group-hover:text-white transition-colors">
              Professional Background
            </h3>

            <div className="divide-y divide-zinc-800/90 rounded-xl border border-zinc-800/90 overflow-y-auto max-h-[62vh] bg-zinc-950/40 shadow-inner">

              {/* 1. Core Background */}
              <div className="p-4 sm:p-5 hover:bg-zinc-800/30 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-2 transition-colors">
                  PROFESSIONAL BACKGROUND
                </span>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed group-hover/item:text-white transition-colors">
                  I'm a student of Computer Science and Engineering with <strong className="text-zinc-100 font-semibold">ARTIFICIAL INTELLIGENCE</strong>. I see coding as a communication between the virtual world in <strong className="text-zinc-100 font-semibold">REALITY</strong> — it pleasures you only when you solve problems in the real world with code.
                </p>
              </div>

              {/* 2. Full Stack Development */}
              <div className="p-4 sm:p-5 hover:bg-zinc-800/30 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-2 transition-colors">
                  Proficiency in Full Stack Development
                </span>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed group-hover/item:text-zinc-100 transition-colors">
                  With expertise in full-stack development using the <strong className="text-zinc-200 font-semibold">MERN stack</strong> (MongoDB, Express, React, Node.js), I've built multiple web applications from concept to deployment. My technical skills span across Java, Python, JavaScript, and modern web technologies, enabling me to tackle diverse challenges in software development.
                </p>
              </div>

              {/* 3. AI Sphere of Interests */}
              <div className="p-4 sm:p-5 hover:bg-zinc-800/30 transition-colors duration-150 group/item cursor-default space-y-3.5">
                <span className="block font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 transition-colors">
                  Sphere of Interests in Artificial Intelligence
                </span>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  While web development forms my core foundation, my intellectual curiosity extends into Artificial Intelligence and Machine Learning. My work in this domain encompasses:
                </p>

                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  <div className="p-3 sm:p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/70 flex flex-col gap-1 hover:border-zinc-700 transition-colors">
                    <span className="font-mono text-xs uppercase text-zinc-400 font-semibold">1. Computer Vision</span>
                    <span className="text-sm sm:text-[15px] text-zinc-200 font-medium">Oil spill detection using deep learning models.</span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/70 flex flex-col gap-1 hover:border-zinc-700 transition-colors">
                    <span className="font-mono text-xs uppercase text-zinc-400 font-semibold">2. ML & DL</span>
                    <span className="text-sm sm:text-[15px] text-zinc-200 font-medium">Brain Tumor Classification, Music Genre Classification.</span>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/70 flex flex-col gap-1 hover:border-zinc-700 transition-colors">
                    <span className="font-mono text-xs uppercase text-zinc-400 font-semibold">3. NLP</span>
                    <span className="text-sm sm:text-[15px] text-zinc-200 font-medium">Scholarship Analyzer.</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Table 2 (Right): Quick Overview */}
          <div className="md:col-span-5 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-1.5 hover:border-zinc-600 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 flex flex-col justify-between group">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2 group-hover:text-white transition-colors">
              Quick Overview
            </h3>

            <div className="divide-y divide-zinc-800/90 rounded-xl border border-zinc-800/90 overflow-hidden bg-zinc-950/40 shadow-inner">
              <div className="p-4 hover:bg-zinc-800/40 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-1 transition-colors font-semibold">
                  Name
                </span>
                <span className="block text-base sm:text-[17px] font-semibold text-zinc-100 group-hover/item:text-white transition-colors">
                  Thomala Tejovanth
                </span>
              </div>
              <div className="p-4 hover:bg-zinc-800/40 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-1 transition-colors font-semibold">
                  Education
                </span>
                <span className="block text-sm sm:text-base font-semibold text-zinc-100 group-hover/item:text-white transition-colors leading-relaxed">
                  B.E. CSE - AI, Sathyabama Institute of Science and Technology
                </span>
              </div>
              <div className="p-4 hover:bg-zinc-800/40 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-1 transition-colors font-semibold">
                  CGPA
                </span>
                <span className="block text-base sm:text-[17px] font-semibold text-zinc-100 group-hover/item:text-white transition-colors">
                  7.18
                </span>
              </div>
              <div className="p-4 hover:bg-zinc-800/40 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-1 transition-colors font-semibold">
                  Languages
                </span>
                <span className="block text-sm sm:text-base font-semibold text-zinc-100 group-hover/item:text-white transition-colors leading-relaxed">
                  English, Telugu, Tamil, Hindi
                </span>
              </div>
              <div className="p-4 hover:bg-zinc-800/40 transition-colors duration-150 group/item cursor-default">
                <span className="block font-mono text-xs sm:text-sm uppercase tracking-wider text-zinc-400 group-hover/item:text-zinc-300 mb-1 transition-colors font-semibold">
                  Location
                </span>
                <span className="block text-base sm:text-[17px] font-semibold text-zinc-100 group-hover/item:text-white transition-colors">
                  Andhra Pradesh, India
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Slide 3: Technical Skills */}
      <section id="slide-3" className="h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-zinc-900 relative">

        {/* Centered Heading */}
        <div className="mb-5 sm:mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-100 uppercase tracking-tight drop-shadow-sm">
            Technical Skills
          </h2>
        </div>

        {/* 5 Tables Layout: 3 Tables on Top Row, 2 Tables on Bottom Row */}
        <div className="space-y-3 sm:space-y-3.5">
          {/* Top Row: 3 Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 items-stretch">
            {skillTables.slice(0, 3).map((category, idx) => (
              <Skill3DTable
                key={idx}
                category={category}
                onSelectProject={handleSelectProject}
              />
            ))}
          </div>

          {/* Bottom Row: 2 Tables Centered / Balanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5 max-w-4xl mx-auto w-full items-stretch">
            {skillTables.slice(3, 5).map((category, idx) => (
              <Skill3DTable
                key={idx + 3}
                category={category}
                onSelectProject={handleSelectProject}
              />
            ))}
          </div>
        </div>

      </section>

      {/* Slide 4: Featured Projects */}
      <section id="slide-4" className="min-h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-zinc-900 relative py-16 sm:py-20 md:py-24">

        {/* Top Header Area: Left aligned heading with same line passage text */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-sm">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Innovative projects across various domains: AI & ML, Cloud Computing, SDE, and NLP.
          </p>
        </div>

        {/* 4 Boxes in 2x2 Grid with comfortable gap and high contrast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {featuredProjects.map((proj, idx) => (
            <Project3DCard
              key={idx}
              project={proj}
              isHighlighted={highlightedProject === proj.id}
              onResetAndReturn={handleResetAndReturn}
            />
          ))}
        </div>

      </section>

      {/* Slide 5: Certifications & Publications */}
      <section id="slide-5" className="min-h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-7xl mx-auto border-b border-zinc-900 relative py-20 sm:py-24 md:py-32">
        
        {/* Section 1: Certifications Heading */}
        <div className="mb-4 sm:mb-5 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-100 uppercase tracking-tight drop-shadow-sm">
              CERTIFICATIONS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
            Professional industry specializations, generative AI engineering, and cloud infrastructure.
          </p>
        </div>

        {/* Certification Cards: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch mb-10 sm:mb-12">
          <div className="h-full">
            <Cert3DCard 
              item={certificationsData[0]} 
              isHighlighted={highlightedProject === certificationsData[0].id}
              onResetAndReturn={handleResetAndReturn}
            />
          </div>
          <div className="h-full">
            <Cert3DCard 
              item={certificationsData[1]} 
              isHighlighted={highlightedProject === certificationsData[1].id}
              onResetAndReturn={handleResetAndReturn}
            />
          </div>
        </div>

        {/* Section 2: Publications Heading */}
        <div className="mb-4 sm:mb-5 flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-zinc-800/80">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-100 uppercase tracking-tight drop-shadow-sm">
              PUBLICATIONS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed">
            Peer-reviewed research and international conference papers in Deep Learning and Computer Vision.
          </p>
        </div>

        {/* Publications Cards Stack */}
        <div className="space-y-4 sm:space-y-5 w-full">
          {publicationsData.map((pub) => (
            <div key={pub.id} className="w-full">
              <Cert3DCard
                item={pub}
                isHighlighted={highlightedProject === pub.id}
                onResetAndReturn={handleResetAndReturn}
              />
            </div>
          ))}
        </div>

      </section>

      {/* Slide 6: Education */}
      <section id="slide-6" className="min-h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-5xl mx-auto border-b border-zinc-900 relative py-20 sm:py-24 md:py-32">
        
        {/* Main Heading */}
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-sm">
            EDUCATION
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 font-mono">
            Academic progression from foundational schooling to engineering specialization
          </p>
        </div>

        {/* 3 Cards ordered 1 at top, 2 in middle, 3 at bottom with straight pointing lines */}
        <div className="flex flex-col space-y-1">
          {/* Card 1 (Top) */}
          <EducationCard item={educationList[0]} />

          {/* Straight line pointing up from Card 2 to Card 1 */}
          <div className="flex flex-col items-center justify-center py-1">
            <ArrowUp size={16} className="text-emerald-400 -mb-0.5 animate-pulse" />
            <div className="w-[2px] h-8 sm:h-10 bg-gradient-to-t from-zinc-700 via-zinc-500 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>

          {/* Card 2 (Middle) */}
          <EducationCard item={educationList[1]} />

          {/* Straight line pointing up from Card 3 to Card 2 */}
          <div className="flex flex-col items-center justify-center py-1">
            <ArrowUp size={16} className="text-emerald-400 -mb-0.5 animate-pulse" />
            <div className="w-[2px] h-8 sm:h-10 bg-gradient-to-t from-zinc-700 via-zinc-500 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>

          {/* Card 3 (Bottom) */}
          <EducationCard item={educationList[2]} />
        </div>

      </section>

      {/* Slide 7: Frequently asked questions */}
      <section id="slide-7" className="min-h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-4xl mx-auto border-b border-zinc-900 relative py-20 sm:py-24 md:py-32">
        
        {/* Main Heading without slide representation number */}
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 font-mono">
            Key questions regarding technical experience, specialization, and availability
          </p>
        </div>

        {/* Expandable FAQ Cards */}
        <div className="space-y-3 sm:space-y-4 w-full">
          {faqList.map((faq, idx) => (
            <FAQCard
              key={faq.id}
              item={faq}
              isOpen={openFaqIndices.includes(idx)}
              onToggle={() => toggleFaq(idx)}
            />
          ))}
        </div>

        {/* Box below FAQs: Any questions for me? */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 text-center shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-xl mx-auto w-full flex flex-col items-center justify-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Any questions for me?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-5 max-w-md">
            Have a custom inquiry, collaboration idea, or interview question? Let's connect directly.
          </p>
          <a
            href="#slide-8"
            className="px-6 py-3 bg-zinc-100 text-zinc-950 font-semibold text-xs tracking-wider uppercase rounded-xl shadow-[0_5px_15px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(255,255,255,0.25)] hover:bg-white active:translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Get in Touch
          </a>
        </div>

      </section>

      {/* Slide 8: Get In Touch */}
      <section id="slide-8" className="min-h-screen w-full snap-start flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-5xl mx-auto py-16 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-100 mb-2 text-center drop-shadow-sm uppercase tracking-tight">
          Get In Touch
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm text-center mb-8 sm:mb-10">
          Send a message and it will be delivered directly to my inbox at tejovanth16@gmail.com.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <form className="space-y-4 w-full" onSubmit={handleContactSubmit}>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800/90 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-zinc-900 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.15),0_8px_16px_rgba(0,0,0,0.6)] focus:-translate-y-0.5 text-sm text-zinc-200 transition-all duration-200 shadow-inner"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Your Email"
                className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800/90 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-zinc-900 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.15),0_8px_16px_rgba(0,0,0,0.6)] focus:-translate-y-0.5 text-sm text-zinc-200 transition-all duration-200 shadow-inner"
              />
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Your Message"
                className="w-full px-4 py-3 bg-zinc-900/60 border border-zinc-800/90 rounded-xl focus:outline-none focus:border-zinc-400 focus:bg-zinc-900 focus:shadow-[0_0_0_2px_rgba(255,255,255,0.15),0_8px_16px_rgba(0,0,0,0.6)] focus:-translate-y-0.5 text-sm text-zinc-200 resize-none transition-all duration-200 shadow-inner"
              ></textarea>

              {formStatus === 'success' && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono animate-in fade-in">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
                  <span>{formFeedback}</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-mono animate-in fade-in">
                  <AlertCircle size={16} className="shrink-0 text-rose-400" />
                  <span>{formFeedback}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full py-3.5 bg-zinc-100 text-zinc-950 font-semibold text-xs tracking-wider uppercase rounded-xl shadow-[0_5px_15px_rgba(255,255,255,0.15),0_2px_4px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(255,255,255,0.25)] hover:bg-white active:translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {formStatus === 'sending' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Blank space normally, displays spam response notice after clicking send message */}
          <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[140px]">
            {formStatus === 'success' && (
              <div className="w-full p-5 sm:p-6 rounded-2xl bg-amber-950/40 border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] text-amber-200 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
                  </span>
                  <span>Notice</span>
                </div>
                <p className="text-sm sm:text-base font-mono font-bold leading-relaxed text-amber-100">
                  #Please Check your spam message check out my RESPONSE to your message ,  change REPORT NOT SPAM to get my response
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-12 text-zinc-500">
          <a
            href="https://github.com/tejovanth17"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/tejovanth-thomala-009196354/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:tejovanth16@gmail.com"
            title="tejovanth16@gmail.com"
            className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <Mail size={18} />
          </a>
        </div>
      </section>

    </div>
  );
}
