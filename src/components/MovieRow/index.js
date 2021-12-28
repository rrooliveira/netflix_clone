import React, { useState } from "react";
import './MovieRow.css'
import {NavigateBefore} from "@material-ui/icons";
import {NavigateNext} from "@material-ui/icons";

function MovieRow(props) {
    const [scrollX, setSrcollX] = useState(-400)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if (x > 0) {
            x = 0
        }
        setSrcollX(x)
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = props.items.results.length * 150
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60
        }
        setSrcollX(x)
    }

    return (
        <div className="movieRow">
            <h2>{props.title}</h2>
            <div className='movieRow--left' onClick={handleLeftArrow}>
                <NavigateBefore style={{fontSize: 50}} />
            </div>
            <div className='movieRow--right' onClick={handleRightArrow}>
                <NavigateNext style={{fontSize: 50}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: props.items.results.length * 150
                }}>
                {
                    props.items.results.length > 0 && props.items.results.map((item, key) => (
                        <div className="movieRow--item" key={key}>
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} key={key} alt={item.original_title} />
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    ) 
}

export default MovieRow