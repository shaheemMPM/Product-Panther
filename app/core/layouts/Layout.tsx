import { ReactNode, Suspense } from "react"
import { Head, Link } from "blitz"
import UserInfo from "app/auth/components/UserInfo"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "product-panther"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-lg mx-auto">
        <header className="flex flex-row">
          <Link href="/">
            <a>
              <h1 className="font-extrabold text-gray-600 tracking-tighter text-xl py-4">
                Product Panther
              </h1>
            </a>
          </Link>
          <div className="ml-auto">
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>
        </header>
        {children}
      </div>
    </>
  )
}

export default Layout
