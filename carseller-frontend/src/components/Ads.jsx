import { useEffect, useRef, useState } from 'react';
import Card from '../components/Card'
import http from '../http-common';
import PlaceholderCard from './PlaceholderCard';

function Ads({endpoint = "/ads", caption="Объявления"}){
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState();
    const retryCount = useRef(0);
    const retryTimer = useRef(null);
    const maxRetries = 10;

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            http.get(endpoint)
                .then(response => {
                    setAds(response.data);
                    setLoading(false);
                    retryCount.current = 0;
                })
                .catch(e => {
                    if (retryCount.current < maxRetries){
                        retryCount.current += 1;
                        const delay = Math.min(1000 * 2 ** retryCount.current, 30000);
                        retryTimer.current = setTimeout(() => {
                            fetchAds();
                        }, delay);
                    }
                    else{
                        setLoading(false);
                    }
                })
        }
        fetchAds();
    }, [endpoint]);

    const placeholders = Array(8).fill({});

    return (
    <div className="container-fluid" >
        {(loading)? (
            <>
                <div className='row'>
                    <h1>{caption}</h1>
                </div>
                <div className="row g-3 me-2">
                    {placeholders.map((ad, i) => (
                    <div className="col-3" key={i}>
                        <PlaceholderCard/>
                    </div>
                    ))}
                </div> 
            </>
                ) : (
            <>
                {ads.length != 0 && (
                <>
                    <div className='row'>
                        <h1>{caption}</h1>
                    </div>
                    <div className="row g-3 me-2">
                        {ads.map((ad, i) => (
                        <div className="col-3" key={i} style={{ cursor: "pointer" }}>
                            <Card ad={ad}></Card>
                        </div>
                        ))}
                    </div>
                </>
                )}
            </>
                )}
        
    </div>
    );
} 

export default Ads;