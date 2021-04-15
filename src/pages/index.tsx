import {useContext} from 'react';
import styles from '../styles/Home.module.css'
import {HomeContext} from '../context/HomeContext';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  
  const {
    canvasRef,
    upperText,
    lowerText,
    onDrop,
    setUpperText,
    setLowerText
  } = useContext(HomeContext);

  const {getRootProps, getInputProps} = useDropzone({onDrop, accept:["image/*"]});

  return (
    <main className="App">
      <div className={styles.title}>
        <h1>CRIE MEMES RÁPIDO E DE FORMA SIMPLES</h1>
      </div>
      <main className={styles.content}>
        <canvas className={styles.canvas} {...getRootProps()} ref={canvasRef}>
            <div {...getInputProps()} />
        </canvas>
        <form className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="superior">Informe o texto superior</label>
            <textarea 
              id="superior"
              name="superior"
              value={upperText}
              onChange={(e) => setUpperText(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="inferior">Informe o texto superior</label>
            <textarea 
              id="inferior"
              name="inferior"
              value={lowerText}
              onChange={(e) => setLowerText(e.target.value)}
            />
          </div>
        </form>
      </main>
    </main>
  );
}
