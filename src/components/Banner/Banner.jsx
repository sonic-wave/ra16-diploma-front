import './Banner.css';

export const Banner = () => {
    return (
        <div className="banner">
            <img src={`${import.meta.env.BASE_URL}/img/banner.jpg`} className="img-fluid" alt="К весне готовы!" />
            <h2 className="banner-header">К весне готовы!</h2>
        </div>
    )
}
