import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import '../index.scss'

export default function CKEditorComponent({ hidden, getValueCKEditor, dataCKEditor, save }) {
    return (
        <>
            <CKEditor
                onReady={editor => {
                    editor.model.change(writer => {
                        writer.setSelection(editor.model.document.getRoot(), 'end');
                    });
                    editor.editing.view.focus();
                }}
                editor={ClassicEditor}
                onBlur={getValueCKEditor}
                data={dataCKEditor}
            />
            <div className='flex justify-start w-full h-fit'>
                <div onClick={() => save()} className='cursor-pointer w-[20%] h-[3.25rem] my-2 bg-[#0052cc] rounded-[5px] text-[#fff] mr-2 flex justify-center items-center text-xl font-medium'>
                    Save
                </div>
                <div onClick={() => hidden()} className='cursor-pointer w-[20%] h-[3.25rem] my-2 bg-[#fff] rounded-[5px] text-[#000] mr-2 flex justify-center items-center text-xl font-medium'>
                    Cancel
                </div>
            </div>
        </>
    )
}
