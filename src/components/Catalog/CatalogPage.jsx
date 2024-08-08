import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Catalog } from "./Catalog";
import { CatalogSearch } from "./CatalogSearch";
import { Banner } from "../Banner/Banner";

export const CatalogPage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Catalog>
              <CatalogSearch />
            </Catalog>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
