import React, { useEffect, useState } from "react";
import styled from "styled-components"
import SongListItem from "./SongListItem"

const SongList = ({songs}) => {
    const allSongs = songs
    return (
    <Wrapper>
        {songs.map((song) => {
            return (
            //     <SongListItem rank = {song.rank} 
            //     title = {song.title}
            //     artist = {song.artist} 
            //     streams = {song.streams} 
            //     publicationDate = {song.publicationDate}/>
            //song.title)
            <SongListItem song={song}/>)
        })}
    </Wrapper>
    )
}
const Wrapper = styled.ul`

`
export default SongList