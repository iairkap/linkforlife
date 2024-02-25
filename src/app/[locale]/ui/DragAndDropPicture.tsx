import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "../sass/components/dragAndDrop.scss"
import drag from "../../../../public/drag.png"
import Image from 'next/image';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function DragAndDropPicture() {

    const [files, setFiles] = useState([])

    return (
        <div className="App">
            <FilePond

                files={files}
                onupdatefiles={setFiles}
                allowMultiple={true}
                maxFiles={3}
                server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle={`<img src="${drag}" alt="drag" /><br>Drag & Drop your files or <span class="filepond--label-action">Browse</span>`}
            />
        </div>
    );
}

export default DragAndDropPicture;