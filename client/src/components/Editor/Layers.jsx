import useEditorStore from "../../utils/editorStore"
import Image from "../Image/Image"


const Layers = () => {
    const { selectedLayer,setSelectedLayer,addText,canvasOptions } = useEditorStore()
    const handleSelectedLayer = (layer) => {
        setSelectedLayer(layer)
        if (layer === "text") {
            addText()
        }
    }
    return (
        <div className="layers">
            <div className="layers-">
                <h3>Layers</h3>
                <p>Select a layer to  edit</p>
            </div>
            <div onClick={() => handleSelectedLayer("text")} 
            className={`layer ${selectedLayer === "text" ? "selected" : ""}`}>
                <div className="layer-image">
                    <Image path="/general/text.png" alt="text" width={48} height={48} />
                </div>
                <span>Add Text</span>
            </div>
            <div  onClick={() => handleSelectedLayer("canvas")} 
            className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}>
                <div className="layer-image" style={{ backgroundColor: canvasOptions.backgroundColor }}>

                </div>
                <span>Canvas</span>
            </div>
        </div>
    )
}

export default Layers