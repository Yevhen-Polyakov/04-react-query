import css from './MovieModal.module.css'
import type { Movie } from '../../types/movie'

import { createPortal } from 'react-dom'
import { useEffect } from 'react'

interface MovieModalProps{
    item: Movie,
    onClose: () => void,
}

const MovieModal = ({item, onClose}:MovieModalProps) => {

    function closeBackdrop(e: React.MouseEvent<HTMLDivElement>){
        if(e.target === e.currentTarget){
            onClose()
        }
    }

    useEffect(() => {
            
        function handleKeyDow (e: KeyboardEvent){
            if(e.key === "Escape"){
                onClose()
            }
        }

            document.addEventListener("keydown", handleKeyDow)
            document.body.style.overflow = 'hidden'

        return () => {

            document.removeEventListener("keydown", handleKeyDow)
            document.body.style.overflow = ""
        }

    }, [onClose])

    const{id, backdrop_path, title, vote_average, overview, release_date} = item
        return createPortal(
            <div 
                className={css.backdrop} 
                role="dialog" aria-modal="true"
                onClick={closeBackdrop}>
            
                    <div className={css.modal}
                        key={id} >
                    <button 
                        className={css.closeButton} 
                        aria-label="Close modal"
                        onClick={onClose}>
                        &times;
                    </button>
                
                    <img
                        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                        alt={title}
                        className={css.image}
                    />
                    <div className={css.content}>
                        <h2>{title}</h2>
                        <p>{overview}</p>
                        <p><strong>Release Date:</strong>{release_date}</p>
                        <p><strong>Rating:</strong>{vote_average}</p>
                    </div>
                </div>
            </div>,
            document.body
        )
}

export default MovieModal