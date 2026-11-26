export default function StreamingCar({ className = 'h-8 w-[72px]' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 72 32" className={className} fill="none">
      <g fill="currentColor">
        <circle cx="22" cy="21" r="2" className="motion-safe:animate-exhaust" />
        <circle cx="15" cy="21" r="1.6" className="motion-safe:animate-exhaust [animation-delay:160ms]" />
        <circle cx="8" cy="21" r="1.2" className="motion-safe:animate-exhaust [animation-delay:320ms]" />
      </g>
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 23h-3v-6l3-7a3 3 0 0 1 2.8-2H45a4 4 0 0 1 2.8 1.2l6 6L61 17a3 3 0 0 1 2 2.8V23h-4m-8 0H38" />
        <path d="M34 11.5h10l3.5 3.5H32.5z" strokeWidth="1.5" />
        <path d="M27 21h-2" />
        <circle cx="34" cy="23" r="4" />
        <circle cx="55" cy="23" r="4" />
      </g>
    </svg>
  )
}
