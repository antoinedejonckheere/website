import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.css';
import i18n from "../../utils/i18n";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Footer = ({onSelectFlag}) => {
  const languages = [{label: 'English', value: 'US'}, {label: 'Nederlands', value: 'BE'}, {label: 'Français', value: 'FR'}]
  const [selectedLanguage, setSelectedLanguage] = useState()

  useEffect(() => {
    let currentLanguage = i18n.language;

    switch(currentLanguage) {
      case 'en':
        setSelectedLanguage('US')
        break;
      case 'nl':
        setSelectedLanguage('BE')
        break;
      case 'fre':
        setSelectedLanguage('FR')
        break;
      default:
        setSelectedLanguage()
    }
    return;
  }, [])

  const languageChanged = (e) => {
    onSelectFlag(e.value)
    setSelectedLanguage(e.value)
  }

  return (
    <>
      <section className={style.footer}>
        <h2 className={style.hidden}>Footer</h2>
        <div className={`${style.footer__wrapper} ${style.grid}`}>
          <div className={style.footer__left}>
            <p>{i18n.t('Footer_intro')}</p>
            <a href="https://be.okfn.org/">
              <picture >
                <source
                  media="(max-width: 600px)"
                  srcSet="./assets/img/osoc-logo-icon.svg 113w"
                />
                <source
                  media="(min-width: 600px)"
                  srcSet="./assets/img/osoc-logo.svg 266w"
                />
                <img
                  className={style.footer__img}
                  src="./assets/img/osoc-logo.svg"
                  alt="Open Knowlegde Belgium"
                />
              </picture>
            </a>
          </div>

          <div className={style.footer__middle}>
            <h3 className={style.footer__title}>
              {i18n.t('Footer_nav_title')}
            </h3>
            <div className={style.footer__nav}>
              <Link className={style.footer__navLink} to="/" target="_blank">
                {i18n.t('Data_Map')}
              </Link>
              <Link
                className={style.footer__navLink}
                to="/about"
                target="_blank"
              >
                {i18n.t('About')}
              </Link>
              <Link className={style.footer__navLink} to="/faq" target="_blank">
                {i18n.t('FAQ')}
              </Link>
              <Link
                className={style.footer__navLink}
                to="/contact"
                target="_blank"
              >
                {i18n.t('Contact')}
              </Link>
            </div>
            <Dropdown
              className={style.language__dropdown}
              menuClassName={style.language__menu}
              arrowClassName={style.language__arrow}
              options={languages}
              onChange={(e) => languageChanged(e)}
              value={selectedLanguage}
              placeholder="Select language"
            />
          </div>

          <div className={style.footer__right}>
            <h3 className={style.footer__title}>{i18n.t('Footer_contact')}</h3>
            <p>{i18n.t('Footer_street')}</p>
            <p>{i18n.t('Footer_city')}</p>
            <p>bikedataproject@openknowledge.be</p>

            <div className={style.footer__socials}>
              <Link href="https://twitter.com/bikedataproject" target="_blank">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 0C7.38869 0 0 7.38869 0 16.5C0 25.6113 7.38869 33 16.5 33C25.6113 33 33 25.6113 33 16.5C33 7.38869 25.6113 0 16.5 0ZM24.0337 12.8649C24.041 13.0273 24.0445 13.1905 24.0445 13.3544C24.0445 18.3588 20.2353 24.1296 13.269 24.1299H13.2693H13.269C11.1302 24.1299 9.14001 23.503 7.46397 22.4287C7.76031 22.4637 8.06193 22.481 8.36732 22.481C10.1418 22.481 11.7748 21.8758 13.0711 20.8599C11.4132 20.8292 10.0154 19.7342 9.53302 18.2294C9.76389 18.2737 10.0013 18.2979 10.2448 18.2979C10.5905 18.2979 10.9253 18.2513 11.2435 18.1645C9.51061 17.8175 8.20518 16.286 8.20518 14.4521C8.20518 14.435 8.20518 14.4196 8.20569 14.4038C8.71603 14.6875 9.29963 14.8582 9.921 14.8773C8.9041 14.1988 8.23565 13.0389 8.23565 11.7249C8.23565 11.0311 8.42322 10.381 8.7485 9.8213C10.6161 12.1129 13.4073 13.62 16.5549 13.7784C16.4899 13.5009 16.4564 13.2119 16.4564 12.9148C16.4564 10.8241 18.1526 9.12792 20.2441 9.12792C21.3335 9.12792 22.3174 9.58841 23.0085 10.3246C23.8713 10.1544 24.6815 9.83917 25.4134 9.40537C25.1302 10.2893 24.53 11.0311 23.748 11.5001C24.5141 11.4085 25.2442 11.2053 25.9227 10.9037C25.4159 11.6632 24.7732 12.3304 24.0337 12.8649V12.8649Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <a href="https://www.facebook.com/BikeDataProject">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33 16.5C33 7.38633 25.6137 0 16.5 0C7.38633 0 0 7.38633 0 16.5C0 25.6137 7.38633 33 16.5 33C16.5967 33 16.6934 33 16.79 32.9936V20.1545H13.2451V16.023H16.79V12.9809C16.79 9.45527 18.9428 7.53457 22.0881 7.53457C23.5963 7.53457 24.8918 7.64414 25.2656 7.6957V11.3824H23.1C21.392 11.3824 21.0568 12.1945 21.0568 13.3869V16.0166H25.1496L24.6146 20.148H21.0568V32.3619C27.9533 30.3832 33 24.0346 33 16.5V16.5Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="https://join.slack.com/t/bikedataproject/shared_invite/zt-g60t5w5c-lT2ucV0HtLEVnE4_wG9hTg">
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33 16.5C33 25.6127 25.6127 33 16.5 33C7.3873 33 0 25.6127 0 16.5C0 7.3873 7.3873 0 16.5 0C25.6127 0 33 7.3873 33 16.5ZM13.8419 6.53378C12.7402 6.5346 11.8485 7.42691 11.8493 8.52645C11.8485 9.62599 12.741 10.5183 13.8427 10.5191H15.8361V8.52726C15.8369 7.42772 14.9445 6.53541 13.8419 6.53378ZM13.8419 11.8486H8.52782C7.42608 11.8494 6.53361 12.7418 6.53443 13.8413C6.5328 14.9408 7.42526 15.8331 8.52701 15.8348H13.8419C14.9437 15.834 15.8361 14.9417 15.8353 13.8421C15.8361 12.7418 14.9437 11.8494 13.8419 11.8486ZM24.4717 11.8486C25.5734 11.8494 26.4659 12.7418 26.4651 13.8413C26.4659 14.9417 25.5734 15.834 24.4717 15.8348H22.4783V13.8413C22.4775 12.7418 23.3699 11.8494 24.4717 11.8486ZM21.1502 8.52645V13.8413C21.151 14.9417 20.2585 15.834 19.1568 15.8348C18.055 15.8331 17.1626 14.9408 17.1642 13.8413V8.52645C17.1634 7.42691 18.0558 6.5346 19.1576 6.53378C20.2593 6.53541 21.151 7.42772 21.1502 8.52645ZM19.1568 26.4628C20.2586 26.4619 21.1511 25.5696 21.1502 24.4701C21.1511 23.3706 20.2586 22.4782 19.1568 22.4774H17.1635V24.4701C17.1626 25.5688 18.0551 26.4611 19.1568 26.4628ZM19.1568 21.1471H24.4718C25.5735 21.1463 26.466 20.254 26.4652 19.1544C26.4668 18.0549 25.5743 17.1626 24.4726 17.1609H19.1577C18.0559 17.1618 17.1635 18.0541 17.1643 19.1536C17.1635 20.254 18.0551 21.1463 19.1568 21.1471ZM8.52782 21.1501C7.42608 21.1493 6.53361 20.257 6.53442 19.1574C6.53361 18.0579 7.42608 17.1656 8.52782 17.1648H10.5212V19.1574C10.522 20.257 9.62956 21.1493 8.52782 21.1501ZM11.8493 24.4723V19.1574C11.8485 18.0579 12.7402 17.1656 13.8427 17.1656C14.9445 17.1672 15.8369 18.0595 15.8353 19.1591V24.4731C15.8361 25.5726 14.9437 26.4649 13.8419 26.4658C12.7402 26.4641 11.8477 25.5718 11.8493 24.4723Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="https://github.com/bikedataproject">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 0C7.15983 0 0 7.26871 0 16.2433C0 23.877 5.15949 30.2125 12.1205 31.9986C12.0402 31.7954 12.0007 31.5106 12.0007 31.2272V28.4652H10.0003C8.92051 28.4652 7.91966 27.9786 7.47983 27.0842C6.95966 26.1096 6.87932 24.6069 5.55983 23.6724C5.15949 23.3475 5.47949 23.0226 5.91932 23.0627C6.75949 23.306 7.43898 23.8756 8.07898 24.7271C8.71898 25.5801 8.99949 25.7833 10.1991 25.7833C10.7588 25.7833 11.6385 25.7432 12.4391 25.6202C12.879 24.4825 13.6388 23.4678 14.5593 22.9812C9.19966 22.3314 6.63966 19.6509 6.63966 15.9959C6.63966 14.4116 7.31915 12.9089 8.43983 11.6095C8.08034 10.3501 7.59966 7.75117 8.60051 6.73648C11.0012 6.73648 12.4405 8.32072 12.8 8.72576C13.9997 8.31934 15.3205 8.07603 16.6795 8.07603C18.0793 8.07603 19.3593 8.31934 20.559 8.72576C20.9185 8.31934 22.3591 6.73648 24.7585 6.73648C25.7185 7.71108 25.2786 10.3501 24.8783 11.6095C25.999 12.8688 26.639 14.4116 26.639 15.9959C26.639 19.6509 24.1185 22.3314 18.7997 22.8996C20.2798 23.671 21.3202 25.8635 21.3202 27.4878V31.1871C21.3202 31.3088 21.2807 31.4304 21.2807 31.5521C27.52 29.3596 32 23.3503 32 16.2433C32 7.26871 24.8402 0 16 0Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={style.subfooter}>
        <h2 className={style.hidden}>Subfooter</h2>
        <p>
          {i18n.t('Footer_copyright_one')}{' '}
          <a
            className={style.link}
            href="https://creativecommons.org/licenses/by-sa/4.0"
          >
            {' '}
            {i18n.t('Footer_copyright_two')}
          </a>
          .
        </p>

        <div className={style.policies}>
          <p>{i18n.t('Terms_of_use')}</p>
          <p>{i18n.t('Privacy_policy')}</p>
          <p>{i18n.t('Cookie_policy')}</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
