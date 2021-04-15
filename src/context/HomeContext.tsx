import {createContext, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';

interface HomeContextData {
    images: ImageData[];
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    upperText: string;
    lowerText: string;
    onDrop: (acceptedFiles)=> void;
    setUpperText: (value:string) => void;
    setLowerText: (value:string) => void;
}

export const HomeContext = createContext({} as HomeContextData);

interface ImageData {
    src: string;
}

interface HomeContextProviderProps {
    children: ReactNode;
}

const HomeContextProvider = ({children}:HomeContextProviderProps) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [upperText, setUpperText] = useState("");
    const [lowerText, setLowerText] = useState("");
    const canvasRef = useRef(null);

    useEffect(()=> {
        if (images && images.length) {
            const canvas:HTMLCanvasElement = canvasRef.current;
            const contexto = canvas.getContext('2d');
            var image = new Image();
                image.onload = ()=> {
                canvas.width = 500;
                canvas.height = 500;
                
                contexto.drawImage(image, 0, 0, 500, 500);
                contexto.strokeStyle = "black";
                contexto.font = "30pt Impact";
                contexto.lineWidth = 4;
                contexto.fillStyle = "white";
                const lines = upperText.split('\n');
                
                lines.forEach((line, index)=> {
                    let deslocamento = 60;
                    contexto.strokeText(line, 50, deslocamento + index * 40);
                    contexto.fillText(line, 50, deslocamento + index * 40);
                });
                contexto.strokeText(lowerText, 50, 450);
                contexto.fillText(lowerText, 50, 450);
            }
            image.src = images[0].src;
        }
    }, [images, upperText, lowerText]);


    const onDrop = (filesSelected) => {
        filesSelected.map(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const updatedImages:ImageData[] = [...images, {src: `${e.target.result}`}];
            setImages(updatedImages);
        };
        reader.readAsDataURL(file);
        return file;
        });
    }

    return (
        <HomeContext.Provider value={{
            images,
            upperText,
            lowerText,
            onDrop,
            canvasRef,
            setUpperText,
            setLowerText
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;