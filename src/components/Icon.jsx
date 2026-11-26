const iconPaths = {
  car: <path d="m5 17-1 3m15-3 1 3M5 17h14a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm0-6 1.6-4.7A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.3L19 11M7 14h.01M17 14h.01" />,
  sparkles: <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.145-1.585a.5.5 0 0 1 0-.956L8.5 9.937A2 2 0 0 0 9.937 8.5l1.585-6.145a.5.5 0 0 1 .956 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.145 1.585a.5.5 0 0 1 0 .956L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.585 6.145a.5.5 0 0 1-.956 0zM20 2v4m2-2h-4M4 18v4m2-2H2" />,
  options: <><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></>,
  send: <path d="M7 17 17 7M7 7h10v10" />,
}

export default function Icon({ name, size }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  )
}
