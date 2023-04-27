export default function Layout({children}) {
  return (
    <div className="p-5 gap-2">
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  )
}