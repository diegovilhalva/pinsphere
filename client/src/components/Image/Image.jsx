import { IKImage } from "imagekitio-react"


const Image = ({path,alt,className,width,height}) => {
    const urlEndpoint = import.meta.env.VITE_URL_IK_ENDPOINT
    return (
        <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            transformation={[
                {
                    height:height,
                    width: width
                }
            ]}
            alt={alt}
            loading="lazy"
            className={className}
            lqip={{ active: true, quality: 20 }}
        />
    )
}

export default Image