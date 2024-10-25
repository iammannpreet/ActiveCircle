import React from 'react';
import './AnimatedCard.css';
import run from '../assets/test/run.jpg'
import dance from '../assets/test/dance.webp'
import hike from '../assets/test/hike.jpg'
const AnimatedCard = () => {
    return (
        <div className='container'>
            <div className='card__container'>
                <article className='card__article'>
                    <img src={run} alt='image' className='card__img' />
                    <div className='card__data'>
                        <span className='card__description'>Man Running</span>
                        <h2 className='card__title'>Great Run</h2>
                        <a href='#' className='card__button'>Read More</a>
                    </div>
                </article>

                <article className='card__article'>
                    <img src={dance} alt='image' className='card__img' />
                    <div className='card__data'>
                        <span className='card__description'>Dance Lady</span>
                        <h2 className='card__title'>Wonderful Dance</h2>
                        <a href='#' className='card__button'>Read More</a>
                    </div>
                </article>

                <article className='card__article'>
                    <img src={hike} alt='image' className='card__img' />
                    <div className='card__data'>
                        <span className='card__description'>Hike with me</span>
                        <h2 className='card__title'>Amazing View</h2>
                        <a href='#' className='card__button'>Read More</a>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default AnimatedCard