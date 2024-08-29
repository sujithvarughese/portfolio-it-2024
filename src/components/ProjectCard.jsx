import { useEffect, useRef, useState } from 'react'
import { Container, Image, Stack } from 'react-bootstrap'
import classes from "../styles/ProjectsTiles.module.css"
import ProjectDrawer from './ProjectDrawer.jsx'
import { motion, useInView } from 'framer-motion'
import { FaArrowRightFromBracket } from "react-icons/fa6";
import arrowIcon from "../assets/icons/arrow-right.svg"
import VideoJS from './VideoJS.jsx'

const ProjectCard = ({ title, description, coverImage, coverVideo, coverGif, heading, link, github, captions, images, tech }) => {

  const [showDrawer, setShowDrawer] = useState(false)
  const onOpen = () => setShowDrawer(true)

  const [isHovering, setIsHovering] = useState(false)

  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.8 })

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    responsive: true,

    loop: true,
    preload: 'auto',
    sources: [{
      src: coverVideo,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };



  return (
    <>
      <ProjectDrawer
        isOpen={showDrawer}
        onClose={() => setShowDrawer(false)}
        title={title}
        description={description}
        images={images}
        captions={captions}
        link={link}
        github={github}
        tech={tech}
      />

      <Container
        as="button"
        className={`${classes.large} ${classes.card} card`}
        onClick={onOpen}
        onMouseEnter={()=>setIsHovering(true)}
        onMouseLeave={()=>setIsHovering(false)}
      >
        {isHovering ?
          <Image src={coverGif} alt="image"/>
          :
          //<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          <Image src={coverImage} alt="gif" />
        }
        <Container  style={{ maxWidth: "400px" }} className={classes.text}>
          <h3>{title}</h3>
          <p>{heading}</p>
        </Container>
      </Container>


      <Container
        as={motion.div}
        ref={ref}
        className={`${classes.small} ${classes.card} card`}
        onClick={onOpen}
        animate={{
          opacity: isInView ? 1 : 0.5,
          scale: isInView ? 1 : 0.9
      }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isInView ?
          <Image src={coverGif} alt="image" className={classes.image}/>
          :
          <Image src={coverImage} alt="image" className={classes.image}/>
        }

        <Container className={classes.text}>
          <h3>{title}</h3>
          <p>{heading}</p>
        </Container>

      </Container>


    </>

  )
}

export default ProjectCard