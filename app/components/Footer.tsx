import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://ai-sdk.dev/docs/introduction"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
        Vercel AI SDK Docs
      </a>

      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
        Go to nextjs.org →
      </a>
    </footer>
  )
}
