import React, { useState, useEffect } from 'react';
import i18n from "../../utils/i18n";
import style from './Home.module.css';
import { useObserver } from 'mobx-react-lite';
import CountUp from 'react-countup';
import Footer from '../../components/Footer/Footer';
import VisibilitySensor from 'react-visibility-sensor';
import { IoMdClose } from "react-icons/io";
 
const Home = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [garminModalVisible, setGarminModalVisible] = useState(false);
  const [garminFiles, setGarminFiles] = useState([]);
  const [garminFilesError, setGarminFilesError] = useState(<></>);
  const [modalContent, setModalContent] = useState(<></>);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [statisticsDuration, setStatisticsDuration] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [co2Saved, setCo2Saved] = useState(0);
  const [statistics, setStatistics] = useState({
    totalRides: 1,
    totalDuration: 1,
    totalDistance: 1,
  });

  useEffect(() => {
    fetch("https://api.bikedataproject.info/geo/Track/Publish")
    .then((response) => response.json())
    .then((data) => setStatistics(data));

    let fileInput = document.getElementById('file-input');

    fileInput.addEventListener('change', () => {
      let filesList = new Array();
      for(let i = 0; i < Object.keys(fileInput.files).length; i++) {
        filesList.push(fileInput.files[Object.keys(fileInput.files)[i]])
        if(i === Object.keys(fileInput.files).length - 1)
          setGarminFiles(filesList);
      }
    });

    return;
  }, [])

  useEffect(() => {
    if(submitSuccess) {
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000);
    }
    return;
  }, [submitSuccess])

  useEffect(() => {
    setGarminFilesError()

    if(garminFiles.length < 1)
      setModalContent(<p style={{ textAlign: 'center', marginTop: '40px' }}>Choose the .gpx or .fit files you want to upload.</p>)
    else
      setModalContent(
        garminFiles.map((file, i) => {
          return (
            <div className={style.file__item} key={i}>
              <p className={style.button__label}>{file.name}</p>
              <button className={style.deleteFile__button} onClick={() => {
                let fileList = [...garminFiles];
                fileList.splice(i, 1)
                setGarminFiles(fileList);
              }}>
                <IoMdClose style={{ width: '100%', height: '100%' }} />
              </button>
            </div>
          )
        })
      )

    return;
  }, [garminFiles.length])

  useEffect(() => {
    const co2perkm = 130 / 1000;

    setTotalRides(statistics.totalRides);
    setTotalDuration(statistics.totalDuration / 3600 / 1000);
    setTotalDistance(statistics.totalDistance / 1000000);
    setAverageDuration(statistics.totalDuration / 3600 / statistics.totalRides);
    setAverageSpeed((statistics.totalDistance / 1000) / (statistics.totalDuration / 3600));
    setCo2Saved(((statistics.totalDistance / 1000) * co2perkm) / 1000);
    
    return;
  }, [statistics])

  const onSelectFlag = async (country) => {
    const countryMapping = {
      BE: 'nl',
      FR: 'fre',
      US: 'en'
    }

    await i18n.changeLanguage(countryMapping[country]);
    setCurrentLanguage(country);
  }

  const submitGarminFiles = () => {
    var data= new FormData();
    console.log("submitting")

    garminFiles.forEach((file, index) => {
      data.append(index, file)
      if(index === garminFiles.length - 1) {
        console.log("data")
        fetch('https://api.bikedataproject.info/file/upload', {
          method: 'POST',
          body: data
        })
        .then(response => response.json())
        .then(result => {
          if(result.status === 'OK')  
          {
            setGarminFiles([])
            setGarminModalVisible(false)
            setSubmitSuccess(true)
          } else {
            setGarminFilesError(<p>Something went wrong, please try again.</p>)
          }
          
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    })
  }

  const stravaLogin = () => {
    window.location.assign(`https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_STRAVA_URL_KEY}&response_type=code&redirect_uri=https://api.bikedataproject.info/registrations/strava&approval_prompt=force&scope=activity:read_all`);
  }

  return useObserver(() => (
    <div className={style.global__wrapper}>
      <section className={style.header}>
        <div className={style.header__wrapper}>
          <h1 className={style.header__title}>{i18n.t('Heading')}</h1>
        </div>

        <div className={style.header__intro}>
          <p>{i18n.t('Introduction')}</p>
          <p className={style.intro__counter}>
            <p className={style.counter__total}>+12.2K</p>
            <p>{i18n.t('Label_total_km')}</p>
          </p>
        </div>
      </section>

      {/* Doesn't take 'help' classname?! */}
      <section className={`${style.content} ${style.grid} ${style.help}}`}>
        <p className={`${style.bigLetter} ${style.helpLetter}`}>
          {i18n.t('Help')}
        </p>
        <div className={style.content__wrapper}>
          <h2 className={style.content__title}>{i18n.t('Help_title')}</h2>
          <div className={style.content__text}>
            <p className={style.content__textBold}>{i18n.t('Ask_for_favor')}</p>
            <p>{i18n.t('By_sharing_your')}</p>
            <p>{i18n.t('Every_cyclist_can')}</p>
          </div>
        </div>
        <picture className={style.content__img}>
          <source
            media="(max-width: 600px)"
            srcSet="./assets/img/mockup-hor.png 400w"
          />
          <source
            media="(min-width: 600px)"
            srcSet="./assets/img/mockup-big.png 468w"
          />
          <img
            className={style.content__img}
            src="./assets/img/mockup-big.png"
            alt="Mock up of the app on a phone"
            width="468"
            height="593"
          />
        </picture>
      </section>

      <img
        className={style.line__img}
        src="./assets/img/bike_illustration.svg"
        alt="Line illustration of a bike and some trees."
      />

      <section className={`${style.content} ${style.grid} ${style.donate}`}>
        <p className={`${style.bigLetter} ${style.donateLetter}`}>
          {i18n.t('Donate')}
        </p>
        <div className={style.content__wrapper}>
          <h2 className={style.content__title}>{i18n.t('Donate_title')}</h2>
          <div className={style.content__text}>
            <p>{i18n.t('Several_ways_to_contribute')}</p>
            <p>{i18n.t('You_not_using')}</p>
          </div>
        </div>
        <div className={style.donate__buttons}>
          <div className={style.buttons__other}>
            <p>{i18n.t('Connect_existing_account')}</p>
            <div className={style.buttons__wrapper}>
              <button className={style.btn} onClick={() => stravaLogin()}>Strava</button>
              <button onClick={() => setGarminModalVisible(true)} className={style.btn}>Garmin</button>
            </div>
          </div>
          <div className={style.buttons__our}>
            <p>{i18n.t('Download_our_app')}</p>
            <div className={style.buttons__wrapper}>
              <button className={style.btn}>Google Store</button>
              <button className={style.btn}>Apple Store</button>
            </div>
          </div>
        </div>
      </section>

      {/* Garmin upload modal */}
      <div className={`${garminModalVisible ? style.modal__Visible : ''} ${style.upload__modal}`}>
        <div className={style.form__container}>
          <button className={style.close__button} onClick={() => setGarminModalVisible(false)}>
            <IoMdClose style={{ width: '100%', height: '100%' }} />
          </button>
          <div className={style.files__container}>
            {modalContent}
          </div>
          <div className={style.button__container}>
            {garminFilesError}
            <input id='file-input' type='file' accept='.gpx,.fit' multiple />
            <label for="file-input">Choose your Garmin files</label>
            <button onClick={() => submitGarminFiles()} className={style.submit__button}>Submit</button>
          </div>
        </div>
      </div>

      <div className={`${submitSuccess ? style.notification__Visible : ''} ${style.success__notification}`}>
        <p>Your files were successfully uploaded.</p>
      </div>

        <section className={`${style.content} ${style.data}`}>
          <h2 className={style.content__title}>{i18n.t('Data_title')}</h2>
          <p className={`${style.bigLetter} ${style.dataLetter}`}>
            {i18n.t('Data')}
          </p>
          <div className={`${style.data__overview} ${style.grid}`}>
            <div className={style.data__set}>
              <span className={style.data__number}>
                <VisibilitySensor onChange={(isVisible) => isVisible? setStatisticsDuration(2) : setStatisticsDuration(0)}>
                  <CountUp
                    end={totalRides}
                    separator="."
                    redraw={true}
                    duration={statisticsDuration}
                  />
                </VisibilitySensor>
              </span>
              <span className={style.data__label}>
                {i18n.t('Rides_collected')}
              </span>
            </div>
            <div className={style.data__set}>
              <span className={style.data__number}>
                <CountUp
                  end={averageDuration}
                  separator='.'
                  decimals={0}
                  redraw={true}
                  duration={statisticsDuration}
                />K
                <span className={style.data__small}> km</span>
              </span>
              <span className={style.data__label}>{i18n.t('Distance_collected')}</span>
            </div>
            <div className={style.data__set}>
              <span className={style.data__number}>
                <CountUp
                  end={totalDuration}
                  separator='.'
                  redraw={true}
                  decimals={0}
                  duration={statisticsDuration}
                />
              <span className={style.data__small}> min</span>
              </span>
            <span className={style.data__label}>{i18n.t('Average_duration')}</span>
            </div>
            <div className={style.data__set}>
              <span className={style.data__number}>
                <CountUp
                  end={averageSpeed}
                  redraw={true}
                  duration={statisticsDuration}
                />
                <span className={style.data__small}> km/h</span>
              </span>
            <span className={style.data__label}>{i18n.t('Average_speed')}</span>
            </div>
            <div className={style.data__set}>
              <span className={style.data__number}>
                <CountUp
                  end={totalDistance}
                  separator='.'
                  decimals={0}
                  redraw={true}
                  duration={statisticsDuration}
                />
                <span className={style.data__small}> km</span>
              </span>
              <span className={style.data__label}>{i18n.t('Average_distance')}</span>
            </div>
            <div className={style.data__set}>
              <span className={style.data__number}>
                <CountUp
                  end={co2Saved}
                  separator='.'
                  decimals={0}
                  redraw={true}
                  duration={statisticsDuration}
                />K
                <span className={style.data__small}> t</span>
              </span> 
            <span className={style.data__label}>{i18n.t('co2_saved')}</span>
            </div>
          </div>
          <div className={style.data__more}>
            <h3 className={style.subtitle}>{i18n.t('Data_subtitle')}</h3>
            <button className={style.btn}>{i18n.t('Data_button')}</button>
          </div>
        </section>

      <section className={`${style.content} ${style.grid} ${style.contribute}`}>
        <p className={`${style.bigLetter} ${style.contributeLetter}`}>{i18n.t('Contribute')}</p>
        <div className={style.content__wrapper}>
          <h2 className={style.content__title}>{i18n.t('Contribute_title')}</h2>
          <div className={style.content__text}>
            <p>{i18n.t('People_who_work')}</p>
            <p>{i18n.t('Common_goal')}</p>
          </div>
        </div>
        <img
          className={style.content__img}
          src="./assets/img/contribute.png"
          alt="People cycling"
          width="680"
          height="580"
        />
      </section>

      <section className={`${style.content} ${style.grid} ${style.visible}`}>
        <p className={`${style.bigLetter} ${style.visibleLetter}`}>
          {i18n.t('Visible')}
        </p>
        <div className={style.content__wrapper}>
          <h2 className={style.content__title}>{i18n.t('Visible_title')}</h2>
          <div className={style.content__text}>
            <p>{i18n.t('Community_more_visible')}</p>
            <p>{i18n.t('Globally_but_locally')}</p>
          </div>
        </div>
      </section>

      <img
        className={style.route__img}
        src="./assets/img/route.svg"
        alt="Striped line of a route with places marked on"
      />

      <section className={`${style.content} ${style.grid} ${style.partners_remove}`}>
        <p className={`${style.bigLetter} ${style.partnersLetter}`}>{i18n.t('Partners')}</p>
        <div className={style.content__wrapper}>
          <h2 className={style.content__title}>{i18n.t('Partners_title')}</h2>
          <div className={`${style.partners} ${style.grid}`}>
            <div className={style.partner}>
              <img
                className={style.partner__img}
                src="./assets/img/brussels-mobility.png"
                alt="Logo of brussels mobility"
                width="176"
                height="49"
              />
            </div>
            <div className={style.partner}>
              <img
                className={`${style.partner__img} ${style.partner__okbLogo}`}
                src="./assets/img/osoc-logo-black.svg"
                alt="Logo of brussels mobility"
                width="170"
                height="117"
              />
            </div>
            <div className={style.partner}>
              <img
                className={`${style.partner__img} ${style.partner__wgLogo}`}
                src="./assets/img/wg-film.png"
                alt="Logo of brussels mobility"
                width="150"
                height="150"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer onSelectFlag={(selectedFlag) => onSelectFlag(selectedFlag)} />
    </div>
  ));
};

export default Home;
