import Ads from "../../components/Ads";
import Carousel from "../../components/Carousel";

const MyAds = () => {
    return (
        <>
            <Carousel endpoint="/ads/my" caption="Мои объявления"/>
            <Carousel endpoint="/ads/my/hidden" caption="Скрытые"/>
            <Carousel endpoint="/ads/my/archived" caption="Архив"/>
        </>
    );
};

export default MyAds;