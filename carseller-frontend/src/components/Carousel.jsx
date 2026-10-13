import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card'
import http from '../http-common';
import PlaceholderCard from './PlaceholderCard';

function Carousel({endpoint = "/ads", caption="Объявления"}){
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState();
    const scrollContainerRef = useRef(null);
    

    const scrollLeft = () => {
        if (scrollContainerRef.current){
            const container = scrollContainerRef.current;
            const cardWidth = container.firstChild?.offsetWidth || 0;
            const gap = parseFloat(getComputedStyle(container).gap) || 0;
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            })
        }
    }
    const scrollRight = () => {
        if (scrollContainerRef.current){
            const container = scrollContainerRef.current;
            const cardWidth = container.firstChild?.offsetWidth || 0;
            const gap = parseFloat(getComputedStyle(container).gap) || 0;
            const scrollAmount = cardWidth + gap;
            scrollContainerRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            http.get(endpoint)
                .then(response => {
                    setAds(response.data);
                })
            setLoading(false);
        }
        fetchAds();
    }, [endpoint]);

    const placeholders = Array(12).fill({});

    return (
    <div className="position-relative my-2 ms-3">
        {(loading)? (
            <>
                    <div className='row'>
                        <h1>{caption}
                            <button 
                            className="btn btn-outline-primary ms-3"
                            onClick={scrollLeft}
                            >
                            &lt;
                            </button>
                            <button 
                            className="btn btn-outline-primary mx-1"
                            onClick={scrollRight}
                            >
                            &gt;
                            </button>
                        </h1>
                    </div>
                    <div className="row">
                        <div ref={scrollContainerRef} className='d-flex flex-nowrap overflow-hidden gap-2' style={{scrollBehavior: 'smooth'}}>
                            {placeholders.map((ad, i) => (
                            <div className="col-2 p-2" key={i} style={{ cursor: "pointer" }}>
                                <PlaceholderCard ad={ad}></PlaceholderCard>
                            </div>
                            ))}
                        </div>
                        
                    </div>
            </>
                ) : (
            <>
                {ads.length != 0 && (
                <>
                    <div className='row'>
                        <h1>{caption}
                            <button 
                            className="btn btn-outline-primary ms-3"
                            onClick={scrollLeft}
                            >
                            &lt;
                            </button>
                            <button 
                            className="btn btn-outline-primary mx-1"
                            onClick={scrollRight}
                            >
                            &gt;
                            </button>
                        </h1>
                    </div>
                    <div className="row">
                        <div ref={scrollContainerRef} className='d-flex flex-nowrap overflow-hidden gap-2' style={{scrollBehavior: 'smooth'}}>
                            {ads.map((ad, i) => (
                            <div className="col-2 p-2" key={i} style={{ cursor: "pointer" }}>
                                <Card ad={ad}></Card>
                            </div>
                            ))}
                        </div>
                        
                    </div>
                </>
                )}
            </>
                )}
        
    </div>
    );
} 

export default Carousel;