import React from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Banner } from '../Banner/Banner'

export const NotFound = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
          <Banner />
            <section className="top-sales">
              <h2 className="text-center">Страница не найдена</h2>
              <p>
                Извините, такая страница не найдена!
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
