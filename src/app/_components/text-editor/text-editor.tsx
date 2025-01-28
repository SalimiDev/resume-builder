import EditorToolbar, { formats, modules } from './editor-toolbar';
import './text-editor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type TextEditorProps = {
    value: string | undefined;
    onChange: (value: string) => void;
    toolbarId: string;
};
export function TextEditor({ value, onChange, toolbarId }: TextEditorProps) {
    return (
        <div className='form-group col-md-12 editor quill-content'>
            <EditorToolbar toolbarId={toolbarId} />
            <ReactQuill
                className='h-36'
                theme='snow'
                value={value}
                onChange={onChange}
                placeholder={'Write more information...'}
                modules={modules(toolbarId)}
                formats={formats}
            />
        </div>
    );
}
