import "./Banner.css";
import bannerImg from "../../../public/img/banner.jpg";

export const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImg} className="img-fluid" alt="К весне готовы!" />
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  );
};
