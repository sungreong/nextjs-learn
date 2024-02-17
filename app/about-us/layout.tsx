
export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (

        <div>
          {children}
          &copy; Next JS 14 is great!
        </div>  
    )
  }
  