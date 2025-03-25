import { useEffect } from "react"
import useEditorStore from "../../utils/editorStore"
import Image from "../Image/Image"


const Workspace = ({previewImg}) => {
    const {textOptions,setTextOptions,canvasOptions,setCanvasOptions} = useEditorStore()
    useEffect(() => {   
        if (canvasOptions.height === 0) {
            const canvasHeight = (375 * previewImg.height) / previewImg.width

            setCanvasOptions({
                ...canvasOptions,height:canvasHeight,orientation:canvasHeight > 375 ? "portrait" : "landscape"
            })
        }
    },[previewImg,canvasOptions,setCanvasOptions])
  return (
    <div className="workspace">
        <div className="canvas" style={{height:canvasOptions.height,backgroundColor:canvasOptions.backgroundColor}}>
            <img src={previewImg.url} alt="" />
            {textOptions.text && (
                <div className="text" style={{left:textOptions.left,top:textOptions.top,fontSize:`${textOptions.fontSize}px`}} >
                    <input type="text" value={textOptions.text} onChange={(e) => setTextOptions({...textOptions,text:e.target.value})} style={{
                        color:textOptions.color
                    }} />
                    <div className="delete-text-button" onClick={() => setTextOptions({...textOptions,text:""})}>
                        <Image path="/general/delete.svg" alt="delete" />
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Workspace