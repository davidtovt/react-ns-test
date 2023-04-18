import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import anime from 'animejs/lib/anime.es.js';

import { formatDate } from '../../utils/functions';

import styles from './Modal.module.scss';

const Modal = ({ setIsOpen, isOpen, content }) => {
  const { name, from, to, color, talent } = content;

  const modalContentRef = useRef(null);
  const modalBackdropRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      anime({
        targets: modalContentRef.current,
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 500,
        easing: 'easeInOutQuad',
      });

      anime({
        targets: modalBackdropRef.current,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInOutQuad',
      });
    } else {
      anime({
        targets: modalContentRef.current,
        scale: [1, 0.9],
        opacity: [1, 0],
        translateY: [0, 50],
        duration: 500,
        easing: 'easeInOutQuad',
      });

      anime({
        targets: modalBackdropRef.current,
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }
  }, [isOpen]);

  return createPortal(
    <>
      <CSSTransition
        nodeRef={modalContentRef}
        in={isOpen}
        timeout={500}
        unmountOnExit
      >
        <div className={styles['modal']} onClick={closeModal}>
          <div className={styles['modal-wrapper']}>
            <div
              className={styles['modal-content']}
              style={{ backgroundColor: color }}
              ref={modalContentRef}
            >
              <h4 className={styles['modal-title']}>
                <span>{name}</span>
              </h4>

              <time>
                {formatDate(from)} - {formatDate(to)}
              </time>

              <ul>
                {talent &&
                  talent.map((talentName, i) => (
                    <li key={'talent-' + i}>
                      <span>{talentName}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        nodeRef={modalBackdropRef}
        in={isOpen}
        timeout={500}
        unmountOnExit
      >
        <div className={styles['modal-backdrop']} ref={modalBackdropRef}></div>
      </CSSTransition>
    </>,
    document.body
  );
};

export default Modal;
