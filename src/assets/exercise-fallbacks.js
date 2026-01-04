// Fallback SVG illustrations for exercises when GIFs don't load
// Simple, minimalist icons in the app's style

export const fallbackIcons = {
  chest: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="35" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 30 50 Q 40 40, 50 35 T 70 50" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 35 52 L 35 75 M 65 52 L 65 75" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 30 75 L 40 75 M 60 75 L 70 75" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  
  back: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="25" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 50 35 L 50 70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50 45 L 30 55 L 30 75 M 50 45 L 70 55 L 70 75" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 35 70 L 50 70 L 65 70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  
  shoulders: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="30" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 50 40 L 50 65" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50 45 L 25 35 L 20 55 M 50 45 L 75 35 L 80 55" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="20" cy="55" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="80" cy="55" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  
  legs: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="20" width="30" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 40 40 L 40 75 M 60 40 L 60 75" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <path d="M 35 75 L 40 75 L 40 85 M 60 75 L 65 75 L 65 85" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
  </svg>`,
  
  arms: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="25" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <path d="M 50 33 L 50 45" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50 40 L 30 50 Q 25 60, 30 70 L 35 75" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50 40 L 70 50 Q 75 60, 70 70 L 65 75" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <circle cx="30" cy="60" r="6" fill="currentColor"/>
    <circle cx="70" cy="60" r="6" fill="currentColor"/>
  </svg>`,
  
  core: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="25" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    <rect x="35" y="37" width="30" height="35" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
    <path d="M 42 45 L 42 62 M 58 45 L 58 62" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M 35 72 L 40 85 M 65 72 L 60 85" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
  
  barbell: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="45" width="70" height="10" rx="2" fill="currentColor"/>
    <rect x="10" y="35" width="8" height="30" rx="2" fill="currentColor"/>
    <rect x="82" y="35" width="8" height="30" rx="2" fill="currentColor"/>
    <rect x="5" y="30" width="10" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
    <rect x="85" y="30" width="10" height="40" rx="3" fill="none" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  
  dumbbells: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-30 35 45)">
      <rect x="20" y="40" width="30" height="6" rx="1" fill="currentColor"/>
      <rect x="18" y="35" width="6" height="16" rx="2" fill="currentColor"/>
      <rect x="46" y="35" width="6" height="16" rx="2" fill="currentColor"/>
    </g>
    <g transform="rotate(30 65 55)">
      <rect x="50" y="52" width="30" height="6" rx="1" fill="currentColor"/>
      <rect x="48" y="47" width="6" height="16" rx="2" fill="currentColor"/>
      <rect x="76" y="47" width="6" height="16" rx="2" fill="currentColor"/>
    </g>
  </svg>`,
  
  bodyweight: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="25" r="12" fill="none" stroke="currentColor" stroke-width="2.5"/>
    <path d="M 50 37 L 50 60" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50 45 L 30 55 M 50 45 L 70 55" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50 60 L 35 80 M 50 60 L 65 80" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
}

export const getFallbackIcon = (category, equipment) => {
  const icon = fallbackIcons[category] || fallbackIcons[equipment] || fallbackIcons.bodyweight
  return `data:image/svg+xml;base64,${btoa(icon)}`
}
