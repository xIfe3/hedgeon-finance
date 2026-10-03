import Footer from "@/components/public/Footer"
import Header from "@/components/public/Header"


function layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            {children}
        </section>
    )
}

export default layout
