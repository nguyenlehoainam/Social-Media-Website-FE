import React from 'react'
import './footer.scss'
import logo from '../../assets/images/logo.png'
import Facebook from '../../assets/images/facebook.webp'
import gmail from '../../assets/images/gmail.png'
import youtube from '../../assets/images/youtube.png'
const Footer = () => {
  return (
    <footer className='main-footer'>
      <div className='footer-content'>
        <div className='footer-logo'>
          <img src={logo} alt='' />
        </div>
        <div className='center-content'>
          <div className='footer-copyright'>© 2025 HIT NETWORK</div>
          <div className='footer-socials'>
            <a href='https://web.facebook.com/HITClub.HaUI' target='_blank'>
              <img src={Facebook} alt='' />
            </a>
            <a
              href='https://sict.haui.edu.vn/vn/cau-lac-bo/cau-lac-bo-tin-hoc-truong-cong-nghe-thong-tin-va-truyen-thong-hit/67473'
              target='_blank'>
              <img src={gmail} alt='' />
            </a>
            <a href='https://www.youtube.com/@HitClubHaui' target='_blank'>
              <img src={youtube} alt='' />
            </a>
          </div>
        </div>
        <div className='footer-links'>
          <p>Privacy Policy</p>
          <p>Terms and Conditions</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
