import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className} container mx-auto`}>
      <div className="max-w-md space-y-6">
        <h1 className="mt-12 text-3xl font-black">Open ingredients.</h1>
        <p className="inline-block px-2 py-1 font-semibold bg-yellow-200 border border-yellow-300 ">
          Under construction
        </p>
        <p>
          Open Ingredients is a simple, yet effective application that uses
          blockchain technology to keep track of manufactured items. Think of it
          as a detailed diary for each product, logging its journey from raw
          materials to the final output.
        </p>
        <p>
          But here&apos;s the cool part - the product don&apos;t just stop at
          tracking the finished product. It also keep tabs on the raw materials
          that go into making it. So, it&apos;s not just about knowing where
          your product comes from, but also understanding what goes into it.
        </p>
        <p>
          Github:{' '}
          <Link
            href="https://github.com/karthickthankyou/open-ingredients-dapp"
            className="underline underline-offset-4"
          >
            https://github.com/karthickthankyou/open-ingredients-dapp
          </Link>
        </p>

        <Link href="https://iamkarthick.com" className="inline-block">
          Karthick Ragavendran
        </Link>
      </div>
    </main>
  )
}
