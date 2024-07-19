import React from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { TopSales } from '../TopSales/TopSales'
import { Banner } from '../Banner/Banner'
import { Catalog } from '../Catalog/Catalog'

export const MainPage = () => {
    return (
        <>
            <Header />
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner />
                        <TopSales />
                        <Catalog />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
