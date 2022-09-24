import React from 'react'
import style from "./footer.module.css"

const Footer = () => {
  return (
    <div>
      <div className={style.div}>
        <div>
          <h2>Company</h2>
          <p>About us</p>
          <p>Blog</p>
          <p>Careers</p>
          <p>Contact us</p>
          </div>
        <div>
          <h2>Support</h2>
          <p>Help Center</p>
          <p>Safety Center</p>
          <p>Community Guidelines</p>
          <p>Blog</p>
          </div>
        <div>
          <h2>Legal</h2>
          <p>Cookies Policy</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Law Enforcement</p>
          </div>
        <div>
          <h2>Install App</h2>
         <img src="https://static.vecteezy.com/system/resources/previews/002/520/836/original/download-apps-button-google-play-and-app-store-vector.jpg" className={style.img}/>
          </div>
      </div>
      <div>
        <p>2022 E-Commerce. Built By Venketesh Rushi</p>
      </div>
    </div>
  )
}

export default Footer;