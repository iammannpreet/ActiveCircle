import React from 'react';
import '../tailwind.css';
import children from '../assets/cardImages/child outdoor.webp'
import dance from '../assets/cardImages/dance.jpg'
import hike from '../assets/cardImages/outdoor.webp'
import outdoor from '../assets/cardImages/outdoor nature.jpg'

const AnimatedCard = () => {
    return (
        <div className='container'>
            <h1 className='hidden md:block md:text-center md:mb-2  lg:text-lg text-darkGray'>Learn More</h1>
            <div className='card__container'>
                <div className='md:flex
                md:gap-4 md:pb-12 md:pd-8'>
                    <article className='card__article'>
                        <img src={children} alt='image' className='card__img' />
                        <div className='card__data'>
                            <span className='card__description'>Importance of</span>
                            <h2 className='card__title'>Kid's play</h2>
                            <a href='https://ijbnpa.biomedcentral.com/articles/10.1186/s12966-021-01097-9' target='blank' className='card__button'>Read More</a>
                        </div>
                    </article>

                    <article className='card__article'>
                        <img src={dance} alt='image' className='card__img' />
                        <div className='card__data'>
                            <span className='card__description'>Benefits of</span>
                            <h2 className='card__title'>being in nature</h2>
                            <a href='https://pmc.ncbi.nlm.nih.gov/articles/PMC6993091/#:~:text=Researchers%20have%20found%20the%20benefits,measured%20via%20urinary%20adrenaline%20and' target='blank' className='card__button'>Read More</a>
                        </div>
                    </article></div>
                <div className='md:flex md:gap-4 md:pb-8'>
                    <article className='card__article'>
                        <img src={outdoor} alt='image' className='card__img' />
                        <div className='card__data'>
                            <span className='card__description'>Benefits of</span>
                            <h2 className='card__title'>taking a break</h2>
                            <a href='https://www.participaction.com/blog/outdoors/7-science-backed-reasons-get-outside/#:~:text=Increased%20exposure%20to%20the%20outdoors,and%2Ddigest)%20nervous%20systems.' target='blank' className='card__button'>Read More</a>
                        </div>
                    </article>
                    <article className='card__article hidden md:block'>
                        <img src={hike} alt='image' className='card__img' />
                        <div className='card__data'>
                            <span className='card__description'>Helping others</span>
                            <h2 className='card__title'></h2>
                            <a href='https://www.uclahealth.org/news/article/weight-training-old-age-can-be-beneficial#:~:text=Resistance%20training%20has%20been%20shown,and%20lead%20to%20improved%20sleep.' target='blank' className='card__button'>Read More</a>
                        </div>
                    </article></div>
            </div>
        </div>
    )
}

export default AnimatedCard