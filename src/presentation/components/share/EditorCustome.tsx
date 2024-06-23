import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, styled } from '@mui/material';
const BoxEditor = styled(Box)(({ theme }) => ({
    '& .ck-editor__main > .ck-editor__editable': {
        height: '300px',
    },
}));

const EditorCustome = () => {
    return (
        <>
            <BoxEditor>
                <CKEditor
                    editor={Editor}
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event) => {
                        console.log(event);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </BoxEditor>
        </>
    );
};
export default EditorCustome;
