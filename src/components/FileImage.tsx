import { useEffect, useState } from "react"
import { supabase } from "../utils/supabase-client"
import { Loader } from "./Loader"

type FileImageProps = {
	filePath: string
} & React.ImgHTMLAttributes<HTMLImageElement>


// relative path in DB
export const FileImage = ({filePath, ...props}: FileImageProps) => {
	const [image, setImage] = useState("")
	const [loading, setLoading ] = useState(true)

    console.log(filePath,'file path')
	useEffect(() => {
		const downloadImage = async (filePath: string) => {
			setLoading(true);
			const {data} = await supabase.storage.from("images").download(filePath)
            console.log(data,' data from images storage')
			if(data){
				const url = URL.createObjectURL(data)
				setImage(url)
                setLoading(false)
				
			}
        
		}
		if(filePath && filePath.length > 0){
			downloadImage(filePath)
		}
        setLoading(false)
	}, [filePath])

	if(loading){
		return <div className={"bg-blue-400"}>
            loading image
			<Loader/>
		</div>
	}

	return <img src={image} alt={filePath} {...props} />
}