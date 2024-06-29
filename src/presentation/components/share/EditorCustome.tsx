import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, styled } from '@mui/material';
const BoxEditor = styled(Box)(({ theme }) => ({
    '& .ck-editor__main > .ck-editor__editable': {
        height: '200px',
    },
}));
type EditorCustomeProps = {
    onChangeData?: (data: any) => void;
    Error?: string;
    Title?: string;
    Id?: string;
    Value?: string | null;
    Disabled?: boolean;
};
const EditorCustome = (props: EditorCustomeProps) => {
    const { onChangeData, Error, Title, Id, Value, Disabled } = props;
    return (
        <>
            <label className="form-label" htmlFor={Id}>
                {Title}
            </label>
            <BoxEditor>
                <CKEditor
                    editor={Editor}
                    data={Value ? Value : '<p>Nhập vào đi</p>'}
                    disabled={Disabled ? Disabled : false}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        // console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        if (onChangeData) {
                            onChangeData(data);
                        }
                    }}
                    onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                    }}
                />
            </BoxEditor>
            {Error ? <label className="bg text-danger">{Error}</label> : ''}
        </>
    );
};
export default EditorCustome;
