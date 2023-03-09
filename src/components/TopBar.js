import React from 'react'

function TopBar(props) {
  return (
    <section id="topBar">
        <img id="profilePic" src="https://i.ibb.co/SQTT0tj/bot.png" alt="bot" border="0"/>
        <div id="barText">
            intelliBot
        </div>
        <i id="mode" onClick={props.toggleMode} class="barIcon fa-regular fa-moon"></i>
        <i id="delete" onClick={props.deleteAll} class="barIcon fa-regular fa-trash-can"></i>
    </section>
  )
}

export default TopBar