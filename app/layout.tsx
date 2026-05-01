import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' })

export const metadata: Metadata = {
  title: 'Personal Knowledge OS',
  description: 'AI-native knowledge management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
      </head>
      <body className={`${inter.variable} ${jakarta.variable} font-inter bg-background text-on-background`}>
        {children}
      </body>
    </html>
  )</content>
<parameter name="oldString">  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${jakarta.variable} font-inter bg-background text-on-background`}>
        {children}
      </body>
    </html>
  )</content>
</xai:function_call">The following files were successfully edited:
e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\app\layout.tsx
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\app\layout.tsx